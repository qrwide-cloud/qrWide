interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div
      className={[
        'rounded-2xl border border-[var(--border)] bg-[var(--surface)]',
        hover ? 'transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-lg)]' : '',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  )
}
