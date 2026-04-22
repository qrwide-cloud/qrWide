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
    cornerDotStyle = 'square',
    cornerColor,
    cornerDotColor,
    logoUrl,
    logoSize = 0.3,
    errorCorrection = 'H',
  } = style

  const dotStyleMap: Record<string, string> = {
    square: 'square',
    rounded: 'rounded',
    dots: 'dots',
    classy: 'classy',
    'classy-rounded': 'classy-rounded',
    'extra-rounded': 'extra-rounded',
  }
  const cornerSquareMap: Record<string, string> = {
    square: 'square',
    'extra-rounded': 'extra-rounded',
    dot: 'dot',
    rounded: 'extra-rounded',
  }
  const cornerDotMap: Record<string, string> = {
    square: 'square',
    dot: 'dot',
  }

  const initQR = useCallback(async () => {
    if (!content || !canvasRef.current) return
    try {
      const { default: QRCodeStyling } = await import('qr-code-styling')
      const clampedLogoSize = Math.min(Math.max(logoSize ?? 0.3, 0.1), 0.5)
      const options = {
        width: size,
        height: size,
        data: content,
        dotsOptions: {
          color: foreground,
          type: (dotStyleMap[dotStyle] ?? 'square') as never,
        },
        backgroundOptions: { color: background },
        cornersSquareOptions: {
          type: (cornerSquareMap[cornerStyle] ?? 'square') as never,
          color: cornerColor || foreground,
        },
        cornersDotOptions: {
          type: (cornerDotMap[cornerDotStyle] ?? 'square') as never,
          color: cornerDotColor || cornerColor || foreground,
        },
        image: logoUrl || undefined,
        imageOptions: {
          crossOrigin: 'anonymous',
          margin: 4,
          imageSize: clampedLogoSize,
          hideBackgroundDots: true,
        },
        qrOptions: { errorCorrectionLevel: (errorCorrection ?? 'H') as 'L' | 'M' | 'Q' | 'H' },
      }

      if (qrRef.current) {
        (qrRef.current as never as { update: (o: typeof options) => void }).update(options)
      } else {
        const qr = new QRCodeStyling(options)
        qrRef.current = qr
        if (canvasRef.current) {
          canvasRef.current.innerHTML = ''
          ;(qr as never as { append: (el: HTMLDivElement) => void }).append(canvasRef.current)
        }
      }
      setReady(true)
      setError(false)
    } catch {
      setError(true)
    }
  }, [content, foreground, background, dotStyle, cornerStyle, cornerDotStyle, cornerColor, cornerDotColor, logoUrl, logoSize, errorCorrection, size])

  useEffect(() => {
    const timer = setTimeout(initQR, 50)
    return () => clearTimeout(timer)
  }, [initQR])

  if (!content) {
    return (
      <div className={['relative overflow-hidden rounded-2xl', className].join(' ')}
        style={{ width: size, height: size }}>
        <AnimatedQRSkeleton size={size} />
      </div>
    )
  }

  if (error) {
    return (
      <div className={['flex items-center justify-center rounded-2xl bg-red-50 dark:bg-red-950', className].join(' ')}
        style={{ width: size, height: size }}>
        <p className="text-xs text-red-500">Failed to generate</p>
      </div>
    )
  }

  return (
    <div
      ref={canvasRef}
      className={['animate-qr-appear rounded-2xl overflow-hidden', className].join(' ')}
      style={{ width: size, height: size, minHeight: size }}
    />
  )
}

/* ─────────────────────────────────────────────────────────
   Animated QR Skeleton
───────────────────────────────────────────────────────── */
function AnimatedQRSkeleton({ size }: { size: number }) {
  const U = size / 23
  const q = U
  const F = 7 * U
  const r = U * 0.5

  function Finder({ x, y }: { x: number; y: number }) {
    return (
      <g>
        <rect x={x} y={y} width={F} height={F} rx={r * 1.5} fill="#0057FF" />
        <rect x={x + U} y={y + U} width={5 * U} height={5 * U} rx={r} fill="var(--bg, #fff)" />
        <rect x={x + 2 * U} y={y + 2 * U} width={3 * U} height={3 * U} rx={r * 0.8} fill="#0057FF" />
      </g>
    )
  }

  const dots: { cx: number; cy: number; delay: number }[] = []
  const dataStart = q + F + U
  const dataTop = q

  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 9; col++) {
      const cx = dataStart + col * U * 1.1
      const cy = dataTop + row * U * 1.1
      if ((row < 8 && col >= 5) || (row >= 7 && col < 3)) continue
      dots.push({ cx, cy, delay: (row + col) * 0.08 })
    }
  }

  const dotR = U * 0.32

  return (
    <>
      <style>{`
        @keyframes qr-dot-pulse { 0%,100%{opacity:.12;transform:scale(.8)} 50%{opacity:.45;transform:scale(1)} }
        @keyframes qr-finder-breathe { 0%,100%{opacity:.55} 50%{opacity:.85} }
      `}</style>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" aria-hidden="true">
        <rect width={size} height={size} rx={U} fill="var(--surface, #f8fafc)" />
        <g style={{ animation: 'qr-finder-breathe 3s ease-in-out infinite' }}>
          <Finder x={q} y={q} />
          <Finder x={q + F + U + 6 * U} y={q} />
          <Finder x={q} y={q + F + U + 6 * U} />
        </g>
        {dots.map(({ cx, cy, delay }, i) => (
          <rect key={i} x={cx - dotR} y={cy - dotR} width={dotR * 2} height={dotR * 2} rx={dotR * 0.4}
            fill="#0057FF"
            style={{ animation: `qr-dot-pulse 2.2s ${delay.toFixed(2)}s ease-in-out infinite`, transformOrigin: `${cx}px ${cy}px` }}
          />
        ))}
      </svg>
    </>
  )
}
