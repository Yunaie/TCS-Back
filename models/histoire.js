const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const histoireSchema = new mongoose.Schema({
    pays: {
        type: String,
        required: true
    },
    niveau_gore: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true,
        match: /^\d{1,2}-\d{1,2}-\d{2,4}$/ // permet d'accepter le format jj-mm-aaaa, jj-m-aaaa, j-m-aa, etc.
    },
    type: {
        type: String,
        required: true
    },
    criminel : [{
        type : Schema.Types.ObjectId,
        ref : 'criminel'
      }],
      victime : [{
        type : Schema.Types.ObjectId,
        ref : 'victime'
      }]

})

module.exports = mongoose.model('histoire', histoireSchema)
