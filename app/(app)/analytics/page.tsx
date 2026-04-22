import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { OverviewClient } from './OverviewClient'

export const metadata: Metadata = { title: 'Analytics Overview' }
export const dynamic = 'force-dynamic'

export default async function AnalyticsOverviewPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const cutoff = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()

  const [{ data: qrCodes }, { data: profile }] = await Promise.all([
    supabase.from('qr_codes').select('*').eq('user_id', user.id).order('total_scans', { ascending: false }),
    supabase.from('profiles').select('plan').eq('id', user.id).single(),
  ])

  const codes = qrCodes ?? []
  const qrIds = codes.map((q) => q.id)

  const { data: scans } = qrIds.length > 0
    ? await supabase
        .from('scan_events')
        .select('qr_id, scanned_at, country, device_type, os, city')
        .in('qr_id', qrIds)
        .gte('scanned_at', cutoff)
        .order('scanned_at', { ascending: false })
        .limit(50000)
    : { data: [] }

  return (
    <OverviewClient
      qrCodes={codes}
      scans={scans ?? []}
      plan={profile?.plan ?? 'free'}
    />
  )
}
