import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { SeoPageTemplate } from '@/components/seo/SeoPageTemplate'
import { comparisonPages } from '@/content/seo/comparisons'
import { findSeoPage } from '@/content/seo/catalog'
import { buildSeoMetadata } from '@/lib/seo/metadata'
import { seoBreadcrumbs } from '@/lib/seo/routes'

export const dynamicParams = false
export const revalidate = 86400

export function generateStaticParams() {
  return comparisonPages.map((page) => ({ competitor: page.slug }))
}

export function generateMetadata({ params }: { params: { competitor: string } }): Metadata {
  const page = findSeoPage(comparisonPages, params.competitor)
  if (!page) {
    return {}
  }

  return buildSeoMetadata(page, `/compare/${page.slug}`)
}

export default function ComparisonPage({ params }: { params: { competitor: string } }) {
  const page = findSeoPage(comparisonPages, params.competitor)
  if (!page) {
    notFound()
  }

  return <SeoPageTemplate page={page} pathname={`/compare/${page.slug}`} breadcrumbs={seoBreadcrumbs(page)} />
}
