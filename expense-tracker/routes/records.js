// initialize router
const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const { authenticated } = require('../config/auth')
// initialize express-validator
const { check, validationResult } = require('express-validator')
const { recordFormCheck } = require('../models/validationRule')
const categoryList = { 'home': '家居物業', 'transport': '交通出行', 'entertain': '休閒娛樂', 'food': '餐飲食品', 'other': '其他' }

// specific add page
router.get('/new', authenticated, (req, res) => {
  return res.render('new', { css: ['edit.css'] })
})
// create a new record and check by validator
router.post('/', authenticated, recordFormCheck, (req, res) => {
  const errors = validationResult(req)
  const record = Record({
    name: req.body.contentName,
    category: req.body.category,
    date: req.body.date,
    amount: req.body.amount,
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
    record.save(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  }
})

// filter
router.get('/filter', authenticated, (req, res) => {
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
    console.log(records)
    let result = records.map(item => Object.values(item)[3].amount)
    let totalAmount = 0
    for (let i = 0; i < result.length; i++) {
      totalAmount += result[i]
    }
    if (err) return console.log(err)
    return res.render('index', { css: ['index.css'], record: records, totalAmount: totalAmount, key1: key1, key2: key2 })
  })
})

// specific modification page
router.get('/:id/edit', authenticated, (req, res) => {
  Record.findById({ _id: req.params.id, userID: req.user._id }, (err, record) => {
    if (err) return console.error(err)
    return res.render('edit', { css: ['edit.css'], record: record })
  })
})

// modify a record and check by validator
router.put('/:id', authenticated, recordFormCheck, (req, res) => {
  const errors = validationResult(req)
  Record.findById({ _id: req.params.id, userID: req.user._id }, (err, record) => {

    if (err) return console.error(err)
    record.name = req.body.contentName
    record.category = req.body.category
    record.date = req.body.date
    record.amount = req.body.amount

    if (!errors.isEmpty()) {
      let errorMessages = []
      //console.log(errors.array()[0]['msg'])
      for (let i = 0; i < errors.array().length; i++) {
        errorMessages.push({ message: errors.array()[i]['msg'] })
      }
      res.render('edit', { css: ['edit.css'], record: record, errorMessages: errorMessages })
    } else {
      record.save(err => {
        if (err) return console.error(err)
        return res.redirect('/')
      })
    }
  })
})

// delete a record
router.delete('/:id', authenticated, (req, res) => {
  Record.findById({ _id: req.params.id }, (err, record) => {
    if (err) return console.error(err)
    record.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

module.exports = router