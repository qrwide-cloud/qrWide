import type { Metadata } from 'next'
import { SeoHubPage } from '@/components/seo/SeoHubPage'
import { comparisonPages } from '@/content/seo/comparisons'

export const metadata: Metadata = {
  title: { absolute: 'QRWide vs Competitors — QR Code Generator Comparison' },
  description:
    'Compare QRWide against QR Code Monkey, QR TIGER, Uniqode, Canva QR Generator, and other popular QR tools.',
  keywords: ['qr code generator comparison', 'best qr code generator', 'qrwide vs qr tiger', 'qr code alternatives'],
  alternates: { canonical: 'https://qrwide.com/compare' },
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
