// routes/authsGoogle.js
const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'] }));

router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  })
)

module.exports = router