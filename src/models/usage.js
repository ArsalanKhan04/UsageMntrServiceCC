const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const usageSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  usage: {
    type: Number,
    required: true
  }
});

const Usage = model('Usage', usageSchema);

module.exports = Usage;
