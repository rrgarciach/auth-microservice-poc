const express = require('express');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const db = require('./db');

passport.use(new Strategy(
    function(username, password, cb) {
        db.users.findByUsername(username, function(err, user) {
            if (err) { return cb(err); }
            if (!user) { return cb(null, false); }
            if (user.password !== password) { return cb(null, false); }
            return cb(null, user);
        });
    }
));
