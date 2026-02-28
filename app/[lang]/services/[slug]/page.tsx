import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { clinic, isLocale, type Locale } from '@/lib/i18n'
import { buildLocalizedMetadata, getSiteUrl } from '@/lib/seo'
import { getServiceLocationPage, SERVICE_LOCATION_SLUGS, type ServiceLocationSlug } from '@/lib/serviceLocationPages'

const insightByService: Record<ServiceLocationSlug, string> = {
  acne: 'acne',
  'hair-loss': 'hair-loss',
  pigmentation: 'pigmentation',
  psoriasis: 'psoriasis'
}

export async function generateStaticParams() {
  return SERVICE_LOCATION_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string; slug: string }>
}): Promise<Metadata> {
  const { lang, slug } = await params
  const locale = (isLocale(lang) ? lang : 'en') as Locale
  const page = getServiceLocationPage(slug)
  if (!page) return {}

  return buildLocalizedMetadata({
    locale,
    path: `/services/${page.slug}`,
    title: page.title[locale],
    description: page.metaDescription[locale]
  })
}

export default async function ServiceLocationPage({
  params
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const { lang, slug } = await params
  const locale = (isLocale(lang) ? lang : 'en') as Locale
  const page = getServiceLocationPage(slug)
  if (!page) return notFound()

  const siteUrl = getSiteUrl()
  const pageUrl = `${siteUrl}/${locale}/services/${page.slug}`
  const base = `/${locale}`
  const insightSlug = insightByService[page.slug]

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faq[locale].map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a
      }
    }))
  }

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: page.title[locale],
    description: page.metaDescription[locale],
    url: pageUrl,
    about: {
      '@type': 'MedicalCondition',
      name: page.condition[locale]
    },
    mainEntity: {
      '@type': 'MedicalClinic',
      name: locale === 'ar' ? clinic.brandNameAr : clinic.brandName,
      telephone: clinic.phoneE164,
      address: {
        '@type': 'PostalAddress',
        streetAddress: locale === 'ar' ? clinic.addressAr : clinic.addressEn,
        addressLocality: 'Alexandria',
        addressCountry: 'EG'
      }
    }
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: locale === 'ar' ? 'الرئيسية' : 'Home',
        item: `${siteUrl}/${locale}`
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: locale === 'ar' ? 'الخدمات' : 'Services',
        item: `${siteUrl}/${locale}/services`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: page.condition[locale],
        item: pageUrl
      }
    ]
  }

  return (
    <main className="container" style={{ padding: '2rem 0 3rem' }}>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="journalHeader">
        <div className="journalKicker">{locale === 'ar' ? 'خدمة متخصصة' : 'Specialized Service'}</div>
        <h1 className="journalTitle">{page.title[locale]}</h1>
        <div className="goldLine" aria-hidden />
        <p className="journalLead">{page.intro[locale]}</p>
      </div>

      <div className="grid grid2" style={{ marginTop: '1.1rem', alignItems: 'start' }}>
        <section className="card">
          <h2 style={{ marginTop: 0 }}>{page.whoForTitle[locale]}</h2>
          <ul style={{ color: 'var(--muted)', marginTop: '.7rem' }}>
            {page.whoForPoints[locale].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="card">
          <h2 style={{ marginTop: 0 }}>{page.approachTitle[locale]}</h2>
          <ul style={{ color: 'var(--muted)', marginTop: '.7rem' }}>
            {page.approachPoints[locale].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>

      <section className="card" style={{ marginTop: '1rem' }}>
        <h2 style={{ marginTop: 0 }}>{page.faqTitle[locale]}</h2>
        <div className="grid grid2" style={{ marginTop: '.6rem' }}>
          {page.faq[locale].map((item) => (
            <div key={item.q}>
              <div style={{ fontWeight: 800 }}>{item.q}</div>
              <p style={{ color: 'var(--muted)', marginBottom: 0 }}>{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="card" style={{ marginTop: '1rem' }}>
        <div style={{ fontWeight: 900 }}>
          {locale === 'ar'
            ? `احجز تقييم ${page.condition[locale]} في عيادة د. إسلام الحلو بالإسكندرية`
            : `Book a ${page.condition[locale]} evaluation at Dr Islam El Helou Clinic Alexandria`}
        </div>
        <p style={{ color: 'var(--muted)' }}>
          {locale === 'ar'
            ? 'ابدأ بخطة تشخيص وعلاج منظمة حسب حالتك مع متابعة عملية.'
            : 'Start with a structured diagnosis-and-treatment plan tailored to your case.'}
        </p>
        <div style={{ display: 'flex', gap: '.7rem', flexWrap: 'wrap' }}>
          <Link className="btn btnPrimary" href={`${base}/contact`}>
            {locale === 'ar' ? 'احجز الآن' : 'Book now'}
          </Link>
          <Link className="btn" href={`${base}/insights/${insightSlug}`}>
            {locale === 'ar' ? 'ابدأ الإرشاد التفاعلي' : 'Start related insight'}
          </Link>
          <Link className="btn" href={`${base}/services`}>
            {locale === 'ar' ? 'العودة للخدمات' : 'Back to services'}
          </Link>
        </div>
      </div>
    </main>
  )
}
