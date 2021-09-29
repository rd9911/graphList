const mongoose = require('mongoose')
require('dotenv').config()

const uri = process.env.MONGO_URI

const authorSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
      minlength: 4
    },
    born: {
      type: Number,
    },
  })

module.exports = mongoose.model('Author', authorSchema)