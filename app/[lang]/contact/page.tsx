import type { Metadata } from 'next'

import { isLocale, type Locale } from '@/lib/i18n'
import { clinic } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionaries'
import { buildLocalizedMetadata, getSiteUrl } from '@/lib/seo'
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
  const siteUrl = getSiteUrl()

  const contactFaqs =
    locale === 'ar'
      ? [
          {
            q: 'ما أسرع طريقة للحجز؟',
            a: 'أسرع طريقة للحجز هي التواصل عبر واتساب. ويمكنك أيضًا الاتصال مباشرة بالعيادة.'
          },
          {
            q: 'هل يمكن إرسال تفاصيل الحالة قبل الزيارة؟',
            a: 'نعم، يمكنك إرسال وصف مختصر أو صور واضحة عبر واتساب للمساعدة في التحضير قبل الكشف.'
          },
          {
            q: 'أين تقع العيادة؟',
            a: 'العيادة في الإسكندرية، ويمكن فتح الاتجاهات مباشرة عبر خرائط Google من صفحة التواصل.'
          },
          {
            q: 'هل التواصل متاح للحالات الجلدية العلاجية والتجميلية؟',
            a: 'نعم، التواصل متاح للاستفسار عن الجلدية العلاجية وطب التجميل والإجراءات الجلدية البسيطة.'
          }
        ]
      : [
          {
            q: 'What is the fastest way to book?',
            a: 'The fastest booking method is WhatsApp. You can also call the clinic directly.'
          },
          {
            q: 'Can I send case details before visiting?',
            a: 'Yes. You can send a brief summary or clear photos on WhatsApp to help pre-visit preparation.'
          },
          {
            q: 'Where is the clinic located?',
            a: 'The clinic is in Alexandria, and you can open directions directly on Google Maps from the contact page.'
          },
          {
            q: 'Is contact available for both medical and aesthetic dermatology?',
            a: 'Yes. You can contact the clinic about medical dermatology, aesthetic medicine, and minor skin procedures.'
          }
        ]

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: contactFaqs.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a
      }
    })),
    mainEntityOfPage: `${siteUrl}/${locale}/contact`
  }

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ContactClient locale={locale} t={t} />
    </>
  )
}
