'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CheckCircle2, Circle, X, ArrowRight } from 'lucide-react'

interface OnboardingBannerProps {
  hasQRCodes: boolean
  hasScan: boolean
}

const STORAGE_KEY = 'qrwide-onboarding-dismissed'

export function OnboardingBanner({ hasQRCodes, hasScan }: OnboardingBannerProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY)
    if (!dismissed) setVisible(true)
  }, [])

  const allDone = hasQRCodes && hasScan

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, '1')
    setVisible(false)
  }

  useEffect(() => {
    if (allDone) {
      const t = setTimeout(dismiss, 3000)
      return () => clearTimeout(t)
    }
  }, [allDone])

  if (!visible) return null

  const steps = [
    { done: true,       label: 'Create your account',         sub: 'Welcome to QRWide!' },
    { done: hasQRCodes, label: 'Create your first QR code',   sub: 'Takes less than 30 seconds', href: '/create' },
    { done: hasScan,    label: 'Get your first scan',         sub: 'Share your QR code anywhere' },
  ]

  const completedCount = steps.filter(s => s.done).length

  return (
    <div className="mb-6 rounded-2xl border border-[#0057FF]/20 bg-gradient-to-br from-[#0057FF]/04 to-[#00C896]/04 p-5 relative">
      <button
        onClick={dismiss}
        className="absolute top-3.5 right-3.5 p-1 rounded-lg text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] hover:bg-[var(--surface)] transition-colors"
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="flex items-start gap-4">
        <div className="shrink-0">
          <div className="relative h-10 w-10">
            <svg className="h-10 w-10 -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--border)" strokeWidth="3" />
              <circle
                cx="18" cy="18" r="15.9" fill="none"
                stroke="#0057FF" strokeWidth="3"
                strokeDasharray={`${(completedCount / steps.length) * 100} 100`}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-[#0057FF]">
              {completedCount}/{steps.length}
            </span>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-3">
            <h3 className="text-[14px] font-semibold text-[var(--text-primary)]">
              {allDone ? '🎉 You\'re all set!' : 'Get started with QRWide'}
            </h3>
            {allDone && (
              <span className="text-[11px] font-medium text-[var(--text-tertiary)]">Closing in a moment…</span>
            )}
          </div>

          <div className="space-y-2">
            {steps.map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                {step.done
                  ? <CheckCircle2 className="h-4 w-4 shrink-0 text-[#00C896]" />
                  : <Circle className="h-4 w-4 shrink-0 text-[var(--border-strong)]" />
                }
                <span className={`text-[13px] ${step.done ? 'text-[var(--text-tertiary)] line-through' : 'text-[var(--text-primary)] font-medium'}`}>
                  {step.label}
                </span>
                {!step.done && step.href && (
                  <Link href={step.href}
                    className="ml-auto shrink-0 flex items-center gap-1 text-[12px] font-semibold text-[#0057FF] hover:underline">
                    Start <ArrowRight className="h-3 w-3" />
                  </Link>
                )}
                {!step.done && !step.href && (
                  <span className="ml-auto text-[11px] text-[var(--text-tertiary)]">{step.sub}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
