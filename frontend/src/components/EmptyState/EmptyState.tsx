import './EmptyState.css'

export function EmptyState() {
  return (
    <div className="empty-state">
      <div className="empty-icon">💬</div>
      <p className="empty-title">Comece uma conversa</p>
      <p className="empty-subtitle">Envie uma mensagem para recebê-la invertida</p>
    </div>
  )
}
