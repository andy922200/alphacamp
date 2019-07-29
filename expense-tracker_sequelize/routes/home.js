// routes/home.js
// initialize router
const express = require('express')
const router = express.Router()
const monthList = require('../public/data/data.json').month
const categoryList = require('../public/data/data.json').category

// load model
const db = require('../models')
const Op = require('sequelize').Op
const Record = db.Record
const User = db.User

// load auth middleware
const { authenticated } = require('../config/auth')

router.get('/', authenticated, (req, res) => {
  let monthNumber = req.query.month
  let query1 = ''
  let query2 = req.query.category || ''
  let zh_twCategory = ''
  if (!req.query.month) {
    query1 = ''
  } else {
    query1 = monthNumber
  }
  if (categoryList[query2] === undefined) {
    zh_twCategory = ''
  } else {
    zh_twCategory = categoryList[query2]['Name_zh_tw']
  }

  if ((!query1) && (!query2)) {
    User.findByPk(req.user.id)
      .then((user) => {
        if (!user) throw new Error("user is nor found.")
        return Record.findAll({
          where: {
            UserId: req.user.id
          }
        })
      })
      .then((records) => {
        calculateTotal(req, res, records, monthNumber, query2, monthList, categoryList, zh_twCategory)
      })
  }

  if ((query1 === '') && (query2)) {
    User.findByPk(req.user.id)
      .then((user) => {
        if (!user) throw new Error("user is nor found.")
        return Record.findAll({
          where: {
            UserId: req.user.id,
            category: query2
          }
        })
      })
      .then((records) => {
        calculateTotal(req, res, records, monthNumber, query2, monthList, categoryList, zh_twCategory)
      })
  }

  if ((query1) && (query2 === '')) {
    User.findByPk(req.user.id)
      .then((user) => {
        if (!user) throw new Error("user is nor found.")
        return Record.findAll({
          where: {
            UserId: req.user.id,
            date: { [Op.like]: '%-' + monthNumber + '-%' }
          }
        })
      })
      .then((records) => {
        calculateTotal(req, res, records, monthNumber, query2, monthList, categoryList, zh_twCategory)
      })
  }

  if ((query1) && (query2)) {
    User.findByPk(req.user.id)
      .then((user) => {
        if (!user) throw new Error("user is nor found.")
        return Record.findAll({
          where: {
            UserId: req.user.id,
            date: { [Op.like]: '%-' + monthNumber + '-%' },
            category: query2
          }
        })
      })
      .then((records) => {
        calculateTotal(req, res, records, monthNumber, query2, monthList, categoryList, zh_twCategory)
      })
  }

})

function calculateTotal(req, res, records, monthNumber, query2, monthList, categoryList, zh_twCategory) {
  let totalAmount = 0
  for (let i = 0; i < records.length; i++) {
    totalAmount += records.map(item => Object.values(item))[i][0].amount
  }
  return res.render('index', { css: ['index.css'], record: records, totalAmount: totalAmount, monthNumber: monthNumber, query2: query2, monthList: monthList, categoryList: categoryList, zh_twCategory: zh_twCategory })
}

module.exports = router