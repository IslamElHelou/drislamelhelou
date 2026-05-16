import type { Metadata } from 'next'
import { clinic, locales, type Locale } from '@/lib/i18n'
import { getAllPostSlugs, getPost } from '@/lib/mdx'
import Toc from '@/components/Toc'
import { getDefaultSocialImage, getPublisherLogo, getSiteUrl, toAbsoluteUrl, withBrandTitle } from '@/lib/seo'

const articleHighlights = {
  'acne-basics': {
    recovery: { en: 'Usually gradual over 6 to 12 weeks', ar: 'عادة يكون التحسن تدريجيًا خلال ٦ إلى ١٢ أسبوعًا' },
    severity: { en: 'Mild to moderate, sometimes scarring', ar: 'خفيف إلى متوسط وقد يسبب ندبات أحيانًا' }
  },
  'psoriasis-beyond-skin': {
    recovery: { en: 'Control is long-term with flare-based adjustments', ar: 'التحكم طويل المدى مع تعديل العلاج حسب شدة النوبات' },
    severity: { en: 'Moderate to high when extensive or symptomatic', ar: 'متوسطة إلى عالية عند الانتشار أو شدة الأعراض' }
  },
  'hair-loss-workup': {
    recovery: { en: 'Hair response often needs several months', ar: 'استجابة الشعر تحتاج غالبًا عدة أشهر' },
    severity: { en: 'Variable, depending on shedding pattern and cause', ar: 'متفاوتة حسب نمط التساقط والسبب' }
  },
  'pigmentation-melasma-guide': {
    recovery: { en: 'Gradual fading over weeks to months', ar: 'تفتيح تدريجي خلال أسابيع إلى أشهر' },
    severity: { en: 'Usually mild medically, high cosmetic impact', ar: 'غالبًا بسيطة طبيًا لكن تأثيرها التجميلي مرتفع' }
  },
  'injectable-treatments-guide': {
    recovery: { en: 'Often same day to a few days', ar: 'غالبًا في نفس اليوم إلى عدة أيام' },
    severity: { en: 'Elective treatment, low symptom burden', ar: 'علاج اختياري مع عبء أعراض منخفض' }
  },
  fallback: {
    recovery: { en: 'Varies by diagnosis and treatment plan', ar: 'تختلف حسب التشخيص وخطة العلاج' },
    severity: { en: 'Depends on symptoms, extent, and duration', ar: 'تعتمد على الأعراض والانتشار ومدة الحالة' }
  }
} as const

export async function generateStaticParams() {
  const params: { lang: string; slug: string }[] = []
  for (const lang of locales) {
    const slugs = getAllPostSlugs(lang as Locale)
    for (const slug of slugs) params.push({ lang, slug })
  }
  return params
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string; slug: string }>
}): Promise<Metadata> {
  const { lang, slug } = await params
  const locale = (lang === 'ar' ? 'ar' : 'en') as Locale
  const post = await getPost(locale, slug)
  const title = withBrandTitle(post.frontmatter.title)
  const authorName = locale === 'ar' ? clinic.doctorNameAr : `Dr. ${clinic.doctorName}`
  const siteUrl = getSiteUrl()
  const image = post.frontmatter.image
    ? toAbsoluteUrl(post.frontmatter.image)
    : toAbsoluteUrl(`/api/og?title=${encodeURIComponent(post.frontmatter.title)}&lang=${locale}`)
  const canonical = `/${locale}/blog/${slug}`

  return {
    title,
    description: post.frontmatter.description,
    alternates: {
      canonical,
      languages: {
        en: `/en/blog/${slug}`,
        ar: `/ar/blog/${slug}`,
        'x-default': `/en/blog/${slug}`
      }
    },
    authors: [{ name: authorName }],
    publisher: clinic.brandName,
    category: locale === 'ar' ? 'طب الجلدية' : 'Dermatology',
    keywords: post.frontmatter.tags,
    openGraph: {
      title,
      description: post.frontmatter.description,
      type: 'article',
      url: canonical,
      siteName: clinic.brandName,
      locale: locale === 'ar' ? 'ar_EG' : 'en_US',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: post.frontmatter.title
        }
      ],
      authors: [authorName],
      publishedTime: post.frontmatter.date,
      modifiedTime: post.frontmatter.date,
      tags: post.frontmatter.tags
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: post.frontmatter.description,
      images: [image]
    }
  }
}

