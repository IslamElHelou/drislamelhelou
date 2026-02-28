import { clinic } from '@/lib/i18n'

export function WhatsAppButton({ label }: { label: string }) {
  const number = clinic.whatsappE164.replace('+', '')
  const href = `https://wa.me/${number}?text=${encodeURIComponent('Hello, I would like to book an appointment.')}`

  return (
    <div className="whatsapp">
      <a href={href} target="_blank" rel="noreferrer" aria-label={`Contact us on ${label}`}>
        <span aria-hidden style={{ display: 'inline-flex', width: 22, height: 22, color: '#1a7f52' }}>
          <svg viewBox="0 0 32 32" width="22" height="22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16 2.7c-7.2 0-13 5.8-13 13 0 2.3.6 4.5 1.7 6.5L3 29.3l7.4-1.9c1.9 1 4 1.6 5.6 1.6 7.2 0 13-5.8 13-13s-5.8-13-13-13Zm0 23.7c-1.9 0-3.7-.5-5.4-1.5l-.4-.2-4.3 1.1 1.1-4.2-.3-.4c-1.1-1.7-1.6-3.6-1.6-5.6 0-6 4.9-10.9 10.9-10.9S26.9 9.9 26.9 16 22 26.4 16 26.4Z"
              fill="currentColor"
            />
            <path
              d="M22.6 18.7c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.1-.4-2.1-1.2-.8-.7-1.3-1.5-1.5-1.8-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.6 0-.2-.7-1.7-.9-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.7s1.2 3.1 1.4 3.3c.2.2 2.4 3.7 5.9 5.1.8.3 1.4.5 1.9.6.8.2 1.5.2 2.1.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4 0-.1-.3-.2-.6-.3Z"
              fill="currentColor"
            />
          </svg>
        </span>
        <span className="label" style={{ fontWeight: 800 }}>{label}</span>
      </a>
    </div>
  )
}
