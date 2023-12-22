const { verifiedPayload } = require('./jwt')
const { errorResponse } = require('./response')

const headerChatroom = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token']
    if (!token) throw new Error('Missing token')

    const { chatroomId, username } = await verifiedPayload(token)
    req.chatroom = { chatroomId, username }

    next()
  } catch (error) {
    console.error(error)
    return errorResponse(res)(500, error.message)
  }
}

module.exports = { headerChatroom }
