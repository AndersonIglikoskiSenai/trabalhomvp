const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
    trim: true,
  },
  sentAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Message', messageSchema);