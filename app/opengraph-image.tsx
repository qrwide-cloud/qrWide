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
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 40 }}>
          {/* W mark — 4 finder-pattern squares forming a W */}
          <div style={{
            width: 108, height: 74,
            background: 'linear-gradient(90deg, #0057FF 0%, #0099CC 50%, #00C896 100%)',
            borderRadius: 16,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg width={96} height={66} viewBox="0 0 44 30" fill="none">
              {/* A — top-left peak */}
              <rect x="1"  y="1"  width="9" height="9" rx="2.5" fill="white" />
              <rect x="3.25" y="3.25" width="4.5" height="4.5" rx="1.2" fill="rgba(0,87,255,0.65)" />
              {/* B — lower-left valley */}
              <rect x="12" y="16" width="9" height="9" rx="2.5" fill="white" />
              <rect x="14.25" y="18.25" width="4.5" height="4.5" rx="1.2" fill="rgba(255,255,255,0.4)" />
              {/* C — lower-right valley */}
              <rect x="23" y="16" width="9" height="9" rx="2.5" fill="white" />
              <rect x="25.25" y="18.25" width="4.5" height="4.5" rx="1.2" fill="rgba(255,255,255,0.4)" />
              {/* D — top-right peak */}
              <rect x="34" y="1"  width="9" height="9" rx="2.5" fill="white" />
              <rect x="36.25" y="3.25" width="4.5" height="4.5" rx="1.2" fill="rgba(0,200,150,0.65)" />
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
