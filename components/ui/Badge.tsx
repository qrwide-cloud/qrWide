interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'error' | 'blue'
  className?: string
}

const variants = {
  default: 'bg-[#F3F4F6] text-[#374151] dark:bg-[#2A2A2A] dark:text-[#D1D5DB]',
  success: 'bg-[#D1FAE5] text-[#065F46] dark:bg-[#064E3B] dark:text-[#6EE7B7]',
  warning: 'bg-[#FEF3C7] text-[#92400E] dark:bg-[#451A03] dark:text-[#FCD34D]',
  error: 'bg-[#FEE2E2] text-[#991B1B] dark:bg-[#450A0A] dark:text-[#FCA5A5]',
  blue: 'bg-[#DBEAFE] text-[#1E40AF] dark:bg-[#1E3A5F] dark:text-[#93C5FD]',
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-[4px] px-2 py-0.5 text-xs font-medium',
        variants[variant],
        className,
      ].join(' ')}
    >
      {children}
    </span>
  )
}
