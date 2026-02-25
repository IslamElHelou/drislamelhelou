import { NextRequest, NextResponse } from 'next/server'
// Avoid TS path aliases inside middleware-related code to keep Edge bundling robust.
import { defaultLocale, isLocale } from './lib/i18n'

function detectLocale(req: NextRequest): string {
  const cookie = req.cookies.get('lang')?.value
  if (cookie && isLocale(cookie)) return cookie

  const header = req.headers.get('accept-language')
  if (header) {
    const preferred = header
      .split(',')
      .map((part) => part.split(';')[0]?.trim())
      .filter(Boolean)

    for (const lang of preferred) {
      const base = lang.split('-')[0]
      if (base && isLocale(base)) return base
    }
  }

  return defaultLocale
}

/**
 * proxy(): locale-aware edge routing.
 * - For "/" we rewrite to "/{lang}" (proxy behavior — keeps the URL).
 * - For any non-localized path we redirect to "/{lang}/..." for canonical URLs.
 */
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Skip next internals and public files
  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.includes('.')) {
    return NextResponse.next()
  }

  const segments = pathname.split('/').filter(Boolean)
  const first = segments[0]

  // Already localized
  if (first && isLocale(first)) return NextResponse.next()

  const locale = detectLocale(req)
  const url = req.nextUrl.clone()

  if (pathname === '/') {
    url.pathname = `/${locale}`
    // Use redirect (not rewrite) so the visible URL includes the locale.
    // This improves SEO/canonical URLs and fixes client-side language switching
    // that depends on the pathname starting with /{locale}.
    const res = NextResponse.redirect(url)
    res.cookies.set('lang', locale, { path: '/', maxAge: 60 * 60 * 24 * 365 })
    return res
  }

  url.pathname = `/${locale}${pathname}`
  const res = NextResponse.redirect(url)
  res.cookies.set('lang', locale, { path: '/', maxAge: 60 * 60 * 24 * 365 })
  return res
}
