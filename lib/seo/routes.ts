import type { SeoLinkItem, SeoPageDefinition } from '@/lib/seo/types'

export function seoPagePath(page: SeoPageDefinition) {
  switch (page.kind) {
    case 'generator':
      return `/qr-code-generator/${page.slug}`
    case 'tool':
      return `/tools/${page.slug}`
    case 'industry':
      return `/industries/${page.slug}`
    case 'guide':
      return `/guides/${page.slug}`
    case 'comparison':
      return `/compare/${page.slug}`
    case 'best':
      return `/best/${page.slug}`
    case 'feature':
      return `/features/${page.slug}`
  }
}

export function seoBreadcrumbs(page: SeoPageDefinition): SeoLinkItem[] {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? 'https://qrwide.com'

  switch (page.kind) {
    case 'generator':
      return [
        { href: `${base}/`, label: 'Home' },
        { href: `${base}/qr-code-generator`, label: 'QR Code Generator' },
      ]
    case 'tool':
      return [
        { href: `${base}/`, label: 'Home' },
        { href: `${base}/tools`, label: 'Tools' },
      ]
    case 'industry':
      return [
        { href: `${base}/`, label: 'Home' },
        { href: `${base}/industries`, label: 'Industries' },
      ]
    case 'guide':
      return [
        { href: `${base}/`, label: 'Home' },
        { href: `${base}/guides`, label: 'Guides' },
      ]
    case 'comparison':
      return [
        { href: `${base}/`, label: 'Home' },
        { href: `${base}/compare`, label: 'Compare' },
      ]
    case 'best':
      return [
        { href: `${base}/`, label: 'Home' },
        { href: `${base}/best`, label: 'Best' },
      ]
    case 'feature':
      return [
        { href: `${base}/`, label: 'Home' },
        { href: `${base}/features`, label: 'Features' },
      ]
  }
}
