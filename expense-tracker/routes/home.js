// routes/home.js
// initialize router
const express = require('express')
const router = express.Router()
const Record = require('../models/record.js')
const { authenticated } = require('../config/auth')

// index router
router.get('/', authenticated, (req, res) => {
  Record.find({ userID: req.user._id }, (err, records) => {
    let result = records.map(item => Object.values(item)[3].amount)
    let totalAmount = 0
    for (let i = 0; i < result.length; i++) {
      totalAmount += result[i]
    }
    //console.log(records)
    if (err) return console.log(err)
    return res.render('index', { css: ['index.css'], record: records, totalAmount: totalAmount })
  })
})

module.exports = router