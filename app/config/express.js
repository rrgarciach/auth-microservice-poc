const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const errorHandler = require('errorhandler');
const path = require('path');
const passport = require('passport');

module.exports = (app) => {
    const env = app.get('env');

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(passport.initialize());

    if ('production' === env) {
        app.use(morgan('dev'));
    }
    else if ('development' === env || 'test' === env) {
        app.use(morgan('dev'));
        app.use(errorHandler()); // Error handler - has to be last
    }
};
