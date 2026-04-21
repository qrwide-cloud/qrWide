import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { invalidateShortcode } from '@/lib/qr/track'
import { deleteQRCode, updateQRCode } from '@/lib/db/queries'

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()

  // Verify ownership
  const { data: existing } = await supabase
    .from('qr_codes')
    .select('shortcode, user_id')
    .eq('id', params.id)
    .single()

  if (!existing || existing.user_id !== user.id) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  try {
    const data = await updateQRCode(params.id, user.id, {
      name: body.name,
      destination: body.destination,
      isActive: body.is_active,
      style: body.style,
      folder: body.folder,
      tags: body.tags,
    })

    // Invalidate Redis cache so redirect picks up new destination
    await invalidateShortcode(existing.shortcode)

    return NextResponse.json({ success: true, updated_at: data.updated_at })
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: existing } = await supabase
    .from('qr_codes')
    .select('shortcode, user_id')
    .eq('id', params.id)
    .single()

  if (!existing || existing.user_id !== user.id) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  try {
    await deleteQRCode(params.id, user.id)
    await invalidateShortcode(existing.shortcode)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}
