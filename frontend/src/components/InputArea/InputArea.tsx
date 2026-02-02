import { useEffect, useRef } from 'react'
import { Send } from '../Send'
import { Spinner } from '../Spinner'
import './InputArea.css'

interface InputAreaProps {
  inputValue: string
  onInputChange: (value: string) => void
  onSend: () => void
  isConnected: boolean
  isLoading: boolean
}

export function InputArea({ 
  inputValue, 
  onInputChange, 
  onSend, 
  isConnected, 
  isLoading 
}: InputAreaProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const prevLoadingRef = useRef<boolean>(isLoading)

  useEffect(() => {
    if (prevLoadingRef.current && !isLoading && isConnected) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
    prevLoadingRef.current = isLoading
  }, [isLoading, isConnected])

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSend()
    }
  }

  return (
    <div className="input-wrapper">
      <div className="input-container">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Digite sua mensagem..."
          disabled={!isConnected || isLoading}
          className="chat-input"
        />
        <button 
          onClick={onSend} 
          disabled={!isConnected || !inputValue.trim() || isLoading}
          className="send-button"
          aria-label="Enviar mensagem"
        >
          {isLoading ? (
            <Spinner />
          ) : (
            <Send />
          )}
        </button>
      </div>
    </div>
  )
}
