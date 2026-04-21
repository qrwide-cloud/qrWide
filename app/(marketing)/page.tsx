import type { Metadata } from 'next'
import Link from 'next/link'
import { HeroQRGenerator } from '@/components/qr/HeroQRGenerator'
import { Button } from '@/components/ui/Button'
import { QR_TYPES, PLAN_LABELS, PLAN_COLORS, FREE_TYPES, PRO_TYPES, BUSINESS_TYPES } from '@/lib/qr/types'
import {
  CheckCircle2, ArrowRight, Lock,
  RefreshCw, BarChart3, Shield, Gauge, Zap, Globe,
  Star, Utensils, Home, Calendar,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Free QR Code Generator with Analytics | QRWide',
  description:
    'Create free QR codes that never expire. Dynamic QR codes, real-time analytics, custom designs, and multiple QR types.',
  alternates: { canonical: 'https://qrwide.com' },
  openGraph: { url: 'https://qrwide.com' },
}

const FEATURES = [
  { icon: RefreshCw, color: '#0057FF', bg: 'rgba(0,87,255,0.09)', title: 'Dynamic QR Codes', desc: 'Change the destination URL anytime. No reprinting. Ever.' },
  { icon: BarChart3, color: '#00C896', bg: 'rgba(0,200,150,0.09)', title: 'Real-time Analytics', desc: 'Every scan tracked — city, device, time. Know what works.' },
  { icon: Shield,    color: '#10B981', bg: 'rgba(16,185,129,0.09)', title: 'Never Expires',     desc: 'Free codes stay free. No bait-and-switch after 30 days.' },
  { icon: Gauge,     color: '#EF4444', bg: 'rgba(239,68,68,0.09)',   title: 'Sub-200ms Redirect', desc: 'Edge-cached globally. Scans feel instant anywhere.' },
  { icon: Zap,       color: '#F59E0B', bg: 'rgba(245,158,11,0.09)',  title: 'Bulk Generation',  desc: 'Upload a CSV, get 500 QR codes in a ZIP in 60 seconds.' },
  { icon: Globe,     color: '#8B5CF6', bg: 'rgba(139,92,246,0.09)', title: '190+ Countries',   desc: 'Works wherever your audience is, without configuration.' },
]

const NICHES = [
  {
    label: 'Restaurants & Cafes', headline: 'Update your menu. No reprinting.',
    body: 'Print once, update forever. Swap the URL for daily specials or price changes — every scan lands on the latest version.',
    cta: 'See restaurant features', href: '/use-cases/restaurants', Icon: Utensils, color: '#F59E0B',
    stats: [{ value: '$0', label: 'reprinting costs' }, { value: '30s', label: 'to update' }, { value: '∞', label: 'free scans' }],
  },
  {
    label: 'Real Estate Agents', headline: 'Know which listings generate interest.',
    body: 'A unique QR on every property. Real-time scan data shows which listings are hot and where buyers come from.',
    cta: 'See real estate features', href: '/use-cases/real-estate', Icon: Home, color: '#0057FF',
    stats: [{ value: '100%', label: 'scan attribution' }, { value: 'Live', label: 'interest data' }, { value: 'Any', label: 'listing platform' }],
  },
  {
    label: 'Events & Conferences', headline: '500 personalized codes in 60 seconds.',
    body: 'Upload a spreadsheet, download a ZIP of 500 branded QR codes ready to print. Booth cards, badges, handouts — done.',
    cta: 'Try the bulk generator', href: '/use-cases/events', Icon: Calendar, color: '#8B5CF6',
    stats: [{ value: '500', label: 'codes per upload' }, { value: '60s', label: 'generation time' }, { value: 'SVG+PNG', label: 'formats' }],
  },
]

