import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createQRCode } from '@/lib/db/queries'
import { getPlanLimits } from '@/lib/plans'
import type { QRType } from '@/lib/db/schema'

export async function POST(request: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const body = await request.json()
  const { name, type, destination, style, isDynamic = true } = body as {
    name: string
    type: QRType
    destination: string
    style?: object
    isDynamic?: boolean
  }

  if (!destination) {
    return NextResponse.json({ error: 'destination is required' }, { status: 400 })
  }

  // Unauthenticated: static only, no save
  if (!user) {
    return NextResponse.json({ error: 'Login required to save QR codes' }, { status: 401 })
  }

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
  const plan = profile?.plan ?? 'free'
  const limits = getPlanLimits(plan)

  // Check dynamic QR limit
  if (isDynamic) {
    const currentDynamic = profile?.qr_count ?? 0
    if (limits.maxDynamicQr !== Infinity && currentDynamic >= limits.maxDynamicQr) {
      return NextResponse.json(
        {
          error: `You've reached your limit of ${limits.maxDynamicQr} dynamic QR codes on the ${plan} plan.`,
          upgradeRequired: true,
        },
        { status: 403 }
      )
    }
  }

  const qr = await createQRCode({
    userId: user.id,
    name: name || `QR Code ${Date.now()}`,
    type,
    destination,
    isDynamic,
    style: style ?? {},
  })

  return NextResponse.json({ id: qr.id, shortcode: qr.shortcode }, { status: 201 })
}
