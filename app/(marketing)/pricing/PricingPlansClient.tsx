'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/Button'

function buildSignupHref(plan: 'pro' | 'business', billingCycle: 'monthly' | 'yearly') {
  const redirectTo = `/settings?upgrade=${plan}&billingCycle=${billingCycle}`
  return `/signup?redirectTo=${encodeURIComponent(redirectTo)}`
}

export function PricingPlansClient() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

  const prices = useMemo(
    () => ({
      pro: billingCycle === 'monthly' ? '$5' : '$49',
      proSuffix: billingCycle === 'monthly' ? '/month' : '/year',
      business: billingCycle === 'monthly' ? '$9' : '$89',
      businessSuffix: billingCycle === 'monthly' ? '/month' : '/year',
    }),
    [billingCycle]
  )

  return (
    <>
      <div className="mt-6 inline-flex items-center justify-center gap-3 rounded-full border border-[var(--border)] bg-[var(--surface)] p-1">
        {(['monthly', 'yearly'] as const).map((cycle) => (
          <button
            key={cycle}
            onClick={() => setBillingCycle(cycle)}
            className={[
              'rounded-full px-4 py-2 text-sm transition-all',
              billingCycle === cycle
                ? 'bg-[#0066FF] text-white'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
            ].join(' ')}
          >
            {cycle === 'monthly' ? 'Monthly' : 'Yearly'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-20 mt-12">
        <div className="rounded-[16px] border border-[var(--border)] bg-white dark:bg-[#141414] p-8">
          <div className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2">Free</div>
          <div className="text-4xl font-bold text-[var(--text-primary)]">$0</div>
          <div className="text-sm text-[var(--text-secondary)] mt-1">forever</div>
          <p className="text-sm text-[var(--text-secondary)] mt-4 mb-6">For trying QRWide and creating your first tracked codes.</p>
          <Link href="/signup?redirectTo=%2Fcreate">
            <Button variant="secondary" className="w-full mb-6">Start free</Button>
          </Link>
          <ul className="space-y-3 text-sm">
            {[
              '3 dynamic QR codes',
              '4 free QR types',
              'Instant PNG + SVG downloads',
              'Custom colors and styles',
              'Basic scan counts',
              'Public create flow',
            ].map((f) => (
              <li key={f} className="flex items-center gap-2 text-[var(--text-primary)]">
                <CheckIcon color="gray" /> {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[16px] border-2 border-[#0066FF] bg-white dark:bg-[#141414] p-8 relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0066FF] text-white text-xs font-bold px-3 py-1 rounded-full">
            MOST POPULAR
          </div>
          <div className="text-sm font-semibold text-[#0066FF] uppercase tracking-wider mb-2">Pro</div>
          <div className="text-4xl font-bold text-[var(--text-primary)]">{prices.pro}</div>
          <div className="text-sm text-[var(--text-secondary)] mt-1">{prices.proSuffix}</div>
          <p className="text-sm text-[var(--text-secondary)] mt-4 mb-6">For businesses that need more QR types, deeper analytics, and PDF exports.</p>
          <Link href={buildSignupHref('pro', billingCycle)}>
            <Button className="w-full mb-6">Continue to Pro</Button>
          </Link>
          <ul className="space-y-3 text-sm">
            {[
              '50 dynamic QR codes',
              'All Pro QR types',
              'Full analytics',
              'PDF downloads',
              'Bulk generation up to 100',
              'Range-based scan exports',
            ].map((f) => (
              <li key={f} className="flex items-center gap-2 text-[var(--text-primary)]">
                <CheckIcon color="blue" /> {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[16px] border border-[var(--border)] bg-white dark:bg-[#141414] p-8">
          <div className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2">Business</div>
          <div className="text-4xl font-bold text-[var(--text-primary)]">{prices.business}</div>
          <div className="text-sm text-[var(--text-secondary)] mt-1">{prices.businessSuffix}</div>
          <p className="text-sm text-[var(--text-secondary)] mt-4 mb-6">For teams handling high QR volume and every supported QR type.</p>
          <Link href={buildSignupHref('business', billingCycle)}>
            <Button variant="secondary" className="w-full mb-6">Continue to Business</Button>
          </Link>
          <ul className="space-y-3 text-sm">
            {[
              'Unlimited dynamic QR codes',
              'All QR types',
              'Bulk generation up to 500',
              'CSV exports',
              'PDF downloads',
              'Highest plan limits',
            ].map((f) => (
              <li key={f} className="flex items-center gap-2 text-[var(--text-primary)]">
                <CheckIcon color="teal" /> {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
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
