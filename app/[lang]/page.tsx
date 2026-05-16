import Link from 'next/link'
import Image from 'next/image'
import { FadeIn } from '@/components/Motion'
import DeferredMapEmbed from '@/components/DeferredMapEmbed'
import HeroPortrait from '@/components/HeroPortrait'
import InsightsPreview from '@/components/InsightsPreview'
import { ServicesGrid } from '@/components/ServicesGrid'
import { getDictionary } from '@/lib/dictionaries'
import { clinic, getClinicBrandName, getGoogleMapsDirectionsUrl, getMapEmbedSrc, isLocale, type Locale } from '@/lib/i18n'
import { getAllPosts } from '@/lib/mdx'
import { buildLocalizedMetadata } from '@/lib/seo'
import type { Metadata } from 'next'
import { getAllServiceLocationPages } from '@/lib/serviceLocationPages'

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const locale = (isLocale(lang) ? lang : 'en') as Locale
  const t = getDictionary(locale)

  return buildLocalizedMetadata({
    locale,
    path: '',
    title: locale === 'ar' ? 'د. إسلام الحلو | استشاري الجلدية في الإسكندرية' : 'Dr. Islam El-Helou | Dermatology Clinic in Alexandria',
    description: t.hero.lead
  })
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const locale = (isLocale(lang) ? lang : 'en') as Locale
  const t = getDictionary(locale)
  const base = `/${locale}`
  const brandName = getClinicBrandName(locale)
  const mapDirectionsUrl = getGoogleMapsDirectionsUrl(locale)
  const mapEmbedSrc = getMapEmbedSrc(locale)
  const serviceLocationPages = getAllServiceLocationPages()
  const roadmapSteps =
    locale === 'ar'
      ? [
          {
            title: 'التشخيص',
            body: 'نبدأ بتاريخ مرضي دقيق، فحص جلدي منظم، وتحديد المحفزات والعوامل المصاحبة.'
          },
          {
            title: 'الاستقرار',
            body: 'يتم ضبط العلاج ومتابعة الاستجابة تدريجيًا حتى تهدأ النوبات وتصبح الخطة قابلة للاستمرار.'
          },
          {
            title: 'جلد أوضح',
            body: 'الهدف هو تحسن واضح وثابت مع توقعات واقعية ومراجعات عند الحاجة.'
          }
        ]
      : [
          {
            title: 'Diagnosis',
            body: 'We start with structured history-taking, skin examination, and trigger identification.'
          },
          {
            title: 'Stabilization',
            body: 'Treatment is adjusted in stages until flares are controlled and the plan becomes sustainable.'
          },
          {
            title: 'Clearer Skin',
            body: 'The goal is visible, steady improvement with realistic expectations and timely review.'
          }
        ]

  const address = locale === 'ar' ? clinic.addressAr : clinic.addressEn
  const posts = getAllPosts(locale).slice(0, 3)
  const photoGallery =
    locale === 'ar'
      ? [
          {
            src: '/images/doctor.webp',
            alt: 'د. إسلام الحلو داخل العيادة في الإسكندرية',
            caption: 'د. إسلام الحلو - استشاري الأمراض الجلدية'
          },
          {
            src: '/clinic/waiting-room.webp',
            alt: 'منطقة انتظار العيادة في الإسكندرية',
            caption: 'بيئة عيادة هادئة ومنظمة'
          },
          {
            src: '/brand/logo.png',
            alt: 'شعار عيادة د. إسلام الحلو',
            caption: 'الهوية البصرية للعيادة'
          }
        ]
      : [
          {
            src: '/images/doctor.webp',
            alt: 'Dr Islam El Helou at the dermatology clinic in Alexandria',
            caption: 'Dr Islam El Helou - Consultant Dermatologist'
          },
          {
            src: '/clinic/waiting-room.webp',
            alt: 'Clinic waiting room in Alexandria',
            caption: 'Calm and organized clinic environment'
          },
          {
            src: '/brand/logo.png',
            alt: 'Dr Islam El Helou Clinic brand logo',
            caption: 'Clinic visual identity'
          }
        ]

  // Curated 5★ “Google” reviews (placeholders). Replace with real text from Google Business.
  const reviews =
    locale === 'ar'
      ? [
          {
            name: 'Ahmed M.',
            body: 'تشخيص واضح وخطة علاج منظمة. التعامل محترم وهادئ والنتيجة كانت ملحوظة.'
          },
          {
            name: 'Mona S.',
            body: 'شرح كل خطوة بالتفصيل. الكشف كان شامل بدون استعجال والعيادة منظمة.'
          },
          {
            name: 'Youssef A.',
            body: 'بعد محاولات كثيرة وصلت للتشخيص الصحيح وخطة متابعة واضحة بنتائج تدريجية.'
          }
        ]
      : [
          {
            name: 'Ahmed M.',
            body: 'Clear diagnosis and a structured plan. Professional, calm, and noticeable improvement.'
          },
          {
            name: 'Mona S.',
            body: 'Everything was explained clearly. The consultation felt thorough and not rushed.'
          },
          {
            name: 'Youssef A.',
            body: 'Finally reached the correct diagnosis with a clear follow-up plan and steady progress.'
          }
        ]

  return (
    <>
      {/* HERO */}
      <section className="container hero">
        <div className="heroShell">
          <div className="heroBg" aria-hidden />
          <div className="heroInner">
            <div className="grid grid2" style={{ alignItems: 'center' }}>
              <div>
                <span className="badge">{t.hero.badge}</span>
                <h1 className="heroTitle">{t.hero.headline}</h1>
                <div className="heroGoldLine" aria-hidden />
                <div className="heroRole">
                  <span style={{ fontWeight: 900 }}>{t.hero.name}</span>
                  <span style={{ marginInline: '.5rem', opacity: 0.6 }} aria-hidden>
                    •
                  </span>
                  <span>{t.hero.title}</span>
                </div>
                <p className="heroSubtitle" style={{ marginTop: '.9rem' }}>
                  {t.hero.lead}
                </p>
                <p className="muted" style={{ marginTop: '.65rem', maxWidth: '70ch' }}>
                  {locale === 'ar'
                    ? 'عيادة د. إسلام الحلو بالإسكندرية تقدم تشخيصًا منظمًا لحب الشباب، تساقط الشعر، التصبغات، الإكزيما، والصدفية، مع إجراءات جلدية عند الحاجة.'
                    : 'Dr Islam El Helou Clinic Alexandria offers structured diagnosis for acne, hair loss, pigmentation, eczema, psoriasis, and skin procedures when needed.'}
                </p>

                <div style={{ display: 'flex', gap: '.8rem', flexWrap: 'wrap', marginTop: '1.1rem' }}>
                  <a
                    className="btn btnPrimary"
                    href={`https://wa.me/${clinic.whatsappE164.replace('+', '')}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t.hero.ctaPrimary}
                  </a>
                  <a className="btn" href="#philosophy">
                    {t.hero.ctaSecondary}
                  </a>
                </div>

                <div className="heroPhilosophy" role="note" aria-label={t.philosophy.title}>
                  <div style={{ fontWeight: 900, marginBottom: '.45rem' }}>
                    {locale === 'ar' ? 'كيف نعمل' : 'How we work'}
                  </div>
                  <ul className="heroList">
                    {t.philosophy.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>

                <div className="kpis">
                  <span className="badge">{locale === 'ar' ? 'خبرة +20 سنة' : '20+ years experience'}</span>
                  <span className="badge">{locale === 'ar' ? 'الإسكندرية' : 'Alexandria'}</span>
                  <span className="badge">{locale === 'ar' ? 'جلدية علاجية + تجميل' : 'Medical + Aesthetic'}</span>
                </div>
              </div>

              <HeroPortrait
                nameLine={t.hero.name}
                titleLine={t.hero.title}
                addressLine={address}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section" id="philosophy">
        <div className="container">
          <div className="grid grid2" style={{ alignItems: 'start' }}>
            <FadeIn>
              <div className="prose">
                <div className="badge">{t.philosophy.title}</div>
                <h2 style={{ margin: '.7rem 0 .6rem' }}>{t.philosophy.headline}</h2>
                <p>{t.philosophy.body}</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.06}>
              <div className="card">
                <div style={{ fontWeight: 900 }}>{locale === 'ar' ? 'المبادئ' : 'Principles'}</div>
                <ul style={{ margin: '.7rem 0 0', color: 'var(--muted)' }}>
                  {t.philosophy.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '1rem' }}>
            <h2 className="sectionTitle" style={{ margin: 0 }}>
              {locale === 'ar' ? 'الخدمات' : 'Services'}
            </h2>
            <Link className="link" href={`${base}/services`}>
              {t.servicesHome.viewAll}
            </Link>
          </div>

          <FadeIn>
            <ServicesGrid locale={locale} />
          </FadeIn>

          <div className="card" style={{ marginTop: '1rem' }}>
            <div style={{ fontWeight: 900 }}>
              {locale === 'ar'
                ? 'صفحات توضيحية للحالات الجلدية الشائعة'
                : 'Detailed Pages for Common Skin Conditions'}
            </div>
            <div className="grid grid2" style={{ marginTop: '.7rem' }}>
              {serviceLocationPages.map((page) => (
                <Link
                  key={page.slug}
                  href={`${base}/services/${page.slug}`}
                  className="journalRead"
                  style={{ width: 'fit-content' }}
                >
                  {page.condition[locale]}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="roadmapShell" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
            <div className="roadmapIntro">
              <div className="badge">{locale === 'ar' ? 'خطة علاج مزمنة' : 'Chronic Care Roadmap'}</div>
              <h2 className="sectionTitle" style={{ marginBottom: '.45rem' }}>
                {locale === 'ar' ? 'رحلة منظمة من التقييم إلى التحسن' : 'A structured path from assessment to control'}
              </h2>
              <p className="muted" style={{ maxWidth: '65ch' }}>
                {locale === 'ar'
                  ? 'للحالات المزمنة مثل الصدفية وحب الشباب والالتهاب المتكرر، المتابعة تكون على مراحل واضحة وليست زيارة عابرة.'
                  : 'For chronic conditions such as psoriasis, acne, and recurrent inflammation, progress happens through clear stages rather than a single visit.'}
              </p>
            </div>

            <div className="roadmapTimeline">
              {roadmapSteps.map((step, index) => (
                <div key={step.title} className="roadmapStep">
                  <div className="roadmapMarker">
                    <span>{index + 1}</span>
                  </div>
                  <div className="roadmapContent">
                    <div className="roadmapTitle">{step.title}</div>
                    <div className="roadmapBody">{step.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Insights */}
      <InsightsPreview locale={locale} />

      {/* Clinic environment */}
      <section className="section">
        <div className="container">
          <div className="grid grid2" style={{ alignItems: 'center' }}>
            <FadeIn>
              <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                {/* Replace with your best private-clinic photo(s) */}
                <Image
                  src="/clinic/waiting-room.webp"
                  alt={locale === 'ar' ? 'بيئة العيادة' : 'Clinic environment'}
                  width={1600}
                  height={1194}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
            </FadeIn>
            <FadeIn delay={0.06}>
              <div className="prose">
                <h2 style={{ marginTop: 0 }}>{t.clinicEnv.title}</h2>
                <p>{t.clinicEnv.body}</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Photo gallery for image SEO */}
      <section className="section" aria-labelledby="clinic-photo-gallery">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '1rem' }}>
            <h2 id="clinic-photo-gallery" className="sectionTitle" style={{ margin: 0 }}>
              {locale === 'ar' ? 'صور العيادة' : 'Clinic Photos'}
            </h2>
            <Link className="link" href={`${base}/about`}>
              {locale === 'ar' ? 'المزيد عن العيادة' : 'More about the clinic'}
            </Link>
          </div>

          <div className="grid grid3" style={{ marginTop: '.9rem' }}>
            {photoGallery.map((item, i) => (
              <FadeIn key={item.src} delay={i * 0.05}>
                <figure className="card" style={{ padding: 0, overflow: 'hidden' }}>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={item.src.includes('logo') ? 1024 : item.src.includes('doctor') ? 900 : 1600}
                    height={item.src.includes('logo') ? 1024 : item.src.includes('doctor') ? 900 : 1194}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    loading="lazy"
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                  <figcaption style={{ padding: '.8rem 1rem', color: 'var(--muted)' }}>{item.caption}</figcaption>
                </figure>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="section">
        <div className="container">
          <div className="grid grid2" style={{ alignItems: 'start' }}>
            <FadeIn>
              <div className="prose">
                <h2 style={{ marginTop: 0 }}>{t.about.title}</h2>
                <p>{t.about.body}</p>
                <p>
                  {locale === 'ar'
                    ? 'تقع العيادة على طريق الجيش بالإسكندرية، مع تركيز على الجلدية العلاجية وطب التجميل الطبي بخطط علاج واضحة ومتابعة طويلة المدى.'
                    : 'The clinic is based on El Geish Road in Alexandria, with a focus on medical dermatology and aesthetic medicine through clear plans and long-term follow-up.'}
                </p>
                <Link className="btn" href={`${base}/about`} style={{ marginTop: '.6rem' }}>
                  {locale === 'ar' ? 'اقرأ المزيد' : 'Read more'}
                </Link>
              </div>
            </FadeIn>
            <FadeIn delay={0.06}>
              <div className="card">
                <div style={{ fontWeight: 900 }}>{brandName}</div>
                <p style={{ margin: 0 }}>{address}</p>
                <div style={{ display: 'flex', gap: '.8rem', flexWrap: 'wrap', marginTop: '.9rem' }}>
                  <a
                    className="btn btnPrimary"
                    href={`https://wa.me/${clinic.whatsappE164.replace('+', '')}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t.cta.bookWhatsApp}
                  </a>
                  <a className="btn" href={`tel:${clinic.phoneE164}`}>
                    {t.cta.call}
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Appointment CTA */}
      <section className="section">
        <div className="container">
          <div className="card" style={{ padding: '1.2rem 1.2rem' }}>
            <div className="grid grid2" style={{ alignItems: 'center' }}>
              <div className="prose">
                <h2 style={{ marginTop: 0 }}>{t.cta.title}</h2>
                <p>{t.cta.body}</p>
              </div>
              <div style={{ display: 'flex', gap: '.8rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                <a
                  className="btn btnPrimary"
                  href={`https://wa.me/${clinic.whatsappE164.replace('+', '')}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.cta.bookWhatsApp}
                </a>
                <a className="btn" href={`tel:${clinic.phoneE164}`}>
                  {t.cta.call}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google reviews (curated) */}
      <section className="section">
        <div className="container">
          <div className="sliderTop">
            <div>
              <h2 className="sectionTitle" style={{ margin: 0 }}>
                {t.reviews.title}
              </h2>
              <div className="muted" style={{ marginTop: '.25rem' }}>
                {t.reviews.subtitle}
              </div>
            </div>
            <a className="btn" href={clinic.googleReviewsUrl} target="_blank" rel="noreferrer">
              {t.reviews.viewAll}
            </a>
          </div>

          <div className="grid grid3" style={{ marginTop: '.9rem' }}>
            {reviews.map((r, i) => (
              <FadeIn key={r.name} delay={i * 0.05}>
                <div className="card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'baseline' }}>
                    <div style={{ fontWeight: 900 }}>{r.name}</div>
                    <span className="badge">{t.reviews.badge}</span>
                  </div>
                  <p style={{ margin: 0 }}>{r.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Blog preview */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '1rem' }}>
            <div>
              <h2 className="sectionTitle" style={{ margin: 0 }}>
                {t.blog.title}
              </h2>
              <div className="muted" style={{ marginTop: '.25rem' }}>
                {t.blog.subtitle}
              </div>
            </div>
            <Link className="btn" href={`${base}/blog`}>
              {t.blog.more}
            </Link>
          </div>

          <div className="grid grid3" style={{ marginTop: '.9rem' }}>
            {posts.map((p, i) => (
              <FadeIn key={p.slug} delay={i * 0.05}>
                <Link href={`${base}/blog/${p.slug}`} className="card">
                  <div style={{ fontWeight: 900 }}>{p.title}</div>
                  <p style={{ margin: 0 }}>{p.description}</p>
                  <div className="link" style={{ marginTop: '.35rem' }}>
                    {t.blog.read}
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="section">
        <div className="container">
          <h2 className="sectionTitle">{locale === 'ar' ? 'موقع عيادة د. إسلام الحلو - الإسكندرية' : 'Dr Islam El Helou Clinic Location in Alexandria'}</h2>
          <div className="grid grid2" style={{ alignItems: 'start' }}>
            <div className="card">
              <div style={{ fontWeight: 900 }}>{brandName}</div>
              <p>{address}</p>
              <p style={{ color: 'var(--muted)' }}>
                {locale === 'ar'
                  ? 'موقع مناسب لزيارات الجلدية العلاجية، المتابعة، والإجراءات الجلدية البسيطة في الإسكندرية.'
                  : 'Conveniently located for medical dermatology visits, follow-up, and minor skin procedures in Alexandria.'}
              </p>
              <p style={{ marginTop: '.6rem' }}>
                <a className="link" href={`tel:${clinic.phoneE164}`}>
                  {clinic.phoneE164}
                </a>
              </p>
              <p style={{ marginTop: '.4rem' }}>
                <a
                  className="link"
                  href={`https://wa.me/${clinic.whatsappE164.replace('+', '')}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp: {clinic.whatsappE164}
                </a>
              </p>
              <p style={{ marginTop: '.4rem' }}>
                <a className="link" href={mapDirectionsUrl} target="_blank" rel="noreferrer">
                  {locale === 'ar' ? 'الاتجاهات عبر خرائط Google' : 'Directions on Google Maps'}
                </a>
              </p>
            </div>

            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <DeferredMapEmbed
                title="Google Map"
                src={mapEmbedSrc}
                loadLabel={locale === 'ar' ? 'عرض الخريطة' : 'Load map'}
                height={360}
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
