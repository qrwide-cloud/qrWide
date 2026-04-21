import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { SeoPageTemplate } from '@/components/seo/SeoPageTemplate'
import { findSeoPage } from '@/content/seo/catalog'
import { guidePages } from '@/content/seo/guides'
import { buildSeoMetadata } from '@/lib/seo/metadata'
import { seoBreadcrumbs } from '@/lib/seo/routes'

export const dynamicParams = false
export const revalidate = 86400

export function generateStaticParams() {
  return guidePages.map((page) => ({ slug: page.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const page = findSeoPage(guidePages, params.slug)
  if (!page) {
    return {}
  }

  return buildSeoMetadata(page, `/guides/${page.slug}`)
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const page = findSeoPage(guidePages, params.slug)
  if (!page) {
    notFound()
  }

  return <SeoPageTemplate page={page} pathname={`/guides/${page.slug}`} breadcrumbs={seoBreadcrumbs(page)} />
}
