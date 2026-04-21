import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: 'linear-gradient(135deg, #0057FF 0%, #0040CC 100%)',
          borderRadius: 7,
          display: 'flex',
          padding: 4,
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {/* Top row: two finder squares */}
        <div style={{ display: 'flex', gap: 2, flex: 1 }}>
          <div style={{ flex: 1, background: 'white', borderRadius: 2.5, opacity: 0.95 }} />
          <div style={{ flex: 1, background: 'white', borderRadius: 2.5, opacity: 0.95 }} />
        </div>
        {/* Bottom row: one finder square + teal accent */}
        <div style={{ display: 'flex', gap: 2, flex: 1 }}>
          <div style={{ flex: 1, background: 'white', borderRadius: 2.5, opacity: 0.95 }} />
          <div style={{ flex: 1, background: '#00C896', borderRadius: 2.5 }} />
        </div>
      </div>
    ),
    { ...size }
  )
}
