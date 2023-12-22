const mongoose = require('mongoose')

const schema =  new mongoose.Schema({
  message: { type: String, required: true },
  sender: { type: String, required: true },

  chatroomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chatroom', required: true },
}, { timestamps: true })

const Chat = mongoose.models.Chat || mongoose.model('Chat', schema)
module.exports = Chat
