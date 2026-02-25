import type { Metadata } from 'next'
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
    title: `${t.faq.title} • ${clinic.brandName}`,
    description: t.faq.subtitle,
    alternates: {
      canonical: `/${locale}/faq`,
      languages: {
        en: '/en/faq',
        ar: '/ar/faq',
        'x-default': '/en/faq'
      }
    }
  }
}

export default async function FAQPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const locale = (isLocale(lang) ? lang : 'en') as Locale
  const t = getDictionary(locale)

  const faqs =
    locale === 'ar'
      ? [
          {
            q: 'هل أحتاج إلى حجز موعد مسبقاً؟',
            a: 'نعم. الحجز يضمن وقتاً مناسباً وتقليل الانتظار. يمكنك الحجز عبر واتساب أو الاتصال مباشرة.'
          },
          {
            q: 'هل يمكنني إرسال صور قبل الزيارة؟',
            a: 'يمكن إرسال صور أو تقارير عبر واتساب للمساعدة في التحضير، لكن التشخيص النهائي غالباً يحتاج فحصاً مباشراً.'
          },
          {
            q: 'كم يستغرق العلاج حتى تظهر النتائج؟',
            a: 'يختلف حسب الحالة. بعض الحالات تتحسن خلال أسابيع، وأخرى تحتاج خطة طويلة ومتابعة منتظمة.'
          },
          {
            q: 'هل تتعاملون مع الحالات الصعبة أو غير المشخصة؟',
            a: 'نعم. نركز على التشخيص الدقيق، وقد نطلب تحاليل أو خزعة جلدية عند الحاجة.'
          },
          {
            q: 'هل تقدمون خدمات تجميلية؟',
            a: 'نعم، مع الحفاظ على الأساس الطبي. نختار الإجراء المناسب فقط عندما يكون آمناً ومفيداً للحالة.'
          },
          {
            q: 'هل أحتاج لإيقاف أدوية قبل الخزعة أو الإجراءات؟',
            a: 'أخبرنا بكل الأدوية (خصوصاً مميعات الدم). سنعطيك تعليمات واضحة قبل أي إجراء.'
          }
        ]
      : [
          {
            q: 'Do I need an appointment?',
            a: 'Yes. Booking helps reduce waiting time. You can book by WhatsApp or phone call.'
          },
          {
            q: 'Can I send photos before visiting?',
            a: 'You may send photos or reports via WhatsApp to help us prepare, but most diagnoses still require an in‑person exam.'
          },
          {
            q: 'How long until I see results?',
            a: 'It depends on the condition. Some improve within weeks, others need a longer plan and follow‑up.'
          },
          {
            q: 'Do you manage complex or unclear cases?',
            a: 'Yes. We focus on accurate diagnosis and may request labs, dermoscopy, or a skin biopsy when needed.'
          },
          {
            q: 'Do you offer aesthetic treatments?',
            a: 'Yes—while keeping a medical-first approach. We recommend procedures only when safe and indicated.'
          },
          {
            q: 'Do I need to stop medications before procedures?',
            a: 'Tell us about all medications (especially blood thinners). We will give clear instructions before any procedure.'
          }
        ]

  return (
    <main className="container" style={{ padding: '2rem 0 3rem' }}>
      <div className="prose">
        <h1>{t.faq.title}</h1>
        <p>{t.faq.subtitle}</p>
      </div>

      <div className="grid" style={{ marginTop: '1.2rem' }}>
        {faqs.map((item, idx) => (
          <FadeIn key={idx} delay={idx * 0.04}>
            <div className="card">
              <div style={{ fontWeight: 800 }}>{item.q}</div>
              <p style={{ marginTop: '.35rem', color: 'var(--muted)' }}>{item.a}</p>
            </div>
          </FadeIn>
        ))}
      </div>

      <div className="card" style={{ marginTop: '1.2rem' }}>
        <div style={{ fontWeight: 800 }}>{locale === 'ar' ? 'احجز الآن' : 'Book now'}</div>
        <p style={{ color: 'var(--muted)' }}>
          {locale === 'ar'
            ? `للحجز أو الاستفسار، تواصل عبر واتساب أو اتصل بنا: ${clinic.phoneE164}`
            : `For booking or questions, contact us via WhatsApp or call: ${clinic.phoneE164}`}
        </p>
        <div style={{ display: 'flex', gap: '.7rem', flexWrap: 'wrap' }}>
          <a className="btn btnPrimary" href={`https://wa.me/${clinic.whatsappE164.replace('+', '')}`} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
          <a className="btn" href={`tel:${clinic.phoneE164}`}>
            {locale === 'ar' ? 'اتصال' : 'Call'}
          </a>
        </div>
      </div>
    </main>
  )
}
