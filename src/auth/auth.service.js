const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const compose = require('composable-middleware');

const redisService = require('../redis/redis.service');
const userService = require('../user/users.service.js');
const CONFIG = require('../config/environment');

const MESSAGE_404 = 'It looks like you are not logged in, please try again.';

const validateJwt = expressJwt({
    secret: CONFIG.SESSION.SECRET
});

const expireTime = 60 * CONFIG.SESSION.MINUTES_TIMEOUT;

const client = redisService.createClient({
    host: CONFIG.REDIS.HOST,
    port: CONFIG.REDIS.PORT,
    password: CONFIG.REDIS.PASSWORD,
    db: CONFIG.REDIS.TOKEN_DB
});

// Attaches the User object to the request if authenticated, otherwise status 401
function isAuthenticated() {
    return compose()
    // Validate jwt
        .use(function (req, res, next) {
            if (req.query && req.query.hasOwnProperty('access_token')) {
                req.headers.authorization = 'Bearer ' + req.query.access_token;
                // allow access_token to be passed through query parameter as well
                validateJwt(req, res, next);
            } else {
                validateJwt(req, res, next);
            }
        })
        .use(function (err, req, res, next) {
            if (err.name === 'UnauthorizedError') {
                if (err.message === 'jwt expired') {
                    return res.status(401).send('Token expired.');
                }
                return res.status(401).send('Invalid token.');
            }
        })
        .use(swapToken)
        // Attach user to request
        .use(function (req, res, next) {
            userService.getById(req.user._id)
                .then(user => {
                    if (!user) {
                        return res.status(401).end();
                    }
                    req.user = user;
                    next();
                })
                .catch(err => next(err));
        });
}

// Returns a jwt token signed by the app secret
function signToken(id, role) {
    return jwt.sign({_id: id, role: role}, CONFIG.SESSION.SECRET, {
        expiresIn: expireTime
    });
}

function swapToken(req, res, next) {
    const token = req.headers.authorization.replace('Bearer ', '');

    _isTokenRegistered(token, isRegistered => {
        if (isRegistered) { // If token is registered
            if (CONFIG.DEBUG) console.log(`Token already used.`);
            return res.status(401).send('Invalid token.');
        }

        try {
            const data = jwt.verify(token, CONFIG.SESSION.SECRET);
            const newToken = signToken(data.id, data.role);
            res.cookie('token', newToken);
            _registerToken(token, () => {
                next();
            });

        } catch (err) {
            console.error(err);
            next(err);
        }
    });
}

function _registerToken(token, cb) {
    client.set(token, 1, 'EX', expireTime, err => {
        if (err) {
            console.error(err);
        }
        if (CONFIG.DEBUG) {
            console.log(`Token ${token} registered.`);
        }
        cb();
    });
}

function _isTokenRegistered(token, cb) {
    client.get(token, (err, reply) => {
        if (err) {
            console.error(err);
        }
        cb(Boolean(reply));
    });
}

// Set token cookie directly for oAuth strategies
function setTokenCookie(req, res) {
    if (!req.user) {
        return res.status(404).send(MESSAGE_404);
    }
    const token = signToken(req.user._id, req.user.role.name);
    res.cookie('token', token);
}

module.exports = {
    isAuthenticated,
    signToken,
    swapToken,
    setTokenCookie
};
