// app.js
const express = require('express')
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
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


//Unix時間轉換器
function unixChange() {
  timeData = Date.now()
  let date = new Date(timeData);
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate();
  // Hours part from the timestamp
  let hours = date.getHours(); // 根據所在地時區顯示
  // Minutes part from the timestamp
  let minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp
  let seconds = "0" + date.getSeconds();
  // Will display time in format
  let formattedTime = year + "-" + month + '-' + day + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)
  return formattedTime
}

// execution 計時器
function executionTimer(hrstart) {
  var hrend = process.hrtime(hrstart)
  duringTime = hrend[0] * 1000 + hrend[1] / 1000000
  return duringTime.toFixed(3)
}

// load router settings
// 列出全部 Todo
app.get('/', (req, res) => {
  var hrstart = process.hrtime()
  console.log(unixChange() + ' | ' + req.originalMethod + ' from ' + req.route.path)
  console.log(executionTimer(hrstart) + 'ms')
  res.send('列出全部 Todo')
})

// 新增一筆 Todo 頁面
app.get('/new', (req, res) => {
  var hrstart = process.hrtime()
  console.log(unixChange() + ' | ' + req.originalMethod + ' from ' + req.route.path)
  console.log(executionTimer(hrstart) + 'ms')
  res.render('index')
})

// 顯示一筆 Todo 的詳細內容
app.get('/:id', (req, res) => {
  var hrstart = process.hrtime()
  console.log(unixChange() + ' | ' + req.originalMethod + ' from ' + req.route.path)
  console.log(executionTimer(hrstart) + 'ms')
  res.render('detail')
})

// 新增一筆 Todo
app.post('/', (req, res) => {
  var hrstart = process.hrtime()
  console.log(unixChange() + ' | ' + req.originalMethod + ' from ' + req.route.path)
  console.log(executionTimer(hrstart) + 'ms')
  res.send('新增一筆 Todo')
})

// 刪除一筆 Todo
app.delete('/:id/delete', (req, res) => {
  var hrstart = process.hrtime()
  console.log(unixChange() + ' | ' + req.originalMethod + ' from ' + req.route.path)
  console.log(executionTimer(hrstart) + 'ms')
  res.send('刪除 Todo')
})
