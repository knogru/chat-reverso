import type { Message as MessageType } from '../../types'
import { BotAvatar } from '../BotAvatar'
import { UserAvatar } from '../UserAvatar'
import './Message.css'

interface MessageProps {
  message: MessageType
}

export function Message({ message }: MessageProps) {
  return (
    <div className={`message-wrapper ${message.sender === 'user' ? 'user' : 'bot'}`}>
      <div className="message-content">
        {message.sender === 'bot' && (
          <BotAvatar />
        )}
        <div className={`message-bubble ${message.sender === 'user' ? 'user-bubble' : 'bot-bubble'}`}>
          <div className="message-text">{message.text}</div>
        </div>
        {message.sender === 'user' && (
          <UserAvatar />
        )}
      </div>
    </div>
  )
}
