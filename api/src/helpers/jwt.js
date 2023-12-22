require('dotenv').config()
const { verify, sign } = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET

const generateToken = async ({ username, chatroomId }) => {
  let token
  try {
    token = await sign({username, chatroomId}, jwtSecret)
  } catch (error) {
    console.error(error)
  }

  return token
}

const verifiedPayload = async (token) => {
  let payload
  try {
    payload = await verify(token, jwtSecret, {complete: true}).payload
  } catch (error) {
    console.error(error)
  }

  return payload
}

module.exports = { generateToken, verifiedPayload }
