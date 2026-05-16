import type { MetadataRoute } from 'next'
import { getSiteUrl } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getSiteUrl()
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/_next/static/', '/_next/image/'],
        disallow: [
          '/dashboard',
          '/en/dashboard',
          '/ar/dashboard',
          '/api/',
          '/*?*utm_*',
          '/*?*fbclid=*'
        ]
      }
    ],
    host: baseUrl,
    sitemap: `${baseUrl}/sitemap.xml`
  }
}
