var passport = require('passport')
var LinkedinStrategy = require('passport-linkedin').Strategy;
var knex = require('../db/knex.js')


passport.use(new LinkedInStrategy({
    consumerKey: process.env.CLIENT_ID,
    consumerSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/linkedin/callback",
    profileFields: ['id', 'first-name', 'last-name', 'email-address', 'headline']
  },
  function(token, tokenSecret, profile, done) {
    User.findOrCreate({ linkedinId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
