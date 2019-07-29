// routes/records.js
const express = require('express')
const router = express.Router()

// initialize express-validator
const { check, validationResult } = require('express-validator')
const { recordFormCheck } = require('../public/javascripts/validationRule')

// load database
const db = require('../models')
const Record = db.Record
const User = db.User

// load auth middleware
const { authenticated } = require('../config/auth')

// Add-a-record page
router.get('/new', authenticated, (req, res) => {
  return res.render('new', { css: ['edit.css'] })
})

// create a new record and check by validator
router.post('/', authenticated, recordFormCheck, (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    let errorMessages = []
    for (let i = 0; i < errors.array().length; i++) {
      errorMessages.push({ message: errors.array()[i]['msg'] })
    }
    res.render('new', { css: ['edit.css'], errorMessages: errorMessages })
  } else {
    Record.create({
      name: req.body.contentName,
      category: req.body.category,
      date: req.body.date,
      amount: req.body.amount,
      UserId: req.user.id
    })
      .then((record) => {
        return res.redirect('/')
      })
      .catch((err) => {
        return res.status(422).json(err)
      })
  }
})

// modify specific-record page 
router.get('/:id/edit', authenticated, (req, res) => {
  User.findByPk(req.user.id)
    .then((user) => {
      if (!user) throw new Error("user is not found.")
      return Record.findOne({
        where: {
          Id: req.params.id,
          UserId: req.user.id
        }
      })
    })
    .then((record) => {
      return res.render('edit', { css: ['edit.css'], record: record })
    })
})

// modify specific record
router.put('/:id', authenticated, recordFormCheck, (req, res) => {
  const errors = validationResult(req)
  Record.findOne({
    where: {
      Id: req.params.id,
      UserId: req.user.id
    }
  })
    .then((record) => {
      record.name = req.body.contentName
      record.category = req.body.category
      record.date = req.body.date
      record.amount = req.body.amount
      if (!errors.isEmpty()) {
        let errorMessages = []
        for (let i = 0; i < errors.array().length; i++) {
          errorMessages.push({ message: errors.array()[i]['msg'] })
        }
        res.render('edit', { css: ['edit.css'], record: record, errorMessages: errorMessages })
      } else {
        record.save()
        return res.redirect(`/`)
      }
      return
    })
    .catch((error) => {
      return res.status(422).json(error)
    })

})

// delete specific record
router.delete('/:id', authenticated, (req, res) => {
  User.findByPk(req.user.id)
    .then((user) => {
      if (!user) throw new Error("user is not found")
      return Record.destroy({
        where: {
          UserId: req.user.id,
          Id: req.params.id
        }
      })
    })
    .then((record) => {
      return res.redirect(`/`)
    })
    .catch((error) => {
      return res.status(422).json(error)
    })
})

module.exports = router