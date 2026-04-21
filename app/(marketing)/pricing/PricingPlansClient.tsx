'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { CheckCircle2, ArrowRight } from 'lucide-react'

function buildSignupHref(plan: 'pro' | 'business', billingCycle: 'monthly' | 'yearly') {
  const redirectTo = `/settings?upgrade=${plan}&billingCycle=${billingCycle}`
  return `/signup?redirectTo=${encodeURIComponent(redirectTo)}`
}

export function PricingPlansClient() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

  const prices = useMemo(
    () => ({
      pro:              billingCycle === 'monthly' ? '$5'  : '$49',
      proSuffix:        billingCycle === 'monthly' ? '/month' : '/year',
      proMonthly:       billingCycle === 'yearly' ? '$4.08/mo billed annually' : null,
      business:         billingCycle === 'monthly' ? '$9'  : '$89',
      businessSuffix:   billingCycle === 'monthly' ? '/month' : '/year',
      businessMonthly:  billingCycle === 'yearly' ? '$7.42/mo billed annually' : null,
    }),
    [billingCycle]
  )

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      priceSuffix: 'forever',
      subLabel: null,
      description: 'For trying QRWide and creating your first tracked QR codes.',
      cta: 'Start free',
      ctaHref: '/create',
      ctaVariant: 'secondary' as const,
      featured: false,
      accentColor: '#10B981',
      features: [
        '3 dynamic QR codes',
        '4 free QR types (URL, Text, Wi-Fi, vCard)',
        'Instant PNG + SVG downloads',
        'Custom colors and dot styles',
        'Basic scan counts',
        'No account needed to download',
      ],
    },
    {
      id: 'pro',
      name: 'Pro',
      price: prices.pro,
      priceSuffix: prices.proSuffix,
      subLabel: prices.proMonthly,
      description: 'For businesses that need more QR types, analytics, and PDF downloads.',
      cta: 'Continue to Pro',
      ctaHref: buildSignupHref('pro', billingCycle),
      ctaVariant: 'primary' as const,
      featured: true,
      accentColor: '#0057FF',
      features: [
        '50 dynamic QR codes',
        'All 10 Pro QR types',
        'Full scan analytics — device, city, time',
        'PDF downloads',
        'Bulk generation up to 100',
        'Custom logo on QR codes',
      ],
    },
    {
      id: 'business',
      name: 'Business',
      price: prices.business,
      priceSuffix: prices.businessSuffix,
      subLabel: prices.businessMonthly,
      description: 'For teams handling high QR volume with every supported type.',
      cta: 'Continue to Business',
      ctaHref: buildSignupHref('business', billingCycle),
      ctaVariant: 'secondary' as const,
      featured: false,
      accentColor: '#8B5CF6',
      features: [
        'Unlimited dynamic QR codes',
        'All 18 QR types including PDF, App, Video',
        'Bulk generation up to 500',
        'Full analytics + CSV export',
        'API access',
        'Priority support',
      ],
    },
  ]

  return (
    <>
      {/* Billing toggle */}
      <div className="mt-8 flex flex-col items-center gap-3">
        <div className="inline-flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--surface)] p-1">
          {(['monthly', 'yearly'] as const).map((cycle) => (
            <button
              key={cycle}
              onClick={() => setBillingCycle(cycle)}
              className={[
                'relative rounded-full px-5 py-2 text-[13px] font-medium transition-all duration-150',
                billingCycle === cycle
                  ? 'bg-[#0057FF] text-white shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
              ].join(' ')}
            >
              {cycle === 'monthly' ? 'Monthly' : 'Yearly'}
              {cycle === 'yearly' && (
                <span className={[
                  'ml-2 rounded-full px-1.5 py-0.5 text-[10px] font-bold',
                  billingCycle === 'yearly' ? 'bg-white/20 text-white' : 'bg-[#10B981]/15 text-[#10B981]',
                ].join(' ')}>
                  Save 18%
                </span>
              )}
            </button>
          ))}
        </div>
        {billingCycle === 'yearly' && (
          <p className="text-[12.5px] text-[#10B981] font-medium">
            You&apos;re saving $12 on Pro and $19 on Business annually
          </p>
        )}
      </div>

      {/* Plan cards */}
      <div className="mt-10 mb-20 grid grid-cols-1 gap-5 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={[
              'relative flex flex-col rounded-2xl p-7 transition-shadow',
              plan.featured
                ? 'border-2 shadow-[0_0_0_1px_rgba(0,87,255,0.1),0_8px_32px_rgba(0,87,255,0.12)]'
                : 'border border-[var(--border)] bg-[var(--surface)]',
            ].join(' ')}
            style={plan.featured ? {
              borderColor: '#0057FF',
              background: 'var(--bg)',
            } : {}}
          >
            {plan.featured && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center rounded-full bg-[#0057FF] px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow">
                  Most popular
                </span>
              </div>
            )}

            {/* Plan name */}
            <div className="mb-1">
              <span className="text-[11px] font-bold uppercase tracking-widest"
                style={{ color: plan.accentColor }}>
                {plan.name}
              </span>
            </div>

            {/* Price */}
            <div className="mb-1 flex items-end gap-1">
              <span className="text-[40px] font-extrabold tracking-tight text-[var(--text-primary)] leading-none">
                {plan.price}
              </span>
              <span className="mb-1 text-[14px] text-[var(--text-secondary)]">{plan.priceSuffix}</span>
            </div>
            {plan.subLabel && (
              <p className="mb-3 text-[12px] text-[var(--text-tertiary)]">{plan.subLabel}</p>
            )}

            <p className="mb-6 text-[13.5px] leading-relaxed text-[var(--text-secondary)]">
              {plan.description}
            </p>

            <Link href={plan.ctaHref} className="block mb-7">
              <Button
                variant={plan.ctaVariant}
                className={['w-full', plan.featured ? 'glow-blue-sm' : ''].join(' ')}
                size="md"
              >
                {plan.cta}
                {plan.featured && <ArrowRight className="h-4 w-4" />}
              </Button>
            </Link>

            {/* Divider */}
            <div className="mb-5 h-px bg-[var(--border)]" />

            {/* Features */}
            <ul className="space-y-3 flex-1">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-[13.5px] text-[var(--text-primary)]">
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0"
                    style={{ color: plan.accentColor }}
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  )
}
