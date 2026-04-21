'use client'

import { useState } from 'react'

export function PricingToggle() {
  const [yearly, setYearly] = useState(false)

  return (
    <div className="mt-6 flex items-center justify-center gap-3">
      <span className={`text-sm ${!yearly ? 'font-semibold text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}>Monthly</span>
      <button
        onClick={() => setYearly((y) => !y)}
        className={[
          'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
          yearly ? 'bg-[#0066FF]' : 'bg-[#E5E7EB] dark:bg-[#2A2A2A]',
        ].join(' ')}
      >
        <span
          className={[
            'inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform',
            yearly ? 'translate-x-6' : 'translate-x-1',
          ].join(' ')}
        />
      </button>
      <span className={`text-sm ${yearly ? 'font-semibold text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}>
        Yearly{' '}
        <span className="text-[#10B981] text-xs font-bold">Save 18%</span>
      </span>
    </div>
  )
}
