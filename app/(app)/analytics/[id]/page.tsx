import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import { AnalyticsClient } from './AnalyticsClient'

export const metadata: Metadata = { title: 'Analytics' }

export default async function AnalyticsPage({ params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: qr } = await supabase
    .from('qr_codes')
    .select('*')
    .eq('id', params.id)
    .eq('user_id', user.id)
    .single()

  if (!qr) notFound()

  const { data: profile } = await supabase.from('profiles').select('plan').eq('id', user.id).single()

  const cutoff = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
  const { data: scans } = await supabase
    .from('scan_events')
    .select('*')
    .eq('qr_id', params.id)
    .gte('scanned_at', cutoff)
    .order('scanned_at', { ascending: false })
    .limit(5000)

  return (
    <AnalyticsClient
      qr={qr}
      initialScans={scans ?? []}
      plan={profile?.plan ?? 'free'}
    />
  )
}
