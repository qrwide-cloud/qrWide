import Link from 'next/link'
import { QRPreview } from '@/components/qr/QRPreview'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[var(--bg)]">
      <div className="max-w-md text-center">
        <h1 className="text-8xl font-bold text-[#0066FF] mb-4">404</h1>
        <p className="text-xl font-semibold text-[var(--text-primary)] mb-2">Page not found</p>
        <p className="text-[var(--text-secondary)] mb-8">
          The page you're looking for doesn't exist. Here's a QR code that does:
        </p>
        <div className="flex justify-center mb-8">
          <QRPreview content="https://qrwide.com" size={180} />
        </div>
        <p className="text-xs text-[var(--text-secondary)] mb-4">Scan to go to qrwide.com</p>
        <Link href="/" className="text-[#0066FF] hover:underline font-medium">
          Or click here to go home →
        </Link>
      </div>
    </div>
  )
}
