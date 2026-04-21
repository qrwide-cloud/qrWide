'use client'

import { useState, useRef } from 'react'
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

  const { foreground = '#000000', background = '#FFFFFF', dotStyle = 'square' } = style

  async function downloadPNG() {
    setLoading('png')
    try {
      const { default: QRCodeStyling } = await import('qr-code-styling')
      const qr = new QRCodeStyling({
        width: 1000,
        height: 1000,
        data: content,
        dotsOptions: { color: foreground, type: dotStyle as never },
        backgroundOptions: { color: background },
        qrOptions: { errorCorrectionLevel: 'H' },
      })
      await qr.download({ name: filename, extension: 'png' })
    } finally {
      setLoading(null)
    }
  }

  async function downloadSVG() {
    setLoading('svg')
    try {
      const { default: QRCodeStyling } = await import('qr-code-styling')
      const qr = new QRCodeStyling({
        width: 1000,
        height: 1000,
        data: content,
        dotsOptions: { color: foreground, type: dotStyle as never },
        backgroundOptions: { color: background },
        qrOptions: { errorCorrectionLevel: 'H' },
      })
      await qr.download({ name: filename, extension: 'svg' })
    } finally {
      setLoading(null)
    }
  }

  async function downloadPDF() {
    if (!showPdf) return
    setLoading('pdf')
    try {
      const { default: QRCodeStyling } = await import('qr-code-styling')
      const { jsPDF } = await import('jspdf')

      const qr = new QRCodeStyling({
        width: 1000,
        height: 1000,
        data: content,
        dotsOptions: { color: foreground, type: dotStyle as never },
        backgroundOptions: { color: background },
        qrOptions: { errorCorrectionLevel: 'H' },
      })

      const rawData = await qr.getRawData('png')
      if (!rawData) return
      const blob = rawData instanceof Blob ? rawData : new Blob([rawData as unknown as BlobPart], { type: 'image/png' })

      const reader = new FileReader()
      reader.onload = () => {
        const img = reader.result as string
        const pdf = new jsPDF({ unit: 'mm', format: 'a4' })
        const pdfSize = 150
        const x = (210 - pdfSize) / 2
        const y = (297 - pdfSize) / 2
        pdf.addImage(img, 'PNG', x, y, pdfSize, pdfSize)
        pdf.save(`${filename}.pdf`)
      }
      reader.readAsDataURL(blob)
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="secondary"
        size="sm"
        loading={loading === 'png'}
        onClick={downloadPNG}
        disabled={!content}
      >
        <DownloadIcon />
        PNG
      </Button>
      <Button
        variant="secondary"
        size="sm"
        loading={loading === 'svg'}
        onClick={downloadSVG}
        disabled={!content}
      >
        <DownloadIcon />
        SVG
      </Button>
      {showPdf && (
        <Button
          variant="secondary"
          size="sm"
          loading={loading === 'pdf'}
          onClick={downloadPDF}
          disabled={!content}
        >
          <DownloadIcon />
          PDF
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
