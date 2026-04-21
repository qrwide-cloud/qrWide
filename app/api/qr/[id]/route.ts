import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { invalidateShortcode } from '@/lib/qr/track'

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

  const { data, error } = await supabase
    .from('qr_codes')
    .update({
      updated_at: new Date().toISOString(),
      ...(body.destination !== undefined && { destination: body.destination }),
      ...(body.name !== undefined && { name: body.name }),
      ...(body.is_active !== undefined && { is_active: body.is_active }),
      ...(body.style !== undefined && { style: body.style }),
      ...(body.folder !== undefined && { folder: body.folder }),
    })
    .eq('id', params.id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Invalidate Redis cache so redirect picks up new destination
  await invalidateShortcode(existing.shortcode)

  return NextResponse.json({ success: true, updated_at: data.updated_at })
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

  await supabase.from('qr_codes').delete().eq('id', params.id)
  await invalidateShortcode(existing.shortcode)

  return NextResponse.json({ success: true })
}
