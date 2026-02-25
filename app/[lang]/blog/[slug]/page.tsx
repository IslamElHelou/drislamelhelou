import type { Metadata } from 'next'
import { clinic, locales, type Locale } from '@/lib/i18n'
import { getAllPostSlugs, getPost } from '@/lib/mdx'
import Toc from '@/components/Toc'

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
  const title = `${post.frontmatter.title} | ${clinic.brandName}`
  const og = `/api/og?title=${encodeURIComponent(post.frontmatter.title)}&lang=${locale}`

  return {
    title,
    description: post.frontmatter.description,
    alternates: {
      canonical: `/${locale}/blog/${slug}`,
      languages: {
        en: `/en/blog/${slug}`,
        ar: `/ar/blog/${slug}`,
        'x-default': `/en/blog/${slug}`
      }
    },
    openGraph: {
      title,
      description: post.frontmatter.description,
      type: 'article',
      url: `/${locale}/blog/${slug}`,
      images: [
        {
          url: og,
          width: 1200,
          height: 630,
          alt: post.frontmatter.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: post.frontmatter.description,
      images: [og]
    }
  }
}

export default async function BlogPost({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params
  const locale = (lang === 'ar' ? 'ar' : 'en') as Locale
  const post = await getPost(locale, slug)
  const og = `/api/og?title=${encodeURIComponent(post.frontmatter.title)}&lang=${locale}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    datePublished: post.frontmatter.date,
    dateModified: post.frontmatter.date,
    author: {
      '@type': 'Person',
      name: `Dr. ${clinic.doctorName}`
    },
    publisher: {
      '@type': 'Organization',
      name: clinic.brandName
    },
    image: [og],
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.drislamelhelou.com'}/${locale}/blog/${slug}`
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

            <div className="journalContent mdx" style={{ marginTop: '1.2rem' }}>
              {post.content}
            </div>
          </article>

          <Toc items={post.toc} lang={locale} />
        </div>
      </div>
    </section>
  )
}
