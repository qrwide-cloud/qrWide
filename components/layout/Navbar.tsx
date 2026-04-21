'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/Button'

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
    <nav className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-[#0066FF] text-xl">
          <QRIcon />
          QRWide
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={[
                'text-sm font-medium transition-colors',
                pathname === link.href
                  ? 'text-[#0066FF]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
              ].join(' ')}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <Link href="/dashboard">
              <Button size="md">Dashboard</Button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="md">Log in</Button>
              </Link>
              <Link href="/signup">
                <Button size="md">Get started free</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-[8px] text-[var(--text-secondary)] hover:bg-[var(--surface)]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <XIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--bg)] px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--text-primary)] py-2"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 pt-2 border-t border-[var(--border)]">
            {user ? (
              <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
                <Button className="w-full">Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="secondary" className="w-full">Log in</Button>
                </Link>
                <Link href="/signup" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full">Get started free</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

function QRIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect width="12" height="12" rx="2" fill="#0066FF" />
      <rect x="16" width="12" height="12" rx="2" fill="#0066FF" />
      <rect y="16" width="12" height="12" rx="2" fill="#0066FF" />
      <rect x="16" y="16" width="5" height="5" rx="1" fill="#0066FF" />
      <rect x="23" y="16" width="5" height="5" rx="1" fill="#00D4AA" />
      <rect x="16" y="23" width="5" height="5" rx="1" fill="#00D4AA" />
      <rect x="23" y="23" width="5" height="5" rx="1" fill="#0066FF" />
      <rect x="4" y="4" width="4" height="4" rx="0.5" fill="white" />
      <rect x="20" y="4" width="4" height="4" rx="0.5" fill="white" />
      <rect x="4" y="20" width="4" height="4" rx="0.5" fill="white" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M5 5l10 10M15 5l-10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
