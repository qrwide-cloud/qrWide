'use client'

import Link from 'next/link'
import { QRPreview } from '@/components/qr/QRPreview'
import { QRDownload } from '@/components/qr/QRDownload'

interface SharePageClientProps {
  qr: {
    id: string
    shortcode: string
    name: string
    destination: string
    style: Record<string, string>
    total_scans: number
  }
}

export function SharePageClient({ qr }: SharePageClientProps) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://qrwide.com'
  const scanUrl = `${appUrl}/s/${qr.shortcode}`

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[var(--surface)]">
      <div className="max-w-sm w-full bg-white dark:bg-[#141414] rounded-[16px] border border-[var(--border)] p-8 shadow-[0_4px_16px_rgba(0,0,0,0.08)] text-center">
        <Link href="/" className="text-sm font-bold text-[#0066FF] mb-6 block">QRWide</Link>
        <h1 className="text-lg font-bold text-[var(--text-primary)] mb-1">{qr.name}</h1>
        <p className="text-xs text-[var(--text-secondary)] mb-6 truncate">{qr.destination}</p>

        <div className="flex justify-center mb-6">
          <QRPreview content={scanUrl} style={qr.style} size={240} />
        </div>

        <QRDownload content={scanUrl} style={qr.style} filename={qr.name} />

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
