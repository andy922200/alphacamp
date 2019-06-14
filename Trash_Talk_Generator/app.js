//initialize
const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const generateTrashTalk = require('./generate_trash_talk')
const handlebarsHelper = require('./handlebarsHelper')
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
  const job = Object.keys(req.body)
  const trashTalk = generateTrashTalk(job)
  res.render('index', { css: ['index.css'], trashTalk: trashTalk, job: job })
})