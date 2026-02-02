import { useEffect, useRef } from 'react'
import type { Message } from '../../types'
import { Message as MessageComponent } from '../Message/Message'
import { LoadingMessage } from '../LoadingMessage/LoadingMessage'
import { EmptyState } from '../EmptyState/EmptyState'
import './MessageList.css'

interface MessageListProps {
  messages: Message[]
  isLoading: boolean
}

export function MessageList({ messages, isLoading }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  // Scroll automático quando novas mensagens são adicionadas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  return (
    <div className="messages-container">
      {messages.length === 0 && !isLoading ? (
        <EmptyState />
      ) : (
        <>
          {messages.map((msg) => (
            <MessageComponent key={msg.id} message={msg} />
          ))}
          {isLoading && <LoadingMessage />}
          <div ref={messagesEndRef} />
        </>
      )}
    </div>
  )
}
