const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash') // express-session is required
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
const Restaurant = require('./models/restaurant')

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
// start express-session
app.use(session({
  secret: 'asdfghjkl'
}))
app.use(flash())
//start Passport
app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')(passport)

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
app.use('/restaurants', require('./routes/restaurant')) //前為網址，後為 Router
app.use('/users', require('./routes/user'))