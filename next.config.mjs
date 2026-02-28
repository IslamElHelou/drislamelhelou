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
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  images: {
    formats: ['image/avif', 'image/webp']
  },
  swcMinify: true,
  compress: true,
  optimizeFonts: true,
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
      }
    ]
  }
}

export default withMDX(nextConfig)