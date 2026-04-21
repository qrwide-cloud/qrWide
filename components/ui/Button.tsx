'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

const variantClasses: Record<string, string> = {
  primary: [
    'bg-[#0057FF] text-white font-semibold',
    'hover:bg-[#004AE0] active:bg-[#003ECC]',
    'focus-visible:ring-[#0057FF]/40',
    'shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_1px_2px_rgba(0,0,0,0.2)]',
  ].join(' '),
  secondary: [
    'bg-[var(--surface)] text-[var(--text-primary)] font-medium',
    'border border-[var(--border-strong)]',
    'hover:bg-[var(--surface-2)]',
    'focus-visible:ring-[var(--border-strong)]',
  ].join(' '),
  ghost: [
    'bg-transparent text-[var(--text-secondary)] font-medium',
    'hover:bg-[var(--surface)] hover:text-[var(--text-primary)]',
    'focus-visible:ring-[var(--border-strong)]',
  ].join(' '),
  danger: [
    'bg-[#EF4444] text-white font-semibold',
    'hover:bg-[#DC2626]',
    'focus-visible:ring-[#EF4444]/40',
    'shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_1px_2px_rgba(0,0,0,0.2)]',
  ].join(' '),
}

const sizeClasses: Record<string, string> = {
  sm: 'h-8 px-3.5 text-[13px] rounded-lg gap-1.5',
  md: 'h-9 px-4 text-[14px] rounded-lg gap-2',
  lg: 'h-11 px-5 text-[15px] rounded-xl gap-2',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', loading, className = '', children, disabled, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={[
        'inline-flex items-center justify-center shrink-0',
        'transition-all duration-[140ms] ease-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]',
        'disabled:pointer-events-none disabled:opacity-40',
        'select-none cursor-pointer',
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].join(' ')}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  )
})
