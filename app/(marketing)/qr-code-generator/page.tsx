import type { Metadata } from 'next'
import { SeoHubPage } from '@/components/seo/SeoHubPage'
import { generatorPages } from '@/content/seo/generators'

export const metadata: Metadata = {
  title: { absolute: 'QR Code Generator — Free Online Tool | QRWide' },
  description:
    'Explore QRWide generator pages for dynamic, static, WiFi, vCard, menu, PDF, business card, social, and app download QR codes.',
  keywords: ['qr code generator', 'free qr code', 'online qr generator', 'wifi qr code', 'vcard qr code'],
  alternates: { canonical: 'https://qrwide.com/qr-code-generator' },
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
