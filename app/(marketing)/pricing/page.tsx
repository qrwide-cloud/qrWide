import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { PricingToggle } from './PricingToggle'

export const metadata: Metadata = {
  title: 'Pricing — Free QR codes, Pro from $5/mo',
  description: 'QRWide pricing: free forever for basics. Pro $5/mo, Business $9/mo. No credit card for free tier. Beats qr.io and QR Tiger on price every time.',
  alternates: { canonical: 'https://qrwide.com/pricing' },
}

const FAQ = [
  {
    q: 'Do free QR codes ever expire?',
    a: "No. Free QR codes on QRWide never expire. Some competitors kill free codes after 30 days — we don't.",
  },
  {
    q: 'Can I change the destination after printing?',
    a: "Yes, that's what dynamic QR codes are for. Free plan includes 3 dynamic QR codes. Upgrade for more.",
  },
  {
    q: 'Is there a watermark on free QR codes?',
    a: 'Static QR codes on the free plan include a small QRWide watermark. Dynamic QR codes and Pro/Business have no watermark.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. Cancel anytime from your settings — your plan stays active until the end of the billing period.',
  },
  {
    q: 'Do you offer refunds?',
    a: 'Yes, within 14 days of any charge — no questions asked.',
  },
]

export default function PricingPage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[var(--text-primary)] md:text-5xl">
            Simple, honest pricing
          </h1>
          <p className="mt-4 text-lg text-[var(--text-secondary)]">
            qr.io charges $20/mo. QR Tiger charges $25/mo. We charge $5/mo for Pro.
          </p>
          <PricingToggle />
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-20">
          {/* Free */}
          <div className="rounded-[16px] border border-[var(--border)] bg-white dark:bg-[#141414] p-8">
            <div className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2">Free</div>
            <div className="text-4xl font-bold text-[var(--text-primary)]">$0</div>
            <div className="text-sm text-[var(--text-secondary)] mt-1">forever</div>
            <p className="text-sm text-[var(--text-secondary)] mt-4 mb-6">For individuals getting started. No credit card required.</p>
            <Link href="/signup">
              <Button variant="secondary" className="w-full mb-6">Get started free</Button>
            </Link>
            <ul className="space-y-3 text-sm">
              {[
                '3 dynamic QR codes',
                'Unlimited static QR codes',
                'PNG + SVG download',
                'Basic scan count',
                'QRWide watermark',
                'No credit card',
              ].map((f) => (
                <li key={f} className="flex items-center gap-2 text-[var(--text-primary)]">
                  <CheckIcon color="gray" /> {f}
                </li>
              ))}
              {['Full analytics', 'Custom colors + logo', 'PDF download'].map((f) => (
                <li key={f} className="flex items-center gap-2 text-[var(--text-secondary)] line-through">
                  <XIcon /> {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Pro */}
          <div className="rounded-[16px] border-2 border-[#0066FF] bg-white dark:bg-[#141414] p-8 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0066FF] text-white text-xs font-bold px-3 py-1 rounded-full">
              MOST POPULAR
            </div>
            <div className="text-sm font-semibold text-[#0066FF] uppercase tracking-wider mb-2">Pro</div>
            <div className="text-4xl font-bold text-[var(--text-primary)]" id="pro-price">$5</div>
            <div className="text-sm text-[var(--text-secondary)] mt-1">/month · or $49/year (save $11)</div>
            <p className="text-sm text-[var(--text-secondary)] mt-4 mb-6">For small businesses that need full analytics and customization.</p>
            <Link href="/signup?plan=pro">
              <Button className="w-full mb-6">Start Pro — $5/mo</Button>
            </Link>
            <ul className="space-y-3 text-sm">
              {[
                '50 dynamic QR codes',
                'Full analytics (geo, device, time)',
                'Custom colors + logo',
                'No watermark',
                'PDF download',
                'Bulk up to 100',
                'Email support',
              ].map((f) => (
                <li key={f} className="flex items-center gap-2 text-[var(--text-primary)]">
                  <CheckIcon color="blue" /> {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Business */}
          <div className="rounded-[16px] border border-[var(--border)] bg-white dark:bg-[#141414] p-8">
            <div className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2">Business</div>
            <div className="text-4xl font-bold text-[var(--text-primary)]">$9</div>
            <div className="text-sm text-[var(--text-secondary)] mt-1">/month · or $89/year (save $19)</div>
            <p className="text-sm text-[var(--text-secondary)] mt-4 mb-6">For teams and agencies managing many clients.</p>
            <Link href="/signup?plan=business">
              <Button variant="secondary" className="w-full mb-6">Start Business — $9/mo</Button>
            </Link>
            <ul className="space-y-3 text-sm">
              {[
                'Unlimited QR codes',
                'Bulk up to 500',
                'API access',
                'Custom short domain',
                'Team members (up to 5)',
                'Priority support',
                'White-label option',
              ].map((f) => (
                <li key={f} className="flex items-center gap-2 text-[var(--text-primary)]">
                  <CheckIcon color="teal" /> {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Competitor comparison */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] text-center mb-8">
            How we compare
          </h2>
          <div className="overflow-x-auto rounded-[12px] border border-[var(--border)]">
            <table className="w-full text-sm">
              <thead className="bg-[var(--surface)]">
                <tr>
                  {['Feature', 'QRWide', 'qr.io', 'QR Tiger', 'Bitly'].map((h, i) => (
                    <th key={h} className={`px-4 py-3 text-left font-semibold ${i === 1 ? 'text-[#0066FF]' : 'text-[var(--text-primary)]'}`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Starting price', '$0 / $5/mo', '$20/mo', '$25/mo', '$29/mo'],
                  ['Free QR codes', 'Yes, no expiry', '1 dynamic, expires', '3 dynamic', 'No'],
                  ['Full analytics', 'Pro ($5/mo)', 'Starter ($20/mo)', 'Basic ($25/mo)', 'Basic (paid)'],
                  ['Bulk generation', 'Pro + Business', 'Enterprise only', 'Paid plan', 'No'],
                  ['Custom domain', 'Business ($9/mo)', 'Enterprise', 'Enterprise', 'Yes ($29/mo)'],
                  ['QR expiry', 'Never', 'Yes (free plan)', 'No', 'Yes (free)'],
                ].map(([feat, ...cols]) => (
                  <tr key={feat} className="border-t border-[var(--border)]">
                    <td className="px-4 py-3 text-[var(--text-secondary)]">{feat}</td>
                    {cols.map((val, i) => (
                      <td key={i} className={`px-4 py-3 ${i === 0 ? 'font-medium text-[#0066FF]' : 'text-[var(--text-primary)]'}`}>
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
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

function CheckIcon({ color }: { color: 'gray' | 'blue' | 'teal' }) {
  const c = color === 'blue' ? '#0066FF' : color === 'teal' ? '#00D4AA' : '#10B981'
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
      <circle cx="8" cy="8" r="8" fill={c} fillOpacity="0.1" />
      <path d="M5 8l2 2 4-4" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
      <circle cx="8" cy="8" r="8" fill="#E5E7EB" />
      <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
