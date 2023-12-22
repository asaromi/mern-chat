import React from 'react'
import PropTypes from 'prop-types'

ChatItem.propTypes = {
  message: PropTypes.string.isRequired,
  sender: PropTypes.string,
  createdAt: PropTypes.string,
  isMe: PropTypes.bool,
}

function ChatItem({ message, sender = 'Anonymous', createdAt = new Date().toISOString(), isMe = false }) {
  const date = new Date(createdAt)
  const time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })
  const day = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  const senderName = isMe ? undefined : sender

  return (
    <div className={`chat ${isMe && 'chat-end' || 'chat-start'}`}>
      <div className="chat-header">
        {senderName && <span className="float-start">{senderName}</span>}
      </div>

      <div className={`chat-bubble ${isMe && 'bg-gray-100' || 'bg-gray-600'}`}>
        <p className={`text-base ${isMe && 'text-black'}`}>{message}</p>
      </div>
      <div className="chat-footer">
        <time className="text-xs opacity-50">{`${day}, ${time}`}</time>
      </div>
    </div>
  )
}

export default ChatItem
