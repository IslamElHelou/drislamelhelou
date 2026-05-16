import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n'
import { isLocale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionaries'
import InsightsHubClient from '@/components/InsightsHubClient'
import SavedInsightsClient from '@/components/SavedInsightsClient'
import { buildLocalizedMetadata } from '@/lib/seo'

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const locale = (isLocale(lang) ? lang : 'en') as Locale

  return buildLocalizedMetadata({
    locale,
    path: '/insights',
    title: locale === 'ar' ? 'مركز الإرشادات التفاعلية في طب الجلدية' : 'Dermatology Insight Center',
    description:
      locale === 'ar'
        ? 'أدوات تفاعلية تعليمية لفهم حب الشباب، تساقط الشعر، التصبغات، الوردية، الإكزيما، والصدفية، ومتى يكون التقييم الطبي مطلوبًا.'
        : 'Interactive educational tools to understand acne, hair loss, pigmentation, rosacea, eczema, psoriasis, and when dermatology review is useful.'
  })
}

export default async function InsightsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const locale = (isLocale(lang) ? lang : 'en') as Locale
  const t = getDictionary(locale)

  return (
    <section className="section">
      <div className="container">
        <div className="journalHeader">
          <div className="journalKicker">{locale === 'ar' ? 'مركز الإرشادات' : 'Insight Center'}</div>
          <h1 className="journalTitle">{locale === 'ar' ? 'مركز الإرشادات التفاعلية في طب الجلدية' : 'Dermatology Insight Center'}</h1>
          <div className="goldLine" aria-hidden />
          <p className="journalLead">
            {locale === 'ar'
              ? 'أدوات تعليمية منظمة تساعدك على فهم النمط العام للحالة ومتى يكون التقييم الطبي مفيدًا، بدون تشخيص مباشر أو وصفات علاجية.'
              : 'Structured educational tools to understand common patterns and when a medical review is helpful — without diagnosis or prescriptions.'}
          </p>
        </div>

        <div style={{ marginTop: '1.2rem' }}>
          <SavedInsightsClient locale={locale} />
          <InsightsHubClient locale={locale} />
        </div>

        <div className="insightNote" style={{ marginTop: 18 }}>
          {locale === 'ar'
            ? 'هذه الأدوات للتثقيف فقط ولا تُعد تشخيصًا. التشخيص يحتاج تقييمًا إكلينيكيًا مباشرًا.'
            : 'These tools are educational and not a diagnosis. Diagnosis requires clinical evaluation.'}
        </div>

        <div style={{ marginTop: 18 }} className="journalLead">
          {locale === 'ar'
            ? 'للحجز أو الاستفسار: تواصل عبر واتساب من صفحة التواصل.'
            : 'For appointments or inquiries, you can book via WhatsApp from the Contact page.'}{' '}
          <a className="journalRead" href={`/${locale}/contact`}>{t.nav.contact}</a>
        </div>
      </div>
    </section>
  )
}
