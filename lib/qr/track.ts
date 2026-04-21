import { redis } from '@/lib/redis'

export async function incrementScanCount(qrId: string): Promise<void> {
  const today = new Date().toISOString().split('T')[0]
  const key = `qr:stats:${qrId}:day:${today}`
  await redis.incr(key)
  // 48hr TTL — nightly cron syncs to Postgres
  await redis.expire(key, 172800)
}

export async function getCachedDestination(
  shortcode: string
): Promise<{ destination: string; qrId: string; isActive: boolean } | null> {
  const key = `qr:shortcode:${shortcode}`
  const cached = await redis.get<{ destination: string; qrId: string; isActive: boolean }>(key)
  return cached
}

export async function cacheDestination(
  shortcode: string,
  data: { destination: string; qrId: string; isActive: boolean }
): Promise<void> {
  const key = `qr:shortcode:${shortcode}`
  await redis.set(key, data, { ex: 3600 }) // 1hr TTL
}

export async function invalidateShortcode(shortcode: string): Promise<void> {
  await redis.del(`qr:shortcode:${shortcode}`)
}

export function parseUserAgent(ua: string): { deviceType: string; os: string; browser: string } {
  const mobile = /Mobile|Android|iPhone|iPad/i.test(ua)
  const tablet = /iPad|Tablet/i.test(ua)

  let deviceType = 'desktop'
  if (tablet) deviceType = 'tablet'
  else if (mobile) deviceType = 'mobile'

  let os = 'Other'
  if (/iPhone|iPad|iOS/i.test(ua)) os = 'iOS'
  else if (/Android/i.test(ua)) os = 'Android'
  else if (/Windows/i.test(ua)) os = 'Windows'
  else if (/Mac OS X/i.test(ua)) os = 'macOS'
  else if (/Linux/i.test(ua)) os = 'Linux'

  let browser = 'Other'
  if (/Chrome/i.test(ua) && !/Chromium|Edge/i.test(ua)) browser = 'Chrome'
  else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = 'Safari'
  else if (/Firefox/i.test(ua)) browser = 'Firefox'
  else if (/Edge/i.test(ua)) browser = 'Edge'

  return { deviceType, os, browser }
}
