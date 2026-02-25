import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { defaultLocale, isLocale, type Locale } from '@/lib/i18n'

function detectLocaleFromHeader(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale

  const preferred = acceptLanguage
    .split(',')
    .map((part) => part.split(';')[0]?.trim())
    .filter(Boolean)

  for (const lang of preferred) {
    const base = lang.split('-')[0]
    if (base && isLocale(base)) return base
  }

  return defaultLocale
}

export default async function Root() {
  const cookieStore = await cookies()
  const cookieLocale = cookieStore.get('lang')?.value

  if (cookieLocale && isLocale(cookieLocale)) {
    redirect(`/${cookieLocale}`)
  }

  const headerStore = await headers()
  const locale = detectLocaleFromHeader(headerStore.get('accept-language'))
  redirect(`/${locale}`)
}
