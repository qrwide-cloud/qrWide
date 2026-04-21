export type SeoPageKind =
  | 'generator'
  | 'tool'
  | 'industry'
  | 'guide'
  | 'comparison'
  | 'best'
  | 'feature'

export type SeoIntent =
  | 'transactional'
  | 'informational'
  | 'commercial'
  | 'comparison'

export type SeoPriority = 'P1' | 'P2' | 'P3'

export interface SeoLinkItem {
  href: string
  label: string
  description?: string
}

export interface SeoFaqItem {
  question: string
  answer: string
}

export interface SeoComparisonRow {
  label: string
  qrwide: string
  alternative: string
}

export interface SeoSection {
  heading: string
  body: string[]
  bullets?: string[]
}

export interface SeoPageDefinition {
  slug: string
  kind: SeoPageKind
  title: string
  description: string
  h1: string
  eyebrow: string
  heroBody: string
  primaryKeyword: string
  secondaryKeywords: string[]
  semanticKeywords: string[]
  intent: SeoIntent
  priority: SeoPriority
  heroCtaLabel?: string
  heroCtaHref?: string
  secondaryCtaLabel?: string
  secondaryCtaHref?: string
  trustSignals: string[]
  faq: SeoFaqItem[]
  internalLinks: SeoLinkItem[]
  sections: SeoSection[]
  comparisonTitle?: string
  comparisonRows?: SeoComparisonRow[]
}
