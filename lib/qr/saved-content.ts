const DIRECT_PAYLOAD_TYPES = new Set([
  'text',
  'wifi',
  'vcard',
  'event',
])

interface SavedQRContentParams {
  type: string
  destination: string
  shortcode: string
  appUrl: string
}

export function getSavedQRContent({
  type,
  destination,
  shortcode,
  appUrl,
}: SavedQRContentParams): string {
  if (DIRECT_PAYLOAD_TYPES.has(type)) {
    return destination
  }

  return `${appUrl.replace(/\/+$/, '')}/s/${shortcode}`
}
