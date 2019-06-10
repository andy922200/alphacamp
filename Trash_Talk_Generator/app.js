//initialize
const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const generateTrashTalk = require('./generate_trash_talk')
const port = 3000

// template engine setting
app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// static file & body-parser setting
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

// express Listener
app.listen(port, () => {
  console.log(`Express is listening on localhost ${port}`)
})

// routes setting
app.get('/', (req, res) => {
  res.render('index', { css: ['index.css'] })
})

app.post('/', (req, res) => {
  const option = Object.keys(req.body)
  const trashTalk = generateTrashTalk(option)
  let status = Object.values(req.body)
  let check1 = false
  let check2 = false
  let check3 = false
  if ((status[0] === 'on') && (option[0] === 'developer')) {
    check1 = true
  } else if ((status[0] === 'on') && (option[0] === 'designer')) {
    check2 = true
  } else if ((status[0] === 'on') && (option[0] === 'entrepreneur')) {
    check3 = true
  }
  if (option.length >= 2) {
    check1 = false
    check2 = false
    check3 = false
  }
  res.render('index', { css: ['index.css'], trashTalk: trashTalk, check1: check1, check2: check2, check3: check3 })
})