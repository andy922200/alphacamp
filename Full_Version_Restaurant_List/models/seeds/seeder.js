const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const User = require('../user')
const bcrypt = require('bcryptjs')

// connect with database
mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useCreateIndex: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('db error')
})
db.once('open', () => {
  console.log('db connected!')
  let users = [{ name: '', email: 'user1@example.com', password: '12345678' }, { name: '', email: 'user2@example.com', password: '12345678' }]
  users.forEach((user, index) => {
    name = user.name
    email = user.email
    password = user.password
    GenerateUser(name, email, password, index)
  })


  function GenerateUser(name, email, password, index) {
    let newUser = new User({ name, email, password })
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err
        newUser.password = hash
        newUser
          .save((err, user) => {
            GenerateRestaurant(index, user)
          })
      })
    })
  }

  function GenerateRestaurant(index, user) {
    for (let i = 3 * index + 1; i <= 3 * (index + 1); i++) {
      Restaurant.create({
        name: 'name' + i,
        name_en: 'name_en' + i,
        category: '咖啡',
        image: 'https://picsum.photos/id/' + i + '/200/200.jpg',
        location: 'location' + i,
        phone: '02-2837463' + i,
        google_map: 'https://goo.gl/maps/' + i,
        rating: i,
        description: 'description' + i,
        userID: user._id
      })
    }
    console.log('seed data ' + (index + 1) + ' is generated!')
  }
})
