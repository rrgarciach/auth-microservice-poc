const express = require('express');
const passport = require('passport');

const signToken = require('../auth.service').signToken;
const redisService = require('../../redis/redis.service');

const router = express.Router();

const MESSAGE_404 = 'Incorrect credentials.';

router.post('/', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        const error = err || info;
        if (error) {
            console.error(error);
            return res.status(401).json({message: error.message});
        }
        if (!user) {
            return res.status(404).json({message: MESSAGE_404});
        }

        const token = signToken(user._id, user.role.name);
        res.cookie('token', token);
        res.json({token: token});

        redisService.setSession(token, user);

    })(req, res, next);
});

module.exports = router;
