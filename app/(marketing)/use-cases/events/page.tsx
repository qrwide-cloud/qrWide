import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Bulk QR Code Generator for Events | QRWide',
  description: 'Generate event QR codes in bulk. Upload a CSV, validate your data, and download a ZIP of ready-to-print files.',
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
            Bulk QR code generation for events
          </h1>
          <p className="mt-6 text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
            Upload a CSV with names and destination URLs. Download a ZIP with one QR code per row for
            badges, booth cards, handouts, and on-site signage.
          </p>
          <div className="mt-8">
            <Link href="/signup?redirectTo=%2Fbulk">
              <Button size="lg">Try bulk generator free</Button>
            </Link>
          </div>
        </div>

        <div className="rounded-[16px] border border-[var(--border)] bg-white dark:bg-[#141414] p-8 mb-16">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">The CSV to ZIP workflow</h2>
          <div className="space-y-6">
            {[
              { step: '1', title: 'Download the CSV template', desc: 'Use name, destination_url, folder, and tags columns to structure the batch.' },
              { step: '2', title: 'Upload and validate', desc: 'QRWide checks the rows first so you can catch malformed URLs before generating.' },
              { step: '3', title: 'Generate the batch', desc: 'Each row becomes a dynamic QR code with its own shortlink and analytics page.' },
              { step: '4', title: 'Download the ZIP', desc: 'Grab the generated PNG files and move them straight into design or print workflows.' },
            ].map((step) => (
              <div key={step.step} className="flex gap-4">
                <div className="h-8 w-8 rounded-full bg-[#0066FF] text-white font-bold text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                  {step.step}
                </div>
                <div>
                  <div className="font-medium text-[var(--text-primary)]">{step.title}</div>
                  <div className="text-sm text-[var(--text-secondary)] mt-0.5">{step.desc}</div>
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
          ].map((plan) => (
            <div key={plan.label} className="rounded-[12px] border border-[var(--border)] p-6">
              <div className="text-sm text-[var(--text-secondary)]">{plan.label}</div>
              <div className="text-lg font-bold text-[var(--text-primary)] mt-1">{plan.value}</div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/signup?redirectTo=%2Fbulk">
            <Button size="lg">Open bulk generator</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
