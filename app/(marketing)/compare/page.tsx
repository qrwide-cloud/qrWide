import type { Metadata } from 'next'
import { SeoHubPage } from '@/components/seo/SeoHubPage'
import { comparisonPages } from '@/content/seo/comparisons'

export const metadata: Metadata = {
  title: 'QR Code Generator Comparisons | QRWide',
  description:
    'Compare QRWide against QR Code Monkey, QR TIGER, Uniqode, Canva QR Generator, and other popular QR tools.',
}

export default function CompareHubPage() {
  return (
    <SeoHubPage
      eyebrow="Compare"
      title="QRWide Comparison Pages"
      description="See how QRWide compares with popular QR tools across dynamic QR support, analytics, branding, and business workflows."
      pages={comparisonPages}
      ctaLabel="Try QRWide Free"
      ctaHref="/create"
    />
  )
}
