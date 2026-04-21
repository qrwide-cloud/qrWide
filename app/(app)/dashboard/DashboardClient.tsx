'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { useToast } from '@/components/ui/Toast'
import { createClient } from '@/lib/supabase/client'
import type { Database } from '@/lib/db/schema'

type QRCode = Database['public']['Tables']['qr_codes']['Row']
type Profile = Database['public']['Tables']['profiles']['Row']
type Folder = Database['public']['Tables']['folders']['Row']

interface DashboardClientProps {
  profile: Profile | null
  initialQRCodes: QRCode[]
  folders: Folder[]
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

export function DashboardClient({ profile, initialQRCodes, folders }: DashboardClientProps) {
  const [qrCodes, setQRCodes] = useState<QRCode[]>(initialQRCodes)
  const [search, setSearch] = useState('')
  const [folderFilter, setFolderFilter] = useState('')
  const [sort, setSort] = useState<'created' | 'scans' | 'name'>('created')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState('')
  const [togglingId, setTogglingId] = useState<string | null>(null)

  const { toast } = useToast()
  const router = useRouter()
  const supabase = createClient()

  // Keyboard shortcuts
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

  // Last 3 QR codes for "recent" pinning
  const recentIds = [...initialQRCodes]
    .sort((a, b) => new Date(b.updated_at ?? b.created_at).getTime() - new Date(a.updated_at ?? a.created_at).getTime())
    .slice(0, 3)
    .map((q) => q.id)

  async function toggleActive(qr: QRCode) {
    setTogglingId(qr.id)
    const { error } = await supabase
      .from('qr_codes')
      .update({ is_active: !qr.is_active })
      .eq('id', qr.id)

    if (!error) {
      setQRCodes((prev) => prev.map((q) => (q.id === qr.id ? { ...q, is_active: !q.is_active } : q)))
      toast(qr.is_active ? 'QR code paused' : 'QR code activated')
    }
    setTogglingId(null)
  }

  async function saveName(qr: QRCode) {
    const name = editingName.trim()
    if (!name || name === qr.name) {
      setEditingId(null)
      return
    }
    const { error } = await supabase.from('qr_codes').update({ name }).eq('id', qr.id)
    if (!error) {
      setQRCodes((prev) => prev.map((q) => (q.id === qr.id ? { ...q, name } : q)))
      toast('Renamed!')
    }
    setEditingId(null)
  }

  async function duplicate(qr: QRCode) {
    const { data, error } = await supabase
      .from('qr_codes')
      .insert({
        user_id: qr.user_id,
        shortcode: Math.random().toString(36).slice(2, 8),
        name: `${qr.name} (copy)`,
        type: qr.type,
        destination: qr.destination,
        is_dynamic: qr.is_dynamic,
        style: qr.style,
        folder: qr.folder,
        tags: qr.tags,
      })
      .select()
      .single()

    if (!error && data) {
      setQRCodes((prev) => [data, ...prev])
      toast('Duplicated!')
    }
  }

  async function deleteQR(qr: QRCode) {
    if (!confirm(`Delete "${qr.name}"? This cannot be undone.`)) return
    const { error } = await supabase.from('qr_codes').delete().eq('id', qr.id)
    if (!error) {
      setQRCodes((prev) => prev.filter((q) => q.id !== qr.id))
      toast('Deleted')
    }
  }

  async function copyShortlink(shortcode: string) {
    const url = `${process.env.NEXT_PUBLIC_APP_URL ?? 'https://qrwide.com'}/s/${shortcode}`
    await navigator.clipboard.writeText(url)
    toast('Copied!')
  }

  // Stats
  const totalScans = qrCodes.reduce((s, q) => s + q.total_scans, 0)
  const activeCodes = qrCodes.filter((q) => q.is_active).length
  const topCode = [...qrCodes].sort((a, b) => b.total_scans - a.total_scans)[0]

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Dashboard</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Press <kbd className="font-mono text-xs bg-[var(--surface)] border border-[var(--border)] rounded px-1">N</kbd> for new ·{' '}
            <kbd className="font-mono text-xs bg-[var(--surface)] border border-[var(--border)] rounded px-1">/</kbd> to search
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/bulk">
            <Button variant="secondary" size="sm">Bulk create</Button>
          </Link>
          <Link href="/create">
            <Button size="sm">+ New QR code</Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mb-8">
        {[
          { label: 'Total QR codes', value: qrCodes.length },
          { label: 'Scans this month', value: profile?.scan_count_month ?? 0 },
          { label: 'Active codes', value: activeCodes },
          { label: 'Top code', value: topCode ? `${topCode.total_scans} scans` : '—', sub: topCode?.name },
        ].map((stat) => (
          <Card key={stat.label} className="p-4">
            <div className="text-xs text-[var(--text-secondary)] mb-1">{stat.label}</div>
            <div className="text-2xl font-bold text-[var(--text-primary)]">{stat.value}</div>
            {stat.sub && <div className="text-xs text-[var(--text-secondary)] truncate mt-0.5">{stat.sub}</div>}
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <input
          id="qr-search"
          type="search"
          placeholder="Search QR codes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-9 rounded-[8px] border border-[var(--border)] bg-white dark:bg-[#141414] px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0066FF] min-w-[200px]"
        />
        {folders.length > 0 && (
          <select
            value={folderFilter}
            onChange={(e) => setFolderFilter(e.target.value)}
            className="h-9 rounded-[8px] border border-[var(--border)] bg-white dark:bg-[#141414] px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
          >
            <option value="">All folders</option>
            {folders.map((f) => (
              <option key={f.id} value={f.name}>{f.name}</option>
            ))}
          </select>
        )}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as never)}
          className="h-9 rounded-[8px] border border-[var(--border)] bg-white dark:bg-[#141414] px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
        >
          <option value="created">Newest first</option>
          <option value="scans">Most scans</option>
          <option value="name">A–Z</option>
        </select>
      </div>

      {/* QR code list */}
      {filtered.length === 0 ? (
        <Card className="p-16 text-center">
          <div className="text-5xl mb-4">📭</div>
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">
            {search ? 'No QR codes match your search' : 'Create your first QR code'}
          </h3>
          <p className="text-sm text-[var(--text-secondary)] mt-2 mb-6">
            {search
              ? 'Try different search terms'
              : 'Share your QR code to start seeing scans here'}
          </p>
          {!search && (
            <Link href="/create">
              <Button>+ Create QR code</Button>
            </Link>
          )}
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((qr) => {
            const typeBadge = TYPE_BADGE[qr.type] ?? { label: qr.type, variant: 'default' as const }
            const isRecent = recentIds.includes(qr.id)

            return (
              <Card key={qr.id} className="p-4">
                <div className="flex items-center gap-4">
                  {/* QR thumbnail placeholder */}
                  <div className="h-12 w-12 rounded-[8px] bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">⬛</span>
                  </div>

                  {/* Name + destination */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
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
                          className="text-sm font-semibold bg-transparent border-b-2 border-[#0066FF] outline-none text-[var(--text-primary)] w-full max-w-[240px]"
                        />
                      ) : (
                        <button
                          className="text-sm font-semibold text-[var(--text-primary)] hover:text-[#0066FF] truncate text-left"
                          onClick={() => { setEditingId(qr.id); setEditingName(qr.name) }}
                          title="Click to rename"
                        >
                          {qr.name}
                        </button>
                      )}
                      {isRecent && (
                        <span className="text-[10px] text-[var(--text-secondary)] bg-[var(--surface)] px-1.5 py-0.5 rounded-[4px]">recent</span>
                      )}
                    </div>
                    <div className="text-xs text-[var(--text-secondary)] truncate mt-0.5">
                      {qr.destination}
                    </div>
                    <div className="flex items-center gap-2 mt-1.5">
                      <Badge variant={typeBadge.variant}>{typeBadge.label}</Badge>
                      <Badge variant={qr.is_dynamic ? 'blue' : 'default'}>
                        {qr.is_dynamic ? 'Dynamic' : 'Static'}
                      </Badge>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="hidden sm:flex flex-col items-end gap-1 flex-shrink-0">
                    <div className="text-sm font-semibold text-[var(--text-primary)]">
                      {qr.total_scans.toLocaleString()}
                    </div>
                    <div className="text-xs text-[var(--text-secondary)]">scans</div>
                  </div>

                  {/* Active toggle */}
                  <button
                    onClick={() => toggleActive(qr)}
                    disabled={togglingId === qr.id}
                    className={[
                      'flex-shrink-0 relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200',
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

                  {/* Actions menu */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={() => copyShortlink(qr.shortcode)}
                      className="p-1.5 rounded-[6px] text-[var(--text-secondary)] hover:bg-[var(--surface)] hover:text-[var(--text-primary)] transition-colors"
                      title="Copy shortlink"
                    >
                      <CopyIcon />
                    </button>
                    <Link
                      href={`/analytics/${qr.id}`}
                      className="p-1.5 rounded-[6px] text-[var(--text-secondary)] hover:bg-[var(--surface)] hover:text-[var(--text-primary)] transition-colors"
                      title="Analytics"
                    >
                      <ChartIcon />
                    </Link>
                    <button
                      onClick={() => duplicate(qr)}
                      className="p-1.5 rounded-[6px] text-[var(--text-secondary)] hover:bg-[var(--surface)] hover:text-[var(--text-primary)] transition-colors"
                      title="Duplicate"
                    >
                      <DuplicateIcon />
                    </button>
                    <button
                      onClick={() => deleteQR(qr)}
                      className="p-1.5 rounded-[6px] text-[var(--text-secondary)] hover:bg-[var(--surface)] hover:text-[#EF4444] transition-colors"
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
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="5" y="5" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.25"/><path d="M9 5V3a1 1 0 00-1-1H3a1 1 0 00-1 1v5a1 1 0 001 1h2" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/></svg>
}
function ChartIcon() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 12V7M5 12V4M8 12V7M11 12V2" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/></svg>
}
function DuplicateIcon() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="4" y="4" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.25"/><path d="M10 4V3a1 1 0 00-1-1H3a1 1 0 00-1 1v6a1 1 0 001 1h1" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/></svg>
}
function TrashIcon() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 4h10M5 4V2.5a.5.5 0 01.5-.5h3a.5.5 0 01.5.5V4M5.5 7v4M8.5 7v4M3 4l.5 7.5a1 1 0 001 .5h5a1 1 0 001-.5L11 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>
}
