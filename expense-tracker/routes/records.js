// initialize router
const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const { authenticated } = require('../config/auth')
// initialize express-validator
const { check, validationResult } = require('express-validator')
const { recordFormCheck } = require('../models/validationRule')

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