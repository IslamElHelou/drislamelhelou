import '@/app/styles/globals.css'

import { Suspense } from 'react'
import type { Metadata, Viewport } from 'next'
import { Providers } from './providers'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import PageTransition from '@/components/PageTransition'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import MetaPixel from '@/components/MetaPixel'
import SiteAnalytics from '@/components/SiteAnalytics'
import ConsentBanner from '@/components/ConsentBanner'
import { clinic, getClinicBrandName, getDirection, getDoctorDisplayName, isLocale, type Locale } from '@/lib/i18n'

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
    title,
    description,
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
        ? {
            'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
          }
        : undefined
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `/${lang}`
    },
    twitter: {
      card: 'summary_large_image',
      title,
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

  const clinicJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name: brandName,
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.drislamelhelou.com',
    telephone: clinic.phoneE164,
    address: {
      '@type': 'PostalAddress',
      streetAddress: lang === 'ar' ? clinic.addressAr : clinic.addressEn,
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

  return (
    <html lang={lang} dir={dir} suppressHydrationWarning>
      <head>
        {/* Preconnect to Google Analytics and other critical origins */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
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
          <Header locale={lang} />
          <main>
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer locale={lang} />
          <WhatsAppButton label={lang === 'ar' ? 'واتساب' : 'WhatsApp'} />
        </Providers>
      </body>
    </html>
  )
}
