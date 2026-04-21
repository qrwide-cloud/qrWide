import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="font-bold text-[#0066FF] text-lg">QRWide</Link>
            <p className="mt-2 text-sm text-[var(--text-secondary)] max-w-xs">
              The QR code platform built for real businesses. Create, track, and update in seconds.
            </p>
            <p className="mt-4 text-xs text-[var(--text-secondary)]">© 2025 QRWide. All rights reserved.</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">Product</h3>
            <ul className="mt-4 space-y-3 text-sm text-[var(--text-secondary)]">
              <li><Link href="/features" className="hover:text-[var(--text-primary)] transition-colors">Features</Link></li>
              <li><Link href="/pricing" className="hover:text-[var(--text-primary)] transition-colors">Pricing</Link></li>
              <li><Link href="/create" className="hover:text-[var(--text-primary)] transition-colors">Create QR Code</Link></li>
              <li><Link href="/bulk" className="hover:text-[var(--text-primary)] transition-colors">Bulk Generator</Link></li>
              <li><Link href="/changelog" className="hover:text-[var(--text-primary)] transition-colors">Changelog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">Use Cases</h3>
            <ul className="mt-4 space-y-3 text-sm text-[var(--text-secondary)]">
              <li><Link href="/use-cases/restaurants" className="hover:text-[var(--text-primary)] transition-colors">Restaurants</Link></li>
              <li><Link href="/use-cases/real-estate" className="hover:text-[var(--text-primary)] transition-colors">Real Estate</Link></li>
              <li><Link href="/use-cases/events" className="hover:text-[var(--text-primary)] transition-colors">Events</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">Company</h3>
            <ul className="mt-4 space-y-3 text-sm text-[var(--text-secondary)]">
              <li><Link href="/privacy" className="hover:text-[var(--text-primary)] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[var(--text-primary)] transition-colors">Terms of Service</Link></li>
              <li>
                <a href="https://twitter.com/qrwide" target="_blank" rel="noopener noreferrer"
                   className="hover:text-[var(--text-primary)] transition-colors">
                  @qrwide
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
