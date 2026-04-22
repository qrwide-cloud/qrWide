import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'QRWide',
    short_name: 'QRWide',
    description: 'Create, track, and update QR codes in seconds.',
    start_url: '/',
    display: 'standalone',
    background_color: '#070A14',
    theme_color: '#0057FF',
    icons: [
      { src: '/icon', sizes: '32x32', type: 'image/png' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  }
}
