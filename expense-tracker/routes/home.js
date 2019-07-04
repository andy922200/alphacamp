// routes/home.js
// initialize router
const express = require('express')
const router = express.Router()
const Record = require('../models/record.js')

// index router
router.get('/', (req, res) => {
  Record.find((err, records) => {
    if (err) return console.log(error)
    return res.render('index', { css: ['index.css'], records: records })
  })
})

module.exports = router