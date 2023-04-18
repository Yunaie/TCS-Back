const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const commentaireSchema = new mongoose.Schema({
  commentaire: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  article : {
    type : Schema.Types.ObjectId,
    ref : 'article'
  }
})

module.exports = mongoose.model('article', articleSchema)
