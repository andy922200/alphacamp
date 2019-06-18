// initialize router
const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant.js')

// display a restaurant
router.get('/:id', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('detail', { css: ['detail.css'], restaurant: restaurant })
  })
})

// specific modification layout
router.get('/:id/edit', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('edit', { css: ['edit.css'], restaurant: restaurant })
  })
})

// modify a restaurant
router.put('/:id', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.name = req.body.inputZhName
    restaurant.name_en = req.body.inputEnName
    restaurant.category = req.body.inputCategory
    restaurant.image = req.body.inputImageURL
    restaurant.location = req.body.inputAddress
    restaurant.phone = req.body.inputPhone
    restaurant.google_map = req.body.inputGoogleMapURL
    restaurant.rating = req.body.inputRating
    restaurant.description = req.body.inputDescription
    restaurant.save(err => {
      if (err) return console.error(err)
      return res.redirect(`/restaurants/${req.params.id}`)
    })
  })
})

// delete a restaurant
router.delete('/:id/delete', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

//記得要回傳
module.exports = router