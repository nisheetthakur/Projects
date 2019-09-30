const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');


require('../passport-config/passport-strats.js')(passport, LocalStrategy);

//An authenticated user should not ever see the login screen.
function ensureAuthenticated(req, res, next) {
    if (req.user) {
        return next();
    }
    else {
        //issue a status code of 403 if the user is not logged in
        res.status(403).json({ error: "the user is not logged in" });
    }
}

// GET /
router.get("/", (req, res) => {
    //If the user is authenticated, it will redirect to /private otherwise render a view with a login screen
    if (req.user) {
        res.redirect('/private');
    }
    else {
        res.redirect('/login');
    }
});

router.get('/login', (req, res) => {
    res.render('pokepick/login', { error: req.flash('invalid') });
})


router.post("/login",
    passport.authenticate('local',
        {
            failureRedirect: '/login',
            successRedirect: '/private',
            failureFlash: true
        }
    ), (req, res) => {
        res.cookie('AuthCookie', '1', { expires: new Date(Date.now() + 900000), httpOnly: true });
        res.send('Check your cookies. One should be in there now');
    });


router.get("/private", ensureAuthenticated, (req, res) => {

    let loggedUser = req.user;
    res.render("pokepick/user_profile", loggedUser);
    
});


router.get("/logout", (req, res) => {
    res.clearCookie('AuthCookie');

  
    res.redirect('/login');
    console.log("you are logged out");
});

module.exports = router;
