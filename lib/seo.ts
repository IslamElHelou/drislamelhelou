import type { Metadata } from 'next'
import { clinic, type Locale } from '@/lib/i18n'

type SeoInput = {
  locale: Locale
  path: string
  title: string
  description: string
  type?: 'website' | 'article'
  image?: string
}

export function buildLocalizedMetadata({
  locale,
  path,
  title,
  description,
  type = 'website',
  image = '/images/doctor.webp'
}: SeoInput): Metadata {
  const fullTitle = `${title} • ${clinic.brandName}`
  const canonical = `/${locale}${path}`

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical,
      languages: {
        en: `/en${path}`,
        ar: `/ar${path}`,
        'x-default': `/en${path}`
      }
    },
    openGraph: {
      title: fullTitle,
      description,
      type,
      url: canonical,
      siteName: locale === 'ar' ? clinic.brandNameAr : clinic.brandName,
      locale: locale === 'ar' ? 'ar_EG' : 'en_US',
      alternateLocale: locale === 'ar' ? 'en_US' : 'ar_EG',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image]
    }
  }
}

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || 'https://www.drislamelhelou.com'
}

export function toAbsoluteUrl(path: string) {
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  return `${getSiteUrl()}${path.startsWith('/') ? path : `/${path}`}`
}

export function getDefaultSocialImage() {
  return toAbsoluteUrl('/images/doctor.webp')
}

export function getPublisherLogo() {
  return toAbsoluteUrl('/brand/logo.png')
}
