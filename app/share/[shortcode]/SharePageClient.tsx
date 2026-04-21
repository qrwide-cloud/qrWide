'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { QRPreview } from '@/components/qr/QRPreview'
import { QRDownload } from '@/components/qr/QRDownload'
import { getSavedQRContent } from '@/lib/qr/saved-content'

interface SharePageClientProps {
  qr: {
    id: string
    shortcode: string
    name: string
    type: string
    destination: string
    style: Record<string, string>
    total_scans: number
  }
  fallbackHref: string
  fallbackLabel: string
  analyticsHref?: string
}

export function SharePageClient({ qr, fallbackHref, fallbackLabel, analyticsHref }: SharePageClientProps) {
  const router = useRouter()
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://qrwide.com'
  const qrContent = getSavedQRContent({
    type: qr.type,
    destination: qr.destination,
    shortcode: qr.shortcode,
    appUrl,
  })

  function handleBack() {
    if (window.history.length > 1) {
      router.back()
      return
    }

    router.push(fallbackHref)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[var(--surface)]">
      <div className="max-w-sm w-full mb-4 flex items-center justify-between gap-3">
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-2 rounded-[10px] border border-[var(--border)] bg-white dark:bg-[#141414] px-3 py-2 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
          aria-label={fallbackLabel}
        >
          <BackIcon />
          {fallbackLabel}
        </button>

        {analyticsHref ? (
          <Link
            href={analyticsHref}
            className="inline-flex items-center gap-2 rounded-[10px] border border-[var(--border)] bg-white dark:bg-[#141414] px-3 py-2 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
          >
            Analytics
          </Link>
        ) : null}
      </div>

      <div className="max-w-sm w-full bg-white dark:bg-[#141414] rounded-[16px] border border-[var(--border)] p-8 shadow-[0_4px_16px_rgba(0,0,0,0.08)] text-center">
        <Link href="/" className="text-sm font-bold text-[#0066FF] mb-6 block">QRWide</Link>
        <h1 className="text-lg font-bold text-[var(--text-primary)] mb-1">{qr.name}</h1>
        <p className="text-xs text-[var(--text-secondary)] mb-6 truncate">{qr.destination}</p>

        <div className="flex justify-center mb-6">
          <QRPreview content={qrContent} style={qr.style} size={240} />
        </div>

        <QRDownload content={qrContent} style={qr.style} filename={qr.name} />

        <p className="mt-4 text-xs text-[var(--text-secondary)]">
          {qr.total_scans.toLocaleString()} total scans
        </p>

        <div className="mt-6 pt-6 border-t border-[var(--border)]">
          <Link href="/signup" className="text-sm text-[#0066FF] hover:underline">
            Create your own QR codes free →
          </Link>
        </div>
      </div>
    </div>
  )
}

function BackIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M9 2.5L4.5 7 9 11.5M5 7h5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
