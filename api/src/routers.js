const {Router} = require('express')
const router = Router()

const {sendChat} = require('./controllers/chatController')
const {headerChatroom} = require('./helpers/middleware')
const {detectActiveChatrooms, joinChatroom, leaveChatroom} = require('./controllers/chatroomController')

router.get('/', (req, res) => res.send('Hello World!'))
router.get('/chatrooms', detectActiveChatrooms)
router.get('/chatrooms/:code', joinChatroom)
router.delete('/chatrooms/:code', headerChatroom, leaveChatroom)
router.post('/chats/send', headerChatroom, sendChat)

module.exports = router
