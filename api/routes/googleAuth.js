const express = require('express');
const session = require('express-session');
require('dotenv').config();
const ejs = require('ejs');


const app = express();

app.set('view engine', 'ejs');
// Express Session
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET'
}));

app.get('/loginwithgoogle', function(req, res) {
  res.render('pages/google');
});
/*  PASSPORT SETUP  */
const passport = require('passport');
var userProfile;

// const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

app.get('/success', (req, res) => res.send(userProfile));
app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

/*  Google AUTH  */
 
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
  const GOOGLE_CLIENT_ID = '705335514771-l92b7rb1saeooj4mg00re7pm4ahu1br9.apps.googleusercontent.com';
  const GOOGLE_CLIENT_SECRET = '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'
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      return done(null, userProfile);
  }
));
 
app.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    // Successful authentication, redirect success.
    res.redirect('/success');
  });

module.exports = app