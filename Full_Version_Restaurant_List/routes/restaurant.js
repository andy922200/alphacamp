// initialize router
const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant.js')
const { authenticated } = require('../config/auth')
// initialize express-validator
const { check, validationResult } = require('express-validator')
const { restaurantFormCheck, registerFormCheck } = require('../models/validationRule')

// specific add page
router.get('/new', authenticated, (req, res) => {
  return res.render('new', { css: ['edit.css'] })
})

// create a new restaurant and check by validator
router.post('/', authenticated, restaurantFormCheck, (req, res) => {
  const errors = validationResult(req)
  const restaurant = Restaurant({
    name: req.body.inputZhName,
    name_en: req.body.inputEnName,
    category: req.body.inputCategory,
    image: req.body.inputImageURL,
    location: req.body.inputAddress,
    phone: req.body.inputPhone,
    google_map: req.body.inputGoogleMapURL,
    rating: req.body.inputRating,
    description: req.body.inputDescription,
    userID: req.user._id
  })
  if (!errors.isEmpty()) {
    let errorMessages = []
    console.log(errors)
    //console.log(errors.array()[0]['msg'])
    for (let i = 0; i < errors.array().length; i++) {
      errorMessages.push({ message: errors.array()[i]['msg'] })
      //console.log(errorMessages)
    }
    res.render('new', { css: ['edit.css'], errorMessages: errorMessages })
  } else {
    restaurant.save(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  }
})

// search restaurants & filter
function display(res, err, restaurants) {
  if (err) return console.error(err)
  return res.render('index', { css: ['index.css'], restaurant: restaurants })
}

router.get('/search', authenticated, (req, res) => {
  let keyword = new RegExp(req.query.keyword, 'i')
  Restaurant.find({ userID: req.user._id, "$or": [{ "name": keyword }, { "category": keyword }, { "description": keyword }] }, (err, restaurants) => {
    display(res, err, restaurants)
  })
})

// filter
router.get('/filter', authenticated, (req, res) => {
  switch (req._parsedOriginalUrl.query) {
    case 'atoz':
      Restaurant.find({ userID: req.user._id }, (err, restaurants) => {
        display(res, err, restaurants)
      }).sort({ name_en: 1 })
      break
    case 'ztoa':
      Restaurant.find({ userID: req.user._id }, (err, restaurants) => {
        display(res, err, restaurants)
      }).sort({ name_en: -1 })
      break
    case 'category':
      Restaurant.find({ userID: req.user._id, "$or": [{ "category": "中東料理" }, { "category": "日式料理" }, { "category": "義式料理" }, { "category": "美式料理" }, { "category": "酒吧" }, { "category": "咖啡" }, { "category": "中式料理" }, { "category": "韓式料理" }] }, (err, restaurants) => {
        display(res, err, restaurants)
      }).sort({ category: 1 })
      break
    case 'rating':
      Restaurant.find({ userID: req.user._id }, (err, restaurants) => {
        display(res, err, restaurants)
      }).sort({ rating: -1 })
  }
})

// display a restaurant
router.get('/:id', authenticated, (req, res) => {
  Restaurant.findById({ _id: req.params.id, userId: req.user._id }, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('detail', { css: ['detail.css'], restaurant: restaurant })
  })
})

// specific modification page
router.get('/:id/edit', authenticated, (req, res) => {
  Restaurant.findById({ _id: req.params.id, userId: req.user._id }, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('edit', { css: ['edit.css'], restaurant: restaurant })
  })
})

// modify a restaurant and check by validator
router.put('/:id', authenticated, restaurantFormCheck, (req, res) => {
  //console.log(req.body.inputCategory)
  const errors = validationResult(req)
  Restaurant.findById({ _id: req.params.id, userId: req.user._id }, (err, restaurant) => {
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

    if (!errors.isEmpty()) {
      let errorMessages = []
      //console.log(errors.array()[0]['msg'])
      for (let i = 0; i < errors.array().length; i++) {
        errorMessages.push({ message: errors.array()[i]['msg'] })
        //console.log(errorMessages)
      }
      res.render('edit', { css: ['edit.css'], restaurant: restaurant, errorMessages: errorMessages })
    } else {
      restaurant.save(err => {
        if (err) return console.error(err)
        return res.redirect(`/restaurants/${req.params.id}`)
      })
    }
  })
})

// delete a restaurant
router.delete('/:id/delete', authenticated, (req, res) => {
  //console.log(req.params.id)
  Restaurant.findById({ _id: req.params.id, userId: req.user._id }, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

//記得要回傳
module.exports = router