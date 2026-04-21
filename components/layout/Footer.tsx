import Link from 'next/link'
import { QRMark } from './Navbar'

const FOOTER_LINKS = {
  product: [
    { href: '/features',                     label: 'Features' },
    { href: '/pricing',                      label: 'Pricing' },
    { href: '/create',                       label: 'Create QR Code' },
    { href: '/tools/bulk-qr-code-generator', label: 'Bulk Generator' },
    { href: '/features/qr-code-tracking',   label: 'QR Tracking' },
    { href: '/changelog',                    label: 'Changelog' },
  ],
  generators: [
    { href: '/qr-code-generator',            label: 'All Generators' },
    { href: '/qr-code-generator/wifi',       label: 'Wi-Fi QR Code' },
    { href: '/qr-code-generator/vcard',      label: 'vCard QR Code' },
    { href: '/qr-code-generator/dynamic',    label: 'Dynamic QR Code' },
    { href: '/qr-code-generator/whatsapp',   label: 'WhatsApp QR Code' },
    { href: '/qr-code-generator/instagram',  label: 'Instagram QR Code' },
  ],
  useCases: [
    { href: '/industries/restaurants',       label: 'Restaurants' },
    { href: '/industries/real-estate',       label: 'Real Estate' },
    { href: '/industries/weddings',          label: 'Weddings' },
    { href: '/use-cases/events',             label: 'Events & Expos' },
    { href: '/guides',                       label: 'Guides' },
    { href: '/compare',                      label: 'Compare' },
  ],
  company: [
    { href: '/privacy',                      label: 'Privacy Policy' },
    { href: '/terms',                        label: 'Terms of Service' },
    { href: 'https://twitter.com/qrwide',    label: 'X / Twitter', external: true },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5 lg:gap-12">

          {/* Brand column — spans 2 on mobile, 1 on md */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <QRMark size={28} />
              <span className="text-[15px] font-bold tracking-[-0.02em] text-[var(--text-primary)]">QRWide</span>
            </Link>
            <p className="mt-4 text-[12.5px] leading-relaxed text-[var(--text-secondary)] max-w-[200px]">
              The QR code platform for businesses that can&apos;t afford to print twice.
            </p>
            <p className="mt-5 text-[11.5px] text-[var(--text-tertiary)]">
              © {new Date().getFullYear()} QRWide. All rights reserved.
            </p>
          </div>

          {/* Product */}
          <FooterCol title="Product" links={FOOTER_LINKS.product} />

          {/* Generators */}
          <FooterCol title="Generators" links={FOOTER_LINKS.generators} />

          {/* Use Cases */}
          <FooterCol title="Use Cases" links={FOOTER_LINKS.useCases} />

          {/* Company */}
          <FooterCol title="Company" links={FOOTER_LINKS.company} />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--border)] bg-[var(--bg)]">
        <div className="mx-auto max-w-7xl px-5 py-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3">
          <p className="text-[12px] text-[var(--text-tertiary)]">
            Free QR code generator with analytics · No credit card required
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-[12px] text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-[12px] text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({
  title,
  links,
}: {
  title: string
  links: { href: string; label: string; external?: boolean }[]
}) {
  return (
    <div>
      <h3 className="mb-4 text-[11px] font-bold uppercase tracking-widest text-[var(--text-tertiary)]">
        {title}
      </h3>
      <ul className="space-y-3">
        {links.map(({ href, label, external }) => (
          <li key={href}>
            {external ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                {label}
              </a>
            ) : (
              <Link
                href={href}
                className="text-[13px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                {label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
