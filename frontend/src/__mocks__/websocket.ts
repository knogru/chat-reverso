// Mock do WebSocket para testes
let instances: MockWebSocket[] = []

export class MockWebSocket {
  url: string
  readyState: number
  onopen: ((this: WebSocket, ev: Event) => any) | null
  onmessage: ((this: WebSocket, ev: MessageEvent) => any) | null
  onerror: ((this: WebSocket, ev: Event) => any) | null
  onclose: ((this: WebSocket, ev: CloseEvent) => any) | null
  sentMessages: string[]

  constructor(url: string) {
    this.url = url
    this.readyState = MockWebSocket.CONNECTING
    this.onopen = null
    this.onmessage = null
    this.onerror = null
    this.onclose = null
    this.sentMessages = []
    
    // Armazena a instância
    instances.push(this)
    
    // Simula conexão assíncrona
    setTimeout(() => {
      this.readyState = MockWebSocket.OPEN
      if (this.onopen) {
        this.onopen.call(this, new Event('open'))
      }
    }, 0)
  }

  send(data: string | ArrayBuffer | Blob): void {
    this.sentMessages.push(data.toString())
  }

  close(code?: number, reason?: string): void {
    this.readyState = MockWebSocket.CLOSED
    if (this.onclose) {
      this.onclose.call(this, new CloseEvent('close', { code, reason }))
    }
  }

  // Métodos auxiliares para testes
  simulateMessage(data: { id: number; text: string; sender: 'user' | 'bot' }): void {
    if (this.onmessage) {
      this.onmessage.call(this, new MessageEvent('message', {
        data: JSON.stringify(data)
      }))
    }
  }

  simulateError(): void {
    if (this.onerror) {
      this.onerror.call(this, new Event('error'))
    }
  }

  simulateClose(): void {
    this.readyState = MockWebSocket.CLOSED
    if (this.onclose) {
      this.onclose.call(this, new CloseEvent('close'))
    }
  }
}

// Constantes do WebSocket
MockWebSocket.CONNECTING = 0
MockWebSocket.OPEN = 1
MockWebSocket.CLOSING = 2
MockWebSocket.CLOSED = 3

// Função auxiliar para obter a última instância
export function getLastInstance(): MockWebSocket {
  return instances[instances.length - 1]
}

// Função auxiliar para limpar instâncias
export function clearInstances(): void {
  instances = []
}
