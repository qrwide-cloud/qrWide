import type { Metadata } from 'next'
import { SeoHubPage } from '@/components/seo/SeoHubPage'
import { industryPages } from '@/content/seo/industries'

export const metadata: Metadata = {
  title: { absolute: 'QR Code Use Cases by Industry | QRWide' },
  description:
    'See how restaurants, real estate teams, schools, event organizers, and other industries use QRWide to create and track QR codes.',
  keywords: ['qr code for restaurant', 'qr code for business', 'qr code use cases', 'industry qr codes'],
  alternates: { canonical: 'https://qrwide.com/industries' },
}

export default function IndustriesHubPage() {
  return (
    <SeoHubPage
      eyebrow="Industries"
      title="QR Code Use Cases by Industry"
      description="See how different industries use QRWide for menus, listings, forms, promotions, event workflows, and trackable print campaigns."
      pages={industryPages}
      ctaLabel="Generate QR Code Free"
      ctaHref="/create"
    />
  )
}
