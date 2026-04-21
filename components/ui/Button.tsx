'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

const variantClasses = {
  primary: 'bg-[#0066FF] text-white hover:bg-[#0052CC] focus-visible:ring-[#0066FF]',
  secondary: 'bg-transparent border border-[#E5E7EB] dark:border-[#2A2A2A] text-[#0A0A0A] dark:text-[#F5F5F5] hover:bg-[#F8F9FA] dark:hover:bg-[#141414]',
  ghost: 'bg-transparent text-[#6B7280] hover:bg-[#F8F9FA] dark:hover:bg-[#141414] hover:text-[#0A0A0A] dark:hover:text-[#F5F5F5]',
  danger: 'bg-[#EF4444] text-white hover:bg-red-600 focus-visible:ring-red-500',
}

const sizeClasses = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
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
        'inline-flex items-center justify-center gap-2 rounded-[8px] font-medium',
        'transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        'min-h-[44px]',
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].join(' ')}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  )
})
