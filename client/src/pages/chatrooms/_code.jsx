import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPaperPlane, faArrowLeft} from '@fortawesome/free-solid-svg-icons'

import ChatSection from '@/components/ChatSection'
import {chatroomSocket} from '@/libs/sockets'
import {useSendChat} from '@/hooks/useSendChat'
import {useGetChatroom} from '@/hooks/useGetChatroom'
import {useLeaveChatroom} from '@/hooks/useLeaveChatroom'

function ChatroomDetail() {
  const {code} = useParams()
  const username = window.localStorage.getItem('username')
  const { data: resChatroom, isLoading } = useGetChatroom({ code, username })
  const { mutate: leaveChatroom } = useLeaveChatroom(code)
  const [sendLoading, setSendLoading] = useState(false)
  const [message, setMessage] = useState('')

  // special function to be called when message is sent
  const onSent = (message) => {
    setMessage(() => '')
    setSendLoading(() => false)
    setDisplayedMessages((prevState) => prevState.concat([{ ...message, sender: username }]))
    chatroomSocket.emit('SEND_MESSAGE', message)
  }

  const { mutate: sendChat } = useSendChat({ message, onSent })
  const [displayedMessages, setDisplayedMessages] = useState([])
  const [_, setConnected] = useState(false)

  const handleMessageChange = (e) => {
    const {value} = e.target
    setMessage(() => value)
  }


  const submitMessage = async (e) => {
    e.preventDefault()
    setSendLoading(() => true)

    await sendChat()
  }

  const onReceiveMessage = (message) => {
    setDisplayedMessages((prevState) => prevState.concat([message]))
  }

  const onConnect = () => setConnected(() => true)
  const onDisconnect = () => setConnected(() => false)


  const beforeDestroy = () => {
    const chatroomId = localStorage.getItem('chatroomId')

    setDisplayedMessages(() => [])

    chatroomSocket.off('connect', onConnect)
    chatroomSocket.off(`RECEIVE_MESSAGE_${chatroomId}`, onReceiveMessage)
    chatroomSocket.disconnect()
  }

  useEffect(() => {
    chatroomSocket.connect()

    chatroomSocket.on('connect', onConnect)
    chatroomSocket.on('disconnect', onDisconnect)

    return beforeDestroy
  }, [])

  useEffect(() => {
    if (resChatroom && !isLoading) {
      const {chatroom, messages} = resChatroom.data

      if (messages) setDisplayedMessages(() => messages)
      if (chatroom?._id) {
        chatroomSocket.on(`RECEIVE_MESSAGE_${chatroom._id}`, onReceiveMessage)
      }
    }
  }, [isLoading, resChatroom])

  return (
    <main className="w-full max-w-mobile h-screen mx-auto pt-14 pb-18 relative overline-none">
      <header className="fixed top-0 w-full max-w-mobile flex items-center h-14 bg-gray-700 px-5 z-1000">
        <button className="pr-2 flex items-center mb-0.5" onClick={leaveChatroom}>
          <FontAwesomeIcon icon={faArrowLeft} className="text-white h-5 w-5" />
        </button>
        <h1 className="text-white mb-1 text-xl font-bold">Chatroom #{code}</h1>
      </header>

      <ChatSection messagesData={displayedMessages} username={username} />

      <footer className="absolute bottom-0 h-18 w-full max-w-mobile py-1.5 z-1000">
        <form className="px-4 flex space-x-2.5">
          <textarea
            className="textarea textarea-bordered textarea-xs text-base w-full h-11"
            placeholder="Bio"
            value={message}
            onChange={handleMessageChange}
          />

          <button
            className={`btn w-12 h-12 max-w-xs text-base text-white float-end ${sendLoading && 'btn-disabled pointer-events-none' || 'bg-gray-700'}`}
            type="submit"
            onClick={submitMessage}
          >
            {sendLoading && (
              <span className="loading loading-spinner"/>
            ) || (
              <FontAwesomeIcon icon={faPaperPlane}/>
            )}
          </button>
        </form>
      </footer>
    </main>
  )
}

export default ChatroomDetail
