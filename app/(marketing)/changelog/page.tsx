import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Changelog | QRWide',
}

const ENTRIES = [
  {
    date: 'April 20, 2025',
    version: 'v1.0.0',
    tag: 'Initial Build',
    items: [
      'Core QR creation flow with dynamic QR codes, analytics, and custom styling.',
      'Free tier with 3 dynamic QR codes plus public QR creation and downloads.',
      'Pro plan with full analytics, more QR types, PDF downloads, and higher limits.',
      'Business plan with all QR types, CSV exports, and the highest usage limits.',
      'Bulk QR code generator with CSV upload and ZIP download.',
      'Google OAuth plus email/password authentication.',
      'Theme support and account settings.',
    ],
  },
]

export default function ChangelogPage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">Changelog</h1>
        <p className="text-[var(--text-secondary)] mb-12">What&apos;s new in QRWide</p>

        <div className="space-y-12">
          {ENTRIES.map((entry) => (
            <div key={entry.version} className="flex gap-8">
              <div className="flex-shrink-0 w-32 text-right hidden sm:block">
                <div className="text-sm font-mono text-[var(--text-secondary)]">{entry.date}</div>
                <div className="text-xs font-bold text-[#0066FF] mt-1">{entry.version}</div>
              </div>
              <div className="flex-1">
                <div className="sm:hidden mb-2">
                  <span className="text-xs font-mono text-[var(--text-secondary)]">{entry.date}</span>
                  <span className="ml-2 text-xs font-bold text-[#0066FF]">{entry.version}</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg font-bold text-[var(--text-primary)]">{entry.tag}</span>
                  <span className="text-xs bg-[#0066FF]/10 text-[#0066FF] font-medium px-2 py-0.5 rounded-[4px]">
                    {entry.version}
                  </span>
                </div>
                <ul className="space-y-2">
                  {entry.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <span className="text-[#10B981] mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
