import type { Metadata } from 'next'
import { SeoHubPage } from '@/components/seo/SeoHubPage'
import { guidePages } from '@/content/seo/guides'

export const metadata: Metadata = {
  title: { absolute: 'QR Code Guides & Tutorials | QRWide' },
  description:
    'Read QRWide guides on dynamic vs static QR codes, WiFi QR setup, menu QR code creation, tracking, and print best practices.',
  keywords: ['qr code guide', 'qr code tutorial', 'dynamic qr code guide', 'qr code best practices'],
  alternates: { canonical: 'https://qrwide.com/guides' },
}

export default function GuidesHubPage() {
  return (
    <SeoHubPage
      eyebrow="Guides"
      title="QR Code Guides, Tutorials, and Best Practices"
      description="Learn how to create better QR codes, choose the right format, track performance, and avoid common print mistakes."
      pages={guidePages}
      ctaLabel="Generate QR Code Free"
      ctaHref="/create"
    />
  )
}
