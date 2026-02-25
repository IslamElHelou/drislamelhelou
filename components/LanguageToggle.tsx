'use client'

import { usePathname, useRouter } from 'next/navigation'
import { locales, type Locale } from '@/lib/i18n'

function setCookie(name: string, value: string) {
  document.cookie = `${name}=${value}; path=/; max-age=${60 * 60 * 24 * 365}`
}

export function LanguageToggle({ locale }: { locale: Locale }) {
  const router = useRouter()
  const pathname = usePathname()

  const other: Locale = locale === 'ar' ? 'en' : 'ar'

  function switchLang() {
    setCookie('lang', other)
    // On most pages we are already under /{locale}/...
    // If the current pathname isn't localized (e.g. '/' due to an edge rewrite),
    // fall back to sending the user to the localized root.
    const isLocalized = pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)

    const nextPath = isLocalized
      ? pathname.replace(`/${locale}`, `/${other}`)
      : `/${other}${pathname === '/' ? '' : pathname}`

    router.push(nextPath)
    router.refresh()
  }

  return (
    <button className="btn" onClick={switchLang} aria-label="Switch language">
      {other.toUpperCase()}
    </button>
  )
}

export function LocaleLinksHint() {
  return (
    <span className="badge" style={{ fontSize: '.8rem' }}>
      {locales.join(' / ').toUpperCase()}
    </span>
  )
}
