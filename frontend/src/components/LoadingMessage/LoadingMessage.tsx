import { BotAvatar } from '../BotAvatar'
import './LoadingMessage.css'

export function LoadingMessage() {
  return (
    <div className="message-wrapper bot">
      <div className="message-content">
       <BotAvatar />
        <div className="message-bubble bot-bubble loading-bubble">
          <div className="loading-indicator">
            <span className="loading-dot"></span>
            <span className="loading-dot"></span>
            <span className="loading-dot"></span>
          </div>
        </div>
      </div>
    </div>
  )
}
