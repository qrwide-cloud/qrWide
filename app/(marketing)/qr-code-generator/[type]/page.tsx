import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { SeoPageTemplate } from '@/components/seo/SeoPageTemplate'
import { generatorPages } from '@/content/seo/generators'
import { findSeoPage } from '@/content/seo/catalog'
import { buildSeoMetadata } from '@/lib/seo/metadata'
import { seoBreadcrumbs } from '@/lib/seo/routes'

export const dynamicParams = false
export const revalidate = 86400

export function generateStaticParams() {
  return generatorPages.map((page) => ({ type: page.slug }))
}

export function generateMetadata({ params }: { params: { type: string } }): Metadata {
  const page = findSeoPage(generatorPages, params.type)
  if (!page) {
    return {}
  }

  return buildSeoMetadata(page, `/qr-code-generator/${page.slug}`)
}

export default function GeneratorTypePage({ params }: { params: { type: string } }) {
  const page = findSeoPage(generatorPages, params.type)
  if (!page) {
    notFound()
  }

  return (
    <SeoPageTemplate
      page={page}
      pathname={`/qr-code-generator/${page.slug}`}
      breadcrumbs={seoBreadcrumbs(page)}
    />
  )
}
