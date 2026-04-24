import type { Metadata } from 'next'
import Link from 'next/link'
import { HeroQRGenerator } from '@/components/qr/HeroQRGenerator'
import { Button } from '@/components/ui/Button'
import { CinematicStory } from '@/components/home/cinematic'
import { FREE_TYPES, PRO_TYPES, BUSINESS_TYPES } from '@/lib/qr/types'
import {
  CheckCircle2, ArrowRight, Lock,
  RefreshCw, BarChart3, Shield, Gauge, Zap, Globe,
  Star, Utensils, Home, Calendar, ScanLine, Download, Settings2, ChevronRight,
} from 'lucide-react'

const HOME_FAQ = [
  {
    question: 'Is QRWide really free?',
    answer: 'Yes. The Free plan is free forever — no time limit, no credit card required. Free static QR codes never expire. You also get 3 dynamic QR codes (updateable after printing) on the Free plan at no cost.',
  },
  {
    question: 'What is the difference between a static and dynamic QR code?',
    answer: 'Static QR codes encode the destination directly in the pattern — they cannot be changed after printing. Dynamic QR codes redirect through QRWide\'s servers, so you can update the destination URL at any time without reprinting. Dynamic codes also unlock real-time scan analytics.',
  },
  {
    question: 'Can I use QR codes for my business without paying?',
    answer: 'Yes. The Free plan includes 3 dynamic QR codes, 4 QR types (URL, Text, Wi-Fi, vCard), PNG and SVG downloads, and basic scan counts — enough for most small business needs. Upgrade to Pro ($5/mo) for 50 dynamic codes, full analytics, and 10 additional QR types.',
  },
  {
    question: 'How long does it take to create a QR code?',
    answer: 'Under 30 seconds. Enter your URL or content, choose a type, and download instantly. No account required for basic generation. Sign up free to save your codes and track scans.',
  },
  {
    question: 'Do QRWide QR codes work with any smartphone?',
    answer: 'Yes. QRWide generates standard QR codes compatible with the native camera app on all modern iOS and Android devices — no special app required.',
  },
  {
    question: 'Can I update a QR code after it has been printed?',
    answer: 'Yes, if it is a dynamic QR code. The printed QR pattern never changes, but the destination URL it points to can be updated anytime from your dashboard. This means you can fix broken links or redirect to a new page without reprinting anything.',
  },
]

export const metadata: Metadata = {
  title: { absolute: 'Free QR Code Generator with Analytics | QRWide' },
  description:
    'Create free QR codes that never expire. Dynamic QR codes, real-time analytics, custom designs, and 15+ QR types.',
  keywords: ['free qr code generator', 'dynamic qr code', 'qr code analytics', 'qr code maker', 'qr code creator'],
  alternates: { canonical: 'https://qrwide.com' },
  openGraph: { url: 'https://qrwide.com' },
}

const FEATURES = [
  {
    icon: RefreshCw, color: '#0057FF', bg: 'rgba(0,87,255,0.1)',
    title: 'Dynamic QR Codes',
    desc: 'Change the destination URL any time — without touching the printed QR. Perfect for menus, campaigns, and signage.',
  },
  {
    icon: BarChart3, color: '#00C896', bg: 'rgba(0,200,150,0.1)',
    title: 'Real-time Scan Analytics',
    desc: 'See every scan: location, device type, time of day. Know exactly which placements drive traffic.',
  },
  {
    icon: Shield, color: '#10B981', bg: 'rgba(16,185,129,0.1)',
    title: 'Free Codes Never Expire',
    desc: 'We don\'t pull the rug. Free static codes stay active forever — no 30-day expiry tricks.',
  },
  {
    icon: Gauge, color: '#EF4444', bg: 'rgba(239,68,68,0.1)',
    title: 'Sub-200ms Redirects',
    desc: 'Edge-cached globally. Scans resolve in under 200ms regardless of where your audience is.',
  },
  {
    icon: Zap, color: '#F59E0B', bg: 'rgba(245,158,11,0.1)',
    title: 'Bulk Generation',
    desc: 'Upload a CSV, download a ZIP of 500 print-ready QR codes in under 60 seconds.',
  },
  {
    icon: Globe, color: '#8B5CF6', bg: 'rgba(139,92,246,0.1)',
    title: '15+ QR Types',
    desc: 'URL, Wi-Fi, vCard, WhatsApp, PDF, Instagram, Events and more — all from one platform.',
  },
]

