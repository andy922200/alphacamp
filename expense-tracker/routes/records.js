// initialize router
const express = require('express')
const router = express.Router()
const Record = require('../models/record')

// specific add page

// create a new record and check by validator


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
  //console.log(req._parsedOriginalUrl.query)
  switch (req._parsedOriginalUrl.query) {
    case 'Jan':
      Record.find({ "date": { $regex: /\d{4}\/1\/*/ } }, (err, records) => {
        display(res, err, records)
      })
      break
    case 'Feb':
      Record.find({ "date": { $regex: /\d{4}\/2\/*/ } }, (err, records) => {
        display(res, err, records)
      })
      break
    case 'Mar':
      Record.find({ "date": { $regex: /\d{4}\/3\/*/ } }, (err, records) => {
        display(res, err, records)
      })
      break
    case 'Apr':
      Record.find({ "date": { $regex: /\d{4}\/4\/*/ } }, (err, records) => {
        display(res, err, records)
      })
      break
    case 'May':
      Record.find({ "date": { $regex: /\d{4}\/5\/*/ } }, (err, records) => {
        display(res, err, records)
      })
      break
    case 'Jun':
      Record.find({ "date": { $regex: /\d{4}\/6\/*/ } }, (err, records) => {
        display(res, err, records)
      })
      break
    case 'Jul':
      Record.find({ "date": { $regex: /\d{4}\/7\/*/ } }, (err, records) => {
        display(res, err, records)
      })
      break
    case 'Aug':
      Record.find({ "date": { $regex: /\d{4}\/8\/*/ } }, (err, records) => {
        display(res, err, records)
      })
      break
    case 'Sep':
      Record.find({ "date": { $regex: /\d{4}\/9\/*/ } }, (err, records) => {
        display(res, err, records)
      })
      break
    case 'Oct':
      Record.find({ "date": { $regex: /\d{4}\/10\/*/ } }, (err, records) => {
        display(res, err, records)
      })
      break
    case 'Nov':
      Record.find({ "date": { $regex: /\d{4}\/11\/*/ } }, (err, records) => {
        display(res, err, records)
      })
      break
    case 'Dec':
      Record.find({ "date": { $regex: /\d{4}\/12\/*/ } }, (err, records) => {
        display(res, err, records)
      })
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