import type { Metadata } from 'next'
import { PricingPlansClient } from './PricingPlansClient'

export const metadata: Metadata = {
  title: 'Pricing - Free QR codes, Pro from $5/mo',
  description: 'QRWide pricing: free for basics, Pro for full analytics, and Business for higher-volume teams.',
  alternates: { canonical: 'https://qrwide.com/pricing' },
}

const FAQ = [
  {
    q: 'Do free QR codes expire?',
    a: 'No. QRWide does not time-limit your free QR codes.',
  },
  {
    q: 'Can I change the destination after printing?',
    a: 'Yes. Saved QR codes are dynamic and can be updated without reprinting.',
  },
  {
    q: 'Is yearly billing supported?',
    a: 'Yes. You can pick monthly or yearly billing before checkout from pricing or settings.',
  },
  {
    q: 'Do I need an account to download a QR code?',
    a: 'No. You can generate and download QR codes publicly. You only need an account to save and track them.',
  },
]

export default function PricingPage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[var(--text-primary)] md:text-5xl">
            Simple pricing that matches the product
          </h1>
          <p className="mt-4 text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Start for free, save your QR codes when you are ready, and upgrade only when you need more types,
            deeper analytics, or higher limits.
          </p>
        </div>

        <PricingPlansClient />

        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] text-center mb-8">FAQ</h2>
          <div className="space-y-6">
            {FAQ.map((item) => (
              <div key={item.q} className="border-b border-[var(--border)] pb-6">
                <h3 className="font-semibold text-[var(--text-primary)] mb-2">{item.q}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
