import type { Metadata } from 'next'
import Link from 'next/link'
import type { Locale } from '@/lib/i18n'
import { isLocale } from '@/lib/i18n'
import { ServicesGrid } from '@/components/ServicesGrid'
import { buildLocalizedMetadata } from '@/lib/seo'
import { getAllServiceLocationPages } from '@/lib/serviceLocationPages'

const services = {
  medical: {
    en: [
      'Acne & rosacea',
      'Eczema & allergic dermatitis',
      'Psoriasis',
      'Infections (fungal, bacterial, viral)',
      'Hair loss & scalp disorders',
      'Nail disorders',
      'Pigmentation (melasma, PIH)',
      'Vitiligo (assessment & options)',
      'Urticaria (hives)',
      'Skin checks & dermoscopy'
    ],
    ar: [
      'حب الشباب والوردية',
      'الإكزيما وحساسية الجلد',
      'الصدفية',
      'العدوى الجلدية (فطرية/بكتيرية/فيروسية)',
      'تساقط الشعر ومشاكل فروة الرأس',
      'أمراض الأظافر',
      'التصبغات (الكلف وآثار الالتهاب)',
      'البهاق (تقييم وخيارات العلاج)',
      'الشرى (الحساسية)',
      'فحص الجلد والدرموسكوب'
    ]
  },
  procedures: {
    en: ['Biopsy', 'Cryotherapy', 'Intralesional injections', 'Cyst / wart management', 'Minor dermatologic surgery'],
    ar: ['عينة من الجلد وتحليل باثولوجي', 'كي بالتبريد', 'حقن موضعي', 'التعامل مع الثآليل والأكياس', 'جراحات جلدية بسيطة']
  },
  aesthetic: {
    en: ['Botox (as indicated)', 'Fillers (natural enhancement)', 'Chemical peels', 'Scar & texture plans', 'Skin rejuvenation protocols'],
    ar: ['بوتوكس (عند الحاجة)', 'فيلر بنتائج طبيعية', 'تقشير كيميائي', 'خطط الندبات وملمس الجلد', 'بروتوكولات نضارة البشرة']
  }
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const locale = (isLocale(lang) ? lang : 'en') as Locale

  return buildLocalizedMetadata({
    locale,
    path: '/services',
    title: locale === 'ar' ? 'الخدمات الجلدية والتجميلية' : 'Dermatology Services',
    description:
      locale === 'ar'
        ? 'خدمات الجلدية الطبية، أخذ عينة من الجلد وتحليل باثولوجي والإجراءات الجلدية، وطب التجميل الآمن في عيادة د. إسلام الحلو بالإسكندرية.'
        : 'Medical dermatology, skin procedures, biopsies, and safety-first aesthetic services at Dr. Islam El-Helou’s clinic in Alexandria.'
  })
}

export default async function ServicesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const locale = (isLocale(lang) ? lang : 'en') as Locale
  const L = locale === 'ar' ? 'ar' : 'en'
  const serviceLocationPages = getAllServiceLocationPages()

  return (
    <section className="section">
      <div className="container">
        <div className="prose">
          <h1>{locale === 'ar' ? 'خدمات الجلدية وطب التجميل | عيادة د. إسلام الحلو - الإسكندرية' : 'Dermatology Services | Dr Islam El Helou Clinic Alexandria'}</h1>
          <p>
            {locale === 'ar'
              ? 'مزيج بين الجلدية الطبية والتجميل الآمن في عيادة د. إسلام الحلو بالإسكندرية. يتم اختيار الأنسب بعد التقييم والتشخيص.'
              : 'A balanced mix of medical dermatology and safety-first aesthetics at Dr Islam El Helou Clinic Alexandria. The best option is chosen after evaluation and diagnosis.'}
          </p>
        </div>

        <div style={{ marginTop: '1.4rem' }}>
          <ServicesGrid locale={locale === 'ar' ? 'ar' : 'en'} />
        </div>

        <div className="grid" style={{ marginTop: '1.2rem' }}>
          <div className="card">
            <div style={{ fontWeight: 900, fontSize: '1.1rem' }}>{locale === 'ar' ? 'جلدية طبية' : 'Medical Dermatology'}</div>
            <ul style={{ margin: '.7rem 0 0', color: 'var(--muted)' }}>
              {services.medical[L].map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>

          <div className="grid grid2">
            <div className="card">
              <div style={{ fontWeight: 900, fontSize: '1.1rem' }}>{locale === 'ar' ? 'إجراءات' : 'Procedures'}</div>
              <ul style={{ margin: '.7rem 0 0', color: 'var(--muted)' }}>
                {services.procedures[L].map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>

            <div className="card">
              <div style={{ fontWeight: 900, fontSize: '1.1rem' }}>{locale === 'ar' ? 'تجميل' : 'Aesthetic Dermatology'}</div>
              <ul style={{ margin: '.7rem 0 0', color: 'var(--muted)' }}>
                {services.aesthetic[L].map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="card">
            <div style={{ fontWeight: 900, fontSize: '1.1rem' }}>{locale === 'ar' ? 'سياسة التوقعات الواقعية' : 'Realistic expectations policy'}</div>
            <p style={{ color: 'var(--muted)', marginBottom: 0 }}>
              {locale === 'ar'
                ? 'بعض الأمراض الوراثية أو المزمنة قد تحتاج خطة طويلة المدى وتحسن تدريجي. سيتم شرح ما يمكن وما لا يمكن تحقيقه بوضوح أثناء زيارتك في عيادة د. إسلام الحلو بالإسكندرية.'
                : 'Some genetic or chronic conditions require long-term plans and gradual improvement. We explain clearly what is and isn’t realistically achievable during your visit at Dr Islam El Helou Clinic Alexandria.'}
            </p>
          </div>
        </div>

        <div className="card" style={{ marginTop: '1rem' }}>
          <div style={{ fontWeight: 900, fontSize: '1.1rem' }}>
            {locale === 'ar'
              ? 'صفحات توضيحية للحالات الجلدية الشائعة'
              : 'Detailed Pages for Common Skin Conditions'}
          </div>
          <p style={{ color: 'var(--muted)' }}>
            {locale === 'ar'
              ? 'اطلع على صفحات مفصلة لحب الشباب، تساقط الشعر، التصبغات، والصدفية مع شرح عملي لطريقة التقييم والعلاج.'
              : 'Explore detailed pages for acne, hair loss, pigmentation, and psoriasis with practical guidance on evaluation and care.'}
          </p>
          <div className="grid grid2">
            {serviceLocationPages.map((page) => (
              <Link
                key={page.slug}
                href={`/${locale}/services/${page.slug}`}
                className="card"
                style={{ textDecoration: 'none' }}
              >
                <div style={{ fontWeight: 800 }}>{page.title[locale]}</div>
                <div className="journalRead" style={{ marginTop: 8 }}>
                  {locale === 'ar' ? 'عرض الصفحة' : 'View page'}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
