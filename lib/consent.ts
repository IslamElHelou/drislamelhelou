'use client'

export const CONSENT_KEY = 'analytics_consent'
export type ConsentState = 'granted' | 'denied'

export function readConsent(): ConsentState | null {
  if (typeof window === 'undefined') return null
  const v = window.localStorage.getItem(CONSENT_KEY)
  return v === 'granted' || v === 'denied' ? v : null
}

export function hasAnalyticsConsent() {
  return readConsent() === 'granted'
}

export function applyGoogleConsent(state: ConsentState) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return

  window.gtag('consent', 'update', {
    ad_storage: state === 'granted' ? 'granted' : 'denied',
    analytics_storage: state === 'granted' ? 'granted' : 'denied',
    ad_user_data: state === 'granted' ? 'granted' : 'denied',
    ad_personalization: state === 'granted' ? 'granted' : 'denied'
  })
}

export function setConsent(state: ConsentState) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(CONSENT_KEY, state)
  applyGoogleConsent(state)
  window.dispatchEvent(new Event('consent-changed'))
}
