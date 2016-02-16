var express = require('express');
var router = express.Router();
var passport = require('passport')

router.get('/auth/linkedin',
  passport.authenticate('linkedin'));

router.get('/auth/linkedin/callback',
  passport.authenticate('linkedin', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/')
  });

module.exports = router;
