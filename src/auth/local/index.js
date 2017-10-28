const express = require('express');
const passport = require('passport');

const signToken = require('../auth.service').signToken;
const sessionService = require('../../session/session.service');

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

        sessionService.setSession(token, {user}, sessionId => sessionId);

    })(req, res, next);
});

router.get('/check', require('../auth.service').isAuthenticated(), (req, res) => {
    res.status(201).send('');
});

module.exports = router;
