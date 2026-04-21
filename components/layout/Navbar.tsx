'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Menu, X } from 'lucide-react'

interface NavbarProps {
  user?: { email?: string } | null
}

export function Navbar({ user }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  const navLinks = [
    { href: '/features', label: 'Features' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/use-cases/restaurants', label: 'Use Cases' },
  ]

  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/85 backdrop-blur-2xl">
      <div className="mx-auto flex h-[62px] max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">

        {/* Logo lockup */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <QRMark size={30} />
          <span className="text-[15px] font-bold tracking-[-0.02em] text-[var(--text-primary)] group-hover:text-[#0057FF] transition-colors">
            QRWide
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={[
                'px-3.5 py-2 rounded-lg text-[13.5px] font-medium transition-colors duration-150',
                pathname === link.href
                  ? 'text-[var(--text-primary)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
              ].join(' ')}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <Link href="/dashboard">
              <Button size="sm">Dashboard</Button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">Log in</Button>
              </Link>
              <Link href="/signup">
                <Button size="sm" className="glow-blue-sm">Get started free</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--surface)] transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--bg)] px-4 py-3 flex flex-col gap-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2.5 rounded-xl text-[14px] font-medium text-[var(--text-primary)] hover:bg-[var(--surface)] transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 pt-3 mt-2 border-t border-[var(--border)]">
            {user ? (
              <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
                <Button className="w-full" size="sm">Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="secondary" className="w-full" size="sm">Log in</Button>
                </Link>
                <Link href="/signup" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full" size="sm">Get started free</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

/**
 * QR finder-pattern brand mark.
 * Three corner squares (like a real QR code) + teal data accent.
 */
export function QRMark({ size = 32 }: { size?: number }) {
  const s = size
  // Cell grid: 2×2, each cell is ~42% of total, gap 16%
  const pad = Math.round(s * 0.083)          // ~3px at 36
  const gap = Math.round(s * 0.055)          // ~2px at 36
  const cell = Math.round((s - 2 * pad - gap) / 2)  // ~14px at 36
  const inner = Math.round(cell * 0.5)       // ~7px
  const innerOffset = Math.round((cell - inner) / 2) // ~3.5px
  const rx = Math.round(cell * 0.18)         // corner radius for outer
  const rxInner = Math.round(inner * 0.25)   // inner square radius
  const mod = Math.round((cell - gap) / 2)   // small data module
  const rxMod = Math.round(mod * 0.28)

  const x0 = pad,        y0 = pad
  const x1 = pad + cell + gap,  y1 = pad
  const x2 = pad,        y2 = pad + cell + gap
  const x3 = pad + cell + gap,  y3 = pad + cell + gap

  return (
    <div
      className="shrink-0 rounded-[30%] overflow-hidden"
      style={{
        width: s,
        height: s,
        background: 'linear-gradient(135deg, #0057FF 0%, #003FCC 100%)',
      }}
    >
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none">
        {/* ── Top-left finder pattern ── */}
        <rect x={x0} y={y0} width={cell} height={cell} rx={rx} fill="white" />
        <rect
          x={x0 + innerOffset} y={y0 + innerOffset}
          width={inner} height={inner} rx={rxInner}
          fill="#0057FF"
        />

        {/* ── Top-right finder pattern ── */}
        <rect x={x1} y={y1} width={cell} height={cell} rx={rx} fill="white" />
        <rect
          x={x1 + innerOffset} y={y1 + innerOffset}
          width={inner} height={inner} rx={rxInner}
          fill="#0057FF"
        />

        {/* ── Bottom-left finder pattern ── */}
        <rect x={x2} y={y2} width={cell} height={cell} rx={rx} fill="white" />
        <rect
          x={x2 + innerOffset} y={y2 + innerOffset}
          width={inner} height={inner} rx={rxInner}
          fill="#0057FF"
        />

        {/* ── Bottom-right data modules (2×2 accent) ── */}
        <rect x={x3}          y={y3}          width={mod} height={mod} rx={rxMod} fill="white" opacity="0.9" />
        <rect x={x3 + mod + gap} y={y3}       width={mod} height={mod} rx={rxMod} fill="#00C896" />
        <rect x={x3}          y={y3 + mod + gap} width={mod} height={mod} rx={rxMod} fill="#00C896" />
        <rect x={x3 + mod + gap} y={y3 + mod + gap} width={mod} height={mod} rx={rxMod} fill="white" opacity="0.9" />
      </svg>
    </div>
  )
}
