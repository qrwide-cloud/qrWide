import Link from 'next/link'

export default function PausedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[var(--bg)]">
      <div className="max-w-md text-center">
        <div className="text-6xl mb-4">⏸️</div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
          This QR code is currently paused
        </h1>
        <p className="text-[var(--text-secondary)] mb-8">
          The owner of this QR code has temporarily paused it. Please check back later or
          contact them directly.
        </p>
        <Link
          href="/"
          className="text-sm text-[#0066FF] hover:underline font-medium"
        >
          Create your own QR codes at QRWide →
        </Link>
      </div>
    </div>
  )
}
