// routes/home.js
// initialize router
const express = require('express')
const router = express.Router()
const monthList = require('../public/data/data.json').month
const categoryList = require('../public/data/data.json').category

// load model
const db = require('../models')
const Record = db.Record
const User = db.User

// load auth middleware
const { authenticated } = require('../config/auth')

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
  User.findByPk(req.user.id)
    .then((user) => {
      if (!user) throw new Error("user is nor found.")
      return Record.findAll({
        where: { UserId: req.user.id }
      })
    })
    .then((records) => {
      let totalAmount = 0
      return res.render('index', { css: ['index.css'], record: records, totalAmount: totalAmount, monthNumber: monthNumber, query2: query2, monthList: monthList, categoryList: categoryList, zh_twCategory: zh_twCategory })
    })

})

module.exports = router