import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createQRCode } from '@/lib/db/queries'
import type { QRType } from '@/lib/db/schema'
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
