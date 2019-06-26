// initialize router
const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant.js')
const { authenticated } = require('../config/auth')

// index router
router.get('/', authenticated, (req, res) => {
  Restaurant.find({ userID: req.user._id }, (err, restaurants) => {
    if (err) return console.error(err)
    return res.render('index', { css: ['index.css'], restaurant: restaurants })
  })
})

//將結果能讓其他程序存取!
module.exports = router