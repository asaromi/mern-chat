exports.chatroom = (socket) => {
  console.log('a user connected to chatroom')
  socket.on("SEND_MESSAGE", (data) => {
    const receiveKey = `RECEIVE_MESSAGE_${data.chatroomId}`
    socket.broadcast.timeout(5000).emit(receiveKey, data)
  })
}
