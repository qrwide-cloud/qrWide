import type { Metadata } from 'next'
import type { SeoPageDefinition } from '@/lib/seo/types'

export function buildSeoMetadata(page: SeoPageDefinition, pathname: string): Metadata {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? 'https://qrwide.com'
  const canonical = `${base}${pathname}`

  return {
    title: page.title,
    description: page.description,
    keywords: [page.primaryKeyword, ...page.secondaryKeywords, ...page.semanticKeywords].slice(0, 20),
    alternates: { canonical },
    openGraph: {
      title: page.title,
      description: page.description,
      url: canonical,
      type: page.kind === 'guide' ? 'article' : 'website',
      siteName: 'QRWide',
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
    },
  }
}
