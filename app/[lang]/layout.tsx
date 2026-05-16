import '@/app/styles/globals.css'

import { Suspense } from 'react'
import type { Metadata, Viewport } from 'next'
import dynamic from 'next/dynamic'
import { Providers } from './providers'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { MobileStickyBar } from '@/components/MobileStickyBar'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { clinic, getClinicBrandName, getDirection, getDoctorDisplayName, isLocale, type Locale } from '@/lib/i18n'
import { getSiteUrl, toAbsoluteUrl, trimSeoTitle } from '@/lib/seo'

const GoogleAnalytics = dynamic(() => import('@/components/GoogleAnalytics'))
const MetaPixel = dynamic(() => import('@/components/MetaPixel'))
const SiteAnalytics = dynamic(() => import('@/components/SiteAnalytics'))
const ConsentBanner = dynamic(() => import('@/components/ConsentBanner'))

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover'
}

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ar' }]
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang: rawLang } = await params
  const lang = isLocale(rawLang) ? (rawLang as Locale) : 'en'
  const brandName = getClinicBrandName(lang)
  const title =
    lang === 'ar'
      ? `${brandName} | ${clinic.titleAr}`
      : `${brandName} | ${clinic.titleEn}`

  const description =
    lang === 'ar'
      ? 'استشاري الأمراض الجلدية في الإسكندرية: تشخيص وعلاج طبي وإجراءات تجميلية آمنة.'
      : 'Consultant Dermatologist in Alexandria: medical dermatology, procedures, and safe aesthetic care.'

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.drislamelhelou.com'),
    title: trimSeoTitle(title),
    description,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        en: '/en',
        ar: '/ar',
        'x-default': '/en'
      }
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
        ? {
            'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
          }
        : undefined
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1
      }
    },
    openGraph: {
      title: trimSeoTitle(title),
      description,
      type: 'website',
      url: `/${lang}`
    },
    twitter: {
      card: 'summary_large_image',
      title: trimSeoTitle(title),
      description
    }
  }
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang: rawLang } = await params
  const lang = isLocale(rawLang) ? (rawLang as Locale) : 'en'
  const dir = getDirection(lang)
  const brandName = getClinicBrandName(lang)
  const doctorName = getDoctorDisplayName(lang)
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID
  const siteUrl = getSiteUrl()
  const pageUrl = `${siteUrl}/${lang}`

  const clinicJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name: brandName,
    '@id': `${siteUrl}/#clinic`,
    url: pageUrl,
    image: [
      toAbsoluteUrl('/images/doctor.webp'),
      toAbsoluteUrl('/clinic/waiting-room.webp'),
      toAbsoluteUrl('/brand/logo.png')
    ],
    telephone: clinic.phoneE164,
    priceRange: '$$',
    openingHours: ['Sa 14:00-17:00', 'Mo 14:00-17:00', 'We 14:00-17:00'],
    hasMap: clinic.googleMapsDirectionsUrl,
    areaServed: {
      '@type': 'City',
      name: 'Alexandria'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 31.2414311,
      longitude: 29.9603369
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: lang === 'ar' ? clinic.addressAr : clinic.addressEn,
      addressRegion: 'Alexandria',
      addressLocality: 'Alexandria',
      addressCountry: 'EG'
    },
    sameAs: [clinic.facebookUrl, clinic.instagramUrl],
    medicalSpecialty: 'Dermatology',
    founder: {
      '@type': 'Physician',
      name: lang === 'ar' ? doctorName : `Dr. ${doctorName}`
    }
  }

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: pageUrl,
    name: brandName,
    inLanguage: lang === 'ar' ? 'ar-EG' : 'en'
  }

  return (
    <html lang={lang} dir={dir} suppressHydrationWarning>
      <head>
        {/* Performance: Preconnect to analytics services */}
        {gaId ? <link rel="preconnect" href="https://www.googletagmanager.com" /> : null}
        {gaId ? <link rel="preconnect" href="https://www.google-analytics.com" /> : null}
        {metaPixelId ? <link rel="dns-prefetch" href="https://connect.facebook.net" /> : null}
      </head>
      <body>
        <Providers>
          <GoogleAnalytics gaId={gaId} />
          <Suspense fallback={null}>
            <MetaPixel />
            <SiteAnalytics />
          </Suspense>
          <ConsentBanner />
          <script
            type="application/ld+json"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicJsonLd) }}
          />
          <script
            type="application/ld+json"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
          />
          <Header locale={lang} />
          <main>{children}</main>
          <Footer locale={lang} />
          <MobileStickyBar locale={lang} />
          <WhatsAppButton label={lang === 'ar' ? 'واتساب' : 'WhatsApp'} locale={lang} />
        </Providers>
      </body>
    </html>
  )
}
