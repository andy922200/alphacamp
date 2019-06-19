// initialize router
const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant.js')

// index router
router.get('/', (req, res) => {
  Restaurant.find((err, restaurants) => {
    if (err) return console.error(err)
    return res.render('index', { css: ['index.css'], restaurant: restaurants })
  })
})

//將結果能讓其他程序存取!
module.exports = router