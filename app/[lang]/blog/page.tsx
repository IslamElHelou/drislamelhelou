import type { Metadata } from 'next'
import Link from 'next/link'
import type { Locale } from '@/lib/i18n'
import { isLocale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionaries'
import { getAllPosts } from '@/lib/mdx'
import { buildLocalizedMetadata } from '@/lib/seo'

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
    path: '/blog',
    title: t.blog.title,
    description: t.blog.subtitle
  })
}

export default async function BlogIndex({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const locale = (isLocale(lang) ? lang : 'en') as Locale
  const t = getDictionary(locale)
  const posts = getAllPosts(locale)

  const isAestheticPost = (post: (typeof posts)[number]) => {
    const tags = (post.tags || []).map((tag) => tag.toLowerCase())
    const aestheticTagHints = [
      'aesthetic',
      'aesthetics',
      'anti-aging',
      'injectables',
      'lasers',
      'تجميل',
      'مضاد-للشيخوخة',
      'حقن',
      'ليزر'
    ]

    return (
      post.slug === 'anti-aging-skincare' ||
      post.slug === 'injectable-treatments-guide' ||
      tags.some((tag) => aestheticTagHints.includes(tag))
    )
  }

  const aestheticPosts = posts.filter(isAestheticPost)
  const medicalPosts = posts.filter((post) => !isAestheticPost(post))

  const sectionLabels = {
    medical: {
      en: {
        title: 'Medical Dermatology',
        subtitle: 'Evidence-based clinical content focused on diagnosis, treatment planning, and long-term skin health.'
      },
      ar: {
        title: 'الجلدية العلاجية',
        subtitle: 'محتوى طبي مبني على الأدلة يركز على التشخيص، التخطيط العلاجي، وصحة الجلد على المدى الطويل.'
      }
    },
    aesthetic: {
      en: {
        title: 'Aesthetic Dermatology',
        subtitle: 'A medical perspective on aesthetic care: safety, natural outcomes, and structured decision-making.'
      },
      ar: {
        title: 'الجلدية التجميلية',
        subtitle: 'طرح طبي للتجميل يركز على الأمان، النتائج الطبيعية، واتخاذ القرار العلاجي بشكل منظم.'
      }
    }
  } as const

  const copy = locale === 'ar' ? 'ar' : 'en'

  return (
    <section className="section">
      <div className="container">
        <div className="journalHeader">
          <div className="journalKicker">{locale === 'ar' ? 'مقالات طبية' : 'Clinical Notes'}</div>
          <h1 className="journalTitle">{t.blog.title}</h1>
          <div className="goldLine" aria-hidden />
          <p className="journalLead">{t.blog.subtitle}</p>
        </div>

        <div style={{ marginTop: '1.4rem' }}>
          <h2 className="sectionTitle" style={{ marginBottom: '.35rem' }}>
            {sectionLabels.medical[copy].title}
          </h2>
          <p className="muted" style={{ marginTop: 0, marginBottom: '.9rem' }}>
            {sectionLabels.medical[copy].subtitle}
          </p>
          <div className="journalList">
            {medicalPosts.map((p) => (
              <Link key={p.slug} href={`/${locale}/blog/${p.slug}`} className="journalItem">
                <div className="journalItemTop">
                  <div className="journalItemTitle">{p.title}</div>
                  <div className="journalItemMeta">{new Date(p.date).toLocaleDateString()}</div>
                </div>
                <div className="journalItemDesc">{p.description}</div>
                <div className="journalRead">{locale === 'ar' ? 'اقرأ المقال' : 'Read article'}</div>
              </Link>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h2 className="sectionTitle" style={{ marginBottom: '.35rem' }}>
            {sectionLabels.aesthetic[copy].title}
          </h2>
          <p className="muted" style={{ marginTop: 0, marginBottom: '.9rem' }}>
            {sectionLabels.aesthetic[copy].subtitle}
          </p>
          <div className="journalList">
            {aestheticPosts.map((p) => (
              <Link key={p.slug} href={`/${locale}/blog/${p.slug}`} className="journalItem">
                <div className="journalItemTop">
                  <div className="journalItemTitle">{p.title}</div>
                  <div className="journalItemMeta">{new Date(p.date).toLocaleDateString()}</div>
                </div>
                <div className="journalItemDesc">{p.description}</div>
                <div className="journalRead">{locale === 'ar' ? 'اقرأ المقال' : 'Read article'}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
