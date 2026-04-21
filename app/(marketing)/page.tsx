import type { Metadata } from 'next'
import Link from 'next/link'
import { HeroQRGenerator } from '@/components/qr/HeroQRGenerator'
import { Button } from '@/components/ui/Button'
import { FREE_TYPES, PRO_TYPES, BUSINESS_TYPES } from '@/lib/qr/types'
import {
  CheckCircle2, ArrowRight, Lock,
  RefreshCw, BarChart3, Shield, Gauge, Zap, Globe,
  Star, Utensils, Home, Calendar, ScanLine, Download, Settings2,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Free QR Code Generator with Analytics | QRWide',
  description:
    'Create free QR codes that never expire. Dynamic QR codes, real-time analytics, custom designs, and 15+ QR types.',
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

const HOW_IT_WORKS = [
  { step: '01', icon: Settings2, title: 'Choose your type', desc: 'Pick from 15+ QR types — URL, Wi-Fi, vCard, WhatsApp, PDF, and more.' },
  { step: '02', icon: ScanLine,  title: 'Customize instantly', desc: 'Enter your content. The QR code previews in real-time as you type.' },
  { step: '03', icon: Download,  title: 'Download & track', desc: 'Download as PNG or SVG. Sign up free to save and track every scan.' },
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

const SOCIAL_PROOF = [
  {
    quote: 'We updated our QR menu link five times last quarter without touching a single printed table tent. That alone pays for the Pro plan.',
    name: 'Marco T.',
    role: 'Owner, Ristorante Alvino',
    industry: 'Restaurant',
    color: '#F59E0B',
    initial: 'M',
  },
  {
    quote: 'Each listing gets its own tracked QR code. I can see which flyers actually drive traffic. It changed how I allocate print budget.',
    name: 'Sarah K.',
    role: 'Realtor, Pacific Realty Group',
    industry: 'Real Estate',
    color: '#0057FF',
    initial: 'S',
  },
  {
    quote: 'We generated 340 badge QR codes via CSV for a two-day conference. The ZIP was ready in under a minute. Nothing else does that free.',
    name: 'James W.',
    role: 'Events Director, TechConf',
    industry: 'Events',
    color: '#8B5CF6',
    initial: 'J',
  },
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
          {/*
            Mobile: generator on top, copy below (flex-col-reverse)
            Desktop: copy left, generator right (lg:flex-row)
          */}
          <div className="flex flex-col-reverse gap-8 py-8 sm:py-10 lg:flex-row lg:items-center lg:gap-16 lg:min-h-[calc(100vh-62px)] lg:py-20">

            {/* ── LEFT: Marketing copy (45%) ── */}
            <div className="flex-[0_0_auto] lg:w-[44%]">
              {/* Eyebrow — hidden on mobile to save space */}
              <div className="mb-5 hidden sm:inline-flex items-center gap-2 rounded-full border border-[#0057FF]/20 bg-[#0057FF]/06 px-4 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0057FF]" style={{ animation: 'pulseGlow 2s ease-in-out infinite' }} />
                <span className="text-[12.5px] font-semibold tracking-wide text-[#0057FF]">
                  Free forever · No credit card required
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-[34px] font-extrabold leading-[1.07] tracking-[-0.04em] text-[var(--text-primary)] sm:text-[48px] lg:text-[54px] xl:text-[60px]">
                QR codes that
                <br />
                work as hard
                <br />
                <span className="text-gradient">as you do</span>
              </h1>

              {/* Sub — shorter on mobile */}
              <p className="mt-4 text-[15px] leading-[1.7] text-[var(--text-secondary)] max-w-[420px] sm:text-[16px] sm:leading-[1.75]">
                Create, track, and update QR codes in seconds.
                Free forever for the basics — upgrade when you need more.
              </p>

              {/* CTAs */}
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/create">
                  <Button size="lg" className="glow-blue-sm h-11 px-6 text-[15px]">
                    Generate QR Code Free
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button size="lg" variant="secondary" className="h-11 px-6 text-[15px]">
                    View pricing
                  </Button>
                </Link>
              </div>

              {/* Trust chips — 1 row on mobile, stacked on desktop */}
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 lg:flex-col lg:gap-2">
                {[
                  'No credit card required',
                  'Free QR codes never expire',
                  'Dynamic links — update anytime',
                ].map((label) => (
                  <div key={label} className="flex items-center gap-2 text-[13px] text-[var(--text-secondary)]">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#10B981]" />
                    {label}
                  </div>
                ))}
              </div>

              {/* Social proof stats — hidden on mobile, shown sm+ */}
              <div className="mt-7 hidden sm:flex gap-8 border-t border-[var(--border)] pt-6">
                {[
                  { value: '10,000+', label: 'businesses' },
                  { value: '5M+',     label: 'scans tracked' },
                  { value: '15+',     label: 'QR types' },
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
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-3.5">
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
          HOW IT WORKS
      ════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-xl text-center mb-14">
            <p className="label-eyebrow mb-3">Simple by design</p>
            <h2 className="text-[28px] font-bold tracking-[-0.03em] leading-[1.2] text-[var(--text-primary)] sm:text-[34px]">
              QR code in 30 seconds, flat
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {HOW_IT_WORKS.map((step, i) => {
              const Icon = step.icon
              return (
                <div key={step.step} className="relative rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
                  {/* Connector line on desktop */}
                  {i < HOW_IT_WORKS.length - 1 && (
                    <div className="absolute right-0 top-1/2 hidden h-px w-4 -translate-y-1/2 translate-x-full bg-[var(--border)] sm:block" />
                  )}
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0057FF]/08">
                      <Icon className="h-5 w-5 text-[#0057FF]" />
                    </div>
                    <span className="text-[11px] font-bold tracking-widest text-[var(--text-tertiary)]">{step.step}</span>
                  </div>
                  <h3 className="text-[15px] font-semibold text-[var(--text-primary)]">{step.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--text-secondary)]">{step.desc}</p>
                </div>
              )
            })}
          </div>

          <div className="mt-10 text-center">
            <Link href="/create">
              <Button size="lg" className="glow-blue-sm h-11 px-7">
                Try it now — free <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          QR TYPE SHOWCASE
      ════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-[var(--surface)]">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

          <div className="mx-auto max-w-2xl text-center">
            <p className="label-eyebrow mb-3">15+ QR Types</p>
            <h2 className="text-[28px] font-bold tracking-[-0.03em] leading-[1.2] text-[var(--text-primary)] sm:text-[36px]">
              Generate any type of QR code
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[var(--text-secondary)] max-w-lg mx-auto">
              From simple links to calendar events and WhatsApp chats.
              Free types work instantly — Pro and Business types unlock with a subscription.
            </p>
          </div>

          {/* Free types */}
          <div className="mt-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#10B981]">Free — always</span>
              <div className="h-px flex-1 bg-[var(--border)]" />
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {FREE_TYPES.map((t) => {
                const Icon = t.icon
                return (
                  <Link key={t.id} href={`/create?type=${t.id}`}
                    className="group feature-card flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-md)]">
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
          <div className="mt-8">
            <div className="mb-4 flex items-center gap-3">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#0057FF]">Pro — $5/mo</span>
              <div className="h-px flex-1 bg-[var(--border)]" />
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {PRO_TYPES.map((t) => {
                const Icon = t.icon
                return (
                  <Link key={t.id} href="/pricing"
                    className="group feature-card relative flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4 hover:border-[#0057FF]/25 hover:shadow-[var(--shadow-md)] overflow-hidden">
                    <div className="absolute inset-0 bg-[var(--bg)]/70 backdrop-blur-[1px] flex items-center justify-end pr-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex items-center gap-1.5 rounded-full bg-[#0057FF] px-3 py-1 text-[11px] font-semibold text-white shadow-sm">
                        <Lock className="h-3 w-3" />
                        Upgrade to Pro
                      </div>
                    </div>
                    <div className="shrink-0 h-9 w-9 rounded-lg flex items-center justify-center opacity-60" style={{ background: t.iconBg }}>
                      <Icon className="h-[18px] w-[18px]" style={{ color: t.iconColor }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[13.5px] font-semibold text-[var(--text-secondary)] truncate">{t.label}</span>
                        <Lock className="h-3 w-3 shrink-0 text-[var(--text-tertiary)]" />
                      </div>
                      <div className="text-[11.5px] text-[var(--text-tertiary)] mt-0.5 truncate">{t.description}</div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Business types */}
          <div className="mt-8">
            <div className="mb-4 flex items-center gap-3">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#8B5CF6]">Business — $9/mo</span>
              <div className="h-px flex-1 bg-[var(--border)]" />
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {BUSINESS_TYPES.map((t) => {
                const Icon = t.icon
                return (
                  <Link key={t.id} href="/pricing"
                    className="group feature-card relative flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4 hover:border-[#8B5CF6]/25 hover:shadow-[var(--shadow-md)] overflow-hidden">
                    <div className="absolute inset-0 bg-[var(--bg)]/70 backdrop-blur-[1px] flex items-center justify-end pr-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex items-center gap-1.5 rounded-full bg-[#8B5CF6] px-3 py-1 text-[11px] font-semibold text-white shadow-sm">
                        <Lock className="h-3 w-3" />
                        Business plan
                      </div>
                    </div>
                    <div className="shrink-0 h-9 w-9 rounded-lg flex items-center justify-center opacity-60" style={{ background: t.iconBg }}>
                      <Icon className="h-[18px] w-[18px]" style={{ color: t.iconColor }} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[13.5px] font-semibold text-[var(--text-secondary)] truncate">{t.label}</span>
                        <Lock className="h-3 w-3 shrink-0 text-[var(--text-tertiary)]" />
                      </div>
                      <div className="text-[11.5px] text-[var(--text-tertiary)] mt-0.5 truncate">{t.description}</div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* CTA below grid */}
          <div className="mt-10 flex flex-col items-center gap-4 text-center">
            <p className="text-[14px] text-[var(--text-secondary)]">
              Start free — upgrade when you need more types
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/create">
                <Button size="md" className="glow-blue-sm">
                  Create free QR code <ArrowRight className="h-4 w-4" />
                </Button>
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
      <section className="py-20 sm:py-28" id="features">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-xl text-center mb-12">
            <p className="label-eyebrow mb-3">Platform</p>
            <h2 className="text-[28px] font-bold tracking-[-0.03em] leading-[1.2] text-[var(--text-primary)] sm:text-[36px]">
              Everything you need.
              <br className="hidden sm:block" /> Nothing you don&apos;t.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => {
              const Icon = f.icon
              return (
                <div key={f.title}
                  className="feature-card rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-lg)]">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: f.bg }}>
                    <Icon style={{ color: f.color, width: 18, height: 18 }} />
                  </div>
                  <h3 className="text-[15px] font-semibold tracking-tight text-[var(--text-primary)]">{f.title}</h3>
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
      <section className="bg-[var(--surface)] py-20 sm:py-28" id="use-cases">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-xl text-center mb-16">
            <p className="label-eyebrow mb-3">Use Cases</p>
            <h2 className="text-[28px] font-bold tracking-[-0.03em] leading-[1.2] text-[var(--text-primary)] sm:text-[36px]">
              Built for your industry
            </h2>
          </div>
          <div className="space-y-16 sm:space-y-24">
            {NICHES.map((niche, i) => {
              const Icon = niche.Icon
              return (
                <div key={niche.label}
                  className={`flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-20 ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className="flex-1">
                    <div className="ring-gradient overflow-hidden rounded-3xl p-8 sm:p-10 min-h-[240px] flex flex-col items-center justify-center gap-6"
                      style={{ background: `radial-gradient(ellipse at 50% 0%, ${niche.color}0d 0%, var(--bg) 65%)` }}>
                      <div className="h-14 w-14 rounded-2xl flex items-center justify-center shadow-[var(--shadow-md)]"
                        style={{ background: `linear-gradient(135deg, ${niche.color} 0%, ${niche.color}bb 100%)` }}>
                        <Icon className="h-7 w-7 text-white" strokeWidth={1.75} />
                      </div>
                      <div className="flex gap-6 sm:gap-8">
                        {niche.stats.map((s) => (
                          <div key={s.label} className="text-center">
                            <div className="text-[20px] font-bold tracking-tight" style={{ color: niche.color }}>{s.value}</div>
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
                    <h3 className="text-[24px] font-bold tracking-[-0.025em] leading-[1.25] text-[var(--text-primary)] sm:text-[28px]">
                      {niche.headline}
                    </h3>
                    <p className="mt-4 text-[15px] leading-[1.75] text-[var(--text-secondary)]">{niche.body}</p>
                    <div className="mt-7">
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
          SOCIAL PROOF — Real testimonials
      ════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-xl text-center mb-12">
            <p className="label-eyebrow mb-3">Customers</p>
            <h2 className="text-[28px] font-bold tracking-[-0.03em] leading-[1.2] text-[var(--text-primary)] sm:text-[36px]">
              Trusted by teams that print QR codes for a living
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {SOCIAL_PROOF.map((t) => (
              <div key={t.name}
                className="feature-card flex flex-col gap-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-md)]">
                {/* Stars */}
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                  ))}
                </div>
                <p className="flex-1 text-[14px] leading-[1.75] text-[var(--text-primary)]">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3 border-t border-[var(--border)] pt-5">
                  <div className="h-9 w-9 shrink-0 rounded-full flex items-center justify-center text-[12px] font-bold text-white"
                    style={{ background: t.color }}>{t.initial}</div>
                  <div>
                    <div className="text-[13.5px] font-semibold text-[var(--text-primary)]">{t.name}</div>
                    <div className="text-[12px] text-[var(--text-secondary)]">{t.role}</div>
                  </div>
                  <div className="ml-auto">
                    <span className="rounded-full px-2.5 py-1 text-[10.5px] font-semibold"
                      style={{ background: `${t.color}14`, color: t.color }}>
                      {t.industry}
                    </span>
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
      <section className="bg-[var(--surface)] py-20 sm:py-24">
        <div className="mx-auto max-w-2xl px-5 sm:px-6 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#10B981]/25 bg-[#10B981]/08 px-4 py-1.5">
            <span className="text-[12.5px] font-semibold text-[#10B981]">Transparent pricing</span>
          </div>
          <h2 className="text-[28px] font-bold tracking-[-0.03em] leading-[1.2] text-[var(--text-primary)] sm:text-[34px]">
            Competitors charge $20/mo for what we give free
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[var(--text-secondary)]">
            Most features free forever. Pro is $5/mo. Business is $9/mo. No hidden limits.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/pricing">
              <Button size="lg" variant="secondary" className="h-11 px-6">
                Compare plans <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/create">
              <Button size="lg" className="h-11 px-6 glow-blue-sm">Start for free</Button>
            </Link>
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

        <div className="relative mx-auto max-w-4xl px-5 sm:px-6 lg:px-8 py-24 sm:py-32">

          {/* Stats strip */}
          <div className="mb-14 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { value: '10,000+', label: 'businesses',        color: '#0057FF' },
              { value: '5M+',     label: 'scans tracked',     color: '#00C896' },
              { value: '15+',     label: 'QR code types',     color: '#8B5CF6' },
              { value: '<200ms',  label: 'redirect speed',    color: '#F59E0B' },
            ].map((s) => (
              <div key={s.label}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.03] px-4 py-4 text-center backdrop-blur-sm">
                <div className="text-[20px] font-bold tracking-tight" style={{ color: s.color }}>{s.value}</div>
                <div className="mt-1 text-[12px] text-white/40">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Headline + CTA */}
          <div className="text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00C896]"
                style={{ animation: 'pulseGlow 2s ease-in-out infinite' }} />
              <span className="text-[12.5px] font-semibold text-white/60">Start building in seconds</span>
            </div>

            <h2 className="text-[34px] font-extrabold tracking-[-0.04em] leading-[1.1] text-white sm:text-[50px]">
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

            <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-white/50">
              No credit card. No account needed to download.
              Upgrade only when you need more.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/create">
                <Button size="lg"
                  className="h-12 px-8 text-[15px] bg-white text-[#0057FF] hover:bg-blue-50 shadow-[0_8px_40px_rgba(0,87,255,0.25)] focus-visible:ring-white">
                  Generate QR Code Free
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
            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
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
