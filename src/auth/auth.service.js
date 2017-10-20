const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const compose = require('composable-middleware');

const userService = require('../user/users.service.js');
const CONFIG = require('../config/environment');

const MESSAGE_404 = 'It looks like you are not logged in, please try again.';

const validateJwt = expressJwt({
    secret: CONFIG.SESSION.SECRET
});

const authService = {
    isAuthenticated,
    signToken,
    setTokenCookie
};

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
        expiresIn: 60 * CONFIG.SESSION.MINUTES_TIMEOUT
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

module.exports = authService;
