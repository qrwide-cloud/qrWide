'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Menu, X, ChevronDown, Link2, Wifi, User, Type, Utensils, Home, Calendar, BarChart3, Zap, BookOpen, Scale } from 'lucide-react'

interface NavbarProps {
  user?: { email?: string } | null
}

const GENERATOR_LINKS = [
  { href: '/qr-code-generator/wifi', label: 'Wi-Fi QR Code', icon: Wifi },
  { href: '/qr-code-generator/vcard', label: 'vCard QR Code', icon: User },
  { href: '/qr-code-generator/dynamic', label: 'Dynamic QR Code', icon: Link2 },
  { href: '/qr-code-generator/static', label: 'Static QR Code', icon: Type },
]

const RESOURCE_LINKS = [
  { href: '/guides', label: 'Guides', icon: BookOpen, desc: 'How-to articles and tutorials' },
  { href: '/compare', label: 'Compare', icon: Scale, desc: 'QRWide vs alternatives' },
  { href: '/features/qr-code-tracking', label: 'QR Tracking', icon: BarChart3, desc: 'Scan analytics and reporting' },
  { href: '/tools/bulk-qr-code-generator', label: 'Bulk Generator', icon: Zap, desc: 'Generate 500 codes via CSV' },
]

const USE_CASE_LINKS = [
  { href: '/use-cases/restaurants', label: 'Restaurants', icon: Utensils },
  { href: '/use-cases/real-estate', label: 'Real Estate', icon: Home },
  { href: '/use-cases/events', label: 'Events', icon: Calendar },
]

