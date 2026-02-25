'use client'

import { useEffect, useState } from 'react'
import { readConsent, setConsent } from '@/lib/consent'

export default function ConsentBanner() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (readConsent() === null) setOpen(true)
  }, [])

  if (!open) return null

  return (
    <div
      style={{
        position: 'fixed',
        insetInline: 16,
        bottom: 16,
        zIndex: 1100,
        background: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: 12,
        padding: '12px 14px',
        boxShadow: '0 8px 28px rgba(0,0,0,0.18)'
      }}
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
    >
      <div style={{ fontWeight: 800, marginBottom: 6 }}>Privacy preferences</div>
      <div style={{ color: 'var(--muted)', fontSize: '.94rem' }}>
        We use analytics to measure calls, directions, and appointment conversions.
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 10 }}>
        <button
          className="btn btnPrimary"
          type="button"
          onClick={() => {
            setConsent('granted')
            setOpen(false)
          }}
        >
          Accept analytics
        </button>
        <button
          className="btn"
          type="button"
          onClick={() => {
            setConsent('denied')
            setOpen(false)
          }}
        >
          Reject analytics
        </button>
      </div>
    </div>
  )
}
