'use client'

import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, hint, className = '', id, ...props },
  ref
) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-[var(--text-primary)]">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={[
          'h-10 w-full rounded-[8px] border px-3 text-sm',
          'bg-white dark:bg-[#141414]',
          'border-[#E5E7EB] dark:border-[#2A2A2A]',
          'text-[var(--text-primary)] placeholder:text-[#9CA3AF]',
          'focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:border-transparent',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'transition-shadow duration-150',
          error ? 'border-[#EF4444] focus:ring-[#EF4444]' : '',
          className,
        ].join(' ')}
        {...props}
      />
      {error && <p className="text-xs text-[#EF4444]">{error}</p>}
      {hint && !error && <p className="text-xs text-[#6B7280]">{hint}</p>}
    </div>
  )
})
