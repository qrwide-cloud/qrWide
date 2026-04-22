'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { QRMark } from '@/components/layout/Navbar'
import type { User } from '@supabase/supabase-js'

interface Profile {
  name?: string | null
  email?: string | null
  plan?: string | null
}

interface AppSidebarProps {
  user: User
  profile?: Profile | null
}

const NAV_ITEMS = [
  { href: '/dashboard', label: 'My Codes',    icon: GridIcon },
  { href: '/create',    label: 'Create QR',   icon: PlusIcon },
  { href: '/analytics', label: 'Analytics',   icon: ChartIcon },
  { href: '/bulk',      label: 'Bulk Create',  icon: LayersIcon },
  { href: '/settings',  label: 'Settings',    icon: GearIcon },
]

export function AppSidebar({ user, profile }: AppSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  const displayName = profile?.name ?? user.email?.split('@')[0] ?? 'User'
  const plan = profile?.plan ?? 'free'

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 py-5 border-b border-[var(--border)]">
        <Link href="/" className="flex items-center gap-2.5 group">
          <QRMark size={28} />
          <span className="font-bold text-[15px] tracking-[-0.02em] text-[var(--text-primary)] group-hover:text-[#0057FF] transition-colors">
            QRWide
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== '/dashboard' && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              className={[
                'flex items-center gap-3 rounded-[8px] px-3 py-2.5 text-sm font-medium transition-all',
                active
                  ? 'bg-[#0066FF]/10 text-[#0066FF]'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--surface)] hover:text-[var(--text-primary)]',
              ].join(' ')}
              onClick={() => setMobileOpen(false)}
            >
              <Icon />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Plan badge + user */}
      <div className="border-t border-[var(--border)] p-4 space-y-3">
        {plan === 'free' && (
          <Link href="/pricing" className="block">
            <div className="rounded-[8px] bg-[#0066FF]/5 border border-[#0066FF]/20 p-3 text-xs">
              <div className="font-semibold text-[#0066FF]">Free Plan</div>
              <div className="text-[var(--text-secondary)] mt-0.5">Upgrade for full analytics & more</div>
              <div className="mt-2 text-[#0066FF] font-medium">Upgrade → $5/mo</div>
            </div>
          </Link>
        )}

        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-[#0066FF] flex items-center justify-center text-white text-xs font-bold">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-[var(--text-primary)] truncate">{displayName}</div>
            <div className="text-xs text-[var(--text-secondary)] capitalize">{plan} plan</div>
          </div>
          <button
            onClick={handleSignOut}
            className="p-1.5 rounded-[6px] text-[var(--text-secondary)] hover:bg-[var(--surface)] transition-colors"
            title="Sign out"
          >
            <LogoutIcon />
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile header */}
      <div className="md:hidden flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg)] px-4 py-3 fixed top-0 left-0 right-0 z-40">
        <Link href="/" className="font-bold text-[#0066FF]">QRWide</Link>
        <button
          className="p-2 rounded-[8px] text-[var(--text-secondary)] hover:bg-[var(--surface)]"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <MenuIcon />
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black/40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div className={[
        'md:hidden fixed top-0 left-0 bottom-0 z-40 w-64 bg-[var(--bg)] border-r border-[var(--border)] transform transition-transform duration-200',
        mobileOpen ? 'translate-x-0' : '-translate-x-full',
      ].join(' ')}>
        <SidebarContent />
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex w-60 flex-col border-r border-[var(--border)] bg-[var(--bg)] fixed top-0 left-0 bottom-0">
        <SidebarContent />
      </div>

      {/* Desktop spacer */}
      <div className="hidden md:block w-60 flex-shrink-0" />

      {/* Mobile top spacer */}
      <div className="md:hidden h-12" />
    </>
  )
}

function GridIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="9" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="1" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="9" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/></svg>
}
function PlusIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
}
function LayersIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M1 5l7-4 7 4-7 4-7-4zM1 11l7 4 7-4M1 8l7 4 7-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
}
function ChartIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 12V7M5 12V4M8 12V7M11 12V2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
}
function GearIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5"/><path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.42 1.42M11.53 11.53l1.42 1.42M3.05 12.95l1.42-1.42M11.53 4.47l1.42-1.42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
}
function LogoutIcon() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2H3a1 1 0 00-1 1v8a1 1 0 001 1h2M10 10l3-3-3-3M7 7h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
}
function MenuIcon() {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 4h14M2 9h14M2 14h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
}
