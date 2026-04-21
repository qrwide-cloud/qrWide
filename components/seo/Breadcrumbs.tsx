import Link from 'next/link'
import type { SeoLinkItem } from '@/lib/seo/types'

interface BreadcrumbsProps {
  items: SeoLinkItem[]
  currentLabel: string
}

export function Breadcrumbs({ items, currentLabel }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-[var(--text-secondary)]">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item) => (
          <li key={item.href} className="flex items-center gap-2">
            <Link href={item.href} className="hover:text-[var(--text-primary)] transition-colors">
              {item.label}
            </Link>
            <span>/</span>
          </li>
        ))}
        <li className="text-[var(--text-primary)]">{currentLabel}</li>
      </ol>
    </nav>
  )
}
