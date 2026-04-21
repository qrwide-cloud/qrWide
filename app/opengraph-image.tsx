import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%',
          background: '#08090c',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative', overflow: 'hidden',
        }}
      >
        {/* Blue radial glow */}
        <div style={{
          position: 'absolute', top: '-20%', left: '50%',
          transform: 'translateX(-50%)',
          width: 900, height: 500,
          background: 'radial-gradient(ellipse, rgba(0,87,255,0.28) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />
        {/* Teal accent glow bottom-right */}
        <div style={{
          position: 'absolute', bottom: '-10%', right: '-5%',
          width: 500, height: 400,
          background: 'radial-gradient(ellipse, rgba(0,200,150,0.15) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />

        {/* Logo + wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 40 }}>
          {/* QR mark — finder patterns */}
          <div style={{
            width: 72, height: 72,
            background: 'linear-gradient(135deg, #0057FF 0%, #003FCC 100%)',
            borderRadius: '30%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg width={52} height={52} viewBox="0 0 52 52" fill="none">
              {/* top-left finder */}
              <rect x={4} y={4} width={20} height={20} rx={4} fill="white" />
              <rect x={9} y={9} width={10} height={10} rx={2} fill="#0057FF" />
              {/* top-right finder */}
              <rect x={28} y={4} width={20} height={20} rx={4} fill="white" />
              <rect x={33} y={9} width={10} height={10} rx={2} fill="#0057FF" />
              {/* bottom-left finder */}
              <rect x={4} y={28} width={20} height={20} rx={4} fill="white" />
              <rect x={9} y={33} width={10} height={10} rx={2} fill="#0057FF" />
              {/* bottom-right data dots */}
              <rect x={28} y={28} width={9} height={9} rx={2} fill="white" opacity="0.9" />
              <rect x={39} y={28} width={9} height={9} rx={2} fill="#00C896" />
              <rect x={28} y={39} width={9} height={9} rx={2} fill="#00C896" />
              <rect x={39} y={39} width={9} height={9} rx={2} fill="white" opacity="0.9" />
            </svg>
          </div>
          <span style={{ fontSize: 52, fontWeight: 800, color: 'white', letterSpacing: '-0.03em' }}>
            QRWide
          </span>
        </div>

        {/* Headline */}
        <div style={{
          fontSize: 60, fontWeight: 900, color: 'white',
          textAlign: 'center', lineHeight: 1.1,
          letterSpacing: '-0.04em',
          margin: '0 80px',
        }}>
          Free QR Code Generator
          <br />
          <span style={{ color: '#60a5fa' }}>with Real-time Analytics</span>
        </div>

        {/* Subtext */}
        <div style={{
          marginTop: 24, fontSize: 24, color: 'rgba(255,255,255,0.55)',
          textAlign: 'center',
        }}>
          Dynamic QR codes · 15+ types · Free forever for the basics
        </div>

        {/* Chips */}
        <div style={{ display: 'flex', gap: 12, marginTop: 40 }}>
          {['No credit card', 'Codes never expire', 'Update anytime'].map((label) => (
            <div key={label} style={{
              padding: '8px 20px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 100,
              color: 'rgba(255,255,255,0.7)',
              fontSize: 18, fontWeight: 500,
            }}>
              {label}
            </div>
          ))}
        </div>

        {/* Bottom domain */}
        <div style={{
          position: 'absolute', bottom: 36,
          fontSize: 18, color: 'rgba(255,255,255,0.25)',
          letterSpacing: '0.05em',
        }}>
          qrwide.com
        </div>
      </div>
    ),
    { ...size },
  )
}
