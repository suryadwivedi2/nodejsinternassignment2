
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  Amount: {
    type: String,
    required: true
  },
  Category: {
    type: String,
    required: true
  },
  Date: {
    type: Date,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})


module.exports = mongoose.model('Transaction', transactionSchema);

