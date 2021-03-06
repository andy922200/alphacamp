// routes/user.js
const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')

// initialize express-validator
const { check, validationResult } = require('express-validator')
const { restaurantFormCheck, registerFormCheck } = require('../models/validationRule')

// log in page
router.get('/login', (req, res) => {
  res.render('login', { css: ['login.css'] })
})

// log in check
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
  res.render('register', { css: ['register.css'] })
})

// register check
router.post('/register', registerFormCheck, (req, res) => {
  const { name, email, password, password2 } = req.body
  const errors = validationResult(req)
  let errorMessages = []
  User.findOne({ email: email }).then(user => {
    if (user) {
      errorMessages.push({ message: '此 Email 已有人使用' })
      res.render('register', { name, email, css: ['register.css'], errorMessages: errorMessages })
    } else if (password !== password2) {
      errorMessages.push({ message: '密碼輸入不一致，請再次輸入' })
      res.render('register', { name, email, css: ['register.css'], errorMessages: errorMessages })
    } else if (!errors.isEmpty()) {
      //console.log(errors.array()[0]['msg'])
      for (let i = 0; i < errors.array().length; i++) {
        errorMessages.push({ message: errors.array()[i]['msg'] })
        //console.log(errorMessages)
      }
      res.render('register', { name, email, css: ['register.css'], errorMessages: errorMessages })
    } else {
      const newUser = new User({ name, email, password })
      //use bcrypt to form 'hash password'
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err
          newUser.password = hash
          newUser
            .save()
            .then(user => {
              req.flash('success_msg', '註冊成功，請登入')
              res.redirect('/users/login')
            })
            .catch(err => console.log(err))
        })
      })
    }
  })
})

// log out
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '成功登出')
  res.redirect('/users/login')
})


module.exports = router