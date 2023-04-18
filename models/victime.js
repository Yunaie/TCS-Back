const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const victimeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  nationalite: {
    type: String,
    required: true
  },
  date_of_birth: {
    type: String,
    required: true,
    match: /^\d{1,2}-\d{1,2}-\d{2,4}$/ // permet d'accepter le format jj-mm-aaaa, jj-m-aaaa, j-m-aa, etc.
  },
  criminel : [{
    type : Schema.Types.ObjectId,
    ref : 'criminel'
  }]
  
});

module.exports = mongoose.model('victime', victimeSchema);
