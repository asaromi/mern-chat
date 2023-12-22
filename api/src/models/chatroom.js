const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  members: [{ type: String }],
  is_active: { type: Boolean, default: true },
}, { timestamps: true })

const Chatroom = mongoose.models.Chatroom || mongoose.model('Chatroom', schema)
module.exports = Chatroom
