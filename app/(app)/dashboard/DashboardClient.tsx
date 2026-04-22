'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { useToast } from '@/components/ui/Toast'
import { QRPreview } from '@/components/qr/QRPreview'
import { OnboardingBanner } from '@/components/dashboard/OnboardingBanner'
import type { Database, QRStyle } from '@/lib/db/schema'
import { getSavedQRContent } from '@/lib/qr/saved-content'
import { getPlanLimits } from '@/lib/plans'

type QRCode = Database['public']['Tables']['qr_codes']['Row']
type Profile = Database['public']['Tables']['profiles']['Row']
type Folder = Database['public']['Tables']['folders']['Row']

interface DashboardClientProps {
  profile: Profile | null
  initialQRCodes: QRCode[]
  folders: Folder[]
  showUpgradedBanner?: boolean
}

const TYPE_BADGE: Record<string, { label: string; variant: 'default' | 'blue' | 'success' | 'warning' }> = {
  url: { label: 'URL', variant: 'blue' },
  menu: { label: 'Menu', variant: 'success' },
  wifi: { label: 'WiFi', variant: 'warning' },
  vcard: { label: 'vCard', variant: 'default' },
  pdf: { label: 'PDF', variant: 'default' },
  instagram: { label: 'Instagram', variant: 'warning' },
  text: { label: 'Text', variant: 'default' },
}

