import type { SeoFaqItem, SeoLinkItem, SeoPageDefinition } from '@/lib/seo/types'

function faqSchema(faq: SeoFaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

function breadcrumbSchema(title: string, breadcrumbs: SeoLinkItem[], currentUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href,
    })).concat({
      '@type': 'ListItem',
      position: breadcrumbs.length + 1,
      name: title,
      item: currentUrl,
    }),
  }
}

function softwareApplicationSchema(page: SeoPageDefinition, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: page.h1,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: page.description,
    url,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  }
}

function articleSchema(page: SeoPageDefinition, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': page.kind === 'guide' ? 'Article' : 'WebPage',
    headline: page.h1,
    description: page.description,
    url,
    publisher: {
      '@type': 'Organization',
      name: 'QRWide',
      url: process.env.NEXT_PUBLIC_APP_URL ?? 'https://qrwide.com',
    },
  }
}

export function buildSeoSchemas(page: SeoPageDefinition, pathname: string, breadcrumbs: SeoLinkItem[]) {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? 'https://qrwide.com'
  const url = `${base}${pathname}`
  const schemas: Array<Record<string, unknown>> = []

  if (page.faq.length > 0) {
    schemas.push(faqSchema(page.faq))
  }

  if (breadcrumbs.length > 0) {
    schemas.push(breadcrumbSchema(page.h1, breadcrumbs, url))
  }

  if (page.kind === 'generator' || page.kind === 'tool' || page.kind === 'feature') {
    schemas.push(softwareApplicationSchema(page, url))
  } else {
    schemas.push(articleSchema(page, url))
  }

  return schemas
}
