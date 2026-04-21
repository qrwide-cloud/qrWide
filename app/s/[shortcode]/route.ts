import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

export const runtime = 'edge'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

export async function GET(
  request: NextRequest,
  { params }: { params: { shortcode: string } }
) {
  const { shortcode } = params

  // Step 1: Redis cache lookup (target <5ms)
  const cacheKey = `qr:shortcode:${shortcode}`
  let record = await redis.get<{ destination: string; qrId: string; isActive: boolean }>(cacheKey)

  if (!record) {
    // Step 2: Fallback to Postgres via REST API (no ORM overhead at edge)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

    const res = await fetch(
      `${supabaseUrl}/rest/v1/qr_codes?shortcode=eq.${encodeURIComponent(shortcode)}&select=id,destination,is_active&limit=1`,
      { headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` } }
    )

    if (!res.ok) {
      return NextResponse.redirect(new URL('/', request.url), 302)
    }

    const rows: Array<{ id: string; destination: string; is_active: boolean }> = await res.json()
    if (!rows.length) {
      return NextResponse.redirect(new URL('/not-found', request.url), 302)
    }

    const row = rows[0]
    record = { destination: row.destination, qrId: row.id, isActive: row.is_active }

    // Cache for 1 hour (fire-and-forget, don't await)
    redis.set(cacheKey, record, { ex: 3600 }).catch(() => {})
  }

  if (!record.isActive) {
    return NextResponse.redirect(new URL('/paused', request.url), 302)
  }

  // Step 3: Fire-and-forget scan event tracking (DO NOT await)
  trackScan(request, record.qrId).catch(() => {})

  // Step 4: Instant redirect
  const response = NextResponse.redirect(record.destination, 301)
  response.headers.set('Cache-Control', 'no-store')
  response.headers.set('Access-Control-Allow-Origin', '*')
  return response
}

async function trackScan(request: NextRequest, qrId: string): Promise<void> {
  const ua = request.headers.get('user-agent') ?? ''
  const ip =
    request.headers.get('cf-connecting-ip') ??
    request.headers.get('x-forwarded-for')?.split(',')[0] ??
    'unknown'

  const encoder = new TextEncoder()
  const ipData = encoder.encode(ip)
  const hashBuf = await crypto.subtle.digest('SHA-256', ipData)
  const ipHash = Array.from(new Uint8Array(hashBuf)).map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 16)

  // Cloudflare provides geo headers automatically on Vercel Edge
  const country = request.headers.get('cf-ipcountry') ?? undefined
  const city = request.headers.get('cf-ipcity') ?? undefined
  const region = request.headers.get('cf-region') ?? undefined
  const lat = request.headers.get('cf-iplongitude') ? parseFloat(request.headers.get('cf-iplatitude')!) : undefined
  const lng = request.headers.get('cf-iplongitude') ? parseFloat(request.headers.get('cf-iplongitude')!) : undefined

  const { deviceType, os, browser } = parseUserAgent(ua)

  const today = new Date().toISOString().split('T')[0]
  const statsKey = `qr:stats:${qrId}:day:${today}`

  // Increment daily counter in Redis (synced to PG nightly)
  await redis.incr(statsKey)
  await redis.expire(statsKey, 172800)

  // Write full scan event to Supabase via REST
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

  await fetch(`${supabaseUrl}/rest/v1/scan_events`, {
    method: 'POST',
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({
      qr_id: qrId,
      country,
      region,
      city,
      lat,
      lng,
      device_type: deviceType,
      os,
      browser,
      ip_hash: ipHash,
      referrer: request.headers.get('referer'),
      user_agent: ua,
    }),
  })

  // Also increment total_scans on qr_codes row
  await fetch(
    `${supabaseUrl}/rest/v1/rpc/increment_qr_scans`,
    {
      method: 'POST',
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ qr_id: qrId }),
    }
  )
}

function parseUserAgent(ua: string): { deviceType: string; os: string; browser: string } {
  const tablet = /iPad|Tablet/i.test(ua)
  const mobile = !tablet && /Mobile|Android|iPhone/i.test(ua)

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
