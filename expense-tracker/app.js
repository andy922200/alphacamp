const express = require('express')
const handlebars = require('express-handlebars')
const handlebarsHelper = require('../expense-tracker/public/javascripts/handlebarsHelper')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
//const flash = require('connect-flash')
const app = express()
const port = 3000

//express Listener
app.listen(port, () => {
  console.log(`Express is listening on localhost ${port}`)
})

// connect with database
mongoose.connect('mongodb://localhost/record', { useNewUrlParser: true, useCreateIndex: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})
// load record model
const Record = require('./models/record')

//template engine setting
app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//load static files
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// initialize express-session and then flash 
app.use(session({
  secret: 'qwertyuiop',
  resave: 'false',
  saveUninitialized: 'false'
}))
//app.use(flash())

// initialize Passport
app.use(passport.initialize())
app.use(passport.session())
//require('./config/passport')(passport)

// add local variables

//production mode or development mode

// load router settings
app.use('/', require('./routes/home'))
app.use('/records', require('./routes/records'))