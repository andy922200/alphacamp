// initialize basic functions
const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const port = 3000

// template engine setting
app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// static files setting
app.use(express.static('public'))

// express listener
app.listen(port, () => {
  console.log(`Express is listening on localhost ${port}`)
})

// routes setting
app.get('/', (req, res) => {
  //res.send(`<h2>test</h2>`)
  res.render('index', { css: ['index.css'], restaurants: restaurantList.results })
})

app.get('/search', (req, res) => {
  let noResult = true
  const restaurants = restaurantList.results.filter(item => {
    return item.name.toLowerCase().includes(req.query.keyword.toLowerCase())
  })
  if (restaurants.length > 0) {
    noResult = false
    res.render('index', { css: ['index.css'], restaurants: restaurants, keyword: req.query.keyword, noResult: noResult })
  } else {
    res.render('index', { css: ['index.css'], noResult: noResult })
  }
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.filter(function (item) {
    return item.id === Number(req.params.restaurant_id)
  })
  res.render('show', { css: ['show.css'], restaurant: restaurant[0] })
})