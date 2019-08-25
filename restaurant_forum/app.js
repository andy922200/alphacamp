const express = require('express')
const expressHandlebars = require('express-handlebars')
const app = express()
const port = 3000

// load SQL database
const db = require('./models')

// initialize template engine
app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// initialize routes settings
require('./routes')(app)


// initialize app listener
app.listen(port, () => {
  db.sequelize.sync()
  console.log(`The app is listening on port ${port}`)
})