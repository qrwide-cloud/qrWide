import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const range = request.nextUrl.searchParams.get('range') ?? '30d'
  const days = range === 'all' ? null : parseInt(range)

  const { data: qr } = await supabase
    .from('qr_codes')
    .select('id, total_scans, unique_scans, last_scanned_at')
    .eq('id', params.id)
    .eq('user_id', user.id)
    .single()

  if (!qr) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  let query = supabase
    .from('scan_events')
    .select('*')
    .eq('qr_id', params.id)
    .order('scanned_at', { ascending: false })
    .limit(10000)

  if (days) {
    const cutoff = new Date(Date.now() - days * 86400000).toISOString()
    query = query.gte('scanned_at', cutoff)
  }

  const { data: scans } = await query
  return NextResponse.json({
    scans: scans ?? [],
    summary: {
      totalScans: qr.total_scans,
      uniqueScans: qr.unique_scans,
      lastScannedAt: qr.last_scanned_at,
    },
  })
}
