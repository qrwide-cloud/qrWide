import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import { EditClient } from './EditClient'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  return { title: 'Edit QR Code' }
}

export default async function EditPage({ params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const [{ data: qr }, { data: profile }] = await Promise.all([
    supabase
      .from('qr_codes')
      .select('*')
      .eq('id', params.id)
      .eq('user_id', user.id)
      .single(),
    supabase.from('profiles').select('plan').eq('id', user.id).single(),
  ])

  if (!qr) notFound()

  return <EditClient qr={qr} userPlan={profile?.plan ?? 'free'} />
}
