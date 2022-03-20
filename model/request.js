const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  _id: { type: String },
  key: { type: String },
  createdAt: { type: Date },
  value: { type: String },
  counts: [Number]
});

module.exports = mongoose.model('record', requestSchema);
