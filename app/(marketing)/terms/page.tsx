import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | QRWide',
}

export default function TermsPage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">Terms of Service</h1>
        <p className="text-sm text-[var(--text-secondary)] mb-10">Last updated: April 20, 2025</p>

        {[
          { title: 'Acceptance', body: 'By using QRWide, you agree to these terms. If you don\'t agree, please don\'t use the service.' },
          { title: 'Acceptable use', body: 'Don\'t use QRWide for spam, phishing, malware distribution, or any illegal activity. QR codes pointing to harmful content will be terminated immediately and accounts banned.' },
          { title: 'Free tier', body: 'Free accounts include 3 dynamic QR codes and unlimited static QR codes. We reserve the right to modify free tier limits with 30 days notice.' },
          { title: 'Payments', body: 'Subscriptions are billed monthly or annually. Cancel anytime; no refunds for partial periods except within the first 14 days of any charge.' },
          { title: 'Service availability', body: 'We aim for 99.9% uptime. Scan redirects are the most critical part of our service and are engineered for maximum reliability. We are not liable for damages from downtime.' },
          { title: 'Termination', body: 'We may terminate accounts that violate these terms. You may delete your account at any time from Settings.' },
          { title: 'Contact', body: 'legal@qrwide.com' },
        ].map((section) => (
          <div key={section.title} className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">{section.title}</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">{section.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
