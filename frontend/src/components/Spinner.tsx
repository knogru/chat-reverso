export function Spinner() {
  return (
    <svg className="spinner" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeDasharray="32" strokeDashoffset="32">
        <animate attributeName="stroke-dasharray" dur="2s" values="0 32;16 16;0 32;0 32" repeatCount="indefinite" />
        <animate attributeName="stroke-dashoffset" dur="2s" values="0;-16;-32;-32" repeatCount="indefinite" />
      </circle>
    </svg>
  )
}