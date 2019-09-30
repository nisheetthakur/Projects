const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const data = require('../data'); //user data
const bcrypt = require('bcrypt-nodejs');
const flash = require('connect-flash');
const userData  = data.user;


module.exports = (passport, LocalStrategy) => {
    function verifyPassword(password, hashedPassword) {
        return bcrypt.compareSync(password, hashedPassword)
}
    passport.serializeUser(function(user, done) {
    done(null, user);
    });

    passport.deserializeUser(function(user, done) {
    done(null, user);
    });
    passport.use(new LocalStrategy({
            passReqToCallback: true // don't forget this
        },
        (req, username, password, done) => {
            userData.getUserById(username).then((user) => {
                if(verifyPassword(password, user.password)) {
                    return done(null, user);
                }
                else {
                    return done(null, false, req.flash('invalid', 'Invalid password, please try again'));
                }
            })
            .catch((err) => {
                return done(null, false, req.flash('invalid', 'Invalid username please try again'));
            });
        }
    ));
}