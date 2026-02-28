import type { Metadata } from 'next'

import { isLocale, type Locale } from '@/lib/i18n'
import { clinic } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionaries'
import { buildLocalizedMetadata } from '@/lib/seo'
import ContactClient from './ui'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const locale = (isLocale(lang) ? lang : 'en') as Locale
  const t = getDictionary(locale)
  return buildLocalizedMetadata({
    locale,
    path: '/contact',
    title: t.nav.contact,
    description: t.contact.subtitle
  })
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const locale = (isLocale(lang) ? lang : 'en') as Locale
  const t = getDictionary(locale)
  return <ContactClient locale={locale} t={t} />
}
