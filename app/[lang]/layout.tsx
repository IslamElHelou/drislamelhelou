import '@/app/styles/globals.css'

import { Suspense } from 'react'
import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Providers } from './providers'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import PageTransition from '@/components/PageTransition'
import MetaPixel from '@/components/MetaPixel'
import SiteAnalytics from '@/components/SiteAnalytics'
import ConsentBanner from '@/components/ConsentBanner'
import { clinic, getDirection, isLocale, type Locale } from '@/lib/i18n'

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
  const title =
    lang === 'ar'
      ? `${clinic.brandName} | ${clinic.titleAr}`
      : `${clinic.brandName} | ${clinic.titleEn}`

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
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  const clinicJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name: clinic.brandName,
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
      name: `Dr. ${clinic.doctorName}`
    }
  }

  return (
    <html lang={lang} dir={dir} suppressHydrationWarning>
      <body>
        <Providers>
          <Script id="consent-default" strategy="beforeInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = window.gtag || gtag;
              gtag('consent', 'default', {
                ad_storage: 'denied',
                analytics_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                wait_for_update: 500
              });
            `}
          </Script>
          {gaId ? (
            <>
              <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
              <Script id="ga4-base" strategy="afterInteractive">
                {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  window.gtag = gtag;
                  gtag('js', new Date());
                  gtag('config', '${gaId}', { send_page_view: false });
                `}
              </Script>
            </>
          ) : null}
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
