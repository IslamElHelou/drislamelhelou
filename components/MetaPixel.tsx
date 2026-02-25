'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { hasAnalyticsConsent } from '@/lib/consent'

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

export default function MetaPixel() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID

  useEffect(() => {
    function sendPageView() {
      if (!pixelId || typeof window === 'undefined' || !hasAnalyticsConsent()) return
      if (!document.getElementById('meta-pixel-loader')) {
        const s = document.createElement('script')
        s.id = 'meta-pixel-loader'
        s.async = true
        s.src = 'https://connect.facebook.net/en_US/fbevents.js'
        document.head.appendChild(s)
      }

      if (typeof window.fbq !== 'function') {
        const q = (...args: unknown[]) => {
          ;(q as any).queue.push(args)
        }
        ;(q as any).queue = []
        ;(q as any).loaded = true
        ;(q as any).version = '2.0'
        window.fbq = q
        window.fbq('init', pixelId)
      }

      if (typeof window.fbq !== 'function') return
      window.fbq('track', 'PageView')
    }

    sendPageView()
    window.addEventListener('consent-changed', sendPageView)
    return () => window.removeEventListener('consent-changed', sendPageView)
  }, [pathname, searchParams, pixelId])

  if (!pixelId) return null

  return null
}
