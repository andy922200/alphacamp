// routes/home.js
// initialize router
const express = require('express')
const router = express.Router()
const Record = require('../models/record.js')
const { authenticated } = require('../config/auth')
const categoryList = { 'home': '家居物業', 'transport': '交通出行', 'entertain': '休閒娛樂', 'food': '餐飲食品', 'other': '其他' }

// index router
router.get('/', authenticated, (req, res) => {
  let key1 = req.query.month
  let key2 = req.query.category || ''
  let query1 = ''
  let query2 = categoryList[key2]
  switch (key1) {
    case 'Jan':
      query1 = '^\\d{4}-' + '01' + '-*'
      break
    case 'Feb':
      query1 = '^\\d{4}-' + '02' + '-*'
      break
    case 'Mar':
      query1 = '^\\d{4}-' + '03' + '-*'
      break
    case 'Apr':
      query1 = '^\\d{4}-' + '04' + '-*'
      break
    case 'May':
      query1 = '^\\d{4}-' + '05' + '-*'
      break
    case 'Jun':
      query1 = '^\\d{4}-' + '06' + '-*'
      break
    case 'Jul':
      query1 = '^\\d{4}-' + '07' + '-*'
      break
    case 'Aug':
      query1 = '^\\d{4}-' + '08' + '-*'
      break
    case 'Sep':
      query1 = '^\\d{4}-' + '09' + '-*'
      break
    case 'Oct':
      query1 = '^\\d{4}-' + '10' + '-*'
      break
    case 'Nov':
      query1 = '^\\d{4}-' + '11' + '-*'
      break
    case 'Dec':
      query1 = '^\\d{4}-' + '12' + '-*'
      break
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
    return res.render('index', { css: ['index.css'], record: records, totalAmount: totalAmount, key1: key1, key2: key2 })
  })

})

module.exports = router