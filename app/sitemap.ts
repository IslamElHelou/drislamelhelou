import type { MetadataRoute } from 'next'
import fs from 'node:fs'
import path from 'node:path'
import { locales, type Locale } from '@/lib/i18n'
import { getAllPostSlugs, getPostLastModified } from '@/lib/mdx'
import { insightModules } from '@/lib/insights/modules'
import { SERVICE_LOCATION_SLUGS } from '@/lib/serviceLocationPages'
import { getSiteUrl } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl()
  const fallbackUpdatedAt = process.env.NEXT_PUBLIC_SITE_UPDATED_AT
    ? new Date(process.env.NEXT_PUBLIC_SITE_UPDATED_AT)
    : new Date()

  const blogSlugsByLocale = Object.fromEntries(
    locales.map((locale) => [locale, new Set(getAllPostSlugs(locale as Locale))])
  ) as Record<Locale, Set<string>>

  const pageUpdatedAt = {
    home: statOrFallback('app/[lang]/page.tsx', fallbackUpdatedAt),
    about: statOrFallback('app/[lang]/about/page.tsx', fallbackUpdatedAt),
    services: statOrFallback('app/[lang]/services/page.tsx', fallbackUpdatedAt),
    serviceDetail: statOrFallback('app/[lang]/services/[slug]/page.tsx', fallbackUpdatedAt),
    insights: statOrFallback('app/[lang]/insights/page.tsx', fallbackUpdatedAt),
    insightDetail: statOrFallback('app/[lang]/insights/[module]/page.tsx', fallbackUpdatedAt),
    blog: statOrFallback('app/[lang]/blog/page.tsx', fallbackUpdatedAt),
    faq: statOrFallback('app/[lang]/faq/page.tsx', fallbackUpdatedAt),
    testimonials: statOrFallback('app/[lang]/testimonials/page.tsx', fallbackUpdatedAt),
    results: statOrFallback('app/[lang]/results/page.tsx', fallbackUpdatedAt),
    contact: statOrFallback('app/[lang]/contact/page.tsx', fallbackUpdatedAt)
  }

  function statOrFallback(relativePath: string, fallback: Date) {
    try {
      return fs.statSync(path.join(process.cwd(), relativePath)).mtime
    } catch {
      return fallback
    }
  }

  function localizedAlternates(path: string): Record<string, string> {
    return {
      en: `${baseUrl}/en${path}`,
      ar: `${baseUrl}/ar${path}`,
      'x-default': `${baseUrl}/en${path}`
    }
  }

  function blogAlternates(slug: string): Record<string, string> {
    const languages: Record<string, string> = {}

    for (const locale of locales) {
      if (blogSlugsByLocale[locale as Locale].has(slug)) {
        languages[locale] = `${baseUrl}/${locale}/blog/${slug}`
      }
    }

    if (languages.en) {
      languages['x-default'] = languages.en
    }

    return languages
  }

  function pageImages(path: string): string[] {
    if (path === '') return [`${baseUrl}/images/doctor.webp`, `${baseUrl}/clinic/waiting-room.webp`, `${baseUrl}/brand/logo.png`]
    if (path === '/about') return [`${baseUrl}/images/doctor.webp`, `${baseUrl}/clinic/waiting-room.webp`]
    if (path === '/services' || path.startsWith('/services/')) return [`${baseUrl}/images/doctor.webp`]
    if (path === '/contact') return [`${baseUrl}/clinic/waiting-room.webp`, `${baseUrl}/brand/logo.png`]
    return []
  }

  const staticPaths = [
    { path: '', lastModified: pageUpdatedAt.home, changeFrequency: 'weekly' as const, priority: 1 },
    { path: '/about', lastModified: pageUpdatedAt.about, changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/services', lastModified: pageUpdatedAt.services, changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/insights', lastModified: pageUpdatedAt.insights, changeFrequency: 'weekly' as const, priority: 0.85 },
    { path: '/blog', lastModified: pageUpdatedAt.blog, changeFrequency: 'weekly' as const, priority: 0.85 },
    { path: '/faq', lastModified: pageUpdatedAt.faq, changeFrequency: 'monthly' as const, priority: 0.65 },
    { path: '/testimonials', lastModified: pageUpdatedAt.testimonials, changeFrequency: 'monthly' as const, priority: 0.65 },
    { path: '/results', lastModified: pageUpdatedAt.results, changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/contact', lastModified: pageUpdatedAt.contact, changeFrequency: 'weekly' as const, priority: 0.95 },
    ...SERVICE_LOCATION_SLUGS.map((slug) => ({
      path: `/services/${slug}`,
      lastModified: pageUpdatedAt.serviceDetail,
      changeFrequency: 'monthly' as const,
      priority: 0.8
    }))
  ]

  const entries: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    for (const page of staticPaths) {
      entries.push({
        url: `${baseUrl}/${locale}${page.path}`,
        lastModified: page.lastModified,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        images: pageImages(page.path),
        alternates: {
          languages: localizedAlternates(page.path)
        }
      })
    }

    const slugs = Array.from(blogSlugsByLocale[locale as Locale])
    for (const slug of slugs) {
      entries.push({
        url: `${baseUrl}/${locale}/blog/${slug}`,
        lastModified: getPostLastModified(locale as Locale, slug),
        changeFrequency: 'monthly',
        priority: 0.75,
        images: [`${baseUrl}/images/doctor.webp`],
        alternates: {
          languages: blogAlternates(slug)
        }
      })
    }

    for (const m of insightModules) {
      entries.push({
        url: `${baseUrl}/${locale}/insights/${m.slug}`,
        lastModified: pageUpdatedAt.insightDetail,
        changeFrequency: 'monthly',
        priority: 0.65,
        images: [`${baseUrl}/images/doctor.webp`],
        alternates: {
          languages: localizedAlternates(`/insights/${m.slug}`)
        }
      })
    }
  }

  return entries
}
