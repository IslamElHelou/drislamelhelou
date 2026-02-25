import Link from 'next/link'
import Image from 'next/image'
import { FadeIn } from '@/components/Motion'
import HeroPortrait from '@/components/HeroPortrait'
import InsightsPreview from '@/components/InsightsPreview'
import { getDictionary } from '@/lib/dictionaries'
import { clinic, isLocale, type Locale } from '@/lib/i18n'
import { getAllPosts } from '@/lib/mdx'

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const locale = (isLocale(lang) ? lang : 'en') as Locale
  const t = getDictionary(locale)
  const base = `/${locale}`

  const address = locale === 'ar' ? clinic.addressAr : clinic.addressEn
  const posts = getAllPosts(locale).slice(0, 3)

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
                  <span className="badge">{locale === 'ar' ? 'الإسكندرية • جليم' : 'Alexandria • Gleem'}</span>
                  <span className="badge">{locale === 'ar' ? 'جلدية طبية + تجميل' : 'Medical + Aesthetic'}</span>
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

          <div className="grid grid3" style={{ marginTop: '.9rem' }}>
            <FadeIn>
              <div className="card">
                <div style={{ fontWeight: 900 }}>{t.servicesHome.titleMedical}</div>
                <p>{t.servicesHome.descMedical}</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.05}>
              <div className="card">
                <div style={{ fontWeight: 900 }}>{t.servicesHome.titleAesthetic}</div>
                <p>{t.servicesHome.descAesthetic}</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="card">
                <div style={{ fontWeight: 900 }}>{t.servicesHome.titleProcedures}</div>
                <p>{t.servicesHome.descProcedures}</p>
              </div>
            </FadeIn>
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

      {/* About */}
      <section className="section">
        <div className="container">
          <div className="grid grid2" style={{ alignItems: 'start' }}>
            <FadeIn>
              <div className="prose">
                <h2 style={{ marginTop: 0 }}>{t.about.title}</h2>
                <p>{t.about.body}</p>
                <Link className="btn" href={`${base}/about`} style={{ marginTop: '.6rem' }}>
                  {locale === 'ar' ? 'اقرأ المزيد' : 'Read more'}
                </Link>
              </div>
            </FadeIn>
            <FadeIn delay={0.06}>
              <div className="card">
                <div style={{ fontWeight: 900 }}>{clinic.brandName}</div>
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
          <h2 className="sectionTitle">{locale === 'ar' ? 'الموقع' : 'Location'}</h2>
          <div className="grid grid2" style={{ alignItems: 'start' }}>
            <div className="card">
              <div style={{ fontWeight: 900 }}>{clinic.brandName}</div>
              <p>{address}</p>
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
                <a className="link" href={clinic.googleMapsDirectionsUrl} target="_blank" rel="noreferrer">
                  {locale === 'ar' ? 'الاتجاهات عبر خرائط Google' : 'Directions on Google Maps'}
                </a>
              </p>
            </div>

            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <iframe
                title="Google Map"
                src={clinic.mapEmbedSrc}
                width="100%"
                height="360"
                loading="lazy"
                style={{ border: 0, display: 'block' }}
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
