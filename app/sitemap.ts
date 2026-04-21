import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? 'https://qrwide.com'
  const now = new Date().toISOString()

  const pages = [
    { url: base, priority: 1.0, changeFrequency: 'weekly' as const },
    { url: `${base}/pricing`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${base}/features`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${base}/create`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${base}/use-cases/restaurants`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${base}/use-cases/real-estate`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${base}/use-cases/events`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${base}/changelog`, priority: 0.5, changeFrequency: 'weekly' as const },
    { url: `${base}/privacy`, priority: 0.3, changeFrequency: 'yearly' as const },
    { url: `${base}/terms`, priority: 0.3, changeFrequency: 'yearly' as const },
  ]

  return pages.map((p) => ({ ...p, lastModified: now }))
}
