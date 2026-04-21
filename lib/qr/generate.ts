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
    color: {
      dark: foreground,
      light: background,
    },
    errorCorrectionLevel: 'H',
  })
}

export async function generateQRBuffer(content: string, style: QRStyle = {}): Promise<Buffer> {
  const { foreground = '#000000', background = '#FFFFFF', size = 400 } = style

  return QRCode.toBuffer(content, {
    width: size,
    margin: 2,
    color: {
      dark: foreground,
      light: background,
    },
    errorCorrectionLevel: 'H',
  })
}

export async function generateQRSVGString(content: string, style: QRStyle = {}): Promise<string> {
  const { foreground = '#000000', background = '#FFFFFF', size = 400 } = style

  return QRCode.toString(content, {
    type: 'svg',
    width: size,
    margin: 2,
    color: {
      dark: foreground,
      light: background,
    },
    errorCorrectionLevel: 'H',
  })
}

export function buildQRContent(type: string, data: Record<string, string>): string {
  switch (type) {
    case 'url':
      return data.url || ''
    case 'wifi':
      return `WIFI:T:${data.encryption || 'WPA'};S:${data.ssid || ''};P:${data.password || ''};;`
    case 'vcard':
      return [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `FN:${data.name || ''}`,
        `ORG:${data.company || ''}`,
        `TEL:${data.phone || ''}`,
        `EMAIL:${data.email || ''}`,
        `URL:${data.website || ''}`,
        'END:VCARD',
      ].join('\n')
    case 'text':
      return data.text || ''
    case 'instagram':
      return `https://instagram.com/${data.handle || ''}`
    default:
      return data.url || data.text || ''
  }
}
