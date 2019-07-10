// routes/home.js
// initialize router
const express = require('express')
const router = express.Router()
const Record = require('../models/record.js')
const { authenticated } = require('../config/auth')
const monthList = require('../public/data/data.json').month
const categoryList = require('../public/data/data.json').category

// index router
router.get('/', authenticated, (req, res) => {
  let monthNumber = req.query.month
  let query1 = ''
  let query2 = req.query.category
  let zh_twCategory = ''
  if (!req.query.month) {
    query1 = ''
  } else {
    query1 = '^\\d{4}-' + monthNumber + '-*'
  }
  if (categoryList[query2] === undefined) {
    zh_twCategory = ''
  } else {
    zh_twCategory = categoryList[query2]['Name_zh_tw']
  }
  Record.find({
    userID: req.user._id, date: new RegExp(query1), category: new RegExp(query2)
  }).sort({ date: -1 }).exec((err, records) => {
    let result = records.map(item => Object.values(item)[3].amount)
    let totalAmount = 0
    for (let i = 0; i < result.length; i++) {
      totalAmount += result[i]
    }
    if (err) return console.log(err)
    return res.render('index', { css: ['index.css'], record: records, totalAmount: totalAmount, monthNumber: monthNumber, query2: query2, monthList: monthList, categoryList: categoryList, zh_twCategory: zh_twCategory })
  })

})

module.exports = router