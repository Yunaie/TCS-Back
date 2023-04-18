const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  markdown : {
    type : String,
    required : true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  histoire : {
    type : Schema.Types.ObjectId,
    ref : 'histoire'
  }
})

module.exports = mongoose.model('article', articleSchema)
