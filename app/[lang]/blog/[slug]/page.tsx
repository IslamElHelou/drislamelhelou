import type { Metadata } from 'next'
import { clinic, locales, type Locale } from '@/lib/i18n'
import { getAllPostSlugs, getPost } from '@/lib/mdx'
import Toc from '@/components/Toc'
import { getDefaultSocialImage, getPublisherLogo, getSiteUrl, toAbsoluteUrl } from '@/lib/seo'

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
