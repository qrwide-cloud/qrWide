import type { MetadataRoute } from 'next'
import { allSeoPages } from '@/content/seo/catalog'
import { seoPagePath } from '@/lib/seo/routes'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? 'https://qrwide.com'
  const now = new Date().toISOString()

  const pages = [
    { url: base, priority: 1.0, changeFrequency: 'weekly' as const },
    { url: `${base}/pricing`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${base}/features`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${base}/features/qr-code-tracking`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${base}/create`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${base}/qr-code-generator`, priority: 0.95, changeFrequency: 'weekly' as const },
    { url: `${base}/tools`, priority: 0.85, changeFrequency: 'monthly' as const },
    { url: `${base}/industries`, priority: 0.85, changeFrequency: 'monthly' as const },
    { url: `${base}/guides`, priority: 0.85, changeFrequency: 'weekly' as const },
    { url: `${base}/compare`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${base}/best`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${base}/changelog`, priority: 0.5, changeFrequency: 'weekly' as const },
    { url: `${base}/privacy`, priority: 0.3, changeFrequency: 'yearly' as const },
    { url: `${base}/terms`, priority: 0.3, changeFrequency: 'yearly' as const },
  ].concat(
    allSeoPages.map((page) => ({
      url: `${base}${seoPagePath(page)}`,
      priority: page.priority === 'P1' ? 0.85 : page.priority === 'P2' ? 0.75 : 0.65,
      changeFrequency: page.kind === 'guide' ? ('weekly' as const) : ('monthly' as const),
    }))
  )

  return pages.map((p) => ({ ...p, lastModified: now }))
}
