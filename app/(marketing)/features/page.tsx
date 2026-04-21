import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import {
  BarChart3,
  CalendarDays,
  FileDown,
  QrCode,
  RefreshCw,
  ScanLine,
  Shield,
  Wand2,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Features',
  description: 'Explore QRWide features: dynamic QR codes, analytics, bulk generation, and multiple QR types.',
}

const FEATURES = [
  {
    title: 'Dynamic QR codes',
    body: 'Update a saved QR code destination without reprinting. Pause or reactivate it any time.',
    icon: RefreshCw,
  },
  {
    title: 'Scan analytics',
    body: 'Track scans over time, device breakdowns, top countries, and recent scan activity.',
    icon: BarChart3,
  },
  {
    title: '15+ QR types',
    body: 'Create link, Wi-Fi, vCard, messaging, social, event, PDF, app, image, and video QR codes.',
    icon: QrCode,
  },
  {
    title: 'Bulk generation',
    body: 'Upload CSV data and download a ZIP of ready-to-print QR codes in one run.',
    icon: ScanLine,
  },
  {
    title: 'Style controls',
    body: 'Customize colors, dot styles, and corner styles before downloading or saving a QR code.',
    icon: Wand2,
  },
  {
    title: 'PDF export',
    body: 'Download QR codes as PDF on paid plans when you need print-ready handoff files.',
    icon: FileDown,
  },
  {
    title: 'Event and campaign support',
    body: 'Use QRWide for menus, listings, signage, badges, campaigns, and scheduled event destinations.',
    icon: CalendarDays,
  },
  {
    title: 'Pre-launch safe defaults',
    body: 'Plan gating, redirect caching, and analytics counters are wired to stay consistent before go-live.',
    icon: Shield,
  },
]

export default function FeaturesPage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold text-[var(--text-primary)] md:text-5xl">QRWide features</h1>
          <p className="mt-4 text-lg text-[var(--text-secondary)]">
            Everything in QRWide is focused on one job: creating QR codes quickly, then keeping the saved and
            tracked versions reliable once people start scanning them.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
          {FEATURES.map(({ title, body, icon: Icon }) => (
            <div key={title} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#0066FF]/10">
                <Icon className="h-5 w-5 text-[#0066FF]" />
              </div>
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link href="/create">
            <Button size="lg">Create a QR code</Button>
          </Link>
          <Link href="/pricing">
            <Button size="lg" variant="secondary">See pricing</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
