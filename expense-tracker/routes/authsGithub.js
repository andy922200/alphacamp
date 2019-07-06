// routes/authsGithub.js
const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/github',
  passport.authenticate('github', { scope: ['profile', 'email'] }));

router.get('/github/callback',
  passport.authenticate('github', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  })
)

module.exports = router