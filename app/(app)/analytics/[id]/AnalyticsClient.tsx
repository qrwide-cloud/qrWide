'use client'

import { useState } from 'react'
import { useToast } from '@/components/ui/Toast'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { ScanChart } from '@/components/analytics/ScanChart'
import { DeviceBreakdown } from '@/components/analytics/DeviceBreakdown'
import type { Database } from '@/lib/db/schema'

type QRCode = Database['public']['Tables']['qr_codes']['Row']
type ScanEvent = Database['public']['Tables']['scan_events']['Row']

interface AnalyticsClientProps {
  qr: QRCode
  initialScans: ScanEvent[]
  plan: string
}

const RANGES = ['7d', '30d', '90d', 'all'] as const
type Range = typeof RANGES[number]

export function AnalyticsClient({ qr, initialScans, plan }: AnalyticsClientProps) {
  const [range, setRange] = useState<Range>('30d')
  const [scans, setScans] = useState<ScanEvent[]>(initialScans)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://qrwide.com'

  async function fetchScans(r: Range) {
    if (r === range) return
    setRange(r)
    setLoading(true)
    try {
      const res = await fetch(`/api/analytics/${qr.id}?range=${r}`)
      if (res.ok) {
        const data = await res.json()
        setScans(data.scans)
      }
    } finally {
      setLoading(false)
    }
  }

  async function copyShortlink() {
    await navigator.clipboard.writeText(`${appUrl}/s/${qr.shortcode}`)
    toast('Copied!')
  }

  async function exportCSV() {
    const rows = [
      ['Date', 'City', 'Country', 'Device', 'OS', 'Browser'].join(','),
      ...scans.map((s) =>
        [s.scanned_at, s.city ?? '', s.country ?? '', s.device_type ?? '', s.os ?? '', s.browser ?? ''].join(',')
      ),
    ].join('\n')
    const blob = new Blob([rows], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${qr.name}-scans.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  // Aggregate stats
  const uniqueIps = new Set(scans.map((s) => s.ip_hash).filter(Boolean)).size
  const oldestScan = scans[scans.length - 1]?.scanned_at
  const days = range === 'all'
    ? Math.max(
        1,
        oldestScan ? Math.ceil((Date.now() - new Date(oldestScan).getTime()) / 86400000) : 1
      )
    : parseInt(range)
  const dailyAvg = scans.length > 0 ? (scans.length / days).toFixed(1) : '0'
  const lastScanned = scans[0]?.scanned_at ? new Date(scans[0].scanned_at).toLocaleDateString() : 'Never'

  // Country aggregation
  const countryMap: Record<string, number> = {}
  scans.forEach((s) => {
    if (s.country) countryMap[s.country] = (countryMap[s.country] ?? 0) + 1
  })
  const topCountries = Object.entries(countryMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">{qr.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <a
              href={qr.destination}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--text-secondary)] hover:text-[#0066FF] truncate max-w-xs"
            >
              {qr.destination}
            </a>
            <Badge variant={qr.is_active ? 'success' : 'default'}>
              {qr.is_active ? 'Active' : 'Paused'}
            </Badge>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <code className="font-mono text-xs bg-[var(--surface)] border border-[var(--border)] rounded px-2 py-1 text-[var(--text-secondary)]">
              {appUrl}/s/{qr.shortcode}
            </code>
            <button onClick={copyShortlink} className="text-xs text-[#0066FF] hover:underline">Copy</button>
          </div>
        </div>
        <div className="flex gap-2">
          <a href={`/share/${qr.shortcode}`}>
            <Button variant="secondary" size="sm">
              Share page
            </Button>
          </a>
          {plan !== 'free' && (
            <Button variant="secondary" size="sm" onClick={exportCSV}>
              Export CSV
            </Button>
          )}
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mb-8">
        {[
          { label: 'Total scans', value: qr.total_scans.toLocaleString() },
          { label: 'Unique scans', value: uniqueIps.toLocaleString() },
          { label: 'Daily average', value: dailyAvg },
          { label: 'Last scanned', value: lastScanned },
        ].map((s) => (
          <Card key={s.label} className="p-4">
            <div className="text-xs text-[var(--text-secondary)]">{s.label}</div>
            <div className="text-2xl font-bold text-[var(--text-primary)] mt-1">{s.value}</div>
          </Card>
        ))}
      </div>

      {/* Range selector */}
      <div className="flex gap-1 mb-6">
        {RANGES.map((r) => (
          <button
            key={r}
            onClick={() => fetchScans(r)}
            className={[
              'px-3 py-1.5 text-sm rounded-[8px] font-medium transition-all',
              range === r
                ? 'bg-[#0066FF] text-white'
                : 'text-[var(--text-secondary)] hover:bg-[var(--surface)]',
            ].join(' ')}
          >
            {r === 'all' ? 'All time' : r}
          </button>
        ))}
      </div>

      {plan === 'free' ? (
        <Card className="p-8 text-center border-dashed">
          <div className="text-3xl mb-3">📊</div>
          <h3 className="font-semibold text-[var(--text-primary)]">Full Analytics on Pro</h3>
          <p className="text-sm text-[var(--text-secondary)] mt-2 mb-4">
            Upgrade to see scan charts, geographic data, device breakdowns, and hourly patterns.
          </p>
          <div className="text-2xl font-bold text-[var(--text-primary)] mb-1">{qr.total_scans}</div>
          <div className="text-sm text-[var(--text-secondary)] mb-4">total scans</div>
          <a href="/pricing">
            <Button>Upgrade to Pro — $5/mo</Button>
          </a>
        </Card>
      ) : (
        <div className="space-y-6">
          {scans.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="text-4xl mb-3">📡</div>
              <h3 className="font-semibold text-[var(--text-primary)]">No scans yet</h3>
              <p className="text-sm text-[var(--text-secondary)] mt-2 mb-4">
                Share your QR code to start seeing scan data here
              </p>
              <button onClick={copyShortlink} className="text-sm text-[#0066FF] hover:underline">
                Copy shortlink to share →
              </button>
            </Card>
          ) : (
            <>
              <Card className="p-6">
                <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Scans over time</h2>
                <ScanChart scans={scans} range={range} />
              </Card>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Card className="p-6">
                  <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Device breakdown</h2>
                  <DeviceBreakdown scans={scans} />
                </Card>

                <Card className="p-6">
                  <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Top countries</h2>
                  <div className="space-y-2">
                    {topCountries.length === 0 ? (
                      <p className="text-sm text-[var(--text-secondary)]">No country data available</p>
                    ) : topCountries.map(([country, count]) => (
                      <div key={country} className="flex items-center gap-3">
                        <div className="flex-1 text-sm text-[var(--text-primary)]">{country}</div>
                        <div className="text-sm font-medium text-[var(--text-primary)]">{count}</div>
                        <div className="w-24 h-2 bg-[var(--surface)] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#0066FF] rounded-full"
                            style={{ width: `${(count / (topCountries[0]?.[1] ?? 1)) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Recent scans table */}
              <Card className="p-6">
                <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Recent scans</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[var(--border)] text-left">
                        {['Time', 'City', 'Country', 'Device', 'OS'].map((h) => (
                          <th key={h} className="pb-2 pr-4 text-xs font-medium text-[var(--text-secondary)]">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {scans.slice(0, 50).map((s) => (
                        <tr key={s.id} className="border-b border-[var(--border)] last:border-0">
                          <td className="py-2 pr-4 text-xs text-[var(--text-secondary)] font-mono whitespace-nowrap">
                            {new Date(s.scanned_at).toLocaleString()}
                          </td>
                          <td className="py-2 pr-4 text-xs">{s.city ?? '—'}</td>
                          <td className="py-2 pr-4 text-xs">{s.country ?? '—'}</td>
                          <td className="py-2 pr-4 text-xs capitalize">{s.device_type ?? '—'}</td>
                          <td className="py-2 pr-4 text-xs">{s.os ?? '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </>
          )}
        </div>
      )}
    </div>
  )
}
