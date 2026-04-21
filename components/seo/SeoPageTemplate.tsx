import Link from 'next/link'
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

      <div className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} currentLabel={page.h1} />

          <section className="rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[var(--shadow-md)] sm:p-10">
            <div className="mb-4 inline-flex items-center rounded-full border border-[#0066FF]/15 bg-[#0066FF]/6 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#0066FF]">
              {page.eyebrow}
            </div>

            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
              <div>
                <h1 className="max-w-3xl text-4xl font-bold tracking-[-0.03em] text-[var(--text-primary)] sm:text-5xl">
                  {page.h1}
                </h1>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--text-secondary)]">
                  {page.heroBody}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href={page.heroCtaHref ?? '/create'}>
                    <Button size="lg">{page.heroCtaLabel ?? 'Generate QR Code Free'}</Button>
                  </Link>
                  {page.secondaryCtaHref && page.secondaryCtaLabel ? (
                    <Link href={page.secondaryCtaHref}>
                      <Button size="lg" variant="secondary">{page.secondaryCtaLabel}</Button>
                    </Link>
                  ) : null}
                </div>
              </div>

              <aside className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6">
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-secondary)]">
                  Why this page matters
                </div>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--text-primary)]">
                  {page.trustSignals.map((signal) => (
                    <li key={signal} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#0066FF]" />
                      <span>{signal}</span>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </section>

          <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-8">
              {page.sections.map((section) => (
                <section key={section.heading} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-7">
                  <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[var(--text-primary)]">
                    {section.heading}
                  </h2>
                  <div className="mt-4 space-y-4 text-[15px] leading-7 text-[var(--text-secondary)]">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {section.bullets && section.bullets.length > 0 ? (
                    <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text-primary)]">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}

              {page.comparisonRows && page.comparisonRows.length > 0 ? (
                <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-7">
                  <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[var(--text-primary)]">
                    {page.comparisonTitle ?? 'Comparison'}
                  </h2>
                  <div className="mt-5 overflow-x-auto">
                    <table className="min-w-full border-separate border-spacing-0 overflow-hidden rounded-xl border border-[var(--border)]">
                      <thead>
                        <tr className="bg-[var(--bg)] text-left text-sm text-[var(--text-primary)]">
                          <th className="px-4 py-3">Factor</th>
                          <th className="px-4 py-3">QRWide</th>
                          <th className="px-4 py-3">Alternative</th>
                        </tr>
                      </thead>
                      <tbody>
                        {page.comparisonRows.map((row) => (
                          <tr key={row.label} className="text-sm text-[var(--text-secondary)]">
                            <td className="border-t border-[var(--border)] px-4 py-3 font-medium text-[var(--text-primary)]">{row.label}</td>
                            <td className="border-t border-[var(--border)] px-4 py-3">{row.qrwide}</td>
                            <td className="border-t border-[var(--border)] px-4 py-3">{row.alternative}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              ) : null}

              <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-7">
                <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[var(--text-primary)]">
                  Frequently asked questions
                </h2>
                <div className="mt-6 space-y-4">
                  {page.faq.map((item) => (
                    <details key={item.question} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] px-5 py-4">
                      <summary className="cursor-pointer list-none text-base font-medium text-[var(--text-primary)]">
                        {item.question}
                      </summary>
                      <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{item.answer}</p>
                    </details>
                  ))}
                </div>
              </section>

              <section className="rounded-[24px] bg-[#0066FF] px-7 py-8 text-white">
                <h2 className="text-2xl font-semibold tracking-[-0.02em]">Ready to build with QRWide?</h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-white/85">
                  Start with a free QR code today, then save and track it when you need more control.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/create">
                    <Button size="lg" className="bg-white text-[#0066FF] hover:bg-blue-50 focus-visible:ring-white">
                      Generate QR Code Free
                    </Button>
                  </Link>
                  <Link href="/pricing">
                    <Button size="lg" variant="secondary" className="border-white/30 bg-transparent text-white hover:bg-white/10">
                      See pricing
                    </Button>
                  </Link>
                </div>
              </section>
            </div>

            <aside className="space-y-6">
              <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-secondary)]">
                  Related pages
                </div>
                <div className="mt-4 space-y-3">
                  {page.internalLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-4 transition-colors hover:border-[var(--border-strong)]"
                    >
                      <div className="text-sm font-medium text-[var(--text-primary)]">{item.label}</div>
                      {item.description ? (
                        <div className="mt-1 text-xs leading-6 text-[var(--text-secondary)]">{item.description}</div>
                      ) : null}
                    </Link>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-secondary)]">
                  Semantic keywords
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {page.semanticKeywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="rounded-full border border-[var(--border)] bg-[var(--bg)] px-3 py-1 text-xs text-[var(--text-secondary)]"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </section>
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}
