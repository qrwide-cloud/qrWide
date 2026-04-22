import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{
        width: 180, height: 180,
        background: '#0057FF',
        borderRadius: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <svg width={124} height={124} viewBox="0 0 36 36" fill="none">
          {/* Top-left finder */}
          <rect x={1} y={1} width={14} height={14} rx={3} fill="white" />
          <rect x={4} y={4} width={8} height={8} rx={1.5} fill="#0057FF" />
          <rect x={6} y={6} width={4} height={4} fill="white" />
          {/* Top-right finder */}
          <rect x={21} y={1} width={14} height={14} rx={3} fill="white" />
          <rect x={24} y={4} width={8} height={8} rx={1.5} fill="#0057FF" />
          <rect x={26} y={6} width={4} height={4} fill="white" />
          {/* Bottom-left finder */}
          <rect x={1} y={21} width={14} height={14} rx={3} fill="white" />
          <rect x={4} y={24} width={8} height={8} rx={1.5} fill="#0057FF" />
          <rect x={6} y={26} width={4} height={4} fill="white" />
          {/* Bottom-right teal accent */}
          <rect x={21} y={21} width={6} height={6} rx={1.5} fill="#00C896" />
          <rect x={29} y={21} width={6} height={6} rx={1.5} fill="rgba(255,255,255,0.75)" />
          <rect x={21} y={29} width={6} height={6} rx={1.5} fill="rgba(255,255,255,0.75)" />
          <rect x={29} y={29} width={6} height={6} rx={1.5} fill="#00C896" />
        </svg>
      </div>
    ),
    { ...size }
  )
}
