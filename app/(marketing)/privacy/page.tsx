import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | QRWide',
  robots: { index: true, follow: true },
}

export default function PrivacyPage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">Privacy Policy</h1>
        <p className="text-sm text-[var(--text-secondary)] mb-10">Last updated: April 20, 2025</p>

        {[
          {
            title: 'What we collect',
            body: 'We collect your email address (for account creation), payment information (processed by Stripe — we never see your card number), and QR code scan data (IP address hash, device type, approximate location from IP, user agent). We do not sell your data to third parties.',
          },
          {
            title: 'Scan tracking',
            body: 'When someone scans your QR code, we record the approximate location (country/city from IP, not GPS), device type, browser, and a one-way hash of the IP address. The IP hash is used to count unique scans and is not reversible to the original IP. Raw IP addresses are never stored.',
          },
          {
            title: 'Cookies',
            body: 'We use cookies for authentication (Supabase session cookies) and analytics (page views). We do not use third-party advertising cookies.',
          },
          {
            title: 'Data retention',
            body: 'Account data is retained until you delete your account. Scan event data is retained for 2 years. You can export your data at any time from Settings > Export.',
          },
          {
            title: 'Your rights (GDPR)',
            body: 'If you are in the EU, you have the right to access, rectify, erase, and export your data. Contact privacy@qrwide.com with any requests. We respond within 30 days.',
          },
          {
            title: 'Contact',
            body: 'privacy@qrwide.com',
          },
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
