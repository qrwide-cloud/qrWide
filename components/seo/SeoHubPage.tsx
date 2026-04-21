import Link from 'next/link'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import type { SeoPageDefinition } from '@/lib/seo/types'

interface SeoHubPageProps {
  eyebrow: string
  title: string
  description: string
  pages: SeoPageDefinition[]
  ctaLabel?: string
  ctaHref?: string
}

export function SeoHubPage({
  eyebrow,
  title,
  description,
  pages,
  ctaLabel = 'Generate QR Code Free',
  ctaHref = '/create',
}: SeoHubPageProps) {
  return (
    <div className="bg-[var(--bg)]">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="absolute inset-0 -z-10 bg-dot-grid opacity-50" />
        <div className="absolute top-0 left-0 right-0 h-72 -z-10"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 30% -10%, rgba(0,87,255,0.07) 0%, transparent 70%)' }} />

        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 text-center">
          <div className="mb-4 inline-flex items-center rounded-full border border-[#0057FF]/20 bg-[#0057FF]/06 px-3.5 py-1">
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0057FF]">{eyebrow}</span>
          </div>
          <h1 className="mx-auto max-w-3xl text-[32px] font-extrabold tracking-[-0.03em] leading-[1.1] text-[var(--text-primary)] sm:text-[44px]">
            {title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-[1.75] text-[var(--text-secondary)]">
            {description}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href={ctaHref}>
              <Button size="lg" className="glow-blue-sm h-11 px-7">
                {ctaLabel} <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="secondary" className="h-11 px-6">
                View pricing
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Cards grid */}
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {pages.map((page) => (
            <Link
              key={page.slug}
              href={resolveHubHref(page)}
              className="group flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-all hover:border-[#0057FF]/25 hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5"
            >
              <div className="mb-3 text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#0057FF]">
                {page.eyebrow}
              </div>
              <h2 className="text-[16px] font-bold tracking-[-0.02em] text-[var(--text-primary)] group-hover:text-[#0057FF] transition-colors">
                {page.h1}
              </h2>
              <p className="mt-2.5 flex-1 text-[13.5px] leading-[1.7] text-[var(--text-secondary)]">
                {page.description}
              </p>
              <div className="mt-4 flex items-center gap-1 text-[12.5px] font-semibold text-[#0057FF] opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more <ChevronRight className="h-3.5 w-3.5" />
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-12 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-7 py-8 text-center sm:py-10">
          <p className="text-[15px] font-semibold text-[var(--text-primary)]">
            Ready to create your first QR code?
          </p>
          <p className="mt-2 text-[13.5px] text-[var(--text-secondary)]">
            Free to generate. No account required to download.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/create">
              <Button size="md" className="glow-blue-sm">
                {ctaLabel} <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="md" variant="secondary">View pricing</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function resolveHubHref(page: SeoPageDefinition) {
  switch (page.kind) {
    case 'generator': return `/qr-code-generator/${page.slug}`
    case 'tool':      return `/tools/${page.slug}`
    case 'industry':  return `/industries/${page.slug}`
    case 'guide':     return `/guides/${page.slug}`
    case 'comparison': return `/compare/${page.slug}`
    case 'best':      return `/best/${page.slug}`
    case 'feature':   return `/features/${page.slug}`
  }
}
