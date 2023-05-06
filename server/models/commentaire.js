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
    ref : 'Article'
  }
})

module.exports = mongoose.model('Commentaire', articleSchema)
