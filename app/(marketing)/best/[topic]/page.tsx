import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { SeoPageTemplate } from '@/components/seo/SeoPageTemplate'
import { bestPages } from '@/content/seo/best'
import { findSeoPage } from '@/content/seo/catalog'
import { buildSeoMetadata } from '@/lib/seo/metadata'
import { seoBreadcrumbs } from '@/lib/seo/routes'

export const dynamicParams = false
export const revalidate = 86400

export function generateStaticParams() {
  return bestPages.map((page) => ({ topic: page.slug }))
}

export function generateMetadata({ params }: { params: { topic: string } }): Metadata {
  const page = findSeoPage(bestPages, params.topic)
  if (!page) {
    return {}
  }

  return buildSeoMetadata(page, `/best/${page.slug}`)
}

export default function BestPage({ params }: { params: { topic: string } }) {
  const page = findSeoPage(bestPages, params.topic)
  if (!page) {
    notFound()
  }

  return <SeoPageTemplate page={page} pathname={`/best/${page.slug}`} breadcrumbs={seoBreadcrumbs(page)} />
}
