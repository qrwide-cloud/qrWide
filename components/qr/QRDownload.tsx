'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import type { QRStyle } from '@/lib/db/schema'

interface QRDownloadProps {
  content: string
  style?: QRStyle
  filename?: string
  showPdf?: boolean
}

export function QRDownload({ content, style = {}, filename = 'qrcode', showPdf = false }: QRDownloadProps) {
  const [loading, setLoading] = useState<'png' | 'svg' | 'pdf' | null>(null)

  function buildOptions(size: number) {
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
      square: 'square', rounded: 'rounded', dots: 'dots',
      classy: 'classy', 'classy-rounded': 'classy-rounded', 'extra-rounded': 'extra-rounded',
    }
    const cornerSquareMap: Record<string, string> = {
      square: 'square', 'extra-rounded': 'extra-rounded', dot: 'dot', rounded: 'extra-rounded',
    }
    const cornerDotMap: Record<string, string> = { square: 'square', dot: 'dot' }
    const clampedLogoSize = Math.min(Math.max(logoSize ?? 0.3, 0.1), 0.5)

    return {
      width: size,
      height: size,
      data: content,
      dotsOptions: { color: foreground, type: (dotStyleMap[dotStyle] ?? 'square') as never },
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
      imageOptions: { crossOrigin: 'anonymous', margin: 4, imageSize: clampedLogoSize, hideBackgroundDots: true },
      qrOptions: { errorCorrectionLevel: (errorCorrection ?? 'H') as never },
    }
  }

  async function downloadPNG() {
    setLoading('png')
    try {
      const { default: QRCodeStyling } = await import('qr-code-styling')
      const qr = new QRCodeStyling(buildOptions(1200))
      await qr.download({ name: filename, extension: 'png' })
    } finally { setLoading(null) }
  }

  async function downloadSVG() {
    setLoading('svg')
    try {
      const { default: QRCodeStyling } = await import('qr-code-styling')
      const qr = new QRCodeStyling(buildOptions(1200))
      await qr.download({ name: filename, extension: 'svg' })
    } finally { setLoading(null) }
  }

  async function downloadPDF() {
    if (!showPdf) return
    setLoading('pdf')
    try {
      const { default: QRCodeStyling } = await import('qr-code-styling')
      const { jsPDF } = await import('jspdf')
      const qr = new QRCodeStyling(buildOptions(1200))
      const rawData = await qr.getRawData('png')
      if (!rawData) return
      const blob = rawData instanceof Blob ? rawData : new Blob([rawData as unknown as BlobPart], { type: 'image/png' })
      const reader = new FileReader()
      reader.onload = () => {
        const pdf = new jsPDF({ unit: 'mm', format: 'a4' })
        const s = 150
        pdf.addImage(reader.result as string, 'PNG', (210 - s) / 2, (297 - s) / 2, s, s)
        pdf.save(`${filename}.pdf`)
      }
      reader.readAsDataURL(blob)
    } finally { setLoading(null) }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="secondary" size="sm" loading={loading === 'png'} onClick={downloadPNG} disabled={!content}>
        <DownloadIcon /> PNG
      </Button>
      <Button variant="secondary" size="sm" loading={loading === 'svg'} onClick={downloadSVG} disabled={!content}>
        <DownloadIcon /> SVG
      </Button>
      {showPdf && (
        <Button variant="secondary" size="sm" loading={loading === 'pdf'} onClick={downloadPDF} disabled={!content}>
          <DownloadIcon /> PDF
        </Button>
      )}
    </div>
  )
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 1v8M4 6l3 3 3-3M2 10v1a1 1 0 001 1h8a1 1 0 001-1v-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
