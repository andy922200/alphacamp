// routes/records.js
const express = require('express')
const router = express.Router()

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

/* 顯示一筆 Todo 的詳細內容
router.get('/:id', authenticated, (req, res) => {
  res.send('顯示一筆 Todo')
})*/

// 新增一筆  Todo
router.post('/', authenticated, (req, res) => {
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
})

// 修改 Todo 頁面
router.get('/:id/edit', authenticated, (req, res) => {
  res.send('修改 Todo 頁面')
})

// 修改 Todo
router.put('/:id', authenticated, (req, res) => {
  res.send('修改 Todo')
})

// 刪除 Todo
router.delete('/:id/delete', authenticated, (req, res) => {
  res.send('刪除 Todo')
})

module.exports = router