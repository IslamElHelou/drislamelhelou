'use client'

import { useEffect } from 'react'
import { hasAnalyticsConsent } from '@/lib/consent'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

function ensureGtag(gaId: string) {
  if (typeof window === 'undefined') return

  if (!document.getElementById('ga4-loader')) {
    const s = document.createElement('script')
    s.id = 'ga4-loader'
    s.async = true
    s.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
    document.head.appendChild(s)
  }

  window.dataLayer = window.dataLayer || []
  const gtag = window.gtag || function () { window.dataLayer?.push(arguments) }
  window.gtag = gtag
  window.gtag('js', new Date())
  window.gtag('config', gaId, { send_page_view: false })
}

export default function GoogleAnalytics({ gaId }: { gaId?: string }) {
  useEffect(() => {
    if (!gaId) return

    const tryLoad = () => {
      if (!hasAnalyticsConsent()) return
      ensureGtag(gaId)
    }

    tryLoad()
    window.addEventListener('consent-changed', tryLoad)
    return () => window.removeEventListener('consent-changed', tryLoad)
  }, [gaId])

  return null
}
