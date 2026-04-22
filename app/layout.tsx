import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { JetBrains_Mono } from 'next/font/google'
import { ToastProvider } from '@/components/ui/Toast'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'https://qrwide.com'),
  applicationName: 'QRWide',
  title: {
    default: 'QRWide — Free QR Code Generator with Analytics',
    template: '%s | QRWide',
  },
  description:
    'Create, track, and update QR codes in seconds. Free forever for the basics. Dynamic QR codes, real-time analytics, custom designs. No credit card required.',
  keywords: ['free qr code generator', 'dynamic qr code', 'qr code analytics', 'qr code for restaurant'],
  openGraph: {
    type: 'website',
    siteName: 'QRWide',
    title: 'QRWide — Free QR Code Generator with Analytics',
    description: 'Create, track, and update QR codes in seconds. Free forever for the basics.',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@qrwide',
    creator: '@qrwide',
  },
  robots: { index: true, follow: true },
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'QRWide',
  },
  formatDetection: { telephone: false },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0057FF" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var t = localStorage.getItem('theme');
                if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ToastProvider>
          {children}
        </ToastProvider>
        <Analytics />
      </body>
    </html>
  )
}
