import type { Metadata } from 'next'
import { getDictionary } from '@/lib/dictionaries'
import { clinic, isLocale, type Locale } from '@/lib/i18n'
import TestimonialsSlider, { type Review } from '@/components/TestimonialsSlider'

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

  return (
    <main className="container" style={{ padding: '2rem 0 3rem' }}>
      <div className="prose">
        <h1>{t.testimonials.title}</h1>
        <p>{t.testimonials.subtitle}</p>
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
