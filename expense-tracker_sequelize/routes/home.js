// routes/home.js
// initialize router
const express = require('express')
const router = express.Router()
const monthList = require('../public/data/data.json').month
const categoryList = require('../public/data/data.json').category

// load model

// load auth middleware
//const { authenticated } = require('../config/auth')

router.get('/', (req, res) => {
  res.send('Hello World!')
})

module.exports = router