import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getPlanLimits } from '@/lib/plans'
import { generateShortcode } from '@/lib/qr/shortcode'

export async function POST(request: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
  const limits = getPlanLimits(profile?.plan ?? 'free')

  const { rows } = await request.json() as {
    rows: Array<{ name: string; destination_url: string; folder?: string }>
  }

  if (rows.length > limits.maxBulk) {
    return NextResponse.json(
      { error: `Your plan allows up to ${limits.maxBulk} QR codes at once. Upgrade for more.` },
      { status: 403 }
    )
  }

  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      const send = (data: object) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`))
      }

      // Generate QR codes server-side using qrcode library
      const QRCode = (await import('qrcode')).default

      const generated: Array<{ name: string; shortcode: string; png: Buffer }> = []

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i]
        const shortcode = generateShortcode()

        // Insert QR code record
        await supabase.from('qr_codes').insert({
          user_id: user.id,
          shortcode,
          name: row.name,
          type: 'url',
          destination: row.destination_url,
          is_dynamic: true,
          folder: row.folder,
        })

        // Generate PNG buffer
        const png = await QRCode.toBuffer(
          `${process.env.NEXT_PUBLIC_APP_URL ?? 'https://qrwide.com'}/s/${shortcode}`,
          { width: 400, margin: 2, errorCorrectionLevel: 'H' }
        )

        generated.push({ name: row.name, shortcode, png })
        send({ progress: i + 1, total: rows.length })
      }

      // Create ZIP using JSZip
      const JSZip = (await import('jszip')).default
      const zip = new JSZip()
      generated.forEach(({ name, png }) => {
        const safeName = name.replace(/[^a-zA-Z0-9\s-_]/g, '').slice(0, 50)
        zip.file(`${safeName}.png`, png)
      })

      const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' })

      // Upload ZIP to Supabase Storage
      const zipName = `bulk-${user.id}-${Date.now()}.zip`
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('bulk-zips')
        .upload(zipName, zipBuffer, { contentType: 'application/zip', upsert: true })

      if (uploadError || !uploadData) {
        send({ error: 'Failed to create ZIP' })
        controller.close()
        return
      }

      const { data: { publicUrl } } = supabase.storage.from('bulk-zips').getPublicUrl(zipName)
      send({ downloadUrl: publicUrl, progress: rows.length, total: rows.length })
      controller.close()
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
}
