import React, {useEffect} from 'react'
import ChatItem from '@/components/ChatItem.jsx'
import PropTypes from 'prop-types'

ChatSection.propTypes = {
  messagesData: PropTypes.arrayOf(PropTypes.shape({
    message: PropTypes.string.isRequired,
    sender: PropTypes.string,
    createdAt: PropTypes.string,
  })).isRequired,
  username: PropTypes.string.isRequired,
}

function ChatSection({ messagesData, username }) {
  useEffect(() => {
    document.getElementById('chat-list')
      .scrollTo(0, document.getElementById('chat-list').scrollHeight)
  }, [])

  return (
    <section id="chat-list" className="w-full h-full max-h-screen-minus-136px block px-5 pt-2.5 space-y-1.5 overflow-y-auto">
      {messagesData.map((chat, index) => (
        <ChatItem key={chat._id} {...chat} isMe={chat.sender === username} />
      ))}
    </section>
  )
}

export default ChatSection