const HOW_IT_WORKS = [
  { step: '1', icon: Settings2, title: 'Choose a QR type', desc: 'Pick from 15+ types — URL, Wi-Fi, vCard, WhatsApp, PDF, and more.' },
  { step: '2', icon: ScanLine,  title: 'Enter your content', desc: 'Type in your link or details. The QR code renders live as you type.' },
  { step: '3', icon: Download,  title: 'Download & deploy', desc: 'Grab PNG or SVG instantly. Sign up free to save, edit, and track scans.' },
]

const NICHES = [
  {
    label: 'Restaurants & Cafes',
    headline: 'Update your menu without reprinting.',
    body: 'Print your QR code once. When prices change or specials rotate, update the destination URL in seconds. Every scan always lands on the latest version.',
    cta: 'See restaurant features',
    href: '/use-cases/restaurants',
    Icon: Utensils,
    color: '#F59E0B',
    accentBg: 'rgba(245,158,11,0.06)',
    bullets: ['One QR on every table', 'Update menu URL in seconds', 'No reprinting costs ever'],
    stats: [{ value: '$0', label: 'reprint cost' }, { value: '30s', label: 'to update' }, { value: '∞', label: 'free scans' }],
  },
  {
    label: 'Real Estate',
    headline: 'Know which listings drive the most interest.',
    body: 'Put a unique tracked QR on every flyer, yard sign, and listing sheet. See scan volume per property, location data, and peak interest times — all in your dashboard.',
    cta: 'See real estate features',
    href: '/use-cases/real-estate',
    Icon: Home,
    color: '#0057FF',
    accentBg: 'rgba(0,87,255,0.06)',
    bullets: ['One code per listing', 'Scan heatmaps by location', 'Compare listing interest side-by-side'],
    stats: [{ value: '100%', label: 'attribution' }, { value: 'Live', label: 'scan data' }, { value: 'Any', label: 'listing platform' }],
  },
  {
    label: 'Events & Conferences',
    headline: '500 personalized badge codes in 60 seconds.',
    body: 'Upload your attendee spreadsheet. Download a ZIP of individually labeled, print-ready QR codes. Booth cards, badge inserts, handout sheets — done before your next meeting.',
    cta: 'Try the bulk generator',
    href: '/use-cases/events',
    Icon: Calendar,
    color: '#8B5CF6',
    accentBg: 'rgba(139,92,246,0.06)',
    bullets: ['CSV upload → ZIP download', 'SVG + PNG formats included', 'Scan analytics per attendee'],
    stats: [{ value: '500', label: 'codes/upload' }, { value: '60s', label: 'generation' }, { value: 'SVG+PNG', label: 'formats' }],
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
    quote: 'Each listing gets its own tracked QR. I can see which flyers actually drive traffic. It changed how I allocate my print budget entirely.',
    name: 'Sarah K.',
    role: 'Realtor, Pacific Realty Group',
    industry: 'Real Estate',
    color: '#0057FF',
    initial: 'S',
  },
  {
    quote: 'We generated 340 badge QR codes via CSV for a two-day conference. The ZIP was ready in under a minute. Nothing else does that for free.',
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
      {/* WebSite — enables sitelinks searchbox in Google */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'QRWide',
        url: 'https://qrwide.com',
        potentialAction: {
          '@type': 'SearchAction',
          target: { '@type': 'EntryPoint', urlTemplate: 'https://qrwide.com/qr-code-generator?q={search_term_string}' },
          'query-input': 'required name=search_term_string',
        },
      })}} />

      {/* SoftwareApplication — rich result with pricing */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'QRWide',
        url: 'https://qrwide.com',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description: 'Free QR code generator with real-time analytics. Create, track, and update dynamic QR codes. 15+ QR types including Wi-Fi, vCard, WhatsApp, PDF, and more.',
        offers: [
          { '@type': 'Offer', name: 'Free', price: '0', priceCurrency: 'USD' },
          { '@type': 'Offer', name: 'Pro', price: '5', priceCurrency: 'USD', billingIncrement: 'P1M' },
          { '@type': 'Offer', name: 'Business', price: '9', priceCurrency: 'USD', billingIncrement: 'P1M' },
        ],
      })}} />

      {/* Organization — establishes brand entity */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'QRWide',
        url: 'https://qrwide.com',
        logo: 'https://qrwide.com/logo.svg',
        sameAs: ['https://twitter.com/qrwide'],
        contactPoint: { '@type': 'ContactPoint', contactType: 'customer support', url: 'https://qrwide.com' },
      })}} />

      {/* FAQPage — expandable FAQ in search results */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: HOME_FAQ.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      })}} />

      {/* ══════════════════════════════════════════════════════
          CINEMATIC HERO — scroll-driven 3D particle story
      ══════════════════════════════════════════════════════ */}
      <CinematicStory />

      {/* ══════════════════════════════════════════════════════
          GENERATOR — try it free, no account needed
      ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[var(--bg)]">
        <div className="absolute inset-0 -z-10 bg-dot-grid opacity-60" />
        <div className="absolute -z-10 top-0 left-0 right-0 h-[500px]"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 20% -10%, rgba(0,87,255,0.08) 0%, transparent 70%)' }} />

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col pt-10 pb-12
                          lg:flex-row lg:items-center lg:gap-12 lg:py-16 xl:py-20">

            {/* Copy — left */}
            <div className="flex-1 lg:max-w-[520px]">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#0057FF]/20 bg-[#0057FF]/06 px-3.5 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00C896]"
                  style={{ animation: 'pulseGlow 2s ease-in-out infinite' }} />
                <span className="text-[12px] font-semibold tracking-wide text-[#0057FF]">
                  No account needed to download
                </span>
              </div>

              <h1 className="text-[36px] font-extrabold leading-[1.06] tracking-[-0.04em] text-[var(--text-primary)]
                             sm:text-[46px] lg:text-[52px] xl:text-[58px]">
                QR codes that
                <br />work as hard
                <br /><span className="text-gradient">as you do</span>
              </h1>

              <p className="mt-5 text-[16px] leading-[1.7] text-[var(--text-secondary)] max-w-[440px]">
                Create, track, and update QR codes in seconds. Real-time analytics,
                custom branding, and 15+ QR types — free forever for the basics.
              </p>

              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <Link href="/create" className="w-full sm:w-auto">
                  <Button size="lg" className="glow-blue-sm h-12 px-7 text-[15px] font-semibold w-full sm:w-auto">
                    Open Full Creator
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/pricing" className="w-full sm:w-auto">
                  <Button size="lg" variant="secondary" className="h-12 px-7 text-[15px] w-full sm:w-auto">
                    View pricing
                  </Button>
                </Link>
              </div>

              <div className="mt-6 flex flex-col gap-2">
                {['No credit card required', 'Free QR codes never expire', 'Update dynamic links anytime'].map((t) => (
                  <div key={t} className="flex items-center gap-2 text-[13.5px] text-[var(--text-secondary)]">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#10B981]" />
                    {t}
                  </div>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4 sm:gap-6 border-t border-[var(--border)] pt-7">
                {[
                  { value: '10,000+', label: 'businesses using QRWide' },
                  { value: '5M+',     label: 'scans tracked' },
                  { value: '15+',     label: 'QR code types' },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-[22px] font-extrabold tracking-tight text-[var(--text-primary)]">{s.value}</div>
                    <div className="mt-0.5 text-[12px] leading-snug text-[var(--text-secondary)]">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Generator — right */}
            <div className="flex-1 flex flex-col justify-center lg:justify-end mt-10 lg:mt-0">
              <p className="lg:hidden text-[12px] font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-3 text-center">
                Try it — no account needed
              </p>
              <div className="relative w-full max-w-[500px] mx-auto lg:mx-0">
                <div className="absolute -inset-6 -z-10 rounded-[40px] blur-3xl"
                  style={{ background: 'radial-gradient(ellipse, rgba(0,87,255,0.1) 0%, transparent 70%)' }} />
                <HeroQRGenerator />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PROOF BAR
      ══════════════════════════════════════════════════════ */}
      <div className="border-y border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center gap-x-7 py-4 overflow-x-auto scrollbar-none px-6
                          sm:flex-wrap sm:justify-center sm:gap-x-10 sm:gap-y-3 sm:overflow-visible sm:px-0">
            {[
              { icon: Gauge,     label: 'Sub-200ms redirects' },
              { icon: Shield,    label: 'Privacy-first tracking' },
              { icon: RefreshCw, label: 'Dynamic QR codes' },
              { icon: Globe,     label: '190+ countries' },
              { icon: BarChart3, label: 'Real-time analytics' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex shrink-0 items-center gap-2 text-[13px] font-medium text-[var(--text-secondary)]">
                <Icon className="h-3.5 w-3.5 shrink-0 text-[#0057FF]" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="label-eyebrow mb-3">Simple by design</p>
            <h2 className="text-[28px] font-bold tracking-[-0.03em] text-[var(--text-primary)] sm:text-[36px]">
              QR code ready in 30 seconds
            </h2>
            <p className="mt-3 text-[15px] text-[var(--text-secondary)] max-w-lg mx-auto">
              No design skills needed. No account required to download.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {HOW_IT_WORKS.map((step, i) => {
              const Icon = step.icon
              return (
                <div key={step.step} className="relative">
                  {/* Arrow connector */}
                  {i < HOW_IT_WORKS.length - 1 && (
                    <div className="absolute right-0 top-8 hidden translate-x-full items-center justify-center sm:flex" style={{ width: 24 }}>
                      <ArrowRight className="h-4 w-4 text-[var(--border-strong)]" />
                    </div>
                  )}
                  <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-7 h-full">
                    <div className="mb-5 flex items-center gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0057FF]/08">
                        <Icon className="h-5 w-5 text-[#0057FF]" />
                      </div>
                      <span className="text-[13px] font-bold tracking-[0.1em] text-[var(--text-tertiary)]">STEP {step.step}</span>
                    </div>
                    <h3 className="text-[16px] font-bold text-[var(--text-primary)]">{step.title}</h3>
                    <p className="mt-2.5 text-[14px] leading-relaxed text-[var(--text-secondary)]">{step.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-10 text-center">
            <Link href="/create">
              <Button size="lg" className="glow-blue-sm h-11 px-8 font-semibold">
                Try it now — free <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          QR TYPE SHOWCASE
      ══════════════════════════════════════════════════════ */}
      <section className="bg-[var(--surface)] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="label-eyebrow mb-3">15+ QR Types</p>
            <h2 className="text-[28px] font-bold tracking-[-0.03em] text-[var(--text-primary)] sm:text-[36px]">
              Generate any type of QR code
            </h2>
            <p className="mt-3 text-[15px] text-[var(--text-secondary)] max-w-lg mx-auto">
              Free types work instantly. Pro and Business types unlock with a subscription.
            </p>
          </div>

          {/* Free types */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#10B981]">Free — always</span>
              <div className="h-px flex-1 bg-[var(--border)]" />
              <span className="text-[12px] text-[var(--text-tertiary)]">No account needed</span>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {FREE_TYPES.map((t) => {
                const Icon = t.icon
                return (
                  <Link key={t.id} href={`/create?type=${t.id}`}
                    className="group feature-card flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4
                               hover:border-[#0057FF]/30 hover:shadow-[var(--shadow-md)]">
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
          <div className="mt-7">
            <div className="mb-4 flex items-center gap-3">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#0057FF]">Pro — $5/mo</span>
              <div className="h-px flex-1 bg-[var(--border)]" />
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {PRO_TYPES.map((t) => {
                const Icon = t.icon
                return (
                  <Link key={t.id} href="/pricing"
                    className="group feature-card relative flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4
                               hover:border-[#0057FF]/25 hover:shadow-[var(--shadow-md)] overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg)]/80 backdrop-blur-[1px]
                                    opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="flex items-center gap-1 rounded-full bg-[#0057FF] px-3 py-1 text-[11px] font-semibold text-white">
                        <Lock className="h-3 w-3" /> Pro
                      </span>
                    </div>
                    <div className="shrink-0 h-9 w-9 rounded-lg flex items-center justify-center opacity-50" style={{ background: t.iconBg }}>
                      <Icon className="h-[18px] w-[18px]" style={{ color: t.iconColor }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1">
                        <span className="text-[13px] font-semibold text-[var(--text-secondary)] truncate">{t.label}</span>
                        <Lock className="h-3 w-3 shrink-0 text-[var(--text-tertiary)]" />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Business types */}
          <div className="mt-7">
            <div className="mb-4 flex items-center gap-3">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#8B5CF6]">Business — $9/mo</span>
              <div className="h-px flex-1 bg-[var(--border)]" />
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {BUSINESS_TYPES.map((t) => {
                const Icon = t.icon
                return (
                  <Link key={t.id} href="/pricing"
                    className="group feature-card relative flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4
                               hover:border-[#8B5CF6]/25 hover:shadow-[var(--shadow-md)] overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg)]/80 backdrop-blur-[1px]
                                    opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="flex items-center gap-1 rounded-full bg-[#8B5CF6] px-3 py-1 text-[11px] font-semibold text-white">
                        <Lock className="h-3 w-3" /> Business
                      </span>
                    </div>
                    <div className="shrink-0 h-9 w-9 rounded-lg flex items-center justify-center opacity-50" style={{ background: t.iconBg }}>
                      <Icon className="h-[18px] w-[18px]" style={{ color: t.iconColor }} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="text-[13px] font-semibold text-[var(--text-secondary)] truncate">{t.label}</span>
                        <Lock className="h-3 w-3 shrink-0 text-[var(--text-tertiary)]" />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 pt-6 border-t border-[var(--border)]">
            <Link href="/create">
              <Button size="md" className="glow-blue-sm font-semibold">
                Start free — no account needed <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="md" variant="secondary">See all plans & pricing</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FEATURES — 2-col layout with substance
      ══════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20" id="features">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="label-eyebrow mb-3">Platform</p>
            <h2 className="text-[28px] font-bold tracking-[-0.03em] text-[var(--text-primary)] sm:text-[36px]">
              Everything you need to ship{' '}
              <span className="text-gradient">serious QR campaigns</span>
            </h2>
            <p className="mt-3 text-[15px] text-[var(--text-secondary)] max-w-lg mx-auto">
              A complete toolkit for marketers, event organizers, restaurants, and product teams.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => {
              const Icon = f.icon
              return (
                <div key={f.title}
                  className="feature-card group rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6
                             hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-lg)]">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{ background: f.bg }}>
                    <Icon style={{ color: f.color, width: 20, height: 20 }} />
                  </div>
                  <h3 className="text-[15.5px] font-bold tracking-tight text-[var(--text-primary)]">{f.title}</h3>
                  <p className="mt-2.5 text-[14px] leading-[1.7] text-[var(--text-secondary)]">{f.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          INDUSTRY USE CASES — Card-based, not abstract boxes
      ══════════════════════════════════════════════════════ */}
      <section className="bg-[var(--surface)] py-16 sm:py-20" id="use-cases">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="label-eyebrow mb-3">Use Cases</p>
            <h2 className="text-[28px] font-bold tracking-[-0.03em] text-[var(--text-primary)] sm:text-[36px]">
              Built for real-world QR workflows
            </h2>
            <p className="mt-3 text-[15px] text-[var(--text-secondary)] max-w-lg mx-auto">
              Not a generic generator. QRWide is designed for the industries that depend on QR codes every day.
            </p>
          </div>

          <div className="space-y-5">
            {NICHES.map((niche, i) => {
              const Icon = niche.Icon
              return (
                <div key={niche.label}
                  className={`rounded-2xl border border-[var(--border)] bg-[var(--bg)] overflow-hidden
                              lg:grid lg:grid-cols-[1fr_380px] ${i % 2 === 1 ? 'lg:grid-cols-[380px_1fr]' : ''}`}>

                  {/* Content side */}
                  <div className={`p-8 lg:p-10 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[12px] font-semibold"
                      style={{ background: `${niche.color}14`, color: niche.color }}>
                      <Icon className="h-3.5 w-3.5" />
                      {niche.label}
                    </div>
                    <h3 className="text-[22px] font-bold tracking-[-0.025em] leading-[1.25] text-[var(--text-primary)] lg:text-[26px]">
                      {niche.headline}
                    </h3>
                    <p className="mt-3 text-[14.5px] leading-[1.75] text-[var(--text-secondary)] max-w-[460px]">
                      {niche.body}
                    </p>
                    <ul className="mt-5 space-y-2">
                      {niche.bullets.map((b) => (
                        <li key={b} className="flex items-center gap-2.5 text-[13.5px] text-[var(--text-primary)]">
                          <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: niche.color }} />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-7">
                      <Link href={niche.href}>
                        <Button size="md" variant="secondary">
                          {niche.cta} <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Stats side */}
                  <div className={`flex flex-col justify-center gap-0 border-t border-[var(--border)] lg:border-t-0
                                   ${i % 2 === 1 ? 'lg:order-1 lg:border-r border-[var(--border)]' : 'lg:border-l border-[var(--border)]'}`}
                    style={{ background: niche.accentBg }}>
                    {niche.stats.map((s, j) => (
                      <div key={s.label}
                        className={`flex items-center justify-between px-8 py-7 lg:flex-col lg:items-start lg:py-8
                                    ${j < niche.stats.length - 1 ? 'border-b border-[var(--border)]' : ''}`}>
                        <span className="text-[13px] text-[var(--text-secondary)] lg:mb-2">{s.label}</span>
                        <span className="text-[28px] font-extrabold tracking-tight lg:text-[36px]"
                          style={{ color: niche.color }}>{s.value}</span>
                      </div>
                    ))}
                  </div>

                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SOCIAL PROOF
      ══════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="label-eyebrow mb-3">Trusted by real businesses</p>
            <h2 className="text-[28px] font-bold tracking-[-0.03em] text-[var(--text-primary)] sm:text-[36px]">
              From restaurants to conference halls
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {SOCIAL_PROOF.map((t) => (
              <div key={t.name}
                className="feature-card flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-7
                           hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-md)]">
                <div className="mb-4 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#F59E0B] text-[#F59E0B]" />
                  ))}
                </div>
                <p className="flex-1 text-[14.5px] leading-[1.75] text-[var(--text-primary)]">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-[var(--border)] pt-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[13px] font-bold text-white"
                    style={{ background: 'linear-gradient(135deg, #0057FF 0%, #00C896 100%)' }}>{t.initial}</div>
                  <div className="min-w-0">
                    <div className="text-[13.5px] font-semibold text-[var(--text-primary)]">{t.name}</div>
                    <div className="text-[12px] text-[var(--text-secondary)] truncate">{t.role}</div>
                  </div>
                  <span className="ml-auto shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold"
                    style={{ background: `${t.color}14`, color: t.color }}>
                    {t.industry}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PRICING TEASER — Full-width comparison strip
      ══════════════════════════════════════════════════════ */}
      <section className="bg-[var(--surface)] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#10B981]/25 bg-[#10B981]/08 px-4 py-1.5">
              <span className="text-[12px] font-semibold text-[#10B981]">Transparent pricing</span>
            </div>
            <h2 className="text-[28px] font-bold tracking-[-0.03em] text-[var(--text-primary)] sm:text-[36px]">
              Competitors charge $20/mo for this
            </h2>
            <p className="mt-3 text-[15px] text-[var(--text-secondary)]">
              Most features free forever. Pro $5/mo. Business $9/mo. No hidden limits.
            </p>
          </div>

          {/* Plan comparison grid */}
          <div className="grid gap-4 sm:grid-cols-3 mb-8">
            {[
              {
                name: 'Free', price: '$0', suffix: 'forever', color: '#10B981',
                features: ['3 dynamic QR codes', '4 QR types', 'PNG + SVG download', 'Basic scan counts'],
                cta: 'Start free', href: '/create', primary: false,
              },
              {
                name: 'Pro', price: '$5', suffix: '/month', color: '#0057FF',
                features: ['50 dynamic QR codes', 'All 10 Pro types', 'Full analytics', 'PDF downloads + logo'],
                cta: 'Get Pro', href: '/pricing', primary: true,
              },
              {
                name: 'Business', price: '$9', suffix: '/month', color: '#8B5CF6',
                features: ['Unlimited QR codes', 'All 18 types', 'Bulk up to 500', 'CSV export + API'],
                cta: 'Get Business', href: '/pricing', primary: false,
              },
            ].map((plan) => (
              <div key={plan.name}
                className={`rounded-2xl border p-6 ${plan.primary
                  ? 'border-[#0057FF]/40 bg-[#0057FF]/04 shadow-[0_0_0_1px_rgba(0,87,255,0.08),0_4px_24px_rgba(0,87,255,0.08)]'
                  : 'border-[var(--border)] bg-[var(--bg)]'}`}>
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-[12px] font-bold uppercase tracking-widest" style={{ color: plan.color }}>
                    {plan.name}
                  </span>
                  {plan.primary && (
                    <span className="rounded-full bg-[#0057FF] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                      Popular
                    </span>
                  )}
                </div>
                <div className="flex items-end gap-1 mb-5">
                  <span className="text-[32px] font-extrabold tracking-tight text-[var(--text-primary)]">{plan.price}</span>
                  <span className="mb-1 text-[13px] text-[var(--text-secondary)]">{plan.suffix}</span>
                </div>
                <ul className="mb-6 space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-[13.5px] text-[var(--text-primary)]">
                      <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: plan.color }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={plan.href} className="block">
                  <Button
                    size="md"
                    variant={plan.primary ? 'primary' : 'secondary'}
                    className={['w-full font-semibold', plan.primary ? 'glow-blue-sm' : ''].join(' ')}
                  >
                    {plan.cta} <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-[13px] text-[var(--text-tertiary)]">
            All plans include unlimited static QR codes · No credit card for free plan
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="label-eyebrow mb-3">Common questions</p>
            <h2 className="text-[28px] font-bold tracking-[-0.03em] text-[var(--text-primary)] sm:text-[34px]">
              Frequently asked questions
            </h2>
          </div>
          <div className="space-y-2">
            {HOME_FAQ.map((item) => (
              <details key={item.question}
                className="group rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-6 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[14.5px] font-semibold text-[var(--text-primary)]">
                  {item.question}
                  <ChevronRight className="h-4 w-4 shrink-0 text-[var(--text-tertiary)] transition-transform duration-200 group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-[14px] leading-[1.75] text-[var(--text-secondary)]">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          BOTTOM CTA — Dark section
      ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ background: '#060810' }}>
        <div className="absolute inset-0 bg-dot-grid opacity-[0.07]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[900px] blur-[130px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(0,87,255,0.25) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-0 h-[350px] w-[500px] blur-[110px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(0,200,150,0.12) 0%, transparent 70%)' }} />
        <div className="absolute top-0 inset-x-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(0,87,255,0.5), rgba(0,200,150,0.4), transparent)' }} />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-20 sm:py-28">

          {/* Stats row */}
          <div className="mb-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { value: '10,000+', label: 'businesses',     color: '#60a5fa' },
              { value: '5M+',     label: 'scans tracked',  color: '#34d399' },
              { value: '15+',     label: 'QR code types',  color: '#a78bfa' },
              { value: '<200ms',  label: 'redirect speed', color: '#fbbf24' },
            ].map((s) => (
              <div key={s.label}
                className="rounded-2xl border border-white/[0.07] bg-white/[0.04] px-5 py-5 text-center">
                <div className="text-[26px] font-extrabold tracking-tight sm:text-[30px]" style={{ color: s.color }}>
                  {s.value}
                </div>
                <div className="mt-1.5 text-[12.5px] font-medium text-white/50">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Headline */}
          <div className="text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00C896]"
                style={{ animation: 'pulseGlow 2s ease-in-out infinite' }} />
              <span className="text-[12px] font-semibold text-white/60">Free to start — takes 30 seconds</span>
            </div>

            <h2 className="text-[32px] font-extrabold tracking-[-0.04em] leading-[1.1] text-white sm:text-[48px] lg:text-[54px]">
              Your first QR code is
              <br />
              <span className="text-gradient-light">already waiting for you</span>
            </h2>

            <p className="mx-auto mt-6 max-w-lg text-[15px] leading-relaxed text-white/55">
              No account needed to generate and download. Sign up free to save, track, and update your codes anytime.
            </p>

            {/* CTA buttons — solid colors, no invisible-text trap */}
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/create">
                <button className="inline-flex h-12 items-center gap-2 rounded-xl bg-[#0057FF] px-8 text-[15px] font-semibold text-white
                                   shadow-[0_8px_32px_rgba(0,87,255,0.4)] transition-all hover:bg-[#0049E0] hover:shadow-[0_8px_40px_rgba(0,87,255,0.5)]
                                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060810]">
                  Generate QR Code Free
                  <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
              <Link href="/pricing">
                <button className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/20 bg-white/08 px-8
                                   text-[15px] font-semibold text-white transition-all hover:border-white/30 hover:bg-white/12
                                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060810]">
                  View pricing
                </button>
              </Link>
            </div>

            {/* Trust chips — legible on dark */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
              {['No credit card required', 'Free codes never expire', 'Cancel anytime'].map((label) => (
                <div key={label} className="flex items-center gap-2 text-[13px] font-medium text-white/60">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#00C896]" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 inset-x-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />
      </section>
    </>
  )
}
