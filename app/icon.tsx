import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{
        width: 32, height: 32,
        background: '#0057FF',
        borderRadius: 7,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* 3-corner QR finder pattern — matches QRMark */}
        <svg width={22} height={22} viewBox="0 0 22 22" fill="none">
          {/* Top-left finder */}
          <rect x={0} y={0} width={9} height={9} rx={2} fill="white" />
          <rect x={2} y={2} width={5} height={5} rx={1} fill="#0057FF" />
          <rect x={3} y={3} width={3} height={3} fill="white" />
          {/* Top-right finder */}
          <rect x={13} y={0} width={9} height={9} rx={2} fill="white" />
          <rect x={15} y={2} width={5} height={5} rx={1} fill="#0057FF" />
          <rect x={16} y={3} width={3} height={3} fill="white" />
          {/* Bottom-left finder */}
          <rect x={0} y={13} width={9} height={9} rx={2} fill="white" />
          <rect x={2} y={15} width={5} height={5} rx={1} fill="#0057FF" />
          <rect x={3} y={16} width={3} height={3} fill="white" />
          {/* Bottom-right teal accent dots */}
          <rect x={13} y={13} width={4} height={4} rx={1} fill="#00C896" />
          <rect x={18} y={13} width={4} height={4} rx={1} fill="rgba(255,255,255,0.7)" />
          <rect x={13} y={18} width={4} height={4} rx={1} fill="rgba(255,255,255,0.7)" />
          <rect x={18} y={18} width={4} height={4} rx={1} fill="#00C896" />
        </svg>
      </div>
    ),
    { ...size }
  )
}
