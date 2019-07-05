// initialize router
const express = require('express')
const router = express.Router()
const Record = require('../models/record')
// initialize express-validator
const { check, validationResult } = require('express-validator')
const { recordFormCheck } = require('../models/validationRule')

// specific add page
router.get('/new', (req, res) => {
  return res.render('new', { css: ['edit.css'] })
})
// create a new record and check by validator
router.post('/', recordFormCheck, (req, res) => {
  const errors = validationResult(req)
  const record = Record({
    name: req.body.contentName,
    category: req.body.category,
    date: req.body.date,
    amount: req.body.amount,
    //userID: req.user._id
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
function display(res, err, records) {
  let result = records.map(item => Object.values(item)[3].amount)
  let totalAmount = 0
  for (let i = 0; i < result.length; i++) {
    totalAmount += result[i]
  }
  if (err) return console.log(err)
  return res.render('index', { css: ['index.css'], record: records, totalAmount: totalAmount })
}

router.get('/filter', (req, res) => {
  switch (req._parsedOriginalUrl.query) {
    case 'Jan':
      Record.find({ "date": { $regex: /^\d{4}-01-*/ } }, (err, records) => {
        display(res, err, records)
      }).sort({ date: -1 })
      break
    case 'Feb':
      Record.find({ "date": { $regex: /^\d{4}-02-*/ } }, (err, records) => {
        display(res, err, records)
      }).sort({ date: -1 })
      break
    case 'Mar':
      Record.find({ "date": { $regex: /^\d{4}-03-*/ } }, (err, records) => {
        display(res, err, records)
      }).sort({ date: -1 })
      break
    case 'Apr':
      Record.find({ "date": { $regex: /^\d{4}-04-*/ } }, (err, records) => {
        display(res, err, records)
      }).sort({ date: -1 })
      break
    case 'May':
      Record.find({ "date": { $regex: /^\d{4}-05-*/ } }, (err, records) => {
        display(res, err, records)
      }).sort({ date: -1 })
      break
    case 'Jun':
      Record.find({ "date": { $regex: /^\d{4}-06-*/ } }, (err, records) => {
        display(res, err, records)
      }).sort({ date: -1 })
      break
    case 'Jul':
      Record.find({ "date": { $regex: /^\d{4}-07-*/ } }, (err, records) => {
        display(res, err, records)
      }).sort({ date: -1 })
      break
    case 'Aug':
      Record.find({ "date": { $regex: /^\d{4}-08-*/ } }, (err, records) => {
        display(res, err, records)
      }).sort({ date: -1 })
      break
    case 'Sep':
      Record.find({ "date": { $regex: /^\d{4}-09-*/ } }, (err, records) => {
        display(res, err, records)
      }).sort({ date: -1 })
      break
    case 'Oct':
      Record.find({ "date": { $regex: /^\d{4}-10-*/ } }, (err, records) => {
        display(res, err, records)
      }).sort({ date: -1 })
      break
    case 'Nov':
      Record.find({ "date": { $regex: /^\d{4}-11-*/ } }, (err, records) => {
        display(res, err, records)
      }).sort({ date: -1 })
      break
    case 'Dec':
      Record.find({ "date": { $regex: /^\d{4}-12-*/ } }, (err, records) => {
        display(res, err, records)
      }).sort({ date: -1 })
      break
    case 'home':
      Record.find({ "category": "家居物業" }, (err, records) => {
        display(res, err, records)
      }).sort({ date: -1 })
      break
    case 'transport':
      Record.find({ "category": "交通出行" }, (err, records) => {
        display(res, err, records)
      }).sort({ date: -1 })
      break
    case 'entertain':
      Record.find({ "category": "休閒娛樂" }, (err, records) => {
        display(res, err, records)
      }).sort({ date: -1 })
      break
    case 'food':
      Record.find({ "category": "餐飲食品" }, (err, records) => {
        display(res, err, records)
      }).sort({ date: -1 })
      break
    case 'other':
      Record.find({ "category": "其他" }, (err, records) => {
        display(res, err, records)
      }).sort({ date: -1 })
      break
  }
})

// specific modification page

// modify a record and check by validator

// delete a record
router.delete('/:id', (req, res) => {
  Record.findById({ _id: req.params.id }, (err, record) => {
    if (err) return console.error(err)
    record.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

module.exports = router