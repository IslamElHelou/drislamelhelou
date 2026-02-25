import Image from 'next/image'
import type { Locale } from '@/lib/i18n'
import { clinic, isLocale } from '@/lib/i18n'

export default async function About({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const locale = (isLocale(lang) ? lang : 'en') as Locale

  return (
    <section className="section">
      <div className="container">
        <div className="grid grid2" style={{ alignItems: 'start' }}>
          <div className="prose">
            <h1>{locale === 'ar' ? `عن د. ${clinic.doctorName}` : `About Dr. ${clinic.doctorName}`}</h1>
            <p>
              {locale === 'ar'
                ? 'استشاري الأمراض الجلدية في الإسكندرية. خبرة واسعة في الجلدية الطبية مع اهتمام بالتجميل الآمن والنتائج الطبيعية.'
                : 'Consultant Dermatologist in Alexandria. Extensive medical dermatology experience with a careful, safety-first approach to aesthetic treatments.'}
            </p>
            <ul>
              <li>{locale === 'ar' ? 'تشخيص واضح وخطة علاج مفهومة.' : 'Clear diagnosis and an understandable plan.'}</li>
              <li>{locale === 'ar' ? 'توقعات واقعية—خاصة في الحالات الوراثية والمزمنة.' : 'Realistic expectations—especially for genetic and chronic conditions.'}</li>
              <li>{locale === 'ar' ? 'متابعة طويلة المدى للحفاظ على النتائج.' : 'Long-term follow-up to maintain results.'}</li>
            </ul>
            <p style={{ color: 'var(--muted)' }}>
              {locale === 'ar'
                ? 'ملاحظة: لا نعرض صور قبل/بعد أو معلومات مرضى لحماية الخصوصية. يمكن مناقشة النتائج المتوقعة بشكل علمي أثناء الكشف.'
                : 'Note: We do not publish identifiable patient data or before/after images to protect privacy. Expected outcomes are discussed scientifically during consultation.'}
            </p>
          </div>

          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <Image
              src="/clinic/waiting-room.webp"
              alt={locale === 'ar' ? 'العيادة' : 'Clinic'}
              width={1600}
              height={1194}
              style={{ width: '100%', height: 'auto' }}
            />
            <div style={{ padding: '1rem' }}>
              <div style={{ fontWeight: 800 }}>{clinic.brandName}</div>
              <div style={{ color: 'var(--muted)' }}>{locale === 'ar' ? clinic.addressAr : clinic.addressEn}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
