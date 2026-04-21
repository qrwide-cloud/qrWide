import type { Metadata } from 'next'
import Link from 'next/link'
import { HeroQRGenerator } from '@/components/qr/HeroQRGenerator'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Free QR Code Generator with Analytics | QRWide',
  description:
    'Create free QR codes that never expire. Dynamic QR codes, real-time analytics, custom designs. Used by 10,000+ restaurants, agents, and creators.',
  alternates: { canonical: 'https://qrwide.com' },
  openGraph: { url: 'https://qrwide.com' },
}

const FEATURES = [
  {
    icon: '⚡',
    title: 'Dynamic QR Codes',
    desc: 'Change the destination URL anytime after printing. No reprinting required.',
  },
  {
    icon: '📊',
    title: 'Real-time Analytics',
    desc: 'See every scan — where, what device, what time. Know what works.',
  },
  {
    icon: '🎨',
    title: 'Custom Design',
    desc: 'Your brand colors and logo embedded in every QR code.',
  },
  {
    icon: '📦',
    title: 'Bulk Generation',
    desc: 'Create 500 QR codes from a CSV file in under 60 seconds.',
  },
  {
    icon: '♾️',
    title: 'No Expiry',
    desc: 'Free QR codes never expire. Unlike competitors who kill free codes.',
  },
  {
    icon: '🚀',
    title: 'Instant Redirect',
    desc: 'Scans load in under 200ms. People scanning are impatient.',
  },
]

const NICHES = [
  {
    id: 'restaurants',
    label: 'Restaurants',
    headline: 'Update your menu anytime. No reprinting.',
    body: "Print a QR code on your table cards once. Update the menu URL whenever you want — daily specials, seasonal menus, price changes. Customers always see the latest.",
    cta: 'Create a menu QR free',
    href: '/use-cases/restaurants',
    emoji: '🍽️',
  },
  {
    id: 'real-estate',
    label: 'Real Estate',
    headline: 'Track which listings generate the most interest.',
    body: "Put a unique QR on every property listing. See exactly how many people scanned it, where they're from, and when. Move fast on high-interest listings.",
    cta: 'Track your listings free',
    href: '/use-cases/real-estate',
    emoji: '🏠',
  },
  {
    id: 'events',
    label: 'Events',
    headline: '500 QR codes in 60 seconds.',
    body: "Upload a CSV with booth names and URLs. Get a ZIP of 500 custom QR codes ready to print. No design skills needed. Works for conferences, expos, fairs.",
    cta: 'Try bulk generator free',
    href: '/use-cases/events',
    emoji: '🎪',
  },
]

export default function HomePage() {
  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'QRWide',
            url: 'https://qrwide.com',
            description: 'Free QR code generator with analytics. Dynamic QR codes that never expire.',
            applicationCategory: 'BusinessApplication',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          }),
        }}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[var(--bg)] pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-[#0066FF]/5 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full bg-[#00D4AA]/5 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col-reverse gap-12 md:flex-row md:items-center md:gap-16">
            {/* Left: copy */}
            <div className="flex-1">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#0066FF]/20 bg-[#0066FF]/5 px-3 py-1 text-xs font-medium text-[#0066FF]">
                ✨ Free forever · No credit card required
              </div>
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-[var(--text-primary)] md:text-5xl lg:text-6xl">
                QR codes that work{' '}
                <span className="text-[#0066FF]">as hard as you do</span>
              </h1>
              <p className="mt-6 text-lg text-[var(--text-secondary)] md:text-xl max-w-lg">
                Create, track, and update QR codes in seconds. Free forever for the basics.
                No account needed to get started.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/create">
                  <Button size="lg">Create free QR code</Button>
                </Link>
                <Link href="#how-it-works">
                  <Button size="lg" variant="secondary">See how it works</Button>
                </Link>
              </div>
              <p className="mt-6 text-sm text-[var(--text-secondary)]">
                Trusted by <strong className="text-[var(--text-primary)]">10,000+</strong> restaurants, agents, and creators
              </p>
            </div>

            {/* Right: Live QR generator */}
            <div className="flex-1 max-w-md w-full mx-auto md:mx-0">
              <HeroQRGenerator />
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF BAR */}
      <section className="border-y border-[var(--border)] bg-[var(--surface)] py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-[var(--text-secondary)]">
            {['⚡ Sub-200ms redirect speed', '🔒 Privacy-first scan tracking', '♾️ Free QR codes never expire', '🌍 Works in 190+ countries'].map((item) => (
              <span key={item} className="font-medium">{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="py-24" id="features">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] md:text-4xl">
              Everything you need, nothing you don't
            </h2>
            <p className="mt-4 text-lg text-[var(--text-secondary)]">
              Built for businesses that care about results, not features they'll never use.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-[12px] border border-[var(--border)] bg-white dark:bg-[#141414] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)] transition-all duration-150 hover:-translate-y-px hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)]"
              >
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="text-base font-semibold text-[var(--text-primary)]">{f.title}</h3>
                <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NICHE SECTIONS */}
      <section className="bg-[var(--surface)] py-24" id="use-cases">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] md:text-4xl">
              Built for your industry
            </h2>
          </div>
          <div className="mt-16 space-y-16">
            {NICHES.map((niche, i) => (
              <div
                key={niche.id}
                className={`flex flex-col gap-10 md:flex-row md:items-center md:gap-16 ${
                  i % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1 flex items-center justify-center rounded-[16px] bg-white dark:bg-[#141414] border border-[var(--border)] h-64 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
                  <span className="text-8xl">{niche.emoji}</span>
                </div>
                <div className="flex-1">
                  <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#0066FF]">
                    {niche.label}
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--text-primary)] md:text-3xl">
                    {niche.headline}
                  </h3>
                  <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">{niche.body}</p>
                  <div className="mt-6">
                    <Link href={niche.href}>
                      <Button size="md">{niche.cta} →</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING PREVIEW */}
      <section className="py-24" id="how-it-works">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-[var(--text-primary)] md:text-4xl">
            Competitors charge $20/mo for what we give free
          </h2>
          <p className="mt-4 text-lg text-[var(--text-secondary)]">
            qr.io charges $20/mo. QR Tiger charges $25/mo. We charge $5/mo for Pro —
            and most features are free forever.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/pricing">
              <Button size="lg" variant="secondary">See pricing →</Button>
            </Link>
            <Link href="/signup">
              <Button size="lg">Start for free</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="bg-[#0066FF] py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center text-white">
          <h2 className="text-3xl font-bold md:text-4xl">
            Your first QR code takes 30 seconds
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            No credit card. No account required to download. Start now.
          </p>
          <div className="mt-8">
            <Link href="/create">
              <Button
                size="lg"
                className="bg-white text-[#0066FF] hover:bg-blue-50 focus-visible:ring-white"
              >
                Create a QR code free →
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
