// app.js
const express = require('express')
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const logger = require('./logger')
const app = express()
const port = 3000

// express Listener
app.listen(port, () => {
  console.log(`App is running at ${port}!`)
})

// template engine setting
app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// load static files
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(logger)

// load router settings
// 列出全部 Todo
app.get('/', (req, res) => {
  res.send('列出全部 Todo')
})

// 新增一筆 Todo 頁面
app.get('/new', (req, res) => {
  res.render('index')
})

// 顯示一筆 Todo 的詳細內容
app.get('/:id', (req, res) => {
  res.render('detail')
})

// 新增一筆 Todo
app.post('/', (req, res) => {
  res.send('新增一筆 Todo')
})

// 刪除一筆 Todo
app.delete('/:id/delete', (req, res) => {
  res.send('刪除 Todo')
})
