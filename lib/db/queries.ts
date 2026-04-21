import { createClient } from '@/lib/supabase/server'
import { generateShortcode } from '@/lib/qr/shortcode'
import type { QRType, QRStyle } from '@/lib/db/schema'

export async function getProfile(userId: string) {
  const supabase = createClient()
  const { data } = await supabase.from('profiles').select('*').eq('id', userId).single()
  return data
}

export async function getUserQRCodes(userId: string, options?: {
  search?: string
  folder?: string
  type?: QRType
  sort?: 'scans' | 'created' | 'name'
}) {
  const supabase = createClient()
  let query = supabase.from('qr_codes').select('*').eq('user_id', userId)

  if (options?.search) {
    query = query.ilike('name', `%${options.search}%`)
  }
  if (options?.folder) {
    query = query.eq('folder', options.folder)
  }
  if (options?.type) {
    query = query.eq('type', options.type)
  }

  switch (options?.sort) {
    case 'scans':
      query = query.order('total_scans', { ascending: false })
      break
    case 'name':
      query = query.order('name', { ascending: true })
      break
    default:
      query = query.order('created_at', { ascending: false })
  }

  const { data, error } = await query
  if (error) throw error
  return data ?? []
}

export async function getQRCode(id: string) {
  const supabase = createClient()
  const { data, error } = await supabase.from('qr_codes').select('*').eq('id', id).single()
  if (error) throw error
  return data
}

export async function getQRCodeByShortcode(shortcode: string) {
  const supabase = createClient()
  const { data } = await supabase
    .from('qr_codes')
    .select('id, destination, is_active, shortcode')
    .eq('shortcode', shortcode)
    .single()
  return data
}

export async function createQRCode(params: {
  userId: string
  name: string
  type: QRType
  destination: string
  isDynamic?: boolean
  style?: QRStyle
  folder?: string
  tags?: string[]
}) {
  const supabase = createClient()
  let shortcode = generateShortcode()

  // Retry on collision (extremely unlikely with 6-char nanoid)
  for (let i = 0; i < 5; i++) {
    const { data: existing } = await supabase
      .from('qr_codes')
      .select('shortcode')
      .eq('shortcode', shortcode)
      .single()
    if (!existing) break
    shortcode = generateShortcode()
  }

  const { data, error } = await supabase
    .from('qr_codes')
    .insert({
      user_id: params.userId,
      shortcode,
      name: params.name,
      type: params.type,
      destination: params.destination,
      is_dynamic: params.isDynamic ?? true,
      style: (params.style ?? {}) as import('@/lib/db/schema').Json,
      folder: params.folder,
      tags: params.tags,
    })
    .select()
    .single()

  if (error) throw error

  // Increment profile qr_count
  await supabase.rpc('increment_qr_count', { user_id: params.userId })

  return data
}

export async function updateQRCode(
  id: string,
  userId: string,
  updates: {
    name?: string
    destination?: string
    isActive?: boolean
    style?: QRStyle
    folder?: string
    tags?: string[]
  }
) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('qr_codes')
    .update({
      ...(updates.name !== undefined && { name: updates.name }),
      ...(updates.destination !== undefined && { destination: updates.destination }),
      ...(updates.isActive !== undefined && { is_active: updates.isActive }),
      ...(updates.style !== undefined && { style: updates.style as import('@/lib/db/schema').Json }),
      ...(updates.folder !== undefined && { folder: updates.folder }),
      ...(updates.tags !== undefined && { tags: updates.tags }),
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .eq('user_id', userId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteQRCode(id: string, userId: string) {
  const supabase = createClient()
  const { error } = await supabase
    .from('qr_codes')
    .delete()
    .eq('id', id)
    .eq('user_id', userId)

  if (error) throw error

  await supabase.rpc('decrement_qr_count', { user_id: userId })
}

export async function getQRAnalytics(qrId: string, userId: string, range: '7d' | '30d' | '90d' | 'all') {
  const supabase = createClient()

  // Verify ownership
  const { data: qr } = await supabase
    .from('qr_codes')
    .select('id, user_id')
    .eq('id', qrId)
    .eq('user_id', userId)
    .single()

  if (!qr) throw new Error('QR code not found')

  const cutoff = range === 'all' ? null : new Date(
    Date.now() - parseInt(range) * 24 * 60 * 60 * 1000
  ).toISOString()

  let query = supabase
    .from('scan_events')
    .select('*')
    .eq('qr_id', qrId)
    .order('scanned_at', { ascending: false })

  if (cutoff) {
    query = query.gte('scanned_at', cutoff)
  }

  const { data: scans, error } = await query.limit(10000)
  if (error) throw error

  return scans ?? []
}

export async function logScanEvent(params: {
  qrId: string
  country?: string
  region?: string
  city?: string
  lat?: number
  lng?: number
  deviceType?: string
  os?: string
  browser?: string
  ipHash?: string
  referrer?: string
  userAgent?: string
}) {
  const supabase = createClient()
  await supabase.from('scan_events').insert({
    qr_id: params.qrId,
    country: params.country,
    region: params.region,
    city: params.city,
    lat: params.lat,
    lng: params.lng,
    device_type: params.deviceType,
    os: params.os,
    browser: params.browser,
    ip_hash: params.ipHash,
    referrer: params.referrer,
    user_agent: params.userAgent,
  })

  // Update denormalized counters via dedicated RPC
  await supabase.rpc('increment_qr_scans', { qr_id: params.qrId })
}
