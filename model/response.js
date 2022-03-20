const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  _id: { type: String },
  key: { type: String },
  createdAt: { type: Date },
  value: { type: String },
  counts: [Number]
});

const responseSchema = new mongoose.Schema({
  code: Number,
  msg: String,
  records: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'requestSchema'
  }]
});

module.exports = mongoose.model('record', responseSchema);
