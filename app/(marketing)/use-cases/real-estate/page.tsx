import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'QR Code for Real Estate Listings | QRWide',
  description: 'Know which property listings generate the most interest. Dynamic QR codes with scan analytics for real estate agents. Free to start.',
  keywords: ['qr code real estate', 'property listing qr code', 'real estate qr analytics'],
  alternates: { canonical: 'https://qrwide.com/use-cases/real-estate' },
}

export default function RealEstatePage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="text-5xl mb-4">🏠</div>
          <h1 className="text-4xl font-bold text-[var(--text-primary)] md:text-5xl">
            Know which listings generate the most interest
          </h1>
          <p className="mt-6 text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
            Put a unique QR code on every property flyer and yard sign. See exactly who scanned,
            when, and from where. Move fast on high-interest listings.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link href="/signup">
              <Button size="lg">Track your listings free →</Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-16">
          {[
            { emoji: '📊', title: 'Scan analytics per listing', desc: 'See total scans, unique visitors, and scan times for every property. Identify your hottest listings instantly.' },
            { emoji: '📍', title: 'Geographic data', desc: 'See where potential buyers are scanning from. Are they local or relocating? Know your audience.' },
            { emoji: '🔄', title: 'Update listings in real-time', desc: "Listing sold? Update the QR code destination to redirect to similar properties. Never dead-end a hot lead." },
          ].map((f) => (
            <div key={f.title} className="rounded-[12px] border border-[var(--border)] bg-white dark:bg-[#141414] p-6">
              <div className="text-3xl mb-3">{f.emoji}</div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">{f.title}</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center rounded-[16px] bg-[var(--surface)] border border-[var(--border)] p-10">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
            Start tracking with 3 free QR codes
          </h2>
          <Link href="/signup">
            <Button size="lg">Get started free</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
