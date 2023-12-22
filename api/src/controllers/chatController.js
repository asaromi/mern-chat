const Chat = require('../models/chat')
const { successResponse, errorResponse } = require('../helpers/response')

const sendChat = async (req, res) => {
  try {
    const {chatroomId, username: sender} = req.chatroom
    const {message} = req.body

    if (!message || !sender || !chatroomId) throw new Error('Missing required fields')

    const chat = await Chat.create({ message, sender, chatroomId })

    return successResponse(res)(200, chat)
  } catch (error) {
    return errorResponse(res)(500, error.message)
  }
}

module.exports = {sendChat}
