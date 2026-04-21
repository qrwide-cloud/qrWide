import Link from 'next/link'
import { QRMark } from './Navbar'

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:gap-16">

          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <QRMark size={28} />
              <span className="text-[15px] font-bold tracking-[-0.02em] text-[var(--text-primary)]">QRWide</span>
            </Link>
            <p className="mt-4 text-[13px] leading-relaxed text-[var(--text-secondary)] max-w-[200px]">
              The QR code platform for businesses that can&apos;t afford to print twice.
            </p>
            <p className="mt-6 text-[12px] text-[var(--text-tertiary)]">
              © 2025 QRWide. All rights reserved.
            </p>
          </div>

          {/* Product links */}
          <div>
            <h3 className="text-[12px] font-semibold uppercase tracking-widest text-[var(--text-tertiary)] mb-5">
              Product
            </h3>
            <ul className="space-y-3.5">
              {[
                { href: '/features', label: 'Features' },
                { href: '/pricing', label: 'Pricing' },
                { href: '/create', label: 'Create QR Code' },
                { href: '/signup?redirectTo=%2Fbulk', label: 'Bulk Generator' },
                { href: '/changelog', label: 'Changelog' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-[13px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Use cases */}
          <div>
            <h3 className="text-[12px] font-semibold uppercase tracking-widest text-[var(--text-tertiary)] mb-5">
              Use Cases
            </h3>
            <ul className="space-y-3.5">
              {[
                { href: '/use-cases/restaurants', label: 'Restaurants' },
                { href: '/use-cases/real-estate', label: 'Real Estate' },
                { href: '/use-cases/events', label: 'Events & Expos' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-[13px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-[12px] font-semibold uppercase tracking-widest text-[var(--text-tertiary)] mb-5">
              Company
            </h3>
            <ul className="space-y-3.5">
              {[
                { href: '/privacy', label: 'Privacy Policy' },
                { href: '/terms', label: 'Terms of Service' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-[13px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://twitter.com/qrwide"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  X / Twitter
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  )
}
