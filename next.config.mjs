import createMDX from '@next/mdx'

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: []
  }
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 2678400
  },
  webpack: (config, { dev, isServer }) => {
    // Prevent unnecessary polyfill bundling for modern ES2022+ code
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      crypto: false
    }
    return config
  },
  experimental: {
    optimizePackageImports: [
      'framer-motion',
      'clsx',
      'zod',
      'react-hook-form'
    ]
  },
  allowedDevOrigins: ['http://localhost:3000', 'http://192.168.1.8:3000'],
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' }
        ]
      },
      // Cache static assets aggressively (1 year)
      {
        source: '/images/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, immutable, max-age=31536000' }
        ]
      },
      // Cache fonts (1 year)
      {
        source: '/:path*\\.(woff2|woff|ttf|otf)',
        headers: [
          { key: 'Cache-Control', value: 'public, immutable, max-age=31536000' }
        ]
      },
      // Cache OG image endpoint (15 minutes)
      {
        source: '/api/og',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=900, stale-while-revalidate=3600' }]
      },
      // Cache HTML pages (5 minutes, must revalidate)
      {
        source: '/(.*)\\.html',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=300, must-revalidate' }
        ]
      }
    ]
  }
}

export default withMDX(nextConfig)