import type { MetadataRoute } from 'next'
import { locales, type Locale } from '@/lib/i18n'
import { getAllPostSlugs } from '@/lib/mdx'
import { insightModules } from '@/lib/insights/modules'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.drislamelhelou.com'
  const updatedAt = process.env.NEXT_PUBLIC_SITE_UPDATED_AT
    ? new Date(process.env.NEXT_PUBLIC_SITE_UPDATED_AT)
    : new Date()

  const staticPaths = [
    '',
    '/about',
    '/services',
    '/insights',
    '/blog',
    '/faq',
    '/testimonials',
    '/results',
    '/contact'
  ]

  const entries: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    for (const p of staticPaths) {
      entries.push({
        url: `${baseUrl}/${locale}${p}`,
        lastModified: updatedAt,
        alternates: {
          languages: {
            en: `${baseUrl}/en${p}`,
            ar: `${baseUrl}/ar${p}`
          }
        }
      })
    }

    const slugs = getAllPostSlugs(locale as Locale)
    for (const slug of slugs) {
      entries.push({
        url: `${baseUrl}/${locale}/blog/${slug}`,
        lastModified: updatedAt,
        alternates: {
          languages: {
            en: `${baseUrl}/en/blog/${slug}`,
            ar: `${baseUrl}/ar/blog/${slug}`
          }
        }
      })
    }

    for (const m of insightModules) {
      entries.push({
        url: `${baseUrl}/${locale}/insights/${m.slug}`,
        lastModified: updatedAt,
        alternates: {
          languages: {
            en: `${baseUrl}/en/insights/${m.slug}`,
            ar: `${baseUrl}/ar/insights/${m.slug}`
          }
        }
      })
    }
  }

  return entries
}
