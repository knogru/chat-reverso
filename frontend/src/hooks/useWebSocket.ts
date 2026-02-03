import { useState, useEffect, useRef, useCallback } from 'react'
import type { Message } from '../types'

interface UseWebSocketOptions {
  url: string
  onOpen?: () => void
  onClose?: () => void
  onError?: (error: Event) => void
  reconnectInterval?: number
  maxReconnectAttempts?: number
}

interface UseWebSocketReturn {
  messages: Message[]
  isConnected: boolean
  isLoading: boolean
  sendMessage: (text: string) => boolean
  clearMessages: () => void
  reconnect: () => void
}

export function useWebSocket({
  url,
  onOpen,
  onClose,
  onError,
  reconnectInterval = 3000,
  maxReconnectAttempts = 5,
}: UseWebSocketOptions): UseWebSocketReturn {
  const [messages, setMessages] = useState<Message[]>([])
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  
  const wsRef = useRef<WebSocket | null>(null)
  const reconnectAttemptsRef = useRef<number>(0)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const connect = useCallback(() => {
    // Evita conexões duplas: verifica se já existe uma conexão ativa
    if (
      wsRef.current?.readyState === 0 ||
      wsRef.current?.readyState === 1
    ) {
      return
    }

    try {
      const ws = new WebSocket(url)
      wsRef.current = ws

      ws.onopen = () => {
        console.log('Conectado ao servidor WebSocket!')
        setIsConnected(true)
        reconnectAttemptsRef.current = 0
        onOpen?.()
      }

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data) as Message
          setIsLoading(false)
          setMessages((prev) => [...prev, data])
        } catch (error) {
          console.error('Erro ao processar mensagem:', error)
        }
      }

      ws.onerror = (error) => {
        console.error('Erro no WebSocket:', error)
        setIsLoading(false)
        onError?.(error)
      }

      ws.onclose = () => {
        console.log('Conexão WebSocket fechada')
        setIsConnected(false)
        setIsLoading(false)
        wsRef.current = null
        onClose?.()

        // Tentativa de reconexão automática
        if (reconnectAttemptsRef.current < maxReconnectAttempts) {
          reconnectAttemptsRef.current += 1
          reconnectTimeoutRef.current = setTimeout(() => {
            console.log(
              `Tentativa de reconexão ${reconnectAttemptsRef.current}/${maxReconnectAttempts}...`
            )
            connect()
          }, reconnectInterval)
        } else {
          console.log('Número máximo de tentativas de reconexão atingido')
        }
      }
    } catch (error) {
      console.error('Erro ao criar conexão WebSocket:', error)
      setIsConnected(false)
    }
  }, [url, onOpen, onClose, onError, reconnectInterval, maxReconnectAttempts])

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
      reconnectTimeoutRef.current = null
    }

    if (wsRef.current) {
      if (
        wsRef.current.readyState === WebSocket.OPEN ||
        wsRef.current.readyState === WebSocket.CONNECTING
      ) {
        wsRef.current.close()
      }
      wsRef.current = null
    }
  }, [])

  const sendMessage = useCallback(
    (text: string) => {
      if (!text.trim() || !wsRef.current || !isConnected) {
        return false
      }

      try {
        const userMessage: Message = {
          id: Date.now(),
          text: text.trim(),
          sender: 'user',
        }

        wsRef.current.send(text.trim())
        setMessages((prev) => [...prev, userMessage])
        setIsLoading(true)
        return true
      } catch (error) {
        console.error('Erro ao enviar mensagem:', error)
        return false
      }
    },
    [isConnected]
  )

  const clearMessages = useCallback(() => {
    setMessages([])
  }, [])

  const reconnect = useCallback(() => {
    disconnect()
    reconnectAttemptsRef.current = 0
    setTimeout(() => {
      connect()
    }, 100)
  }, [connect, disconnect])

  // Conecta quando o hook é montado
  useEffect(() => {
    connect()

    // Limpa a conexão quando o componente desmonta
    return () => {
      console.log(wsRef.current)
      if (wsRef.current?.readyState === WebSocket.OPEN ) {
        disconnect()
      }
    }
  }, [connect, disconnect])

  return {
    messages,
    isConnected,
    isLoading,
    sendMessage,
    clearMessages,
    reconnect,
  }
}
