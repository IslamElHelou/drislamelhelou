import type { Metadata } from 'next'
import Link from 'next/link'
import { FadeIn } from '@/components/Motion'
import { getDictionary } from '@/lib/dictionaries'
import { clinic, isLocale, type Locale } from '@/lib/i18n'

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const locale = (isLocale(lang) ? lang : 'en') as Locale
  const t = getDictionary(locale)
  return {
    title: `${t.results.title} • ${clinic.brandName}`,
    description: t.results.subtitle,
    alternates: {
      canonical: `/${locale}/results`,
      languages: {
        en: '/en/results',
        ar: '/ar/results',
        'x-default': '/en/results'
      }
    }
  }
}

export default async function ResultsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const locale = (isLocale(lang) ? lang : 'en') as Locale
  const t = getDictionary(locale)
  const base = `/${locale}`

  const items =
    locale === 'ar'
      ? [
          {
            title: 'نبدأ بالتشخيص الصحيح',
            body: 'النتيجة الجيدة تبدأ من فهم المشكلة بدقة. قد نحتاج تحاليل أو خزعة جلدية أو فحص بالمنظار الجلدي.'
          },
          {
            title: 'خطة علاج مكتوبة وبسيطة',
            body: 'نفضل خطة واضحة قابلة للتطبيق في الحياة اليومية، مع متابعة وتعديل حسب الاستجابة.'
          },
          {
            title: 'توقعات واقعية',
            body: 'بعض الحالات تتحسن سريعاً، وأخرى تحتاج وقتاً. الأمراض الوراثية أو المزمنة قد تتحسن لكن لا تُشفى نهائياً دائماً.'
          },
          {
            title: 'نقيس التقدم',
            body: 'نستخدم صور متابعة عند الحاجة، ومقاييس بسيطة للأعراض، وملاحظاتك اليومية لتحقيق أفضل نتيجة.'
          }
        ]
      : [
          {
            title: 'Start with the right diagnosis',
            body: 'Good results begin with accurate diagnosis. We may use labs, dermoscopy, or a skin biopsy when indicated.'
          },
          {
            title: 'A clear, practical plan',
            body: 'We aim for a simple written plan you can follow, with follow‑up and adjustments based on response.'
          },
          {
            title: 'Realistic expectations',
            body: 'Some conditions improve quickly; others take time. Genetic or chronic diseases may improve, but are not always fully curable.'
          },
          {
            title: 'We measure progress',
            body: 'When useful, we use follow‑up photos, symptom scores, and your day‑to‑day notes to track improvement.'
          }
        ]

  return (
    <main className="container" style={{ padding: '2rem 0 3rem' }}>
      <div className="prose">
        <h1>{t.results.title}</h1>
        <p>{t.results.subtitle}</p>
      </div>

      <div className="grid grid2" style={{ marginTop: '1.2rem' }}>
        {items.map((it, idx) => (
          <FadeIn key={idx} delay={idx * 0.04}>
            <div className="card">
              <div style={{ fontWeight: 800 }}>{it.title}</div>
              <p style={{ color: 'var(--muted)' }}>{it.body}</p>
            </div>
          </FadeIn>
        ))}
      </div>

      <div className="card" style={{ marginTop: '1.2rem' }}>
        <div style={{ fontWeight: 800 }}>{locale === 'ar' ? 'هل لديك حالة تحتاج رأي متخصص؟' : 'Need expert guidance?'}</div>
        <p style={{ color: 'var(--muted)' }}>
          {locale === 'ar'
            ? 'ابدأ بزيارة تقييم وتشخيص، ثم خطة علاج تناسب نمط حياتك.'
            : 'Start with a focused evaluation and diagnosis, then a plan that fits your lifestyle.'}
        </p>
        <div style={{ display: 'flex', gap: '.7rem', flexWrap: 'wrap' }}>
          <Link className="btn btnPrimary" href={`${base}/contact`}>
            {locale === 'ar' ? 'احجز الآن' : 'Book an appointment'}
          </Link>
          <Link className="btn" href={`${base}/faq`}>
            {locale === 'ar' ? 'الأسئلة الشائعة' : 'Read FAQ'}
          </Link>
        </div>
      </div>

      <p style={{ color: 'var(--muted)', marginTop: '1rem', fontSize: '.92rem' }}>
        {locale === 'ar'
          ? 'ملاحظة: المعلومات هنا للتثقيف ولا تغني عن الفحص الطبي.'
          : 'Note: This page is educational and does not replace a medical examination.'}
      </p>
    </main>
  )
}
