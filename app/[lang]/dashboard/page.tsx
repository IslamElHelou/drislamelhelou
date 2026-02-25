import type { Metadata } from 'next'

import { isLocale, type Locale } from '@/lib/i18n'
import { clinic } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionaries'
import DashboardClient from './ui'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const locale = (isLocale(lang) ? lang : 'en') as Locale
  const t = getDictionary(locale)
  return {
    title: `${locale === 'ar' ? 'لوحة التحكم' : 'Dashboard'} • ${clinic.brandName}`,
    description: t.dashboard.subtitle,
    robots: { index: false, follow: false },
  }
}

export default async function DashboardPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const locale = (isLocale(lang) ? lang : 'en') as Locale
  const t = getDictionary(locale)
  return <DashboardClient locale={locale} t={t} />
}
