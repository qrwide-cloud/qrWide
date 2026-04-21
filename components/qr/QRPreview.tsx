'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import type { QRStyle } from '@/lib/db/schema'

interface QRPreviewProps {
  content: string
  style?: QRStyle
  size?: number
  className?: string
}

export function QRPreview({ content, style = {}, size = 280, className = '' }: QRPreviewProps) {
  const canvasRef = useRef<HTMLDivElement>(null)
  const qrRef = useRef<unknown>(null)
  const [ready, setReady] = useState(false)
  const [error, setError] = useState(false)

  const {
    foreground = '#000000',
    background = '#FFFFFF',
    dotStyle = 'square',
    cornerStyle = 'square',
    logoUrl,
  } = style

  const dotStyleMap: Record<string, string> = {
    square: 'square',
    rounded: 'rounded',
    dots: 'dots',
    classy: 'classy',
  }

  const cornerStyleMap: Record<string, string> = {
    square: 'square',
    rounded: 'extra-rounded',
    'extra-rounded': 'extra-rounded',
  }

  const initQR = useCallback(async () => {
    if (!content || !canvasRef.current) return

    try {
      const { default: QRCodeStyling } = await import('qr-code-styling')

      const options = {
        width: size,
        height: size,
        data: content,
        dotsOptions: {
          color: foreground,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          type: (dotStyleMap[dotStyle] ?? 'square') as any,
        },
        backgroundOptions: { color: background },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cornersSquareOptions: { type: (cornerStyleMap[cornerStyle] ?? 'square') as any },
        image: logoUrl ?? undefined,
        imageOptions: { crossOrigin: 'anonymous', margin: 4 },
        qrOptions: { errorCorrectionLevel: 'H' as const },
      }

      if (qrRef.current) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(qrRef.current as any).update(options)
      } else {
        const qr = new QRCodeStyling(options)
        qrRef.current = qr

        if (canvasRef.current) {
          canvasRef.current.innerHTML = ''
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ;(qr as any).append(canvasRef.current)
        }
      }

      setReady(true)
      setError(false)
    } catch {
      setError(true)
    }
  }, [content, foreground, background, dotStyle, cornerStyle, logoUrl, size])

  useEffect(() => {
    const timer = setTimeout(initQR, 50)
    return () => clearTimeout(timer)
  }, [initQR])

  if (!content) {
    return (
      <div
        className={[
          'flex items-center justify-center rounded-[12px] border-2 border-dashed border-[#E5E7EB] dark:border-[#2A2A2A] bg-[#F8F9FA] dark:bg-[#141414]',
          className,
        ].join(' ')}
        style={{ width: size, height: size }}
      >
        <div className="text-center text-[#9CA3AF]">
          <QRPlaceholderIcon size={48} />
          <p className="mt-2 text-xs">Your QR code appears here</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div
        className={['flex items-center justify-center rounded-[12px] bg-[#FEE2E2]', className].join(' ')}
        style={{ width: size, height: size }}
      >
        <p className="text-xs text-[#EF4444]">Failed to generate</p>
      </div>
    )
  }

  return (
    <div
      ref={canvasRef}
      className={['animate-qr-appear rounded-[12px] overflow-hidden', className].join(' ')}
      style={{ width: size, height: size, minHeight: size }}
    />
  )
}

function QRPlaceholderIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="4" y="4" width="18" height="18" rx="2" stroke="#D1D5DB" strokeWidth="2" />
      <rect x="26" y="4" width="18" height="18" rx="2" stroke="#D1D5DB" strokeWidth="2" />
      <rect x="4" y="26" width="18" height="18" rx="2" stroke="#D1D5DB" strokeWidth="2" />
      <rect x="8" y="8" width="10" height="10" rx="1" fill="#D1D5DB" />
      <rect x="30" y="8" width="10" height="10" rx="1" fill="#D1D5DB" />
      <rect x="8" y="30" width="10" height="10" rx="1" fill="#D1D5DB" />
      <rect x="26" y="26" width="7" height="7" rx="1" fill="#D1D5DB" />
      <rect x="35" y="26" width="7" height="7" rx="1" fill="#D1D5DB" />
      <rect x="26" y="35" width="7" height="7" rx="1" fill="#D1D5DB" />
      <rect x="35" y="35" width="7" height="7" rx="1" fill="#D1D5DB" />
    </svg>
  )
}
