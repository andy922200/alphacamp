// models/seeds/seeder.js
const mongoose = require('mongoose')
const Record = require('../record')
const User = require('../user')
const bcrypt = require('bcryptjs')

//connect with database
mongoose.connect('mongodb://localhost/record', { useNewUrlParser: true, useCreateIndex: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('db error!')
})
db.once('open', () => {
  console.log('db connected!')
  let users = [{ name: 'Andy', email: 'user1@example.com', password: '12345678' }, { name: 'Wendy', email: 'user2@example.com', password: '12345678' }]
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
            GenerateRecord(index, user)
          })
      })
    })
  }

  function GenerateRecord(index, user) {
    for (let i = 3 * index + 1; i <= 3 * (index + 1); i++) {
      Record.create({
        name: 'Title' + i,
        category: '家居物業',
        date: new Date(),
        amount: 1000 + i * 10,
        userID: user._id
      })
    }
    console.log('seed data ' + (index + 1) + ' is generated!')
  }
})

