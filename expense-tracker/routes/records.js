// initialize router
const express = require('express')
const router = express.Router()
const Record = require('../models/record')

// specific add page

// create a new record and check by validator

// filter

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