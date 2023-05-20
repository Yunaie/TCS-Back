const mongoose = require('mongoose')

const commentaireSchema = new mongoose.Schema({
  commentaire: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  article : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article'
  }
})

module.exports = mongoose.model('Commentaire', commentaireSchema)
