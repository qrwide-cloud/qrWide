import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { SeoPageTemplate } from '@/components/seo/SeoPageTemplate'
import { findSeoPage } from '@/content/seo/catalog'
import { industryPages } from '@/content/seo/industries'
import { buildSeoMetadata } from '@/lib/seo/metadata'
import { seoBreadcrumbs } from '@/lib/seo/routes'

export const dynamicParams = false
export const revalidate = 86400

export function generateStaticParams() {
  return industryPages.map((page) => ({ industry: page.slug }))
}

export function generateMetadata({ params }: { params: { industry: string } }): Metadata {
  const page = findSeoPage(industryPages, params.industry)
  if (!page) {
    return {}
  }

  return buildSeoMetadata(page, `/industries/${page.slug}`)
}

export default function IndustryPage({ params }: { params: { industry: string } }) {
  const page = findSeoPage(industryPages, params.industry)
  if (!page) {
    notFound()
  }

  return <SeoPageTemplate page={page} pathname={`/industries/${page.slug}`} breadcrumbs={seoBreadcrumbs(page)} />
}
