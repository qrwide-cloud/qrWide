import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { SettingsClient } from './SettingsClient'

export const metadata: Metadata = { title: 'Settings' }

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: { upgrade?: 'pro' | 'business'; billingCycle?: 'monthly' | 'yearly' }
}) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()

  return (
    <SettingsClient
      profile={profile}
      userEmail={user.email ?? ''}
      intentPlan={searchParams.upgrade}
      intentBillingCycle={searchParams.billingCycle}
    />
  )
}
