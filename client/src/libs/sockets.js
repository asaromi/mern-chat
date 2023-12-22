import { io } from 'socket.io-client'
import {ENV} from './constants'

const URL = ENV.API_URL
const sockets = io(URL, { autoConnect: false })

export const chatroomSocket = io(`${URL}/chatrooms`, { autoConnect: false })

export default sockets
