// initialize router
const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant.js')

// index router
router.get('/', (req, res) => {
  return res.render('index', { css: ['index.css'] })
})

//將結果能讓其他程序存取!
module.exports = router