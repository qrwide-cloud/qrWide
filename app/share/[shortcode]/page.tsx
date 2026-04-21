import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { SharePageClient } from './SharePageClient'

export default async function SharePage({ params }: { params: { shortcode: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: qr } = await supabase
    .from('qr_codes')
    .select('id, user_id, shortcode, name, type, destination, style, total_scans')
    .eq('shortcode', params.shortcode)
    .single()

  if (!qr) notFound()

  const isOwner = user?.id === qr.user_id

  return (
    <SharePageClient
      qr={{ ...qr, style: (qr.style ?? {}) as Record<string, string> }}
      fallbackHref={isOwner ? '/dashboard' : '/'}
      fallbackLabel={isOwner ? 'Back to dashboard' : 'Back to home'}
      analyticsHref={isOwner ? `/analytics/${qr.id}` : undefined}
    />
  )
}
