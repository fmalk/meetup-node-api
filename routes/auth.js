const express = require('express');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const jwt = require('../jwt');

const router = express.Router();

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: `http://${process.env.DOMAIN}/auth/facebook/callback`
  },
  function buscaOuCria(accessToken, refreshToken, profile, done) {
    // Lógica de encontrar ou criar o usuário na base pelo token
    const token = jwt.signToken(profile);
    done(null, token);
  }
));

router.get('/facebook', passport.authenticate('facebook', { session: false }));
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' }));

module.exports = router;
