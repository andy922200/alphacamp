const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const app = express()
const port = 3000

// connect with database
mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})
// load restaurant model
const Todo = require('./models/restaurant')

// express Listener
app.listen(port, () => {
  console.log(`Express is listening on localhost ${port}`)
})

// template engine setting
app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// static file & related function initialize
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// load router settings
app.use('/', require('./routes/home'))
//app.use('/todos', require('./routes/todo'))