import { BotAvatar } from '../BotAvatar'
import './Header.css'

interface HeaderProps {
  isConnected: boolean
}

export function Header({ isConnected }: HeaderProps) {
  return (
    <header className="chat-header">
      <div className="header-content">
        <div className="header-title">
          <div className="bot-avatar header-avatar">
            <BotAvatar />
          </div>
          <div>
            <h1>Chat Reverso</h1>
            <div className={`status-indicator ${isConnected ? 'connected' : 'disconnected'}`}>
              <span className="status-dot"></span>
              {isConnected ? 'Online' : 'Offline'}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
