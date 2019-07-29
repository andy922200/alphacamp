// routes/user.js
const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')

// load database
const db = require('../models')
const Record = db.Record
const User = db.User

// initialize express-validator
const { check, validationResult } = require('express-validator')
//const { recordFormCheck, registerFormCheck } = require('../models/validationRule')

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

// register page
router.get('/register', (req, res) => {
  res.render('register', { css: ['login.css'] })
})

// register check
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body
  let errorMessages = []
  if (!name || !email || !password || !password2) {
    errorMessages.push({ message: '請確定已填寫所有選項' })
  }
  if (password !== password2) {
    errorMessages.push({ message: '密碼輸入不一致，請再次輸入' })
  }
  if (errorMessages.length > 0) {
    res.render('register', { name, email, css: ['register.css'], errorMessages: errorMessages })
  } else {
    User.findOne({ where: { email: email } })
      .then(user => {
        if (user) {
          errorMessages.push({ message: '此 Email 已有人使用' })
          res.render('register', { name, email, css: ['register.css'], errorMessages: errorMessages })
        } else {
          const newUser = new User({
            userName: req.body.name,
            email: req.body.email,
            password: req.body.password
          })
          newUser
            .save()
            .then(user => {
              req.flash('success_msg', '註冊成功，請登入')
              res.redirect('/users/login')
            })
            .catch(err => console.log(err))
        }
      })
  }
})

// log out
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '成功登出')
  res.redirect('/users/login')
})

module.exports = router