//initialize
const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const generatePassword = require('./generate_password')
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
  const options = req.body
  const password = generatePassword(options)
  res.render('index', { css: ['index.css'], password: password, options: options })
})