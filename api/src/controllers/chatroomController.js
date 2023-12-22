const Chat = require('../models/chat')
const Chatroom = require('../models/chatroom')
const { successResponse, errorResponse } = require('../helpers/response')
const { generateToken } = require('../helpers/jwt')

const detectActiveChatrooms = async (req, res) => {
  try {
    const chatrooms = await Chatroom.find({ is_active: true })

    return successResponse(res)(200, chatrooms)
  } catch (error) {
    return errorResponse(res)(500, error.message)
  }
}

const joinChatroom = async (req, res) => {
  try {
    const { params: {code}, query: {username} } = req

    if (!code || !username) throw new Error('Missing required fields')

    let chatroom = await Chatroom.findOneAndUpdate(
      { code },
      { $push: { members: username }, is_active: true },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    const messages = await Chat.find({ chatroomId: chatroom._id }).lean()
    const token = await generateToken({ username, chatroomId: chatroom._id })

    return res.status(200).json({ success: true, data: { chatroom, messages, token } })
  } catch (error) {
    return errorResponse(res)(500, error.message)
  }
}

const leaveChatroom = async (req, res) => {
  try {
    const { chatroomId, username } = req.chatroom

    const chatroom = await Chatroom.findOne({ _id: chatroomId, members: username })
    if (!chatroom) throw new Error('Chatroom not found')

    const isMemberInChatroom = chatroom.members.includes(username)
    if (!isMemberInChatroom) throw new Error('User not in chatroom')

    chatroom.members = chatroom.members.filter(member => member !== username)
    if (chatroom.members.length === 0) chatroom.is_active = false

    await chatroom.save()

    return successResponse(res)(200, "User left chatroom")
  } catch (error) {
    return errorResponse(res)(500, error.message)
  }
}

module.exports = { detectActiveChatrooms, joinChatroom, leaveChatroom }
