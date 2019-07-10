// models/seeds/seeder.js
const mongoose = require('mongoose')
const Record = require('../record')
const User = require('../user')
const bcrypt = require('bcryptjs')

//connect with database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/record', { useNewUrlParser: true, useCreateIndex: true })
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
    let date = new Date()
    let formatDate = ''
    let year = date.getFullYear()
    let month = date.getMonth()
    let dateNumber = date.getDate()
    if (month <= 9) {
      month = '0' + month
    }
    if (dateNumber <= 9) {
      dateNumber = '0' + dateNumber
    }
    formatDate = year + '-' + month + '-' + dateNumber
    console.log(formatDate)
    for (let i = 3 * index + 1; i <= 3 * (index + 1); i++) {
      Record.create({
        name: 'Title' + i,
        category: 'home',
        date: formatDate,
        amount: 1000 + i * 10,
        userID: user._id
      })
    }
    console.log('seed data ' + (index + 1) + ' is generated!')
  }
})

