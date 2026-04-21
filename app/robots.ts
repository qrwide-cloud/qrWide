import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? 'https://qrwide.com'
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard', '/settings', '/create', '/bulk', '/analytics', '/api/', '/auth/'],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  }
}
