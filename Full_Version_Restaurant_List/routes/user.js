// routes/user.js
const express = require('express')
const router = express.Router()

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
  res.send('register')
})

// log out
router.get('/logout', (req, res) => {
  res.send('logout')
})


module.exports = router