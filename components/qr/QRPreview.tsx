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
    square: 'square', rounded: 'rounded', dots: 'dots', classy: 'classy',
  }
  const cornerStyleMap: Record<string, string> = {
    square: 'square', rounded: 'extra-rounded', 'extra-rounded': 'extra-rounded',
  }

  const initQR = useCallback(async () => {
    if (!content || !canvasRef.current) return
    try {
      const { default: QRCodeStyling } = await import('qr-code-styling')
      const options = {
        width: size,
        height: size,
        data: content,
        dotsOptions: { color: foreground, type: (dotStyleMap[dotStyle] ?? 'square') as never },
        backgroundOptions: { color: background },
        cornersSquareOptions: { type: (cornerStyleMap[cornerStyle] ?? 'square') as never },
        image: logoUrl ?? undefined,
        imageOptions: { crossOrigin: 'anonymous', margin: 4 },
        qrOptions: { errorCorrectionLevel: 'H' as const },
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
  }, [content, foreground, background, dotStyle, cornerStyle, logoUrl, size])

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
   Three finder patterns + pulsing data dots wave
───────────────────────────────────────────────────────── */
function AnimatedQRSkeleton({ size }: { size: number }) {
  // Layout constants (21 logical units = standard QR v1 + quiet zone)
  const U = size / 23          // 1 unit
  const q = U                  // 1-unit quiet zone offset
  const F = 7 * U              // finder size (7 units)
  const r = U * 0.5            // corner radius

  // Finder pattern helper (outer frame + white ring + inner dot)
  function Finder({ x, y }: { x: number; y: number }) {
    const outerFill  = '#0057FF'
    const ringFill   = 'var(--bg, #fff)'
    const innerFill  = '#0057FF'
    const innerSize  = 3 * U
    const innerOff   = 2 * U
    return (
      <g>
        <rect x={x} y={y} width={F} height={F} rx={r * 1.5} fill={outerFill} />
        <rect x={x + U} y={y + U} width={5 * U} height={5 * U} rx={r} fill={ringFill} />
        <rect x={x + innerOff} y={y + innerOff} width={innerSize} height={innerSize} rx={r * 0.8} fill={innerFill} />
      </g>
    )
  }

  // Data dot grid — covers area not occupied by finder patterns
  // We generate an 8×8 logical grid in the bottom-right quadrant
  // plus a 4×8 strip on the right side
  const dots: { cx: number; cy: number; delay: number }[] = []

  // Right strip (col 8–14, row 0–6 — beside top-right finder and below)
  // Center/bottom-right block (col 8–14, row 8–14)
  const dataStart = q + F + U   // x position where data area begins (after TL finder + gap)
  const dataTop   = q           // y starts at quiet zone

  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 9; col++) {
      const cx = dataStart + col * U * 1.1
      const cy = dataTop + row * U * 1.1

      // Skip the TR finder zone (top rows, right columns)
      const inTRFinder = row < 8 && col >= 5
      // Skip the BL finder zone (bottom rows, left columns relative to data)
      const inBLFinder = row >= 7 && col < 3

      if (inTRFinder || inBLFinder) continue

      // Stagger delay in a diagonal wave from top-left to bottom-right
      const delay = (row + col) * 0.08
      dots.push({ cx, cy, delay })
    }
  }

  // Bottom-right accent dots (teal)
  const accentDots: { cx: number; cy: number; delay: number }[] = []
  const brStart = q + F + U + 5 * U * 1.1
  const brTop   = q + 7 * U * 1.1
  for (let r2 = 0; r2 < 3; r2++) {
    for (let c = 0; c < 4; c++) {
      accentDots.push({
        cx: brStart + c * U * 1.1,
        cy: brTop + r2 * U * 1.1,
        delay: (r2 + c) * 0.1 + 0.4,
      })
    }
  }

  const dotR = U * 0.32   // dot radius

  return (
    <>
      <style>{`
        @keyframes qr-dot-pulse {
          0%, 100% { opacity: 0.12; transform: scale(0.8); }
          50%       { opacity: 0.45; transform: scale(1);   }
        }
        @keyframes qr-accent-pulse {
          0%, 100% { opacity: 0.2;  transform: scale(0.8); }
          50%       { opacity: 0.65; transform: scale(1.1); }
        }
        @keyframes qr-finder-breathe {
          0%, 100% { opacity: 0.55; }
          50%       { opacity: 0.85; }
        }
      `}</style>

      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        aria-hidden="true"
      >
        {/* ── Background ── */}
        <rect width={size} height={size} rx={U} fill="var(--surface, #f8fafc)" />

        {/* ── Finder patterns (branded) ── */}
        <g style={{ animation: 'qr-finder-breathe 3s ease-in-out infinite' }}>
          <Finder x={q} y={q} />
          <Finder x={q + F + U + 6 * U} y={q} />
          <Finder x={q} y={q + F + U + 6 * U} />
        </g>

        {/* ── Alignment pattern (bottom-right, teal) ── */}
        <rect
          x={q + F + U + 7 * U}
          y={q + F + U + 7 * U}
          width={3 * U} height={3 * U}
          rx={r * 0.6}
          fill="#00C896"
          style={{ animation: 'qr-accent-pulse 2.5s 0.3s ease-in-out infinite' }}
        />

        {/* ── Pulsing data dots (wave animation) ── */}
        {dots.map(({ cx, cy, delay }, i) => (
          <rect
            key={i}
            x={cx - dotR} y={cy - dotR}
            width={dotR * 2} height={dotR * 2}
            rx={dotR * 0.4}
            fill="#0057FF"
            style={{
              animation: `qr-dot-pulse 2.2s ${delay.toFixed(2)}s ease-in-out infinite`,
              transformOrigin: `${cx}px ${cy}px`,
            }}
          />
        ))}

        {/* ── Accent data dots (teal, bottom-right cluster) ── */}
        {accentDots.map(({ cx, cy, delay }, i) => (
          <rect
            key={`a${i}`}
            x={cx - dotR} y={cy - dotR}
            width={dotR * 2} height={dotR * 2}
            rx={dotR * 0.4}
            fill="#00C896"
            style={{
              animation: `qr-accent-pulse 2.5s ${delay.toFixed(2)}s ease-in-out infinite`,
              transformOrigin: `${cx}px ${cy}px`,
            }}
          />
        ))}

        {/* ── Timing pattern dots (horizontal strip) ── */}
        {Array.from({ length: 5 }).map((_, i) => (
          <rect
            key={`t${i}`}
            x={q + F + U + i * U * 1.4 - dotR}
            y={q + 3 * U - dotR}
            width={dotR * 2} height={dotR * 2}
            rx={dotR * 0.4}
            fill={i % 2 === 0 ? '#0057FF' : 'transparent'}
            opacity={0.25}
          />
        ))}
      </svg>
    </>
  )
}
