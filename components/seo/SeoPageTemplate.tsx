import Link from 'next/link'
import { ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { buildSeoSchemas } from '@/lib/seo/schema'
import type { SeoLinkItem, SeoPageDefinition } from '@/lib/seo/types'

interface SeoPageTemplateProps {
  page: SeoPageDefinition
  pathname: string
  breadcrumbs: SeoLinkItem[]
}

export function SeoPageTemplate({ page, pathname, breadcrumbs }: SeoPageTemplateProps) {
  const schemas = buildSeoSchemas(page, pathname, breadcrumbs)

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`${page.slug}-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="bg-[var(--bg)]">
        {/* ── Hero ── */}
        <div className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--surface)]">
          <div className="absolute inset-0 -z-10 bg-dot-grid opacity-50" />
          <div className="absolute top-0 left-0 right-0 h-80 -z-10"
            style={{ background: 'radial-gradient(ellipse 80% 60% at 30% -10%, rgba(0,87,255,0.07) 0%, transparent 70%)' }} />

          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
            <Breadcrumbs items={breadcrumbs} currentLabel={page.h1} />

            <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_300px] lg:gap-12 lg:items-start">
              <div>
                {/* Eyebrow */}
                <div className="mb-4 inline-flex items-center rounded-full border border-[#0057FF]/20 bg-[#0057FF]/06 px-3 py-1">
                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0057FF]">
                    {page.eyebrow}
                  </span>
                </div>

                <h1 className="text-[32px] font-extrabold tracking-[-0.03em] leading-[1.1] text-[var(--text-primary)] sm:text-[42px]">
                  {page.h1}
                </h1>
                <p className="mt-4 max-w-2xl text-[16px] leading-[1.75] text-[var(--text-secondary)]">
                  {page.heroBody}
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link href={page.heroCtaHref ?? '/create'}>
                    <Button size="lg" className="glow-blue-sm h-11 px-6">
                      {page.heroCtaLabel ?? 'Generate QR Code Free'}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  {page.secondaryCtaHref && page.secondaryCtaLabel ? (
                    <Link href={page.secondaryCtaHref}>
                      <Button size="lg" variant="secondary" className="h-11 px-6">
                        {page.secondaryCtaLabel}
                      </Button>
                    </Link>
                  ) : null}
                </div>
              </div>

              {/* Trust card */}
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5 shadow-[var(--shadow-sm)]">
                <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--text-tertiary)]">
                  Why QRWide
                </p>
                <ul className="space-y-3">
                  {page.trustSignals.map((signal) => (
                    <li key={signal} className="flex items-start gap-2.5 text-[13.5px] text-[var(--text-primary)]">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#10B981]" />
                      {signal}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 border-t border-[var(--border)] pt-4">
                  <Link href="/create" className="flex items-center justify-between text-[13px] font-semibold text-[#0057FF] hover:underline">
                    Create a QR code free
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_280px]">

            {/* Main content */}
            <div className="space-y-6 min-w-0">
              {page.sections.map((section) => (
                <section key={section.heading}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-7">
                  <h2 className="text-[20px] font-bold tracking-[-0.02em] text-[var(--text-primary)] sm:text-[22px]">
                    {section.heading}
                  </h2>
                  <div className="mt-4 space-y-3 text-[14.5px] leading-[1.75] text-[var(--text-secondary)]">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {section.bullets && section.bullets.length > 0 ? (
                    <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                      {section.bullets.map((bullet) => (
                        <li key={bullet}
                          className="flex items-center gap-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[13.5px] text-[var(--text-primary)]">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#10B981]" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}

              {/* Comparison table */}
              {page.comparisonRows && page.comparisonRows.length > 0 ? (
                <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-7">
                  <h2 className="text-[20px] font-bold tracking-[-0.02em] text-[var(--text-primary)] sm:text-[22px]">
                    {page.comparisonTitle ?? 'How we compare'}
                  </h2>
                  <div className="mt-5 overflow-x-auto -mx-1">
                    <table className="min-w-full border-separate border-spacing-0 overflow-hidden rounded-xl border border-[var(--border)]">
                      <thead>
                        <tr className="bg-[var(--bg)]">
                          <th className="px-4 py-3 text-left text-[12px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">Feature</th>
                          <th className="px-4 py-3 text-left text-[12px] font-semibold uppercase tracking-wider text-[#0057FF]">QRWide</th>
                          <th className="px-4 py-3 text-left text-[12px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">Alternative</th>
                        </tr>
                      </thead>
                      <tbody>
                        {page.comparisonRows.map((row) => (
                          <tr key={row.label}>
                            <td className="border-t border-[var(--border)] px-4 py-3 text-[13.5px] font-medium text-[var(--text-primary)]">
                              {row.label}
                            </td>
                            <td className="border-t border-[var(--border)] px-4 py-3 text-[13.5px] text-[var(--text-primary)]">
                              <span className="flex items-center gap-1.5">
                                {row.qrwide === 'Yes' && <CheckCircle2 className="h-4 w-4 text-[#10B981]" />}
                                {row.qrwide}
                              </span>
                            </td>
                            <td className="border-t border-[var(--border)] px-4 py-3 text-[13.5px] text-[var(--text-secondary)]">
                              {row.alternative}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              ) : null}

              {/* FAQ */}
              <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-7">
                <h2 className="mb-5 text-[20px] font-bold tracking-[-0.02em] text-[var(--text-primary)] sm:text-[22px]">
                  Frequently asked questions
                </h2>
                <div className="space-y-3">
                  {page.faq.map((item) => (
                    <details key={item.question}
                      className="group rounded-xl border border-[var(--border)] bg-[var(--bg)] px-5 py-4">
                      <summary className="flex cursor-pointer list-none items-center justify-between text-[14px] font-semibold text-[var(--text-primary)]">
                        {item.question}
                        <ChevronRight className="h-4 w-4 shrink-0 text-[var(--text-tertiary)] transition-transform group-open:rotate-90" />
                      </summary>
                      <p className="mt-3 text-[13.5px] leading-[1.75] text-[var(--text-secondary)]">{item.answer}</p>
                    </details>
                  ))}
                </div>
              </section>

              {/* Bottom CTA */}
              <section className="rounded-2xl bg-[#0057FF] px-6 py-8 text-white sm:p-8">
                <h2 className="text-[20px] font-bold tracking-[-0.02em] sm:text-[24px]">
                  Ready to create your QR code?
                </h2>
                <p className="mt-2 text-[14px] leading-relaxed text-white/80">
                  Generate a free QR code in seconds — no account required to download.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/create">
                    <Button size="md" className="bg-white text-[#0057FF] hover:bg-blue-50 focus-visible:ring-white">
                      Generate QR Code Free
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/pricing">
                    <Button size="md" variant="ghost"
                      className="border-white/25 text-white hover:bg-white/10 hover:text-white">
                      View pricing
                    </Button>
                  </Link>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="space-y-5 lg:sticky lg:top-[78px] lg:self-start">
              {/* Related pages */}
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
                <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--text-tertiary)]">
                  Related pages
                </p>
                <div className="space-y-2">
                  {page.internalLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-start gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3.5 transition-colors hover:border-[#0057FF]/25 hover:bg-[#0057FF]/02 group"
                    >
                      <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-[var(--text-tertiary)] group-hover:text-[#0057FF] transition-colors" />
                      <div className="min-w-0">
                        <div className="text-[13px] font-semibold text-[var(--text-primary)] group-hover:text-[#0057FF] transition-colors truncate">
                          {item.label}
                        </div>
                        {item.description ? (
                          <div className="mt-0.5 text-[12px] leading-relaxed text-[var(--text-secondary)] line-clamp-2">
                            {item.description}
                          </div>
                        ) : null}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Quick CTA */}
              <div className="rounded-2xl border border-[#0057FF]/20 bg-[#0057FF]/04 p-5">
                <p className="text-[13px] font-semibold text-[var(--text-primary)]">
                  Generate a {page.h1.replace(' Generator', '')} now
                </p>
                <p className="mt-1.5 text-[12.5px] text-[var(--text-secondary)]">
                  Free to create. No account needed to download.
                </p>
                <Link href={page.heroCtaHref ?? '/create'} className="mt-4 block">
                  <Button size="sm" className="w-full">
                    Create free <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}
