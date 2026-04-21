import type { Metadata } from 'next'
import { SeoHubPage } from '@/components/seo/SeoHubPage'
import { bestPages } from '@/content/seo/best'

export const metadata: Metadata = {
  title: 'Best QR Code Generator Roundups | QRWide',
  description:
    'Commercial shortlist pages for the best free QR code generators, best QR generators for restaurants, and the best QR platforms with analytics.',
}

export default function BestHubPage() {
  return (
    <SeoHubPage
      eyebrow="Best"
      title="Best QR Code Generator Roundups"
      description="Browse commercial shortlist pages for the best free QR generators, restaurant QR tools, and analytics-first QR platforms."
      pages={bestPages}
      ctaLabel="Generate QR Code Free"
      ctaHref="/create"
    />
  )
}