export function Navbar({ user }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  function toggleDropdown(id: string) {
    setOpenDropdown(prev => prev === id ? null : id)
  }

  function closeAll() {
    setMobileOpen(false)
    setOpenDropdown(null)
  }

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <nav
      className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur-2xl"
      onMouseLeave={() => setOpenDropdown(null)}
    >
      <div className="mx-auto flex h-[62px] max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group" onClick={closeAll}>
          <QRMark size={30} />
          <span className="text-[15px] font-bold tracking-[-0.02em] text-[var(--text-primary)] group-hover:text-[#0057FF] transition-colors">
            QRWide
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-0.5">

          {/* Generators dropdown */}
          <div className="relative" onMouseEnter={() => setOpenDropdown('generators')}>
            <button
              className={[
                'flex items-center gap-1 px-3.5 py-2 rounded-lg text-[13.5px] font-medium transition-colors duration-150',
                openDropdown === 'generators' || isActive('/qr-code-generator')
                  ? 'text-[var(--text-primary)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
              ].join(' ')}
            >
              Generators
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-150 ${openDropdown === 'generators' ? 'rotate-180' : ''}`} />
            </button>

            {openDropdown === 'generators' && (
              <div className="absolute left-0 top-full mt-1.5 w-56 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-1.5 shadow-[var(--shadow-lg)]">
                {GENERATOR_LINKS.map(({ href, label, icon: Icon }) => (
                  <Link key={href} href={href} onClick={closeAll}
                    className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[13.5px] text-[var(--text-primary)] hover:bg-[var(--surface)] transition-colors">
                    <Icon className="h-4 w-4 shrink-0 text-[#0057FF]" />
                    {label}
                  </Link>
                ))}
                <div className="my-1 h-px bg-[var(--border)]" />
                <Link href="/qr-code-generator" onClick={closeAll}
                  className="flex items-center justify-between px-3.5 py-2 text-[12.5px] font-semibold text-[#0057FF] hover:bg-[var(--surface)] rounded-xl transition-colors">
                  View all generators
                  <ChevronDown className="-rotate-90 h-3.5 w-3.5" />
                </Link>
              </div>
            )}
          </div>

          {/* Resources dropdown */}
          <div className="relative" onMouseEnter={() => setOpenDropdown('resources')}>
            <button
              className={[
                'flex items-center gap-1 px-3.5 py-2 rounded-lg text-[13.5px] font-medium transition-colors duration-150',
                openDropdown === 'resources'
                  ? 'text-[var(--text-primary)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
              ].join(' ')}
            >
              Resources
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-150 ${openDropdown === 'resources' ? 'rotate-180' : ''}`} />
            </button>

            {openDropdown === 'resources' && (
              <div className="absolute left-0 top-full mt-1.5 w-64 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-1.5 shadow-[var(--shadow-lg)]">
                {RESOURCE_LINKS.map(({ href, label, icon: Icon, desc }) => (
                  <Link key={href} href={href} onClick={closeAll}
                    className="flex items-start gap-3 rounded-xl px-3.5 py-2.5 hover:bg-[var(--surface)] transition-colors">
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#0057FF]" />
                    <div>
                      <div className="text-[13.5px] font-medium text-[var(--text-primary)]">{label}</div>
                      <div className="text-[12px] text-[var(--text-secondary)]">{desc}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Static links */}
          {[
            { href: '/features', label: 'Features' },
            { href: '/pricing', label: 'Pricing' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeAll}
              className={[
                'px-3.5 py-2 rounded-lg text-[13.5px] font-medium transition-colors duration-150',
                isActive(link.href)
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
              <Link href="/create">
                <Button size="sm" className="glow-blue-sm">Get started free</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--surface)] transition-colors"
          onClick={() => { setMobileOpen(!mobileOpen); setOpenDropdown(null) }}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--bg)]">
          <div className="px-4 py-3 space-y-1">
            {/* Generators section */}
            <button
              onClick={() => toggleDropdown('mob-gen')}
              className="flex w-full items-center justify-between px-3 py-2.5 rounded-xl text-[14px] font-medium text-[var(--text-primary)] hover:bg-[var(--surface)] transition-colors"
            >
              Generators
              <ChevronDown className={`h-4 w-4 text-[var(--text-tertiary)] transition-transform ${openDropdown === 'mob-gen' ? 'rotate-180' : ''}`} />
            </button>
            {openDropdown === 'mob-gen' && (
              <div className="pl-4 space-y-0.5">
                {GENERATOR_LINKS.map(({ href, label }) => (
                  <Link key={href} href={href} onClick={closeAll}
                    className="block px-3 py-2 rounded-lg text-[13.5px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)] transition-colors">
                    {label}
                  </Link>
                ))}
                <Link href="/qr-code-generator" onClick={closeAll}
                  className="block px-3 py-2 rounded-lg text-[13px] font-semibold text-[#0057FF] hover:bg-[var(--surface)] transition-colors">
                  All generators →
                </Link>
              </div>
            )}

            {/* Use cases */}
            <button
              onClick={() => toggleDropdown('mob-uc')}
              className="flex w-full items-center justify-between px-3 py-2.5 rounded-xl text-[14px] font-medium text-[var(--text-primary)] hover:bg-[var(--surface)] transition-colors"
            >
              Use Cases
              <ChevronDown className={`h-4 w-4 text-[var(--text-tertiary)] transition-transform ${openDropdown === 'mob-uc' ? 'rotate-180' : ''}`} />
            </button>
            {openDropdown === 'mob-uc' && (
              <div className="pl-4 space-y-0.5">
                {USE_CASE_LINKS.map(({ href, label }) => (
                  <Link key={href} href={href} onClick={closeAll}
                    className="block px-3 py-2 rounded-lg text-[13.5px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)] transition-colors">
                    {label}
                  </Link>
                ))}
              </div>
            )}

            {[
              { href: '/features', label: 'Features' },
              { href: '/pricing', label: 'Pricing' },
              { href: '/guides', label: 'Guides' },
            ].map((link) => (
              <Link key={link.href} href={link.href} onClick={closeAll}
                className="block px-3 py-2.5 rounded-xl text-[14px] font-medium text-[var(--text-primary)] hover:bg-[var(--surface)] transition-colors">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-2 px-4 pb-4 pt-2 border-t border-[var(--border)]">
            {user ? (
              <Link href="/dashboard" onClick={closeAll}>
                <Button className="w-full" size="sm">Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link href="/login" onClick={closeAll}>
                  <Button variant="secondary" className="w-full" size="sm">Log in</Button>
                </Link>
                <Link href="/create" onClick={closeAll}>
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
 */
export function QRMark({ size = 32 }: { size?: number }) {
  const s = size
  const pad = Math.round(s * 0.083)
  const gap = Math.round(s * 0.055)
  const cell = Math.round((s - 2 * pad - gap) / 2)
  const inner = Math.round(cell * 0.5)
  const innerOffset = Math.round((cell - inner) / 2)
  const rx = Math.round(cell * 0.18)
  const rxInner = Math.round(inner * 0.25)
  const mod = Math.round((cell - gap) / 2)
  const rxMod = Math.round(mod * 0.28)

  const x0 = pad,             y0 = pad
  const x1 = pad + cell + gap, y1 = pad
  const x2 = pad,              y2 = pad + cell + gap
  const x3 = pad + cell + gap, y3 = pad + cell + gap

  return (
    <div
      className="qrmark shrink-0 rounded-[30%] overflow-hidden relative"
      style={{ width: s, height: s, background: 'linear-gradient(135deg, #0057FF 0%, #003FCC 100%)' }}
    >
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none">
        <rect x={x0} y={y0} width={cell} height={cell} rx={rx} fill="white" />
        <rect x={x0 + innerOffset} y={y0 + innerOffset} width={inner} height={inner} rx={rxInner} fill="#0057FF" />
        <rect x={x1} y={y1} width={cell} height={cell} rx={rx} fill="white" />
        <rect x={x1 + innerOffset} y={y1 + innerOffset} width={inner} height={inner} rx={rxInner} fill="#0057FF" />
        <rect x={x2} y={y2} width={cell} height={cell} rx={rx} fill="white" />
        <rect x={x2 + innerOffset} y={y2 + innerOffset} width={inner} height={inner} rx={rxInner} fill="#0057FF" />
        <rect x={x3} y={y3} width={mod} height={mod} rx={rxMod} fill="white" opacity="0.9" />
        <rect x={x3 + mod + gap} y={y3} width={mod} height={mod} rx={rxMod} fill="#00C896" />
        <rect x={x3} y={y3 + mod + gap} width={mod} height={mod} rx={rxMod} fill="#00C896" />
        <rect x={x3 + mod + gap} y={y3 + mod + gap} width={mod} height={mod} rx={rxMod} fill="white" opacity="0.9" />
      </svg>
      {/* scan-line sweep */}
      <div className="qrmark-scan" />
    </div>
  )
}
