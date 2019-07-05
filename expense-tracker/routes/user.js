// routes/user.js
const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')

// initialize express-validator
const { check, validationResult } = require('express-validator')
const { recordFormCheck, registerFormCheck } = require('../models/validationRule')

// login page
router.get('/login', (req, res) => {
  res.render('login', { css: ['login.css'] })
})

// login check
router.post('/login', (req, res, next) => {
  if ((!req.body.email) || (!req.body.password)) {
    req.flash('warning_msg', '請檢查欄位是否空白')
  }
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  })(req, res, next)
  req.flash('warning_msg', 'Email 或密碼錯誤，請重新輸入')
})

// log out
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '成功登出')
  res.redirect('/users/login')
})

module.exports = router