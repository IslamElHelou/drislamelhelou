'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { trackContact, trackDirections, trackPageView } from '@/lib/analytics'

export default function SiteAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const qs = searchParams.toString()
    const path = qs ? `${pathname}?${qs}` : pathname
    trackPageView(path)

    function onConsentChanged() {
      trackPageView(path)
    }

    window.addEventListener('consent-changed', onConsentChanged)
    return () => window.removeEventListener('consent-changed', onConsentChanged)
  }, [pathname, searchParams])

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null
      const link = target?.closest('a[href]') as HTMLAnchorElement | null
      if (!link) return

      const href = link.getAttribute('href') || ''
      if (href.startsWith('tel:')) {
        trackContact('phone', 'link_click')
        return
      }

      if (href.includes('wa.me/') || href.includes('api.whatsapp.com/')) {
        trackContact('whatsapp', 'link_click')
        return
      }

      if (
        href.includes('google.com/maps') ||
        href.includes('maps.app.goo.gl') ||
        href.includes('google.com/maps/dir') ||
        href.includes('api=1&destination=')
      ) {
        trackDirections('link_click')
      }
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return null
}
