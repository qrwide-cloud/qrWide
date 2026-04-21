import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Bulk QR Code Generator for Events | QRWide',
  description: '500 QR codes in 60 seconds. Upload a CSV, download a ZIP. Perfect for conferences, expos, and events. Free for up to 10 at once.',
  keywords: ['bulk qr code generator', 'event qr codes', 'conference qr code'],
  alternates: { canonical: 'https://qrwide.com/use-cases/events' },
}

export default function EventsPage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="text-5xl mb-4">🎪</div>
          <h1 className="text-4xl font-bold text-[var(--text-primary)] md:text-5xl">
            500 QR codes in 60 seconds
          </h1>
          <p className="mt-6 text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
            Upload a CSV with booth names and URLs. Download a ZIP with a unique QR code for each row.
            Works for conferences, expos, trade fairs, and festivals.
          </p>
          <div className="mt-8">
            <Link href="/signup">
              <Button size="lg">Try bulk generator free →</Button>
            </Link>
          </div>
        </div>

        {/* Workflow */}
        <div className="rounded-[16px] border border-[var(--border)] bg-white dark:bg-[#141414] p-8 mb-16">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">The CSV → ZIP workflow</h2>
          <div className="space-y-6">
            {[
              { step: '1', title: 'Download CSV template', desc: 'name, destination_url, folder (optional). Fill it in with your booth data.' },
              { step: '2', title: 'Upload your CSV', desc: 'We validate all URLs and show you a preview before generating.' },
              { step: '3', title: 'Choose a style (optional)', desc: 'Apply your event colors and logo to all QR codes at once.' },
              { step: '4', title: 'Download your ZIP', desc: 'One PNG per row. Named by the "name" column. Ready to print.' },
            ].map((s) => (
              <div key={s.step} className="flex gap-4">
                <div className="h-8 w-8 rounded-full bg-[#0066FF] text-white font-bold text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                  {s.step}
                </div>
                <div>
                  <div className="font-medium text-[var(--text-primary)]">{s.title}</div>
                  <div className="text-sm text-[var(--text-secondary)] mt-0.5">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-16 text-center">
          {[
            { label: 'Free plan', value: 'Up to 10 QR codes' },
            { label: 'Pro plan', value: 'Up to 100 QR codes' },
            { label: 'Business plan', value: 'Up to 500 QR codes' },
          ].map((p) => (
            <div key={p.label} className="rounded-[12px] border border-[var(--border)] p-6">
              <div className="text-sm text-[var(--text-secondary)]">{p.label}</div>
              <div className="text-lg font-bold text-[var(--text-primary)] mt-1">{p.value}</div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/bulk">
            <Button size="lg">Open bulk generator →</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
