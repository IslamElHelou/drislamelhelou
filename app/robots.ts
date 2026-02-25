import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.drislamelhelou.com'
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard', '/en/dashboard', '/ar/dashboard', '/api/dashboard']
    },
    sitemap: `${baseUrl}/sitemap.xml`
  }
}
