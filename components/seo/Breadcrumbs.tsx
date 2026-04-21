import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import type { SeoLinkItem } from '@/lib/seo/types'

interface BreadcrumbsProps {
  items: SeoLinkItem[]
  currentLabel: string
}

export function Breadcrumbs({ items, currentLabel }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-[12.5px] text-[var(--text-tertiary)]">
        <li>
          <Link href="/" className="flex items-center hover:text-[var(--text-secondary)] transition-colors">
            <Home className="h-3.5 w-3.5" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.href} className="flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-50" />
            <Link href={item.href} className="hover:text-[var(--text-primary)] transition-colors truncate max-w-[180px]">
              {item.label}
            </Link>
          </li>
        ))}
        <li className="flex items-center gap-1.5">
          <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-50" />
          <span className="font-medium text-[var(--text-secondary)] truncate max-w-[200px]" aria-current="page">
            {currentLabel}
          </span>
        </li>
      </ol>
    </nav>
  )
}
