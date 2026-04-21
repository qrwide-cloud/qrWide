'use client'

import { useState, useEffect, useRef } from 'react'
import { QRPreview } from './QRPreview'
import { QRDownload } from './QRDownload'
import { Card } from '@/components/ui/Card'

export function HeroQRGenerator() {
  const [url, setUrl] = useState('')
  const [debouncedUrl, setDebouncedUrl] = useState('')
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Load saved URL from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('hero_qr_url')
    if (saved) {
      setUrl(saved)
      setDebouncedUrl(saved)
    }
  }, [])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value
    setUrl(val)
    localStorage.setItem('hero_qr_url', val)

    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setDebouncedUrl(val)
    }, 300)
  }

  const content = debouncedUrl.trim()

  return (
    <Card className="p-6 shadow-[0_20px_60px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
      <p className="text-sm font-medium text-[var(--text-secondary)] mb-3">
        Try it now — no account needed
      </p>
      <input
        type="url"
        value={url}
        onChange={handleChange}
        placeholder="https://your-website.com"
        className="w-full h-12 rounded-[8px] border border-[#E5E7EB] dark:border-[#2A2A2A] px-4 text-sm bg-white dark:bg-[#0A0A0A] text-[var(--text-primary)] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:border-transparent transition-shadow"
        autoComplete="off"
        autoFocus
      />

      <div className="mt-4 flex justify-center">
        <QRPreview content={content} size={220} />
      </div>

      {content && (
        <div className="mt-4">
          <QRDownload content={content} filename="qrwide-code" />
          <p className="mt-3 text-xs text-center text-[var(--text-secondary)]">
            <a href="/signup" className="text-[#0066FF] hover:underline font-medium">
              Save & track scans →
            </a>{' '}
            Free account, 30 seconds
          </p>
        </div>
      )}

      {!content && (
        <p className="mt-4 text-center text-xs text-[var(--text-secondary)]">
          Type any URL above to generate your QR code instantly
        </p>
      )}
    </Card>
  )
}
