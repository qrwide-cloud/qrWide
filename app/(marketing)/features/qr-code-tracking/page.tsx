import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SeoPageTemplate } from '@/components/seo/SeoPageTemplate'
import { featurePages } from '@/content/seo/features'
import { findSeoPage } from '@/content/seo/catalog'
import { buildSeoMetadata } from '@/lib/seo/metadata'
import { seoBreadcrumbs } from '@/lib/seo/routes'

const page = findSeoPage(featurePages, 'qr-code-tracking')

export const metadata: Metadata = page
  ? buildSeoMetadata(page, `/features/${page.slug}`)
  : {}

export default function QrCodeTrackingFeaturePage() {
  if (!page) {
    notFound()
  }

  return <SeoPageTemplate page={page} pathname={`/features/${page.slug}`} breadcrumbs={seoBreadcrumbs(page)} />
}