export function DashboardClient({ profile, initialQRCodes, folders, showUpgradedBanner }: DashboardClientProps) {
  const [qrCodes, setQRCodes] = useState<QRCode[]>(initialQRCodes)
  const [search, setSearch] = useState('')
  const [folderFilter, setFolderFilter] = useState('')
  const [sort, setSort] = useState<'created' | 'scans' | 'name'>('created')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState('')
  const [togglingId, setTogglingId] = useState<string | null>(null)

  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    if (showUpgradedBanner) {
      toast(`Welcome to ${profile?.plan ?? 'Pro'}! All features are now unlocked.`)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const baseUrl =
    typeof window !== 'undefined'
      ? window.location.origin
      : process.env.NEXT_PUBLIC_APP_URL ?? 'https://qrwide.com'

  useEffect(() => {
    setQRCodes(initialQRCodes)
  }, [initialQRCodes])

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return

      if (e.key === 'n' || e.key === 'N') {
        router.push('/create')
      }
      if (e.key === '/') {
        e.preventDefault()
        document.getElementById('qr-search')?.focus()
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [router])

  useEffect(() => {
    let refreshTimeout: ReturnType<typeof setTimeout> | null = null

    function queueRefresh() {
      if (refreshTimeout) return

      refreshTimeout = setTimeout(() => {
        router.refresh()
        refreshTimeout = null
      }, 150)
    }

    function handleVisibilityChange() {
      if (document.visibilityState === 'visible') {
        queueRefresh()
      }
    }

    window.addEventListener('focus', queueRefresh)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('focus', queueRefresh)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      if (refreshTimeout) clearTimeout(refreshTimeout)
    }
  }, [router])

  const filtered = qrCodes
    .filter((qr) => {
      if (search && !qr.name.toLowerCase().includes(search.toLowerCase())) return false
      if (folderFilter && qr.folder !== folderFilter) return false
      return true
    })
    .sort((a, b) => {
      if (sort === 'scans') return b.total_scans - a.total_scans
      if (sort === 'name') return a.name.localeCompare(b.name)
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    })

  const recentIds = [...initialQRCodes]
    .sort((a, b) => new Date(b.updated_at ?? b.created_at).getTime() - new Date(a.updated_at ?? a.created_at).getTime())
    .slice(0, 3)
    .map((q) => q.id)

  async function toggleActive(qr: QRCode) {
    setTogglingId(qr.id)
    const res = await fetch(`/api/qr/${qr.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_active: !qr.is_active }),
    })

    if (res.ok) {
      setQRCodes((prev) => prev.map((q) => (q.id === qr.id ? { ...q, is_active: !q.is_active } : q)))
      toast(qr.is_active ? 'QR code paused' : 'QR code activated')
    } else {
      const body = await res.json().catch(() => ({ error: 'Failed to update QR code' }))
      toast(body.error ?? 'Failed to update QR code', 'error')
    }

    setTogglingId(null)
  }

  async function saveName(qr: QRCode) {
    const name = editingName.trim()
    if (!name || name === qr.name) {
      setEditingId(null)
      return
    }

    const res = await fetch(`/api/qr/${qr.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    })

    if (res.ok) {
      setQRCodes((prev) => prev.map((q) => (q.id === qr.id ? { ...q, name } : q)))
      toast('Renamed!')
    } else {
      const body = await res.json().catch(() => ({ error: 'Failed to rename QR code' }))
      toast(body.error ?? 'Failed to rename QR code', 'error')
    }

    setEditingId(null)
  }

  async function duplicate(qr: QRCode) {
    const res = await fetch('/api/qr/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: `${qr.name} (copy)`,
        type: qr.type,
        destination: qr.destination,
        isDynamic: qr.is_dynamic,
        style: qr.style,
        folder: qr.folder,
        tags: qr.tags,
      }),
    })

    if (!res.ok) {
      const body = await res.json().catch(() => ({ error: 'Failed to duplicate QR code' }))
      toast(body.error ?? 'Failed to duplicate QR code', 'error')
      return
    }

    const { id, shortcode } = await res.json()
    const duplicated: QRCode = {
      ...qr,
      id,
      shortcode,
      name: `${qr.name} (copy)`,
      total_scans: 0,
      unique_scans: 0,
      last_scanned_at: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    setQRCodes((prev) => [duplicated, ...prev])
    toast('Duplicated!')
  }

  async function deleteQR(qr: QRCode) {
    if (!confirm(`Delete "${qr.name}"? This cannot be undone.`)) return

    const res = await fetch(`/api/qr/${qr.id}`, {
      method: 'DELETE',
    })

    if (res.ok) {
      setQRCodes((prev) => prev.filter((q) => q.id !== qr.id))
      toast('Deleted')
    } else {
      const body = await res.json().catch(() => ({ error: 'Failed to delete QR code' }))
      toast(body.error ?? 'Failed to delete QR code', 'error')
    }
  }

  async function copyShortlink(shortcode: string) {
    const url = `${baseUrl}/s/${shortcode}`
    await navigator.clipboard.writeText(url)
    toast('Copied!')
  }

  const activeCodes = qrCodes.filter((q) => q.is_active).length
  const topCode = [...qrCodes].sort((a, b) => b.total_scans - a.total_scans)[0]

  const plan = (profile?.plan ?? 'free') as 'free' | 'pro' | 'business'
  const planLimits = getPlanLimits(plan)
  const dynamicCount = qrCodes.filter((q) => q.is_dynamic).length
  const dynamicLimit = planLimits.maxDynamicQr
  const showUsageBar = dynamicLimit !== Infinity
  const usagePct = showUsageBar ? Math.min((dynamicCount / dynamicLimit) * 100, 100) : 0
  const usageColor = usagePct >= 100 ? '#EF4444' : usagePct >= 66 ? '#F59E0B' : '#0057FF'
  const totalScans = qrCodes.reduce((s, q) => s + q.total_scans, 0)
  const hasQRCodes = qrCodes.length > 0
  const hasScan = totalScans > 0

  return (
    <div className="mx-auto max-w-6xl p-4 md:p-8 overflow-x-hidden">
      <div className="mb-8 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Dashboard</h1>
          <p className="mt-1 text-sm text-[var(--text-secondary)] hidden sm:block">
            Press <kbd className="rounded border border-[var(--border)] bg-[var(--surface)] px-1 font-mono text-xs">N</kbd> for new ·{' '}
            <kbd className="rounded border border-[var(--border)] bg-[var(--surface)] px-1 font-mono text-xs">/</kbd> to search
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Link href="/bulk" className="hidden sm:block">
            <Button variant="secondary" size="sm">Bulk create</Button>
          </Link>
          <Link href="/create">
            <Button size="sm">+ New</Button>
          </Link>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { label: 'Total QR codes', value: qrCodes.length },
          { label: 'Scans this month', value: profile?.scan_count_month ?? 0 },
          { label: 'Active codes', value: activeCodes },
          { label: 'Top code', value: topCode ? `${topCode.total_scans} scans` : '—', sub: topCode?.name },
        ].map((stat) => (
          <Card key={stat.label} className="p-4">
            <div className="mb-1 text-xs text-[var(--text-secondary)]">{stat.label}</div>
            <div className="text-2xl font-bold text-[var(--text-primary)]">{stat.value}</div>
            {stat.sub ? <div className="mt-0.5 truncate text-xs text-[var(--text-secondary)]">{stat.sub}</div> : null}
          </Card>
        ))}
      </div>

      <OnboardingBanner hasQRCodes={hasQRCodes} hasScan={hasScan} />

      {showUsageBar && (
        <div className="mb-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[13px] font-medium text-[var(--text-secondary)]">
              Dynamic QR codes
            </span>
            <div className="flex items-center gap-3">
              <span className="text-[13px] font-semibold" style={{ color: usageColor }}>
                {dynamicCount} / {dynamicLimit} used
              </span>
              {usagePct >= 66 && (
                <Link href="/pricing"
                  className="text-[12px] font-semibold text-[#0057FF] hover:underline">
                  Upgrade →
                </Link>
              )}
            </div>
          </div>
          <div className="h-2 rounded-full bg-[var(--bg)] overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${usagePct}%`, background: usageColor }}
            />
          </div>
          {usagePct >= 100 && (
            <p className="mt-2 text-[12px] text-[#EF4444]">
              Limit reached.{' '}
              <Link href="/pricing" className="font-semibold underline">Upgrade to Pro</Link>
              {' '}for 50 dynamic codes.
            </p>
          )}
        </div>
      )}

      <div className="mb-6 flex flex-wrap gap-3">
        <input
          id="qr-search"
          type="search"
          placeholder="Search QR codes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-0 sm:flex-none sm:min-w-[200px] rounded-[8px] border border-[var(--border)] bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0066FF] dark:bg-[#141414] h-9"
        />
        {folders.length > 0 ? (
          <select
            value={folderFilter}
            onChange={(e) => setFolderFilter(e.target.value)}
            className="h-9 rounded-[8px] border border-[var(--border)] bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0066FF] dark:bg-[#141414]"
          >
            <option value="">All folders</option>
            {folders.map((f) => (
              <option key={f.id} value={f.name}>{f.name}</option>
            ))}
          </select>
        ) : null}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as never)}
          className="h-9 rounded-[8px] border border-[var(--border)] bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0066FF] dark:bg-[#141414]"
        >
          <option value="created">Newest first</option>
          <option value="scans">Most scans</option>
          <option value="name">A-Z</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <Card className="p-16 text-center">
          <div className="mb-4 text-5xl">📭</div>
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">
            {search ? 'No QR codes match your search' : 'Create your first QR code'}
          </h3>
          <p className="mb-6 mt-2 text-sm text-[var(--text-secondary)]">
            {search ? 'Try different search terms' : 'Share your QR code to start seeing scans here'}
          </p>
          {!search ? (
            <Link href="/create">
              <Button>+ Create QR code</Button>
            </Link>
          ) : null}
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((qr) => {
            const typeBadge = TYPE_BADGE[qr.type] ?? { label: qr.type, variant: 'default' as const }
            const isRecent = recentIds.includes(qr.id)
            const qrContent = getSavedQRContent({
              type: qr.type,
              destination: qr.destination,
              shortcode: qr.shortcode,
              appUrl: baseUrl,
            })

            return (
              <Card key={qr.id} className="p-4">
                <div className="flex items-start gap-4">
                  <Link
                    href={`/share/${qr.shortcode}`}
                    className="rounded-[10px] border border-[var(--border)] bg-white p-1.5 transition-colors hover:border-[#0066FF]/40"
                    title="View QR code"
                  >
                    <QRPreview content={qrContent} style={(qr.style ?? {}) as QRStyle} size={56} />
                  </Link>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {editingId === qr.id ? (
                        <input
                          autoFocus
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          onBlur={() => saveName(qr)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') saveName(qr)
                            if (e.key === 'Escape') setEditingId(null)
                          }}
                          className="w-full max-w-[240px] border-b-2 border-[#0066FF] bg-transparent text-sm font-semibold text-[var(--text-primary)] outline-none"
                        />
                      ) : (
                        <Link
                          href={`/share/${qr.shortcode}`}
                          className="truncate text-left text-sm font-semibold text-[var(--text-primary)] hover:text-[#0066FF]"
                          title="Open QR code page"
                        >
                          {qr.name}
                        </Link>
                      )}
                      {isRecent ? (
                        <span className="rounded-[4px] bg-[var(--surface)] px-1.5 py-0.5 text-[10px] text-[var(--text-secondary)]">recent</span>
                      ) : null}
                    </div>

                    <div className="mt-0.5 truncate text-xs text-[var(--text-secondary)]">{qr.destination}</div>

                    <div className="mt-1.5 flex items-center gap-2">
                      <Badge variant={typeBadge.variant}>{typeBadge.label}</Badge>
                      <Badge variant={qr.is_dynamic ? 'blue' : 'default'}>
                        {qr.is_dynamic ? 'Dynamic' : 'Static'}
                      </Badge>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <Link href={`/share/${qr.shortcode}`}>
                        <Button size="sm">View QR</Button>
                      </Link>
                      <Link
                        href={`/codes/${qr.id}/edit`}
                        className="inline-flex items-center gap-1 rounded-[8px] border border-[#0057FF]/30 bg-[#0057FF]/06 px-2.5 py-1.5 text-[12px] font-semibold text-[#0057FF] transition-colors hover:bg-[#0057FF]/10"
                        title="Edit QR code"
                      >
                        <EditIcon />
                        Edit
                      </Link>
                      <button
                        onClick={() => {
                          setEditingId(qr.id)
                          setEditingName(qr.name)
                        }}
                        className="inline-flex items-center gap-1 rounded-[8px] border border-[var(--border)] px-2.5 py-1.5 text-[12px] font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
                        title="Rename QR code"
                      >
                        <EditIcon />
                        Rename
                      </button>
                      <button
                        onClick={() => copyShortlink(qr.shortcode)}
                        className="inline-flex items-center gap-1 rounded-[8px] border border-[var(--border)] px-2.5 py-1.5 text-[12px] font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
                        title="Copy shortlink"
                      >
                        <CopyIcon />
                        Copy link
                      </button>
                      {/* Mobile-only: analytics + delete inline */}
                      <Link
                        href={`/analytics/${qr.id}`}
                        className="sm:hidden inline-flex items-center gap-1 rounded-[8px] border border-[var(--border)] px-2.5 py-1.5 text-[12px] font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
                      >
                        <ChartIcon />
                        Analytics
                      </Link>
                      <button
                        onClick={() => deleteQR(qr)}
                        className="sm:hidden inline-flex items-center gap-1 rounded-[8px] border border-[var(--border)] px-2.5 py-1.5 text-[12px] font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[#EF4444]"
                      >
                        <TrashIcon />
                        Delete
                      </button>
                    </div>
                  </div>

                  <div className="hidden flex-shrink-0 flex-col items-end gap-1 sm:flex">
                    <div className="text-sm font-semibold text-[var(--text-primary)]">
                      {qr.total_scans.toLocaleString()}
                    </div>
                    <div className="text-xs text-[var(--text-secondary)]">scans</div>
                  </div>

                  <button
                    onClick={() => toggleActive(qr)}
                    disabled={togglingId === qr.id}
                    className={[
                      'relative inline-flex h-5 w-9 flex-shrink-0 items-center rounded-full transition-colors duration-200',
                      qr.is_active ? 'bg-[#10B981]' : 'bg-[#E5E7EB] dark:bg-[#2A2A2A]',
                    ].join(' ')}
                    title={qr.is_active ? 'Pause QR code' : 'Activate QR code'}
                  >
                    <span
                      className={[
                        'inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform duration-200',
                        qr.is_active ? 'translate-x-4' : 'translate-x-1',
                      ].join(' ')}
                    />
                  </button>

                  <div className="hidden sm:flex flex-shrink-0 items-center gap-1">
                    <Link
                      href={`/analytics/${qr.id}`}
                      className="rounded-[6px] p-1.5 text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--text-primary)]"
                      title="Analytics"
                    >
                      <ChartIcon />
                    </Link>
                    <Link
                      href={`/share/${qr.shortcode}`}
                      className="rounded-[6px] p-1.5 text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--text-primary)]"
                      title="Public share page"
                    >
                      <ShareIcon />
                    </Link>
                    <button
                      onClick={() => duplicate(qr)}
                      className="rounded-[6px] p-1.5 text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--text-primary)]"
                      title="Duplicate"
                    >
                      <DuplicateIcon />
                    </button>
                    <button
                      onClick={() => deleteQR(qr)}
                      className="rounded-[6px] p-1.5 text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface)] hover:text-[#EF4444]"
                      title="Delete"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}

function CopyIcon() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="5" y="5" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.25" /><path d="M9 5V3a1 1 0 00-1-1H3a1 1 0 00-1 1v5a1 1 0 001 1h2" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" /></svg>
}

function EditIcon() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 10.75V12h1.25l6.18-6.18-1.25-1.25L2 10.75Z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" /><path d="M7.74 3.57 8.99 2.32a.88.88 0 0 1 1.24 0l1.45 1.45a.88.88 0 0 1 0 1.24l-1.25 1.25" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

function ChartIcon() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 12V7M5 12V4M8 12V7M11 12V2" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" /></svg>
}

function DuplicateIcon() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="4" y="4" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.25" /><path d="M10 4V3a1 1 0 00-1-1H3a1 1 0 00-1 1v6a1 1 0 001 1h1" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" /></svg>
}

function ShareIcon() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M10.5 5a1.75 1.75 0 10-1.6-2.46L5.5 4.52a1.75 1.75 0 100 4.96l3.4 1.98A1.75 1.75 0 1010.5 9" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

function TrashIcon() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 4h10M5 4V2.5a.5.5 0 01.5-.5h3a.5.5 0 01.5.5V4M5.5 7v4M8.5 7v4M3 4l.5 7.5a1 1 0 001 .5h5a1 1 0 001-.5L11 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" /></svg>
}
