import Link from 'next/link'
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
    <div className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <section className="rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-8 text-center shadow-[var(--shadow-md)] sm:p-10">
          <div className="inline-flex items-center rounded-full border border-[#0066FF]/15 bg-[#0066FF]/6 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#0066FF]">
            {eyebrow}
          </div>
          <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-bold tracking-[-0.03em] text-[var(--text-primary)] sm:text-5xl">
            {title}
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[var(--text-secondary)]">
            {description}
          </p>
          <div className="mt-8">
            <Link href={ctaHref}>
              <Button size="lg">{ctaLabel}</Button>
            </Link>
          </div>
        </section>

        <section className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {pages.map((page) => (
            <Link
              key={page.slug}
              href={resolveHubHref(page)}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-all hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-md)]"
            >
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0066FF]">
                {page.eyebrow}
              </div>
              <h2 className="mt-3 text-xl font-semibold tracking-[-0.02em] text-[var(--text-primary)]">
                {page.h1}
              </h2>
              <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                {page.description}
              </p>
            </Link>
          ))}
        </section>
      </div>
    </div>
  )
}

function resolveHubHref(page: SeoPageDefinition) {
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