const TESTIMONIALS = [
  { body: 'Menus and signage are where dynamic QR codes earn their keep. Update the destination once and keep the printout in service.', author: 'Restaurants', role: 'Menus, tables, and window signage', initials: 'RE', color: '#F59E0B' },
  { body: 'Property flyers, listing signs, and brochures work better when every QR code has its own analytics page and shareable shortlink.', author: 'Real Estate', role: 'Listing and campaign tracking', initials: 'RA', color: '#0057FF' },
  { body: 'Events need bulk generation, simple downloads, and clean handoff files. QRWide is set up for that workflow out of the box.', author: 'Events', role: 'Badges, booth cards, and handouts', initials: 'EV', color: '#8B5CF6' },
]

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org', '@type': 'WebApplication',
            name: 'QRWide', url: 'https://qrwide.com',
            description: 'Free QR code generator with analytics. Dynamic QR codes that never expire.',
            applicationCategory: 'BusinessApplication',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          }),
        }}
      />

      {/* ════════════════════════════════════════════════════
          HERO — Two-column split
      ════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[var(--bg)]">
        {/* Background atmosphere */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-dot-grid opacity-70" />
          <div className="absolute top-0 left-0 right-0 h-[600px]"
            style={{ background: 'radial-gradient(ellipse 70% 50% at 30% -5%, rgba(0,87,255,0.09) 0%, transparent 70%)' }} />
          <div className="absolute top-0 right-0 h-[700px] w-[700px]"
            style={{ background: 'radial-gradient(circle at 80% 20%, rgba(0,200,150,0.06) 0%, transparent 60%)' }} />
        </div>

        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="flex min-h-[calc(100vh-62px)] flex-col gap-12 py-16 lg:flex-row lg:items-center lg:gap-16 lg:py-20">

            {/* ── LEFT: Marketing copy (45%) ── */}
            <div className="flex-[0_0_auto] lg:w-[44%]">
              {/* Eyebrow */}
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#0057FF]/20 bg-[#0057FF]/06 px-4 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0057FF]" style={{ animation: 'pulseGlow 2s ease-in-out infinite' }} />
                <span className="text-[12.5px] font-semibold tracking-wide text-[#0057FF]">
                  Free forever · No credit card required
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-[42px] font-extrabold leading-[1.07] tracking-[-0.04em] text-[var(--text-primary)] sm:text-[52px] lg:text-[54px] xl:text-[62px]">
                QR codes that
                <br />
                work as hard
                <br />
                <span className="text-gradient">as you do</span>
              </h1>

              {/* Sub */}
              <p className="mt-6 text-[16px] leading-[1.75] text-[var(--text-secondary)] max-w-[420px]">
                Create, track, and update QR codes in seconds.
                Real-time analytics, custom branding, and 15+ QR types —
                free forever for the basics.
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/signup">
                  <Button size="lg" className="glow-blue-sm h-12 px-7 text-[15px]">
                    Get started free
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button size="lg" variant="secondary" className="h-12 px-7 text-[15px]">
                    View pricing
                  </Button>
                </Link>
              </div>

              {/* Trust chips */}
              <div className="mt-7 flex flex-col gap-2.5">
                {[
                  'No credit card required',
                  'Free QR codes never expire',
                  'Dynamic links — update anytime',
                ].map((label) => (
                  <div key={label} className="flex items-center gap-2 text-[13.5px] text-[var(--text-secondary)]">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#10B981]" />
                    {label}
                  </div>
                ))}
              </div>

              {/* Social proof */}
              <div className="mt-10 flex gap-8 border-t border-[var(--border)] pt-8">
                {[
                  { value: '15+', label: 'QR types' },
                  { value: '500', label: 'bulk limit' },
                  { value: 'Edge', label: 'redirect path' },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-[20px] font-bold tracking-tight text-[var(--text-primary)]">{s.value}</div>
                    <div className="text-[12px] text-[var(--text-secondary)] mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT: QR Generator (55%) ── */}
            <div className="flex-1 lg:flex lg:justify-end">
              <div className="relative w-full max-w-[520px] mx-auto lg:mx-0">
                {/* Glow behind card */}
                <div className="absolute -inset-4 -z-10 rounded-[32px] blur-3xl"
                  style={{ background: 'radial-gradient(ellipse, rgba(0,87,255,0.12) 0%, transparent 70%)' }} />
                <HeroQRGenerator />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          PROOF BAR
      ════════════════════════════════════════════════════ */}
      <div className="border-y border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-[14px]">
            {[
              { icon: Gauge,    label: 'Sub-200ms redirects' },
              { icon: Shield,   label: 'Privacy-first tracking' },
              { icon: RefreshCw, label: 'Dynamic QR codes' },
              { icon: Globe,    label: '190+ countries' },
              { icon: BarChart3, label: 'Real-time analytics' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-[13px] font-medium text-[var(--text-secondary)]">
                <Icon className="h-3.5 w-3.5 shrink-0 text-[#0057FF]" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════
          QR TYPE SHOWCASE
      ════════════════════════════════════════════════════ */}
      <section className="py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

          <div className="mx-auto max-w-2xl text-center">
            <p className="label-eyebrow mb-4">15+ QR Types</p>
            <h2 className="text-[32px] font-bold tracking-[-0.03em] leading-[1.2] text-[var(--text-primary)] sm:text-[38px]">
              Generate any type of QR code
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-[var(--text-secondary)]">
              From simple links to calendar events and WhatsApp chats.
              Free types work instantly — Pro and Business types unlock with a subscription.
            </p>
          </div>

          {/* Free types */}
          <div className="mt-14">
            <div className="mb-5 flex items-center gap-3">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#10B981]">Free — always</span>
              <div className="h-px flex-1 bg-[var(--border)]" />
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {FREE_TYPES.map((t) => {
                const Icon = t.icon
                return (
                  <Link key={t.id} href={`/create?type=${t.id}`}
                    className="group feature-card flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-md)]">
                    <div className="shrink-0 h-9 w-9 rounded-lg flex items-center justify-center" style={{ background: t.iconBg }}>
                      <Icon className="h-[18px] w-[18px]" style={{ color: t.iconColor }} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[13.5px] font-semibold text-[var(--text-primary)] truncate">{t.label}</div>
                      <div className="text-[11.5px] text-[var(--text-secondary)] mt-0.5 truncate">{t.description}</div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Pro types */}
          <div className="mt-10">
            <div className="mb-5 flex items-center gap-3">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#0057FF]">Pro — $5/mo</span>
              <div className="h-px flex-1 bg-[var(--border)]" />
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {PRO_TYPES.map((t) => {
                const Icon = t.icon
                return (
                  <Link key={t.id} href="/pricing"
                    className="group feature-card relative flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 hover:border-[#0057FF]/30 hover:shadow-[var(--shadow-md)] overflow-hidden">
                    {/* Locked overlay */}
                    <div className="absolute inset-0 bg-[var(--surface)]/60 backdrop-blur-[1px] flex items-center justify-end pr-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex items-center gap-1.5 rounded-full bg-[#0057FF] px-3 py-1 text-[11px] font-semibold text-white shadow">
                        <Lock className="h-3 w-3" />
                        Upgrade to Pro
                      </div>
                    </div>
                    <div className="shrink-0 h-9 w-9 rounded-lg flex items-center justify-center" style={{ background: t.iconBg }}>
                      <Icon className="h-[18px] w-[18px]" style={{ color: t.iconColor }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[13.5px] font-semibold text-[var(--text-primary)] truncate">{t.label}</span>
                        <Lock className="h-3 w-3 shrink-0 text-[var(--text-tertiary)]" />
                      </div>
                      <div className="text-[11.5px] text-[var(--text-secondary)] mt-0.5 truncate">{t.description}</div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Business types */}
          <div className="mt-10">
            <div className="mb-5 flex items-center gap-3">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#8B5CF6]">Business — $9/mo</span>
              <div className="h-px flex-1 bg-[var(--border)]" />
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {BUSINESS_TYPES.map((t) => {
                const Icon = t.icon
                return (
                  <Link key={t.id} href="/pricing"
                    className="group feature-card relative flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 hover:border-[#8B5CF6]/30 hover:shadow-[var(--shadow-md)] overflow-hidden">
                    <div className="absolute inset-0 bg-[var(--surface)]/60 backdrop-blur-[1px] flex items-center justify-end pr-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex items-center gap-1.5 rounded-full bg-[#8B5CF6] px-3 py-1 text-[11px] font-semibold text-white shadow">
                        <Lock className="h-3 w-3" />
                        Business plan
                      </div>
                    </div>
                    <div className="shrink-0 h-9 w-9 rounded-lg flex items-center justify-center" style={{ background: t.iconBg }}>
                      <Icon className="h-[18px] w-[18px]" style={{ color: t.iconColor }} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[13.5px] font-semibold text-[var(--text-primary)] truncate">{t.label}</span>
                        <Lock className="h-3 w-3 shrink-0 text-[var(--text-tertiary)]" />
                      </div>
                      <div className="text-[11.5px] text-[var(--text-secondary)] mt-0.5 truncate">{t.description}</div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* CTA below grid */}
          <div className="mt-12 flex flex-col items-center gap-4 text-center">
            <p className="text-[14px] text-[var(--text-secondary)]">
              Start free — upgrade when you need more types
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/signup">
                <Button size="md" className="glow-blue-sm">Create free QR code <ArrowRight className="h-4 w-4" /></Button>
              </Link>
              <Link href="/pricing">
                <Button size="md" variant="secondary">Compare all plans</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          FEATURES
      ════════════════════════════════════════════════════ */}
      <section className="bg-[var(--surface)] py-28" id="features">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-xl text-center">
            <p className="label-eyebrow mb-4">Platform</p>
            <h2 className="text-[32px] font-bold tracking-[-0.03em] leading-[1.2] text-[var(--text-primary)] sm:text-[38px]">
              Everything you need.
              <br className="hidden sm:block" /> Nothing you don&apos;t.
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => {
              const Icon = f.icon
              return (
                <div key={f.title}
                  className="feature-card rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-lg)]">
                  <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: f.bg }}>
                    <Icon style={{ color: f.color, width: 18, height: 18 }} />
                  </div>
                  <h3 className="text-[14.5px] font-semibold tracking-tight text-[var(--text-primary)]">{f.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--text-secondary)]">{f.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          NICHE SECTIONS
      ════════════════════════════════════════════════════ */}
      <section className="py-28" id="use-cases">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-xl text-center">
            <p className="label-eyebrow mb-4">Use Cases</p>
            <h2 className="text-[32px] font-bold tracking-[-0.03em] leading-[1.2] text-[var(--text-primary)] sm:text-[38px]">
              Built for your industry
            </h2>
          </div>
          <div className="mt-20 space-y-24">
            {NICHES.map((niche, i) => {
              const Icon = niche.Icon
              return (
                <div key={niche.label}
                  className={`flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-20 ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className="flex-1">
                    <div className="ring-gradient overflow-hidden rounded-3xl p-10 min-h-[260px] flex flex-col items-center justify-center gap-7"
                      style={{ background: `radial-gradient(ellipse at 50% 0%, ${niche.color}0d 0%, var(--bg) 65%)` }}>
                      <div className="h-16 w-16 rounded-2xl flex items-center justify-center shadow-[var(--shadow-md)]"
                        style={{ background: `linear-gradient(135deg, ${niche.color} 0%, ${niche.color}bb 100%)` }}>
                        <Icon className="h-8 w-8 text-white" strokeWidth={1.75} />
                      </div>
                      <div className="flex gap-8">
                        {niche.stats.map((s) => (
                          <div key={s.label} className="text-center">
                            <div className="text-[22px] font-bold tracking-tight" style={{ color: niche.color }}>{s.value}</div>
                            <div className="mt-1 text-[12px] text-[var(--text-secondary)]">{s.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 max-w-[440px]">
                    <div className="mb-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-semibold"
                      style={{ background: `${niche.color}14`, color: niche.color }}>
                      <Icon className="h-3 w-3" />{niche.label}
                    </div>
                    <h3 className="text-[26px] font-bold tracking-[-0.025em] leading-[1.2] text-[var(--text-primary)] sm:text-[30px]">
                      {niche.headline}
                    </h3>
                    <p className="mt-4 text-[15px] leading-[1.75] text-[var(--text-secondary)]">{niche.body}</p>
                    <div className="mt-8">
                      <Link href={niche.href}>
                        <Button size="md" variant="secondary">{niche.cta} <ArrowRight className="h-4 w-4" /></Button>
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          TESTIMONIALS
      ════════════════════════════════════════════════════ */}
      <section className="bg-[var(--surface)] py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-xl text-center">
            <p className="label-eyebrow mb-4">Testimonials</p>
            <h2 className="text-[32px] font-bold tracking-[-0.03em] leading-[1.2] text-[var(--text-primary)] sm:text-[38px]">
              Loved by teams that print QR codes for a living
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div key={t.author}
                className="feature-card flex flex-col gap-5 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-md)]">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-[#F59E0B] text-[#F59E0B]" />)}
                </div>
                <p className="flex-1 text-[14px] leading-[1.7] text-[var(--text-primary)]">&ldquo;{t.body}&rdquo;</p>
                <div className="flex items-center gap-3 border-t border-[var(--border)] pt-5">
                  <div className="h-9 w-9 shrink-0 rounded-full flex items-center justify-center text-[12px] font-bold text-white"
                    style={{ background: t.color }}>{t.initials}</div>
                  <div>
                    <div className="text-[13.5px] font-semibold text-[var(--text-primary)]">{t.author}</div>
                    <div className="text-[12px] text-[var(--text-secondary)]">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          PRICING TEASER
      ════════════════════════════════════════════════════ */}
      <section className="py-24">
        <div className="mx-auto max-w-2xl px-5 sm:px-6 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#10B981]/25 bg-[#10B981]/08 px-4 py-1.5">
            <span className="text-[12.5px] font-semibold text-[#10B981]">Transparent pricing</span>
          </div>
          <h2 className="text-[30px] font-bold tracking-[-0.03em] leading-[1.2] text-[var(--text-primary)] sm:text-[36px]">
            Competitors charge $20/mo for what we give free
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-[var(--text-secondary)]">
            Most features free forever. Pro is $5/mo. Business is $9/mo. No hidden limits.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/pricing"><Button size="lg" variant="secondary" className="h-12 px-7">Compare plans <ArrowRight className="h-4 w-4" /></Button></Link>
            <Link href="/signup"><Button size="lg" className="h-12 px-7 glow-blue-sm">Start for free</Button></Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          BOTTOM CTA
      ════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ background: '#07080d' }}>
        {/* Layered atmosphere */}
        <div className="absolute inset-0 bg-dot-grid opacity-[0.06]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[480px] w-[900px] rounded-full blur-[140px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(0,87,255,0.22) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-0 h-[400px] w-[600px] blur-[120px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(0,200,150,0.1) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 h-[300px] w-[400px] blur-[100px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.08) 0%, transparent 70%)' }} />

        {/* Top border glow */}
        <div className="absolute top-0 inset-x-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(0,87,255,0.4), rgba(0,200,150,0.3), transparent)' }} />

        <div className="relative mx-auto max-w-4xl px-5 sm:px-6 lg:px-8 py-28">

          {/* Stats strip */}
          <div className="mb-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { value: '15+',     label: 'QR code types',     color: '#0057FF' },
              { value: '500',     label: 'bulk limit',        color: '#00C896' },
              { value: '3',       label: 'free dynamic codes', color: '#8B5CF6' },
              { value: 'Edge',    label: 'redirect path',     color: '#F59E0B' },
            ].map((s) => (
              <div key={s.label}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.03] px-5 py-4 text-center backdrop-blur-sm">
                <div className="text-[22px] font-bold tracking-tight" style={{ color: s.color }}>{s.value}</div>
                <div className="mt-1 text-[12px] text-white/40">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Headline + CTA */}
          <div className="text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00C896]"
                style={{ animation: 'pulseGlow 2s ease-in-out infinite' }} />
              <span className="text-[12.5px] font-semibold text-white/60">Start building in seconds</span>
            </div>

            <h2 className="text-[36px] font-extrabold tracking-[-0.04em] leading-[1.1] text-white sm:text-[52px]">
              Your first QR code
              <br />
              <span style={{
                background: 'linear-gradient(135deg, #60a5fa 0%, #34d399 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                takes 30 seconds
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-md text-[16px] leading-relaxed text-white/50">
              No credit card. No account needed to download.
              Upgrade only when you need more.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link href="/signup">
                <Button size="lg"
                  className="h-12 px-8 text-[15px] bg-white text-[#0057FF] hover:bg-blue-50 shadow-[0_8px_40px_rgba(0,87,255,0.25)] focus-visible:ring-white">
                  Get started — it&apos;s free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="ghost"
                  className="h-12 px-8 text-[15px] text-white/70 hover:text-white hover:bg-white/[0.06] border border-white/10">
                  View pricing
                </Button>
              </Link>
            </div>

            {/* Trust chips */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {['No credit card', 'Free codes never expire', 'Cancel anytime'].map((label) => (
                <div key={label} className="flex items-center gap-1.5 text-[13px] text-white/35">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#00C896]/60" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom border */}
        <div className="absolute bottom-0 inset-x-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />
      </section>
    </>
  )
}
