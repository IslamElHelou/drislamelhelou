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

  return (
    <section className="section">
      <div className="container">
        <div className="journalHeader">
          <div className="journalKicker">{locale === 'ar' ? 'مقال طبي' : 'Clinical Notes'}</div>
          <h1 className="journalTitle">{t.blog.title}</h1>
          <div className="goldLine" aria-hidden />
          <p className="journalLead">{t.blog.subtitle}</p>
        </div>

        <div className="journalList">
          {posts.map((p) => (
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
    </section>
  )
}
