import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'QR Code for Restaurant Menu | QRWide',
  description: 'The QR menu tool restaurants actually afford. Update your menu anytime without reprinting. Free forever. Used by thousands of restaurants.',
  keywords: ['qr code for restaurant menu', 'digital menu qr code', 'restaurant qr code'],
  alternates: { canonical: 'https://qrwide.com/use-cases/restaurants' },
}

export default function RestaurantsPage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="text-5xl mb-4">🍽️</div>
          <h1 className="text-4xl font-bold text-[var(--text-primary)] md:text-5xl">
            The QR menu tool restaurants actually afford
          </h1>
          <p className="mt-6 text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
            Update your menu anytime. No reprinting. No $20/mo software subscriptions.
            Just a QR code that works.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link href="/create">
              <Button size="lg">Create your restaurant QR free →</Button>
            </Link>
          </div>
        </div>

        {/* Pain point */}
        <div className="rounded-[16px] bg-[#FEF3C7] dark:bg-[#451A03] border border-[#F59E0B]/30 p-8 mb-16">
          <h2 className="text-xl font-bold text-[#92400E] dark:text-[#FCD34D] mb-3">
            Tired of paying $20/mo just to update your menu?
          </h2>
          <p className="text-[#92400E] dark:text-[#FCD34D] opacity-80">
            Other QR platforms charge restaurant-level prices for what's basically a link redirect.
            QRWide gives you dynamic QR codes — update the destination URL whenever you want —
            for free. Pro is $5/mo if you need analytics.
          </p>
        </div>

        {/* How it works */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] text-center mb-10">How it works</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              { step: '1', title: 'Create your QR code', desc: 'Point it at your online menu (Google Drive, Square, your website, anywhere). Takes 30 seconds.' },
              { step: '2', title: 'Print it once', desc: 'Download as PNG or PDF. Print on table cards, window stickers, or receipts. No reprinting later.' },
              { step: '3', title: 'Update anytime', desc: "Changed your menu? Log in, update the URL, done. The printed QR code automatically points to the new page." },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="h-12 w-12 rounded-full bg-[#0066FF] text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">
                  {s.step}
                </div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-2">{s.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center rounded-[16px] bg-[var(--surface)] border border-[var(--border)] p-10">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
            Start for free. No credit card.
          </h2>
          <p className="text-[var(--text-secondary)] mb-6">
            3 dynamic QR codes free. Upgrade to Pro for $5/mo when you need more.
          </p>
          <Link href="/signup">
            <Button size="lg">Create your restaurant QR free</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
