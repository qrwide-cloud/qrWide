/** @type {import('next').NextConfig} */
const nextConfig = {
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
