const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  date_of_birth: {
    type: String,
    required: true,
    match: /^\d{1,2}-\d{1,2}-\d{2,4}$/ // permet d'accepter le format jj-mm-aaaa, jj-m-aaaa, j-m-aa, etc.
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('users', usersSchema);
