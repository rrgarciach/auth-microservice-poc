const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const AUTH_ERROR = { message: 'Incorrect credetials.' };

const localPassport = {
    localAuthenticate,
    setup
};

function localAuthenticate(userService, username, password, done) {
    userService.getByUsername(username.toLowerCase())
        .then(user => {
            if (!user) {
                return done(null, false, AUTH_ERROR);
            }
            user.authenticate(password, function (authError, authenticated) {
                if (authError) {
                    return done(authError);
                }
                if (authenticated) {
                    return done(null, user);
                } else {
                    return done(null, false, AUTH_ERROR);
                }
            });
        })
        .catch(err => {
            console.error('ERROR!', err);
            done(err)
        });
}

function setup(userService) {
    passport.use(new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password'
        },
        function (username, password, done) {
            return localAuthenticate(userService, username, password, done);
        }));
}

module.exports = localPassport;
