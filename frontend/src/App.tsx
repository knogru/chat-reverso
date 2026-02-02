import { useState } from 'react'
import './App.css'
import { Header } from './components/Header/Header'
import { MessageList } from './components/MessageList/MessageList'
import { InputArea } from './components/InputArea/InputArea'
import { useWebSocket } from './hooks/useWebSocket'

function App() {
  const [inputValue, setInputValue] = useState<string>('')
  
  const {
    messages,
    isConnected,
    isLoading,
    sendMessage: sendWebSocketMessage,
  } = useWebSocket({
    url: 'ws://localhost:8080',
  })

  const handleSendMessage = () => {
    const sent = sendWebSocketMessage(inputValue)
    if (sent) {
      setInputValue('')
    }
  }

  return (
    <div className="app">
      <Header isConnected={isConnected} />
      <MessageList messages={messages} isLoading={isLoading} />
      <InputArea
        inputValue={inputValue}
        onInputChange={setInputValue}
        onSend={handleSendMessage}
        isConnected={isConnected}
        isLoading={isLoading}
      />
    </div>
  )
}

export default App
