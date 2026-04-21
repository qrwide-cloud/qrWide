import type { Metadata } from 'next'
import { SeoHubPage } from '@/components/seo/SeoHubPage'
import { toolPages } from '@/content/seo/tools'

export const metadata: Metadata = {
  title: 'QR Code Tools | QRWide',
  description:
    'Explore QRWide tools for bulk QR generation, logo QR design, and other scalable QR workflows.',
}

export default function ToolsHubPage() {
  return (
    <SeoHubPage
      eyebrow="Tools"
      title="QR Code Tools for Bulk, Branding, and Campaign Workflows"
      description="Discover QR tools that support bulk generation, brand-safe design, and production-ready QR workflows."
      pages={toolPages}
      ctaLabel="Try QRWide Free"
      ctaHref="/create"
    />
  )
}
