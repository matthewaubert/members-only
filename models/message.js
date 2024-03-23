const mongoose = require('mongoose');
const { Schema } = mongoose;

const MessageSchema = new Schema({
  title: { type: String, required: true, maxLength: 100 },
  text: { type: String, required: true },
  timestamp: { type: Date, required: true, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Message', MessageSchema);
