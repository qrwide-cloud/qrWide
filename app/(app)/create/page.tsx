import type { Metadata } from 'next'
import { CreateClient } from './CreateClient'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Create & Customize Your QR Code',
  description: 'Create a custom QR code in seconds. Choose from 15+ types — URL, WiFi, vCard, Email, WhatsApp — and customize colors, shapes, and logo.',
  keywords: ['create qr code', 'custom qr code', 'qr code maker', 'qr code designer'],
  alternates: { canonical: 'https://qrwide.com/create' },
}

export default async function CreatePage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let userPlan: 'free' | 'pro' | 'business' = 'free'
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('plan')
      .eq('id', user.id)
      .single()
    if (profile?.plan) userPlan = profile.plan
  }

  return <CreateClient userPlan={userPlan} />
}
