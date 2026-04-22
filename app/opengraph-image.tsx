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
          background: '#070A14',
          display: 'flex',
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Blue glow top-left */}
        <div style={{
          position: 'absolute', top: -80, left: -40,
          width: 700, height: 500,
          background: 'radial-gradient(ellipse, rgba(0,87,255,0.22) 0%, transparent 65%)',
        }} />
        {/* Teal glow bottom-right */}
        <div style={{
          position: 'absolute', bottom: -60, right: 300,
          width: 500, height: 400,
          background: 'radial-gradient(ellipse, rgba(0,200,150,0.12) 0%, transparent 65%)',
        }} />

        {/* ── LEFT: Brand + copy ── */}
        <div style={{
          flex: 1,
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: '64px 40px 64px 80px',
          position: 'relative',
        }}>

          {/* Wordmark */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 44 }}>
            {/* QR mark */}
            <div style={{
              width: 56, height: 56,
              background: 'linear-gradient(135deg, #0057FF 0%, #003FCC 100%)',
              borderRadius: 15,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <svg width={38} height={38} viewBox="0 0 36 36" fill="none">
                <rect x={1} y={1} width={14} height={14} rx={3} fill="white" />
                <rect x={4} y={4} width={8} height={8} rx={1.5} fill="rgba(0,87,255,0.65)" />
                <rect x={21} y={1} width={14} height={14} rx={3} fill="white" />
                <rect x={24} y={4} width={8} height={8} rx={1.5} fill="rgba(0,87,255,0.65)" />
                <rect x={1} y={21} width={14} height={14} rx={3} fill="white" />
                <rect x={4} y={24} width={8} height={8} rx={1.5} fill="rgba(0,87,255,0.65)" />
                <rect x={21} y={21} width={6} height={6} rx={1.5} fill="rgba(0,200,150,0.8)" />
                <rect x={29} y={21} width={6} height={6} rx={1.5} fill="rgba(255,255,255,0.85)" />
                <rect x={21} y={29} width={6} height={6} rx={1.5} fill="rgba(255,255,255,0.85)" />
                <rect x={29} y={29} width={6} height={6} rx={1.5} fill="rgba(0,200,150,0.8)" />
              </svg>
            </div>
            <span style={{
              fontSize: 38, fontWeight: 800, color: 'white',
              letterSpacing: '-0.025em',
            }}>
              QRWide
            </span>
          </div>

          {/* Headline */}
          <div style={{
            fontSize: 62, fontWeight: 900, letterSpacing: '-0.04em',
            lineHeight: 1.06, color: 'white',
            marginBottom: 22,
          }}>
            QR codes that
            <br />
            <span style={{
              background: 'linear-gradient(90deg, #60a5fa 0%, #34d399 100%)',
              backgroundClip: 'text',
              color: 'transparent',
            }}>
              work as hard
            </span>
            <br />
            as you do.
          </div>

          {/* Subtext */}
          <div style={{
            fontSize: 20, color: 'rgba(255,255,255,0.45)',
            marginBottom: 44, letterSpacing: '-0.01em',
          }}>
            Dynamic QR codes · Real-time analytics · Free to start
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 36 }}>
            {[
              { val: '40K+',  label: 'businesses' },
              { val: '5M+',   label: 'scans tracked' },
              { val: '<200ms', label: 'redirect speed' },
            ].map((s) => (
              <div key={s.val} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <span style={{ fontSize: 26, fontWeight: 800, color: '#60a5fa', letterSpacing: '-0.02em' }}>
                  {s.val}
                </span>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Product card ── */}
        <div style={{
          width: 360,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '64px 72px 64px 16px',
        }}>
          <div style={{
            width: '100%',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.09)',
            borderRadius: 24,
            padding: '24px 24px 20px',
            display: 'flex', flexDirection: 'column', gap: 16,
          }}>

            {/* Card header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.65)', letterSpacing: '-0.01em' }}>
                restaurant-menu
              </span>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 5,
                background: 'rgba(0,200,150,0.12)',
                border: '1px solid rgba(0,200,150,0.2)',
                borderRadius: 100, padding: '3px 10px',
              }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#00C896' }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: '#00C896' }}>Live</span>
              </div>
            </div>

            {/* QR code */}
            <div style={{
              background: 'white', borderRadius: 14, padding: 16,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
            }}>
              <svg width={160} height={160} viewBox="0 0 29 29" fill="none">
                {/* TL finder */}
                <rect x={0} y={0} width={7} height={7} rx={1.2} fill="#0a0f1e" />
                <rect x={1} y={1} width={5} height={5} fill="white" />
                <rect x={2} y={2} width={3} height={3} rx={0.5} fill="#0a0f1e" />
                {/* TR finder */}
                <rect x={22} y={0} width={7} height={7} rx={1.2} fill="#0a0f1e" />
                <rect x={23} y={1} width={5} height={5} fill="white" />
                <rect x={24} y={2} width={3} height={3} rx={0.5} fill="#0a0f1e" />
                {/* BL finder */}
                <rect x={0} y={22} width={7} height={7} rx={1.2} fill="#0a0f1e" />
                <rect x={1} y={23} width={5} height={5} fill="white" />
                <rect x={2} y={24} width={3} height={3} rx={0.5} fill="#0a0f1e" />
                {/* Data modules */}
                <rect x={9}  y={0}  width={1} height={1} fill="#0a0f1e" />
                <rect x={11} y={0}  width={2} height={1} fill="#0a0f1e" />
                <rect x={14} y={0}  width={1} height={1} fill="#0a0f1e" />
                <rect x={10} y={2}  width={1} height={1} fill="#0a0f1e" />
                <rect x={13} y={2}  width={2} height={1} fill="#0a0f1e" />
                <rect x={9}  y={4}  width={2} height={1} fill="#0a0f1e" />
                <rect x={13} y={4}  width={1} height={1} fill="#0a0f1e" />
                <rect x={9}  y={6}  width={1} height={1} fill="#0a0f1e" />
                <rect x={12} y={6}  width={2} height={1} fill="#0a0f1e" />
                <rect x={0}  y={9}  width={2} height={1} fill="#0a0f1e" />
                <rect x={4}  y={9}  width={2} height={1} fill="#0a0f1e" />
                <rect x={9}  y={9}  width={3} height={1} fill="#0a0f1e" />
                <rect x={14} y={9}  width={2} height={1} fill="#0a0f1e" />
                <rect x={18} y={9}  width={3} height={1} fill="#0a0f1e" />
                <rect x={23} y={9}  width={1} height={1} fill="#0a0f1e" />
                <rect x={26} y={9}  width={2} height={1} fill="#0a0f1e" />
                <rect x={1}  y={11} width={3} height={1} fill="#0a0f1e" />
                <rect x={6}  y={11} width={1} height={1} fill="#0a0f1e" />
                <rect x={10} y={11} width={2} height={1} fill="#0a0f1e" />
                <rect x={14} y={11} width={3} height={1} fill="#0a0f1e" />
                <rect x={19} y={11} width={2} height={1} fill="#0a0f1e" />
                <rect x={24} y={11} width={3} height={1} fill="#0a0f1e" />
                <rect x={0}  y={13} width={1} height={1} fill="#0a0f1e" />
                <rect x={3}  y={13} width={2} height={1} fill="#0a0f1e" />
                <rect x={7}  y={13} width={1} height={1} fill="#0a0f1e" />
                <rect x={9}  y={13} width={2} height={1} fill="#0a0f1e" />
                <rect x={13} y={13} width={3} height={1} fill="#0a0f1e" />
                <rect x={18} y={13} width={1} height={1} fill="#0a0f1e" />
                <rect x={21} y={13} width={2} height={1} fill="#0a0f1e" />
                <rect x={25} y={13} width={3} height={1} fill="#0a0f1e" />
                <rect x={9}  y={16} width={2} height={1} fill="#0a0f1e" />
                <rect x={13} y={16} width={1} height={1} fill="#0a0f1e" />
                <rect x={16} y={16} width={2} height={1} fill="#0a0f1e" />
                <rect x={20} y={16} width={3} height={1} fill="#0a0f1e" />
                <rect x={25} y={16} width={2} height={1} fill="#0a0f1e" />
                <rect x={9}  y={18} width={1} height={1} fill="#0a0f1e" />
                <rect x={12} y={18} width={3} height={1} fill="#0a0f1e" />
                <rect x={17} y={18} width={2} height={1} fill="#0a0f1e" />
                <rect x={21} y={18} width={1} height={1} fill="#0a0f1e" />
                <rect x={24} y={18} width={3} height={1} fill="#0a0f1e" />
                <rect x={9}  y={20} width={2} height={1} fill="#0a0f1e" />
                <rect x={13} y={20} width={1} height={1} fill="#0a0f1e" />
                <rect x={16} y={20} width={3} height={1} fill="#0a0f1e" />
                <rect x={22} y={20} width={2} height={1} fill="#0a0f1e" />
                <rect x={9}  y={22} width={3} height={1} fill="#0a0f1e" />
                <rect x={14} y={22} width={2} height={1} fill="#0a0f1e" />
                <rect x={18} y={22} width={1} height={1} fill="#0a0f1e" />
                <rect x={9}  y={24} width={1} height={1} fill="#0a0f1e" />
                <rect x={12} y={24} width={2} height={1} fill="#0a0f1e" />
                <rect x={16} y={24} width={1} height={1} fill="#0a0f1e" />
                <rect x={19} y={24} width={2} height={1} fill="#0a0f1e" />
                <rect x={9}  y={26} width={2} height={1} fill="#0a0f1e" />
                <rect x={13} y={26} width={3} height={1} fill="#0a0f1e" />
                <rect x={18} y={26} width={2} height={1} fill="#0a0f1e" />
                <rect x={22} y={26} width={1} height={1} fill="#0a0f1e" />
                <rect x={25} y={26} width={2} height={1} fill="#0a0f1e" />
                <rect x={9}  y={28} width={1} height={1} fill="#0a0f1e" />
                <rect x={11} y={28} width={2} height={1} fill="#0a0f1e" />
                <rect x={15} y={28} width={1} height={1} fill="#0a0f1e" />
                <rect x={18} y={28} width={3} height={1} fill="#0a0f1e" />
                <rect x={23} y={28} width={2} height={1} fill="#0a0f1e" />
                <rect x={27} y={28} width={1} height={1} fill="#0a0f1e" />
                {/* Center logo badge */}
                <rect x={11} y={11} width={7} height={7} rx={1.5} fill="white" />
                <rect x={12} y={12} width={5} height={5} rx={1} fill="#0057FF" />
              </svg>
            </div>

            {/* Scan stats + mini chart */}
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ fontSize: 28, fontWeight: 800, color: 'white', letterSpacing: '-0.025em' }}>
                  247
                </span>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>
                  scans today
                </span>
              </div>
              {/* Mini bar chart */}
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 36 }}>
                {[18, 32, 24, 45, 38, 56, 62].map((h, i) => (
                  <div key={i} style={{
                    width: 9, height: h * 0.56,
                    background: i === 6
                      ? 'linear-gradient(180deg, #0057FF, #003FCC)'
                      : 'rgba(0,87,255,0.25)',
                    borderRadius: 3,
                  }} />
                ))}
              </div>
            </div>

            {/* Update badge */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'rgba(0,87,255,0.08)',
              border: '1px solid rgba(0,87,255,0.15)',
              borderRadius: 10, padding: '8px 12px',
            }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#0057FF' }} />
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>
                Dynamic · Update destination anytime
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
