const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const app = express()
const server = require("http").createServer(app)
const { Server: SocketServer } = require("socket.io")

const routes = require("./routers")
const { chatroom } = require("./sockets")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(morgan("dev"))
app.use("/api", routes)

const io = new SocketServer(server, {
  cors: {
    origin: "*",
  },
})

io.of("/chatrooms").on("connection", chatroom)

module.exports = { socketServer: server, app, io }
