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
        <label htmlFor={inputId} className="text-[13px] font-medium text-[var(--text-primary)]">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={[
          'h-10 w-full rounded-xl border px-3.5 text-sm',
          'bg-[var(--bg)]',
          'border-[var(--border)]',
          'text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]',
          'focus:outline-none focus:ring-2 focus:ring-[#0066FF]/40 focus:border-[#0066FF]/60',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'transition-all duration-150',
          error ? 'border-[#EF4444]/60 focus:ring-[#EF4444]/40 focus:border-[#EF4444]/60' : '',
          className,
        ].join(' ')}
        {...props}
      />
      {error && <p className="text-xs text-[#EF4444]">{error}</p>}
      {hint && !error && <p className="text-xs text-[var(--text-tertiary)]">{hint}</p>}
    </div>
  )
})