export default async function BlogPost({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params
  const locale = (lang === 'ar' ? 'ar' : 'en') as Locale
  const post = await getPost(locale, slug)
  const siteUrl = getSiteUrl()
  const image = post.frontmatter.image
    ? toAbsoluteUrl(post.frontmatter.image)
    : toAbsoluteUrl(`/api/og?title=${encodeURIComponent(post.frontmatter.title)}&lang=${locale}`)
  const authorName = locale === 'ar' ? clinic.doctorNameAr : `Dr. ${clinic.doctorName}`
  const highlights = articleHighlights[slug as keyof typeof articleHighlights] ?? articleHighlights.fallback

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    datePublished: post.frontmatter.date,
    dateModified: post.frontmatter.date,
    author: {
      '@type': 'Person',
      name: authorName
    },
    publisher: {
      '@type': 'Organization',
      name: clinic.brandName,
      logo: {
        '@type': 'ImageObject',
        url: getPublisherLogo()
      }
    },
    image: [image || getDefaultSocialImage()],
    articleSection: locale === 'ar' ? 'مقالات جلدية' : 'Dermatology Articles',
    keywords: post.frontmatter.tags,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/${locale}/blog/${slug}`
    }
  }

  return (
    <section className="section">
      <div className="container">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <div className="blogLayout">
          <article className="journalArticle">
            <header className="journalArticleHeader">
              <div className="journalKicker">{locale === 'ar' ? 'مقال طبي' : 'Clinical Notes'}</div>
              <h1 className="journalTitle">{post.frontmatter.title}</h1>
              <div className="goldLine" aria-hidden />
              <p className="journalLead">{post.frontmatter.description}</p>

              <div className="journalMeta">
                <span>{new Date(post.frontmatter.date).toLocaleDateString()}</span>
                <span aria-hidden="true">•</span>
                <span>
                  {locale === 'ar'
                    ? `مدة القراءة: ${post.readingTimeMinutes} دقيقة`
                    : `${post.readingTimeMinutes} min read`}
                </span>
              </div>
            </header>

            <div className="articleSummaryGrid">
              <div className="articleSummaryCard articleSummaryNavy">
                <div className="articleSummaryLabel">{locale === 'ar' ? 'مدة التحسن' : 'Recovery Time'}</div>
                <div className="articleSummaryValue">{highlights.recovery[locale]}</div>
              </div>
              <div className="articleSummaryCard articleSummaryGold">
                <div className="articleSummaryLabel">{locale === 'ar' ? 'شدة الأعراض' : 'Symptom Severity'}</div>
                <div className="articleSummaryValue">{highlights.severity[locale]}</div>
              </div>
            </div>

            <div className="journalContent mdx" style={{ marginTop: '1.2rem' }}>
              {post.content}
            </div>

            <div className="authoritySignature">
              <div className="authoritySignatureEyebrow">{locale === 'ar' ? 'مراجعة استشارية' : 'Consultant Verified'}</div>
              <div className="authoritySignatureName">
                {locale === 'ar' ? 'د. إسلام الحلو' : 'Dr. Islam El-Helou'}
              </div>
              <div className="authoritySignatureMeta">
                {locale === 'ar'
                  ? 'PhD, AAD, EADV | استشاري الأمراض الجلدية وطب التجميل'
                  : 'PhD, AAD, EADV | Consultant Dermatology & Aesthetic Medicine'}
              </div>
            </div>
          </article>

          <Toc items={post.toc} lang={locale} />
        </div>
      </div>
    </section>
  )
}
