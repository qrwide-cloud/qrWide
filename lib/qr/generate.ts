import QRCode from 'qrcode'

export interface QRStyle {
  foreground?: string
  background?: string
  size?: number
}

export async function generateQRDataURL(content: string, style: QRStyle = {}): Promise<string> {
  const { foreground = '#000000', background = '#FFFFFF', size = 400 } = style
  return QRCode.toDataURL(content, {
    width: size,
    margin: 2,
    color: { dark: foreground, light: background },
    errorCorrectionLevel: 'H',
  })
}

export async function generateQRBuffer(content: string, style: QRStyle = {}): Promise<Buffer> {
  const { foreground = '#000000', background = '#FFFFFF', size = 400 } = style
  return QRCode.toBuffer(content, {
    width: size,
    margin: 2,
    color: { dark: foreground, light: background },
    errorCorrectionLevel: 'H',
  })
}

export async function generateQRSVGString(content: string, style: QRStyle = {}): Promise<string> {
  const { foreground = '#000000', background = '#FFFFFF', size = 400 } = style
  return QRCode.toString(content, {
    type: 'svg',
    width: size,
    margin: 2,
    color: { dark: foreground, light: background },
    errorCorrectionLevel: 'H',
  })
}

function esc(s: string) {
  return encodeURIComponent(s)
}

function formatEventDate(raw: string): string {
  // Accepts "2026-06-15 09:00" → "20260615T090000Z"
  const cleaned = raw.replace(/[-: ]/g, '').slice(0, 13).padEnd(15, '0')
  return cleaned + 'Z'
}

export function buildQRContent(type: string, data: Record<string, string>): string {
  switch (type) {
    // ── FREE ──────────────────────────────────────────────────
    case 'url':
      return data.url || ''

    case 'text':
      return data.text || ''

    case 'wifi': {
      const enc = data.encryption || 'WPA'
      const ssid = data.ssid || ''
      const pwd = data.password || ''
      return `WIFI:T:${enc};S:${ssid};P:${pwd};;`
    }

    case 'vcard': {
      const lines = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `FN:${data.name || ''}`,
        `ORG:${data.company || ''}`,
        `TEL:${data.phone || ''}`,
        `EMAIL:${data.email || ''}`,
        `URL:${data.website || ''}`,
        `ADR:;;${data.address || ''};;;;`,
        'END:VCARD',
      ]
      return lines.join('\n')
    }

    // ── PRO ───────────────────────────────────────────────────
    case 'email': {
      const to = data.email || ''
      const params: string[] = []
      if (data.subject) params.push(`subject=${esc(data.subject)}`)
      if (data.body) params.push(`body=${esc(data.body)}`)
      return `mailto:${to}${params.length ? '?' + params.join('&') : ''}`
    }

    case 'call':
      return `tel:${data.phone || ''}`

    case 'sms': {
      const phone = data.phone || ''
      const msg = data.message || ''
      return `smsto:${phone}${msg ? ':' + msg : ''}`
    }

    case 'whatsapp': {
      const phone = (data.phone || '').replace(/\D/g, '')
      const msg = data.message || ''
      return `https://wa.me/${phone}${msg ? '?text=' + esc(msg) : ''}`
    }

    case 'facebook':
      return `https://facebook.com/${data.handle || ''}`

    case 'instagram':
      return `https://instagram.com/${(data.handle || '').replace('@', '')}`

    case 'linkedin': {
      const section = data.type === 'company' ? 'company' : 'in'
      return `https://linkedin.com/${section}/${data.handle || ''}`
    }

    case 'tiktok':
      return `https://tiktok.com/@${(data.handle || '').replace('@', '')}`

    case 'youtube': {
      const handle = data.handle || ''
      if (data.linkType === 'video') return handle.startsWith('http') ? handle : `https://youtube.com/watch?v=${handle}`
      return `https://youtube.com/@${handle.replace('@', '')}`
    }

    case 'event': {
      const lines = [
        'BEGIN:VEVENT',
        `SUMMARY:${data.title || ''}`,
        data.startDate ? `DTSTART:${formatEventDate(data.startDate)}` : '',
        data.endDate ? `DTEND:${formatEventDate(data.endDate)}` : '',
        data.location ? `LOCATION:${data.location}` : '',
        data.description ? `DESCRIPTION:${data.description}` : '',
        'END:VEVENT',
      ].filter(Boolean)
      return lines.join('\n')
    }

    // ── BUSINESS ──────────────────────────────────────────────
    case 'pdf':
    case 'images':
    case 'video':
      return data.url || ''

    case 'app': {
      // Deep link: prefer App Store on iOS, Play Store on Android — encode both as a smart link
      // For simplicity we prefer App Store URL, fallback to Play Store
      return data.appStore || data.playStore || ''
    }

    default:
      return data.url || data.text || ''
  }
}
