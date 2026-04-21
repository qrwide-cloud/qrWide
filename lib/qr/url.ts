export function normalizeQrDestination(destination: string): string {
  const trimmed = destination.trim()

  if (!trimmed) return trimmed

  // Already has a URL scheme like https:, mailto:, tel:, sms:, wifi:, etc.
  if (/^[a-z][a-z0-9+.-]*:/i.test(trimmed)) {
    return trimmed
  }

  // Protocol-relative URLs should become https URLs.
  if (trimmed.startsWith('//')) {
    return `https:${trimmed}`
  }

  return `https://${trimmed}`
}

export function isAbsoluteHttpUrl(value: string): boolean {
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}
