import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { SeoPageTemplate } from '@/components/seo/SeoPageTemplate'
import { findSeoPage } from '@/content/seo/catalog'
import { toolPages } from '@/content/seo/tools'
import { buildSeoMetadata } from '@/lib/seo/metadata'
import { seoBreadcrumbs } from '@/lib/seo/routes'

export const dynamicParams = false
export const revalidate = 86400

export function generateStaticParams() {
  return toolPages.map((page) => ({ tool: page.slug }))
}

export function generateMetadata({ params }: { params: { tool: string } }): Metadata {
  const page = findSeoPage(toolPages, params.tool)
  if (!page) {
    return {}
  }

  return buildSeoMetadata(page, `/tools/${page.slug}`)
}

export default function ToolPage({ params }: { params: { tool: string } }) {
  const page = findSeoPage(toolPages, params.tool)
  if (!page) {
    notFound()
  }

  return <SeoPageTemplate page={page} pathname={`/tools/${page.slug}`} breadcrumbs={seoBreadcrumbs(page)} />
}
