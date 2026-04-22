/** @type {import('next').NextConfig} */
const defaultDistDir = process.env.NODE_ENV === 'development' ? '.next-dev' : '.next'

const nextConfig = {
  distDir: process.env.NEXT_DIST_DIR || defaultDistDir,
  async rewrites() {
    return [
      { source: '/favicon.ico', destination: '/icon' },
      { source: '/apple-touch-icon.png', destination: '/apple-icon' },
      { source: '/apple-touch-icon-precomposed.png', destination: '/apple-icon' },
    ]
  },
  eslint: {
    // Use our own ESLint config, Next.js 14 lint plugin is incompatible with ESLint 9
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'https', hostname: 'www.google.com' },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ['qrcode'],
  },
}

export default nextConfig
