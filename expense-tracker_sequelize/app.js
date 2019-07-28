// app.js
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')
const app = express()
const port = 3000

// express Listener
app.listen(process.env.PORT || port, () => {
  console.log(`App is running!`)
})

//production mode or development mode
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// connect with database

// load model

// template engine setting
app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// load static files
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// initialize express-session and then flash 
app.use(session({
  secret: 'qwertyuiop',
  resave: 'false',
  saveUninitialized: 'false'
}))
app.use(flash())

// initialize Passport
app.use(passport.initialize())
app.use(passport.session())
//require('./config/passport')(passport)

// add local variables
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

// load router settings
app.use('/', require('./routes/home'))
//app.use('/records', require('./routes/records'))
//app.use('/users', require('./routes/user'))
//app.use('/auth', require('./routes/authsFB'))
//app.use('/auth', require('./routes/authsGoogle'))
//app.use('/auth', require('./routes/authsGithub'))