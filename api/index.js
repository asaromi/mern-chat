require("dotenv").config()
const mongoose = require("mongoose")
const { socketServer } = require("./src/app")

const { PORT: port, HOST: host, MONGO_URL: mongoUrl } = process.env
const listenParams = [port]
if (host) listenParams.push(host)

mongoose.connect(mongoUrl, { useNewUrlParser: true })

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('DB is ready.', new Date())
})

socketServer.listen(...listenParams, () =>
  console.log(`Server Running at ${port}`)
)
