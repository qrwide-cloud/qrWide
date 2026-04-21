import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { SharePageClient } from './SharePageClient'

export default async function SharePage({ params }: { params: { shortcode: string } }) {
  const supabase = createClient()
  const { data: qr } = await supabase
    .from('qr_codes')
    .select('id, shortcode, name, destination, style, total_scans')
    .eq('shortcode', params.shortcode)
    .single()

  if (!qr) notFound()

  return <SharePageClient qr={{ ...qr, style: (qr.style ?? {}) as Record<string, string> }} />
}
