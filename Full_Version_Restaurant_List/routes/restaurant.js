// initialize router
const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant.js')
// initialize express-validator
const { check, validationResult } = require('express-validator')

// validator array
const phonePattern = new RegExp("[0-9]{2}\-[0-9]{8}")
const imageURLPattern = new RegExp("(https?:\/\/.*?\.(?:png|jpe?g|gif)(.*))(\w|$)", "g")
const googleMapPattern = new RegExp("https://goo.gl/maps/[A-Za-z0-9]*", "g")
let conditions =
  [
    check('inputPhone')
      .exists()
      .isLength({ min: 10 })
      .withMessage('輸入區碼後請加入一個半型 - ，欄位至少要有 10 位數')
      .custom((value) => {
        if (phonePattern.test(value)) {
          return true
        } throw Error('Please check again!')
      }),
    check('inputRating')
      .exists()
      .isNumeric()
      .custom((value) => {
        if ((value >= 0) && (value <= 5)) {
          return true
        } throw new Error('Please check again!')
      }),
    check('inputImageURL')
      .exists()
      .custom((value) => {
        if (imageURLPattern.test(value)) {
          return true
        } throw new Error('Please check again!')
      }),
    check('inputGoogleMapURL')
      .exists()
      .custom((value) => {
        if (googleMapPattern.test(value)) {
          return true
        } throw Error('Please check again!')
      })
  ]

// specific add page
router.get('/new', (req, res) => {
  return res.render('new', { css: ['edit.css'] })
})

// create a new restaurant and check by validator
router.post('/', conditions, (req, res) => {
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
    description: req.body.inputDescription
  })
  if (!errors.isEmpty()) {
    res.render('new', { css: ['edit.css'] })
  } else {
    restaurant.save(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  }
})

// search restaurants
router.get('/search', (req, res) => {
  let keyword = new RegExp(req.query.keyword, 'i')
  let keywords = {
    $or: [{ "name": keyword }, { "category": keyword }, { "description": keyword }]
  }
  Restaurant.find(keywords, (err, restaurants) => {
    if (err) return console.error(err)
    return res.render('index', { css: ['index.css'], restaurant: restaurants })
  })
})

// filter
router.get('/filter', (req, res) => {
  console.log(req._parsedOriginalUrl.query)
  switch (req._parsedOriginalUrl.query) {
    case 'atoz':
      Restaurant.find((err, restaurants) => {
        if (err) return console.error(err)
        return res.render('index', { css: ['index.css'], restaurant: restaurants })
      }).sort({ name_en: 1 })
      break
    case 'ztoa':
      Restaurant.find((err, restaurants) => {
        if (err) return console.error(err)
        return res.render('index', { css: ['index.css'], restaurant: restaurants })
      }).sort({ name_en: -1 })
      break
    case 'category':
      let categories = {
        $or: [{ "category": "中東料理" }, { "category": "日式料理" }, { "category": "義式料理" }, { "category": "美式料理" }, { "category": "酒吧" }, { "category": "咖啡廳" }, { "category": "中式料理" }, { "category": "韓式料理" }]
      }
      Restaurant.find(categories, (err, restaurants) => {
        if (err) return console.error(err)
        return res.render('index', { css: ['index.css'], restaurant: restaurants })
      }).sort({ category: 1 })
      break
    case 'rating':
      Restaurant.find((err, restaurants) => {
        if (err) return console.error(err)
        return res.render('index', { css: ['index.css'], restaurant: restaurants })
      }).sort({ rating: -1 })
  }
})

// display a restaurant
router.get('/:id', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('detail', { css: ['detail.css'], restaurant: restaurant })
  })
})

// specific modification page
router.get('/:id/edit', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('edit', { css: ['edit.css'], restaurant: restaurant })
  })
})

// modify a restaurant and check by validator
router.put('/:id', conditions, (req, res) => {
  const errors = validationResult(req)
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

    if (!errors.isEmpty()) {
      console.log(errors)
      res.render('edit', { css: ['edit.css'], restaurant: restaurant })
    } else {
      restaurant.save(err => {
        if (err) return console.error(err)
        return res.redirect(`/restaurants/${req.params.id}`)
      })
    }
  })
})

// delete a restaurant
router.delete('/:id/delete', (req, res) => {
  //console.log(req.params.id)
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