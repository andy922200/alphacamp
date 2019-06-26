// routes/user.js
const express = require('express')
const router = express.Router()
const User = require('../models/user')

// log in page
router.get('/login', (req, res) => {
  res.render('login', { css: ['login.css'] })
})

// log in check
router.post('/login', (req, res) => {
  res.render('register')
})

// register page
router.get('/register', (req, res) => {
  res.render('register', { css: ['login.css'] })
})

// register check
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body
  User.findOne({ email: email }).then(user => {
    if (user) {
      console.log('User already exists')
      res.render('register', { name, email, password, password2, css: ['login.css'] })
    } else {
      const newUser = new User({ name, email, password })
      newUser
        .save()
        .then(user => {
          res.redirect('/')
        })
        .catch(err => console.log(err))
    }
  })
})

// log out
router.get('/logout', (req, res) => {
  res.send('logout')
})


module.exports = router