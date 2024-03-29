// models/record.js
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
  }
})

module.exports = mongoose.model('record', recordSchema)