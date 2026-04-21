import type { Metadata } from 'next'
import { SeoHubPage } from '@/components/seo/SeoHubPage'
import { generatorPages } from '@/content/seo/generators'

export const metadata: Metadata = {
  title: 'QR Code Generator Pages | QRWide',
  description:
    'Explore QRWide generator pages for dynamic, static, WiFi, vCard, menu, PDF, business card, social, and app download QR codes.',
}

export default function QrCodeGeneratorHubPage() {
  return (
    <SeoHubPage
      eyebrow="Generator Library"
      title="QR Code Generator Templates for Every Use Case"
      description="Explore high-intent generator pages for WiFi, vCard, menus, PDFs, app downloads, business cards, and dynamic QR workflows."
      pages={generatorPages}
      ctaLabel="Generate QR Code Free"
      ctaHref="/create"
    />
  )
}
