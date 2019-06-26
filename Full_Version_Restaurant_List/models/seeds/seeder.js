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
  let name = ''
  let email = 'user1@example.com'
  let password = '12345678'
  let newUser1 = new User({ name, email, password })
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser1.password, salt, (err, hash) => {
      if (err) throw err
      newUser1.password = hash
      newUser1
        .save()
        .catch(err => console.log(err))
    })
  })
  for (let i = 1; i <= 3; i++) {
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
      userID: newUser1._id
    })
    console.log('done')
  }

  email = 'user2@example.com'
  password = '12345678'
  let newUser2 = new User({ name, email, password })
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser2.password, salt, (err, hash) => {
      if (err) throw err
      newUser2.password = hash
      newUser2
        .save()
        .catch(err => console.log(err))
    })
  })

  for (let i = 4; i <= 6; i++) {
    Restaurant.create({
      name: 'name' + i,
      name_en: 'name_en' + i,
      category: '咖啡',
      image: 'https://picsum.photos/id/' + i + '/200/200.jpg',
      location: 'location' + i,
      phone: '02-2837463' + i,
      google_map: 'https://goo.gl/maps/' + i,
      rating: i - 1,
      description: 'description' + i,
      userID: newUser2._id
    })
    console.log('done')
  }
})
