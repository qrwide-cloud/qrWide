'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface MobileStickyBarProps {
  user?: { email?: string } | null
}

export function MobileStickyBar({ user }: MobileStickyBarProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 180)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex gap-2.5 px-4 py-3
                 bg-[var(--bg)]/95 backdrop-blur-xl border-t border-[var(--border)]"
      style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}
    >
      {user ? (
        <Link href="/dashboard" className="flex-1">
          <button className="w-full h-11 rounded-xl bg-[#0057FF] text-[14px] font-semibold text-white
                             shadow-[0_4px_16px_rgba(0,87,255,0.3)] flex items-center justify-center gap-1.5">
            Go to Dashboard <ArrowRight className="h-4 w-4" />
          </button>
        </Link>
      ) : (
        <>
          <Link href="/login" className="flex-1">
            <button className="w-full h-11 rounded-xl border border-[var(--border)] bg-[var(--surface)]
                               text-[14px] font-semibold text-[var(--text-primary)] flex items-center justify-center">
              Log in
            </button>
          </Link>
          <Link href="/signup" className="flex-[2]">
            <button className="w-full h-11 rounded-xl bg-[#0057FF] text-[14px] font-semibold text-white
                               shadow-[0_4px_16px_rgba(0,87,255,0.3)] flex items-center justify-center gap-1.5">
              Sign up free <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
        </>
      )}
    </div>
  )
}
