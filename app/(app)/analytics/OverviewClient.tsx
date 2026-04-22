'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { BarChart2, ArrowRight, TrendingUp } from 'lucide-react'
import { ScanChart } from '@/components/analytics/ScanChart'
import type { Database } from '@/lib/db/schema'

type QRCode = Database['public']['Tables']['qr_codes']['Row']

interface Scan {
  qr_id: string
  scanned_at: string
  country: string | null
  device_type: string | null
  os: string | null
  city: string | null
}

interface OverviewClientProps {
  qrCodes: QRCode[]
  scans: Scan[]
  plan: string
}

const COUNTRY_NAMES: Record<string, string> = {
  US: 'United States', GB: 'United Kingdom', IN: 'India', DE: 'Germany',
  FR: 'France', CA: 'Canada', AU: 'Australia', BR: 'Brazil', MX: 'Mexico',
  JP: 'Japan', SG: 'Singapore', AE: 'UAE', NL: 'Netherlands', ES: 'Spain',
}

function flag(code: string) {
  return code.toUpperCase().replace(/./g, (c) =>
    String.fromCodePoint(c.charCodeAt(0) + 127397)
  )
}

export function OverviewClient({ qrCodes, scans, plan }: OverviewClientProps) {
  const [range] = useState<'7d' | '30d' | '90d' | 'all'>('30d')

  const totalScans = qrCodes.reduce((s, q) => s + q.total_scans, 0)
  const totalUnique = qrCodes.reduce((s, q) => s + q.unique_scans, 0)
  const activeCodes = qrCodes.filter((q) => q.is_active).length
  const scansThisPeriod = scans.length

  const topCodes = [...qrCodes].sort((a, b) => b.total_scans - a.total_scans).slice(0, 5)

  const countryCounts = useMemo(() => {
    const map: Record<string, number> = {}
    scans.forEach((s) => { if (s.country) map[s.country] = (map[s.country] ?? 0) + 1 })
    return Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 8)
  }, [scans])

  const deviceCounts = useMemo(() => {
    const map: Record<string, number> = {}
    scans.forEach((s) => {
      const d = s.device_type ?? 'Unknown'
      map[d] = (map[d] ?? 0) + 1
    })
    return Object.entries(map).sort((a, b) => b[1] - a[1])
  }, [scans])

  const maxDevice = deviceCounts[0]?.[1] ?? 1
  const maxCountry = countryCounts[0]?.[1] ?? 1

  const DEVICE_COLORS: Record<string, string> = {
    mobile: '#0057FF', desktop: '#00C896', tablet: '#F59E0B'
  }

  return (
    <div className="mx-auto max-w-6xl p-4 md:p-8 space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">Analytics Overview</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-0.5">Last 30 days across all your QR codes</p>
        </div>
        <Link href="/dashboard"
          className="text-[13px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1">
          ← My Codes
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'All-time scans',      value: totalScans.toLocaleString(),         color: '#0057FF' },
          { label: 'Unique scans',         value: totalUnique.toLocaleString(),        color: '#00C896' },
          { label: 'Scans (last 30d)',     value: scansThisPeriod.toLocaleString(),    color: '#8B5CF6' },
          { label: 'Active codes',         value: `${activeCodes} / ${qrCodes.length}`, color: '#F59E0B' },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
            <div className="text-xs font-medium text-[var(--text-secondary)] mb-2">{s.label}</div>
            <div className="text-2xl font-bold tracking-tight" style={{ color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Scan chart */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp className="h-4 w-4 text-[#0057FF]" />
          <h2 className="text-[14px] font-semibold text-[var(--text-primary)]">Scans over time</h2>
          <span className="ml-auto text-[12px] text-[var(--text-tertiary)]">Last 30 days</span>
        </div>
        {scans.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[200px] text-[var(--text-tertiary)]">
            <BarChart2 className="h-8 w-8 mb-2 opacity-30" />
            <p className="text-[13px]">No scans in the last 30 days</p>
          </div>
        ) : (
          <ScanChart scans={scans as never} range={range} />
        )}
      </div>

      {/* Bottom grid: Top codes + Country + Device */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* Top codes */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="text-[14px] font-semibold text-[var(--text-primary)] mb-4">Top performing codes</h2>
          {topCodes.length === 0 ? (
            <p className="text-[13px] text-[var(--text-secondary)]">No codes yet. <Link href="/create" className="text-[#0057FF] hover:underline">Create one →</Link></p>
          ) : (
            <div className="space-y-3">
              {topCodes.map((qr, i) => {
                const pct = topCodes[0].total_scans > 0 ? (qr.total_scans / topCodes[0].total_scans) * 100 : 0
                return (
                  <div key={qr.id} className="flex items-center gap-3">
                    <span className="text-[12px] font-bold text-[var(--text-tertiary)] w-4 shrink-0">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <Link href={`/analytics/${qr.id}`}
                          className="text-[13px] font-medium text-[var(--text-primary)] hover:text-[#0057FF] truncate transition-colors">
                          {qr.name}
                        </Link>
                        <span className="text-[12px] font-semibold text-[var(--text-secondary)] ml-3 tabular-nums shrink-0">
                          {qr.total_scans.toLocaleString()}
                        </span>
                      </div>
                      <div className="h-1.5 bg-[var(--bg)] rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-[#0057FF] transition-all"
                          style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                    <Link href={`/analytics/${qr.id}`}
                      className="shrink-0 p-1.5 rounded-lg text-[var(--text-tertiary)] hover:text-[#0057FF] hover:bg-[#0057FF]/08 transition-colors">
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Country breakdown */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="text-[14px] font-semibold text-[var(--text-primary)] mb-1">Scans by country</h2>
          <p className="text-[12px] text-[var(--text-tertiary)] mb-4">Last 30 days</p>
          {plan === 'free' ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="text-3xl mb-3">🌍</div>
              <p className="text-[13px] font-medium text-[var(--text-primary)] mb-1">Country data is a Pro feature</p>
              <p className="text-[12px] text-[var(--text-secondary)] mb-4">See exactly where in the world your QR codes are being scanned.</p>
              <Link href="/pricing">
                <button className="rounded-lg bg-[#0057FF] px-4 py-2 text-[12px] font-semibold text-white hover:bg-[#0049E0] transition-colors">
                  Upgrade to Pro — $5/mo
                </button>
              </Link>
            </div>
          ) : countryCounts.length === 0 ? (
            <p className="text-[13px] text-[var(--text-secondary)]">No scans yet.</p>
          ) : (
            <div className="space-y-2.5">
              {countryCounts.map(([code, count]) => (
                <div key={code} className="flex items-center gap-3">
                  <span className="text-lg w-6 text-center shrink-0">{flag(code)}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[12px] text-[var(--text-secondary)] truncate">
                        {COUNTRY_NAMES[code] ?? code}
                      </span>
                      <span className="text-[12px] font-semibold text-[var(--text-primary)] ml-2 tabular-nums">{count}</span>
                    </div>
                    <div className="h-1.5 bg-[var(--bg)] rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-[#0057FF] to-[#00C896]"
                        style={{ width: `${(count / maxCountry) * 100}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Device breakdown */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <h2 className="text-[14px] font-semibold text-[var(--text-primary)] mb-4">Devices (last 30 days)</h2>
        {deviceCounts.length === 0 ? (
          <p className="text-[13px] text-[var(--text-secondary)]">No scan data yet.</p>
        ) : (
          <div className="flex flex-wrap gap-6">
            {deviceCounts.map(([device, count]) => {
              const pct = Math.round((count / scans.length) * 100)
              const color = DEVICE_COLORS[device] ?? '#8B5CF6'
              return (
                <div key={device} className="flex items-center gap-3 min-w-[140px]">
                  <div className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${color}18` }}>
                    <span style={{ color }} className="text-lg">
                      {device === 'mobile' ? '📱' : device === 'desktop' ? '💻' : '📟'}
                    </span>
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-[var(--text-primary)] capitalize">{device}</div>
                    <div className="text-[12px] text-[var(--text-tertiary)]">{count.toLocaleString()} scans · {pct}%</div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

    </div>
  )
}
