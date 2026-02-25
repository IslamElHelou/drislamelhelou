'use client'

import { hasAnalyticsConsent } from '@/lib/consent'

type EventParams = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
  }
}

function hasWindow() {
  return typeof window !== 'undefined'
}

export function trackPageView(path: string) {
  if (!hasAnalyticsConsent()) return
  if (!hasWindow()) return
  if (typeof window.gtag !== 'function') return

  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
    language: document.documentElement.lang
  })
}

export function trackContact(channel: 'whatsapp' | 'phone', source: string) {
  if (!hasAnalyticsConsent()) return
  const params: EventParams = { channel, source }

  if (hasWindow() && typeof window.gtag === 'function') {
    window.gtag('event', 'contact_click', params)
  }

  if (hasWindow() && typeof window.fbq === 'function') {
    window.fbq('track', 'Contact', params)
  }
}

export function trackAppointmentLead(condition?: string) {
  if (!hasAnalyticsConsent()) return
  const params: EventParams = {
    form_name: 'appointment_request',
    condition: condition || 'general'
  }

  if (hasWindow() && typeof window.gtag === 'function') {
    window.gtag('event', 'generate_lead', params)
  }

  if (hasWindow() && typeof window.fbq === 'function') {
    window.fbq('track', 'Lead', params)
  }
}

export function trackDirections(source: string) {
  if (!hasAnalyticsConsent()) return
  const params: EventParams = { source }

  if (hasWindow() && typeof window.gtag === 'function') {
    window.gtag('event', 'direction_click', params)
  }

  if (hasWindow() && typeof window.fbq === 'function') {
    window.fbq('trackCustom', 'DirectionClick', params)
  }
}
