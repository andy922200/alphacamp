const mongoose = require('mongoose')
const Restaurant = require('../restaurant')

// connect with database
mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('db error')
})
db.once('open', () => {
  console.log('db connected!')
  for (let i = 0; i < 10; i++) {
    Restaurant.create({
      id: i, name: 'name' + i, name_en: 'name_en' + i, category: 'category' + i, image: 'https://picsum.photos/id/' + (i + 1) + '/200/200', location: 'location' + i, phone: 'phone' + i, google_map: 'google_map' + i, rating: 3, description: 'description' + i
    })
    console.log('done')
  }
})