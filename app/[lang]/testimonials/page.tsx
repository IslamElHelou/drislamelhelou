import type { Metadata } from 'next'
import { getDictionary } from '@/lib/dictionaries'
import { clinic, isLocale, type Locale } from '@/lib/i18n'
import TestimonialsSlider, { type Review } from '@/components/TestimonialsSlider'
import { getPublisherLogo, getSiteUrl } from '@/lib/seo'

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const locale = (isLocale(lang) ? lang : 'en') as Locale
  const t = getDictionary(locale)
  return {
    title: `${t.testimonials.title} • ${clinic.brandName}`,
    description: t.testimonials.subtitle,
    alternates: {
      canonical: `/${locale}/testimonials`,
      languages: {
        en: '/en/testimonials',
        ar: '/ar/testimonials',
        'x-default': '/en/testimonials'
      }
    }
  }
}

export default async function TestimonialsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const locale = (isLocale(lang) ? lang : 'en') as Locale
  const t = getDictionary(locale)
  const siteUrl = getSiteUrl()

  const reviews: Review[] =
    locale === 'ar'
      ? [
          {
            name: 'إبراهيم',
            source: 'Google Review',
            body:
              'كنت أعاني من مشكلة جلدية مزمنة لسنوات طويلة. بعد المتابعة مع د. إسلام تم طلب الفحوصات اللازمة وتغير التشخيص، وبدأ التحسن بشكل واضح خلال فترة قصيرة.'
          },
          {
            name: 'علي',
            source: 'Google Review',
            body:
              'بعد سنوات من زيارة أطباء كثيرين بدون نتيجة، كانت المتابعة هنا سبباً في الوصول للتشخيص الصحيح ووضع خطة علاجية واضحة.'
          },
          {
            name: 'روضة',
            source: 'Google Review',
            body: 'دكتور ممتاز ومحترم وخبرة كبيرة.'
          }
        ]
      : [
          {
            name: 'Ibrahim',
            source: 'Google Review',
            body:
              'I had a long-standing skin condition for years. After visiting Dr. Islam, the diagnosis changed based on proper tests, and I started improving within a short time.'
          },
          {
            name: 'Ali',
            source: 'Google Review',
            body:
              'After years of seeing many doctors without success, the visit helped reach the correct diagnosis and a clear treatment plan.'
          },
          {
            name: 'Rawda',
            source: 'Google Review',
            body: "Seriously, he's an excellent and very respectable doctor with extensive experience."
          }
        ]

  const reviewsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name: locale === 'ar' ? clinic.brandNameAr : clinic.brandName,
    url: `${siteUrl}/${locale}/testimonials`,
    image: getPublisherLogo(),
    telephone: clinic.phoneE164,
    address: {
      '@type': 'PostalAddress',
      streetAddress: locale === 'ar' ? clinic.addressAr : clinic.addressEn,
      addressLocality: 'Alexandria',
      addressCountry: 'EG'
    },
    review: reviews.map((review) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.name
      },
      reviewBody: review.body,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
        worstRating: '1'
      },
      publisher: {
        '@type': 'Organization',
        name: review.source
      }
    }))
  }

  return (
    <main className="container" style={{ padding: '2rem 0 3rem' }}>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsJsonLd) }}
      />
      <div className="prose">
        <h1>{t.testimonials.title}</h1>
        <p>
          {locale === 'ar'
            ? 'مراجعات منشورة من مرضى عن تجربة الجلدية الطبية وطب التجميل مع د. إسلام الحلو في الإسكندرية.'
            : 'Published patient feedback about medical dermatology and aesthetic care at Dr Islam El Helou Clinic Alexandria.'}
        </p>
      </div>

      <div style={{ marginTop: '1.2rem' }}>
        <TestimonialsSlider reviews={reviews} dir={locale === 'ar' ? 'rtl' : 'ltr'} />
      </div>

      <div className="card" style={{ marginTop: '1.2rem' }}>
        <div style={{ fontWeight: 800 }}>{locale === 'ar' ? 'هل ترغب في إضافة رأيك؟' : 'Want to leave a review?'}</div>
        <p style={{ color: 'var(--muted)' }}>
          {locale === 'ar'
            ? 'مراجعاتك تساعد المرضى الآخرين في اتخاذ قرارهم. يمكنك ترك مراجعة على ملف نشاطي التجاري في جوجل.'
            : 'Your feedback helps other patients. You can leave a review on Google Business Profile.'}
        </p>
        <div style={{ display: 'flex', gap: '.7rem', flexWrap: 'wrap' }}>
          <a className="btn" href={`https://wa.me/${clinic.whatsappE164.replace('+', '')}`} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
          <a className="btn btnPrimary" href={`tel:${clinic.phoneE164}`}>
            {locale === 'ar' ? 'اتصال' : 'Call'}
          </a>
        </div>
      </div>
    </main>
  )
}
