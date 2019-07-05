// routes/authsGoogle.js
const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  })
)

module.exports = router