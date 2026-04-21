import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createQRCode } from '@/lib/db/queries'
import { getPlanLimits } from '@/lib/plans'
import type { QRType } from '@/lib/db/schema'
import { canUseQRType, getMinimumPlanForQRType } from '@/lib/qr/access'
import { normalizeQrDestination } from '@/lib/qr/url'

export async function POST(request: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const body = await request.json()
  const { name, type, destination, style, isDynamic = true, folder, tags } = body as {
    name: string
    type: QRType
    destination: string
    style?: object
    isDynamic?: boolean
    folder?: string
    tags?: string[]
  }

  if (!destination) {
    return NextResponse.json({ error: 'destination is required' }, { status: 400 })
  }

  const normalizedDestination = type === 'url' ? normalizeQrDestination(destination) : destination

  if (!user) {
    return NextResponse.json({ error: 'Log in to save and track QR codes.' }, { status: 401 })
  }

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
  const plan = profile?.plan ?? 'free'
  const limits = getPlanLimits(plan)

  if (!canUseQRType(plan, type)) {
    const requiredPlan = getMinimumPlanForQRType(type)
    return NextResponse.json(
      {
        error: `${type.toUpperCase()} QR codes require the ${requiredPlan} plan.`,
        upgradeRequired: true,
      },
      { status: 403 }
    )
  }

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
    destination: normalizedDestination,
    isDynamic,
    style: style ?? {},
    folder,
    tags,
  })

  return NextResponse.json({ id: qr.id, shortcode: qr.shortcode }, { status: 201 })
}
