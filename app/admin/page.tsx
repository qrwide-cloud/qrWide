import { redirect } from 'next/navigation'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Admin | QRWide', robots: { index: false, follow: false } }
export const dynamic = 'force-dynamic'

const ADMIN_EMAILS = ['akhilchintu93@gmail.com', 'qrwide@gmail.com']

function flag(code: string) {
  return code.toUpperCase().replace(/./g, c =>
    String.fromCodePoint(c.charCodeAt(0) + 127397)
  )
}

function fmtNum(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return n.toString()
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

export default async function AdminPage() {
  const auth = createClient()
  const { data: { user } } = await auth.auth.getUser()
  if (!user || !ADMIN_EMAILS.includes(user.email ?? '')) redirect('/')

  const service = createServiceClient()

  const [
    { count: totalUsers },
    { count: totalQRCodes },
    { count: todayScans },
    { count: monthScans },
    { data: profiles },
    { data: qrRows },
    { data: countryRows },
  ] = await Promise.all([
    service.from('profiles').select('*', { count: 'exact', head: true }),
    service.from('qr_codes').select('*', { count: 'exact', head: true }),
    service.from('scan_events')
      .select('*', { count: 'exact', head: true })
      .gte('scanned_at', new Date(Date.now() - 86_400_000).toISOString()),
    service.from('scan_events')
      .select('*', { count: 'exact', head: true })
      .gte('scanned_at', new Date(new Date().setDate(1)).toISOString()),
    service.from('profiles')
      .select('email, name, plan, qr_count, created_at')
      .order('created_at', { ascending: false })
      .limit(15),
    service.from('qr_codes').select('type, total_scans, unique_scans, is_dynamic'),
    service.from('scan_events')
      .select('country')
      .not('country', 'is', null)
      .limit(100_000),
  ])

  const totalScans = (qrRows ?? []).reduce((s, r) => s + (r.total_scans ?? 0), 0)
  const totalUnique = (qrRows ?? []).reduce((s, r) => s + (r.unique_scans ?? 0), 0)
  const dynamicCount = (qrRows ?? []).filter(r => r.is_dynamic).length
  const staticCount = (qrRows ?? []).filter(r => !r.is_dynamic).length

  const planCounts = { free: 0, pro: 0, business: 0 }
  for (const p of profiles ?? []) {
    const plan = (p.plan ?? 'free') as keyof typeof planCounts
    if (plan in planCounts) planCounts[plan]++
  }

  const typeCounts: Record<string, number> = {}
  for (const r of qrRows ?? []) {
    typeCounts[r.type] = (typeCounts[r.type] ?? 0) + 1
  }
  const topTypes = Object.entries(typeCounts).sort((a, b) => b[1] - a[1]).slice(0, 8)

  const countryCounts: Record<string, number> = {}
  for (const r of countryRows ?? []) {
    if (r.country) countryCounts[r.country] = (countryCounts[r.country] ?? 0) + 1
  }
  const topCountries = Object.entries(countryCounts).sort((a, b) => b[1] - a[1]).slice(0, 15)
  const maxCountryScans = topCountries[0]?.[1] ?? 1

  const COUNTRY_NAMES: Record<string, string> = {
    US: 'United States', GB: 'United Kingdom', IN: 'India', DE: 'Germany',
    FR: 'France', CA: 'Canada', AU: 'Australia', BR: 'Brazil', MX: 'Mexico',
    JP: 'Japan', KR: 'South Korea', SG: 'Singapore', NL: 'Netherlands',
    ES: 'Spain', IT: 'Italy', PK: 'Pakistan', NG: 'Nigeria', ZA: 'South Africa',
    AE: 'UAE', ID: 'Indonesia', PH: 'Philippines', TH: 'Thailand', TR: 'Turkey',
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">Admin Dashboard</h1>
            <p className="text-sm text-[var(--text-secondary)] mt-0.5">QRWide platform overview · live data</p>
          </div>
          <span className="text-xs text-[var(--text-tertiary)] bg-[var(--surface)] border border-[var(--border)] rounded-lg px-3 py-1.5">
            {new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        {/* Primary stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Users', value: fmtNum(totalUsers ?? 0), sub: `${planCounts.pro + planCounts.business} paid`, color: '#0057FF' },
            { label: 'QR Codes', value: fmtNum(totalQRCodes ?? 0), sub: `${dynamicCount} dynamic · ${staticCount} static`, color: '#8B5CF6' },
            { label: 'All-time Scans', value: fmtNum(totalScans), sub: `${fmtNum(totalUnique)} unique`, color: '#00C896' },
            { label: 'Today\'s Scans', value: fmtNum(todayScans ?? 0), sub: `${fmtNum(monthScans ?? 0)} this month`, color: '#F59E0B' },
          ].map(s => (
            <div key={s.label} className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5">
              <div className="text-xs font-medium text-[var(--text-secondary)] mb-3">{s.label}</div>
              <div className="text-3xl font-bold tracking-tight" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs text-[var(--text-tertiary)] mt-1">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Plan breakdown + QR types */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* Plan breakdown */}
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6">
            <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Users by Plan</h2>
            <div className="space-y-3">
              {([
                { plan: 'free', label: 'Free', color: '#6B7280', pct: totalUsers ? (planCounts.free / totalUsers!) * 100 : 0 },
                { plan: 'pro', label: 'Pro', color: '#0057FF', pct: totalUsers ? (planCounts.pro / totalUsers!) * 100 : 0 },
                { plan: 'business', label: 'Business', color: '#00C896', pct: totalUsers ? (planCounts.business / totalUsers!) * 100 : 0 },
              ] as const).map(({ plan, label, color, pct }) => (
                <div key={plan}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-[var(--text-secondary)]">{label}</span>
                    <span className="text-sm font-semibold text-[var(--text-primary)]">{planCounts[plan]}</span>
                  </div>
                  <div className="h-2 bg-[var(--bg)] rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* QR type breakdown */}
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6">
            <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-4">QR Codes by Type</h2>
            <div className="space-y-2">
              {topTypes.map(([type, count]) => (
                <div key={type} className="flex items-center justify-between">
                  <span className="text-sm text-[var(--text-secondary)] capitalize">{type}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-1.5 bg-[var(--bg)] rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-[#0057FF]"
                        style={{ width: `${(count / (topTypes[0][1] || 1)) * 100}%` }} />
                    </div>
                    <span className="text-sm font-medium text-[var(--text-primary)] w-8 text-right">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top countries */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6">
          <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-1">Scans by Country</h2>
          <p className="text-xs text-[var(--text-tertiary)] mb-5">Where your QR codes are being scanned</p>
          {topCountries.length === 0 ? (
            <p className="text-sm text-[var(--text-secondary)]">No scan data yet.</p>
          ) : (
            <div className="space-y-3">
              {topCountries.map(([code, count]) => {
                const pct = Math.round((count / maxCountryScans) * 100)
                const name = COUNTRY_NAMES[code] ?? code
                return (
                  <div key={code} className="flex items-center gap-4">
                    <span className="text-xl w-8 text-center">{flag(code)}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-[var(--text-secondary)] truncate">{name}</span>
                        <span className="text-sm font-semibold text-[var(--text-primary)] ml-4 tabular-nums">{fmtNum(count)}</span>
                      </div>
                      <div className="h-1.5 bg-[var(--bg)] rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-[#0057FF] to-[#00C896] transition-all"
                          style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Recent signups */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6">
          <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-5">Recent Signups</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-[var(--text-tertiary)] border-b border-[var(--border)]">
                  <th className="pb-2 font-medium">Email</th>
                  <th className="pb-2 font-medium">Plan</th>
                  <th className="pb-2 font-medium text-right">QR Codes</th>
                  <th className="pb-2 font-medium text-right">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {(profiles ?? []).map(p => (
                  <tr key={p.email} className="hover:bg-[var(--bg)] transition-colors">
                    <td className="py-2.5 text-[var(--text-primary)] font-medium">{p.email}</td>
                    <td className="py-2.5">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                        p.plan === 'business' ? 'bg-[#00C896]/10 text-[#00C896]' :
                        p.plan === 'pro' ? 'bg-[#0057FF]/10 text-[#0057FF]' :
                        'bg-[var(--bg)] text-[var(--text-secondary)]'
                      }`}>
                        {p.plan ?? 'free'}
                      </span>
                    </td>
                    <td className="py-2.5 text-right text-[var(--text-secondary)]">{p.qr_count ?? 0}</td>
                    <td className="py-2.5 text-right text-[var(--text-tertiary)]">
                      {p.created_at ? timeAgo(p.created_at) : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}
