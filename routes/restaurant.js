// initialize router
const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant.js')

// display a detail
router.get('/:id', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('detail', { css: ['detail.css'], restaurant: restaurant })
  })
})

//記得要回傳
module.exports = router