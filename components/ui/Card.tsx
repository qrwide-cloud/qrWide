interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div
      className={[
        'rounded-[12px] border border-[var(--border)] bg-white dark:bg-[#141414]',
        'shadow-[0_1px_3px_rgba(0,0,0,0.08)]',
        hover
          ? 'transition-all duration-150 hover:-translate-y-px hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)]'
          : '',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  )
}
