'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { QRPreview } from '@/components/qr/QRPreview'
import { QRDownload } from '@/components/qr/QRDownload'
import { useToast } from '@/components/ui/Toast'
import { buildQRContent } from '@/lib/qr/generate'
import { QR_TYPES, type QRTypeConfig } from '@/lib/qr/types'
import type { QRType, QRStyle } from '@/lib/db/schema'
import { ArrowRight, Upload, X, RotateCcw, BookmarkPlus, BarChart2, UserPlus } from 'lucide-react'

const BASIC_TYPE_IDS = new Set(['url', 'text', 'wifi', 'vcard'])

/* ─── Color presets ─────────────────────────────────────── */
const COLOR_PRESETS = [
  { label: 'Classic',  fg: '#000000', bg: '#FFFFFF', cf: '#000000', cd: '#000000' },
  { label: 'Dark',     fg: '#FFFFFF', bg: '#0d1117', cf: '#FFFFFF', cd: '#FFFFFF' },
  { label: 'Ocean',    fg: '#0057FF', bg: '#FFFFFF', cf: '#0057FF', cd: '#0057FF' },
  { label: 'Teal',     fg: '#00C896', bg: '#FFFFFF', cf: '#00C896', cd: '#00C896' },
  { label: 'Purple',   fg: '#8B5CF6', bg: '#FFFFFF', cf: '#8B5CF6', cd: '#8B5CF6' },
  { label: 'Night',    fg: '#60a5fa', bg: '#0f172a', cf: '#60a5fa', cd: '#60a5fa' },
  { label: 'Forest',   fg: '#10B981', bg: '#f0fdf4', cf: '#10B981', cd: '#10B981' },
  { label: 'Sunset',   fg: '#D97706', bg: '#FFFBEB', cf: '#D97706', cd: '#D97706' },
]

/* ─── Body style options ────────────────────────────────── */
const DOT_STYLES: { value: QRStyle['dotStyle']; label: string }[] = [
  { value: 'square',         label: 'Squares'  },
  { value: 'dots',           label: 'Dots'     },
  { value: 'rounded',        label: 'Rounded'  },
  { value: 'classy',         label: 'Classy'   },
  { value: 'classy-rounded', label: 'Fluid'    },
  { value: 'extra-rounded',  label: 'Soft'     },
]

/* ─── Corner style options ──────────────────────────────── */
const CORNER_SQUARE_STYLES: { value: QRStyle['cornerStyle']; label: string }[] = [
  { value: 'square',        label: 'Square'  },
  { value: 'extra-rounded', label: 'Rounded' },
  { value: 'dot',           label: 'Circle'  },
]
const CORNER_DOT_STYLES: { value: QRStyle['cornerDotStyle']; label: string }[] = [
  { value: 'square', label: 'Square' },
  { value: 'dot',    label: 'Circle' },
]

/* ─── Logo library ──────────────────────────────────────── */
const LOGO_LIBRARY = [
  { name: 'Facebook',  url: 'https://cdn.simpleicons.org/facebook/1877F2'  },
  { name: 'Instagram', url: 'https://cdn.simpleicons.org/instagram/E4405F' },
  { name: 'WhatsApp',  url: 'https://cdn.simpleicons.org/whatsapp/25D366'  },
  { name: 'LinkedIn',  url: 'https://cdn.simpleicons.org/linkedin/0A66C2'  },
  { name: 'YouTube',   url: 'https://cdn.simpleicons.org/youtube/FF0000'   },
  { name: 'X',         url: 'https://cdn.simpleicons.org/x/000000'         },
  { name: 'TikTok',    url: 'https://cdn.simpleicons.org/tiktok/000000'    },
  { name: 'Spotify',   url: 'https://cdn.simpleicons.org/spotify/1DB954'   },
  { name: 'Discord',   url: 'https://cdn.simpleicons.org/discord/5865F2'   },
  { name: 'Reddit',    url: 'https://cdn.simpleicons.org/reddit/FF4500'    },
  { name: 'Pinterest', url: 'https://cdn.simpleicons.org/pinterest/BD081C' },
  { name: 'Snapchat',  url: 'https://cdn.simpleicons.org/snapchat/FFFC00'  },
  { name: 'Telegram',  url: 'https://cdn.simpleicons.org/telegram/26A5E4'  },
  { name: 'GitHub',    url: 'https://cdn.simpleicons.org/github/181717'    },
  { name: 'PayPal',    url: 'https://cdn.simpleicons.org/paypal/003087'    },
  { name: 'Twitch',    url: 'https://cdn.simpleicons.org/twitch/9146FF'    },
]

/* ─── Sub-components ────────────────────────────────────── */
function ColorPicker({ label, value, onChange, onReset }: {
  label: string; value: string; onChange: (v: string) => void; onReset?: () => void
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-semibold uppercase tracking-wide text-[var(--text-tertiary)]">{label}</label>
        {onReset && (
          <button onClick={onReset} className="text-[10px] text-[var(--text-tertiary)] hover:text-[#0057FF] transition-colors flex items-center gap-0.5">
            <RotateCcw className="h-2.5 w-2.5" /> Reset
          </button>
        )}
      </div>
      <div className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg)] px-2.5 py-2">
        <div className="relative shrink-0">
          <input
            type="color"
            value={value || '#000000'}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
          <div className="h-7 w-7 rounded-lg border border-black/10 shadow-sm cursor-pointer"
            style={{ background: value || '#000000' }} />
        </div>
        <input
          type="text"
          value={(value || '#000000').toUpperCase()}
          onChange={(e) => {
            const v = e.target.value
            if (/^#[0-9A-Fa-f]{0,6}$/.test(v)) onChange(v)
          }}
          className="flex-1 bg-transparent font-mono text-[13px] text-[var(--text-primary)] outline-none"
          maxLength={7}
          spellCheck={false}
        />
      </div>
    </div>
  )
}

function DotStyleBtn({ style, label, active, onClick }: {
  style: QRStyle['dotStyle']; label: string; active: boolean; onClick: () => void
}) {
  const rx = style === 'dots' ? 8 : style === 'rounded' ? 2 : style === 'classy-rounded' ? 3 : style === 'extra-rounded' ? 5 : 0
  return (
    <button
      onClick={onClick}
      className={[
        'flex flex-col items-center gap-1.5 rounded-xl border p-2.5 transition-all',
        active
          ? 'border-[#0057FF] bg-[#0057FF]/08 text-[#0057FF]'
          : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]',
      ].join(' ')}
    >
      <svg width="28" height="28" viewBox="0 0 28 28">
        {[[2,2],[16,2],[2,16],[16,16]].map(([x, y], i) => (
          <rect key={i} x={x} y={y} width={10} height={10} rx={rx} fill="currentColor" />
        ))}
      </svg>
      <span className="text-[10px] font-semibold leading-none">{label}</span>
    </button>
  )
}

function CornerSquareBtn({ style, label, active, onClick }: {
  style: QRStyle['cornerStyle']; label: string; active: boolean; onClick: () => void
}) {
  const rx = style === 'extra-rounded' ? 7 : 0
  const isDot = style === 'dot'
  return (
    <button
      onClick={onClick}
      className={[
        'flex flex-col items-center gap-1.5 rounded-xl border px-3 py-2.5 transition-all',
        active
          ? 'border-[#0057FF] bg-[#0057FF]/08 text-[#0057FF]'
          : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]',
      ].join(' ')}
    >
      <svg width="28" height="28" viewBox="0 0 28 28">
        {isDot ? (
          <>
            <circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="3" fill="none" />
            <circle cx="14" cy="14" r="5" fill="currentColor" />
          </>
        ) : (
          <>
            <rect x="1" y="1" width="26" height="26" rx={rx} stroke="currentColor" strokeWidth="2.5" fill="none" />
            <rect x="8" y="8" width="12" height="12" rx={Math.max(rx - 3, 0)} fill="currentColor" />
          </>
        )}
      </svg>
      <span className="text-[10px] font-semibold leading-none">{label}</span>
    </button>
  )
}

function CornerDotBtn({ style, label, active, onClick }: {
  style: QRStyle['cornerDotStyle']; label: string; active: boolean; onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={[
        'flex flex-col items-center gap-1.5 rounded-xl border px-4 py-2.5 transition-all',
        active
          ? 'border-[#0057FF] bg-[#0057FF]/08 text-[#0057FF]'
          : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]',
      ].join(' ')}
    >
      <svg width="20" height="20" viewBox="0 0 20 20">
        <rect x="3" y="3" width="14" height="14" rx={style === 'dot' ? 7 : 0} fill="currentColor" />
      </svg>
      <span className="text-[10px] font-semibold leading-none">{label}</span>
    </button>
  )
}

/* ─── Main component ─────────────────────────────────────── */
interface CreateClientProps {
  userPlan?: 'free' | 'pro' | 'business'
  isLoggedIn?: boolean
}

type DesignTab = 'colors' | 'shapes' | 'logo' | 'advanced'

export function CreateClient({ userPlan = 'free', isLoggedIn = false }: CreateClientProps) {
  const searchParams = useSearchParams()
  const initialType = searchParams.get('type') ?? 'url'

  const [type, setType]     = useState<QRType>(initialType as QRType)
  const [data, setData]     = useState<Record<string, string>>({})
  const [style, setStyle]   = useState<QRStyle>({
    foreground:     '#000000',
    background:     '#FFFFFF',
    cornerColor:    '#000000',
    cornerDotColor: '#000000',
    dotStyle:       'square',
    cornerStyle:    'square',
    cornerDotStyle: 'square',
    logoSize:       0.3,
    errorCorrection: 'H',
  })
  const [designTab, setDesignTab]       = useState<DesignTab>('colors')
  const [name, setName]                 = useState('')
  const [debouncedContent, setDebouncedContent] = useState('')
  const [saving, setSaving]             = useState(false)
  const [testModalOpen, setTestModalOpen]       = useState(false)
  const [signUpModalOpen, setSignUpModalOpen]   = useState(false)

  const timerRef     = useRef<ReturnType<typeof setTimeout> | null>(null)
  const logoInputRef = useRef<HTMLInputElement>(null)
  const { toast }    = useToast()
  const router       = useRouter()

  // Restore draft from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('create_qr_data')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (!searchParams.get('type') && parsed.type) setType(parsed.type)
        if (parsed.data)  setData(parsed.data)
        if (parsed.style) setStyle((s) => ({ ...s, ...parsed.style }))
        if (parsed.name)  setName(parsed.name)
      } catch {}
    }
  }, [])

  const content = buildQRContent(type, data)

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setDebouncedContent(content), 280)
    localStorage.setItem('create_qr_data', JSON.stringify({ type, data, style, name }))
  }, [content, type, data, style, name])

  function updateData(key: string, value: string) {
    setData((prev) => ({ ...prev, [key]: value }))
  }

  function switchType(t: QRTypeConfig) {
    setType(t.id as QRType)
    setData({})
  }

  function applyPreset(p: typeof COLOR_PRESETS[0]) {
    setStyle((s) => ({ ...s, foreground: p.fg, background: p.bg, cornerColor: p.cf, cornerDotColor: p.cd }))
  }

  function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 1024 * 1024) { toast('File too large (max 1 MB)', 'error'); return }
    const reader = new FileReader()
    reader.onload = () => setStyle((s) => ({ ...s, logoUrl: reader.result as string }))
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const activeConfig    = QR_TYPES.find((t) => t.id === type)
  const requiresAccount = !isLoggedIn && !BASIC_TYPE_IDS.has(type)

  async function handleSave() {
    if (!debouncedContent) { toast('Enter some content first', 'error'); return }
    setSaving(true)
    try {
      const res = await fetch('/api/qr/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name || `My ${type.toUpperCase()} QR`,
          type,
          destination: debouncedContent,
          style,
          isDynamic: true,
        }),
      })
      if (res.status === 401) { setSignUpModalOpen(true); return }
      if (!res.ok) {
        const b = await res.json()
        toast(b.error ?? 'Failed to save', 'error'); return
      }
      const { id } = await res.json()
      localStorage.removeItem('create_qr_data')
      toast('QR code saved!')
      router.push(`/analytics/${id}`)
    } finally { setSaving(false) }
  }

  function renderFields() {
    if (!activeConfig) return null
    if (requiresAccount) {
      return (
        <div className="flex flex-col items-center gap-5 py-4 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0057FF]/10">
            <UserPlus className="h-6 w-6 text-[#0057FF]" />
          </div>
          <div>
            <p className="text-[15px] font-semibold text-[var(--text-primary)]">
              Free account required
            </p>
            <p className="mt-1.5 text-[13px] text-[var(--text-secondary)] max-w-xs">
              <strong className="text-[var(--text-primary)]">{activeConfig.label}</strong> QR codes are available on free accounts. Sign up in 30 seconds — no credit card.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2.5 w-full max-w-xs">
            <Link href={`/signup?redirectTo=/create?type=${type}`} className="flex-1">
              <button className="w-full h-10 rounded-xl bg-[#0057FF] text-white text-[13.5px] font-semibold shadow-[0_4px_16px_rgba(0,87,255,0.25)] hover:bg-[#0049E0] transition-colors">
                Create free account
              </button>
            </Link>
            <Link href={`/login?redirectTo=/create?type=${type}`} className="flex-1">
              <button className="w-full h-10 rounded-xl border border-[var(--border)] text-[13.5px] font-medium text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)] transition-all">
                Sign in
              </button>
            </Link>
          </div>
          <p className="text-[11.5px] text-[var(--text-tertiary)]">
            URL, Text, Wi-Fi & vCard work without an account
          </p>
        </div>
      )
    }
    return (
      <div className="space-y-4">
        <Input
          label="QR Code Name"
          placeholder={`e.g. ${activeConfig.label} — Campaign`}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {activeConfig.fields.map((field) => {
          if (field.type === 'textarea') {
            return (
              <div key={field.key} className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-[var(--text-primary)]">{field.label}</label>
                <textarea rows={3} placeholder={field.placeholder}
                  value={data[field.key] ?? ''}
                  onChange={(e) => updateData(field.key, e.target.value)}
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3.5 py-2.5 text-[14px] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none focus:border-[#0057FF]/50 focus:ring-2 focus:ring-[#0057FF]/15 resize-y transition-all"
                />
              </div>
            )
          }
          if (field.type === 'select' && field.options) {
            return (
              <div key={field.key} className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-[var(--text-primary)]">{field.label}</label>
                <select value={data[field.key] ?? field.options[0].value}
                  onChange={(e) => updateData(field.key, e.target.value)}
                  className="w-full h-10 rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3.5 text-[14px] text-[var(--text-primary)] outline-none focus:border-[#0057FF]/50 focus:ring-2 focus:ring-[#0057FF]/15 transition-all"
                >
                  {field.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
            )
          }
          if (field.type === 'handle') {
            return (
              <div key={field.key} className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-[var(--text-primary)]">{field.label}</label>
                <div className="flex items-center overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg)] focus-within:border-[#0057FF]/50 focus-within:ring-2 focus-within:ring-[#0057FF]/15 transition-all">
                  {field.prefix && (
                    <span className="border-r border-[var(--border)] bg-[var(--surface)] px-3 text-[13px] text-[var(--text-tertiary)] whitespace-nowrap py-2.5">
                      {field.prefix}
                    </span>
                  )}
                  <input type="text" placeholder={field.placeholder}
                    value={data[field.key] ?? ''}
                    onChange={(e) => updateData(field.key, e.target.value.replace('@', ''))}
                    className="flex-1 min-w-0 bg-transparent px-3 py-2.5 text-[14px] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none"
                  />
                </div>
              </div>
            )
          }
          return (
            <Input key={field.key} label={field.label}
              type={field.type as React.HTMLInputTypeAttribute}
              placeholder={field.placeholder}
              value={data[field.key] ?? ''}
              onChange={(e) => updateData(field.key, e.target.value)}
            />
          )
        })}
        <div className="pt-1 flex flex-wrap items-center gap-4">
          <Button onClick={handleSave} loading={saving} size="lg" className="glow-blue-sm">
            <BookmarkPlus className="h-4 w-4" />
            Save & Track Scans
          </Button>
          <p className="text-[12.5px] text-[var(--text-secondary)]">
            {isLoggedIn ? 'Dynamic — update anytime' : 'Free account · No credit card'}
          </p>
        </div>
      </div>
    )
  }

  /* ─── Design Panel ─────────────────────────────────────── */
  function renderDesignPanel() {
    const TABS: { id: DesignTab; label: string }[] = [
      { id: 'colors',   label: 'Colors'   },
      { id: 'shapes',   label: 'Shapes'   },
      { id: 'logo',     label: 'Logo'     },
      { id: 'advanced', label: 'Advanced' },
    ]
    return (
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
        {/* Tab bar */}
        <div className="flex border-b border-[var(--border)] bg-[var(--bg)]">
          {TABS.map((tab) => (
            <button key={tab.id} onClick={() => setDesignTab(tab.id)}
              className={[
                'flex-1 py-2.5 text-[12px] font-semibold transition-all border-b-2',
                designTab === tab.id
                  ? 'border-[#0057FF] text-[#0057FF] bg-[var(--surface)]'
                  : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
              ].join(' ')}>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-4 space-y-4">
          {/* ── Colors tab ── */}
          {designTab === 'colors' && (
            <>
              <div className="space-y-2">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--text-tertiary)]">Presets</p>
                <div className="flex flex-wrap gap-1.5">
                  {COLOR_PRESETS.map((preset) => (
                    <button key={preset.label} onClick={() => applyPreset(preset)}
                      title={preset.label}
                      className="h-7 w-7 rounded-lg border-2 border-[var(--border)] overflow-hidden shadow-sm hover:border-[#0057FF]/60 hover:scale-110 transition-all"
                      style={{ background: `linear-gradient(135deg, ${preset.fg} 50%, ${preset.bg} 50%)` }}
                    />
                  ))}
                </div>
              </div>
              <div className="h-px bg-[var(--border)]" />
              <ColorPicker label="Background" value={style.background ?? '#FFFFFF'}
                onChange={(v) => setStyle((s) => ({ ...s, background: v }))} />
              <ColorPicker label="Foreground (dots)" value={style.foreground ?? '#000000'}
                onChange={(v) => setStyle((s) => ({ ...s, foreground: v }))} />
              <ColorPicker label="Outer corner" value={style.cornerColor ?? style.foreground ?? '#000000'}
                onChange={(v) => setStyle((s) => ({ ...s, cornerColor: v }))}
                onReset={() => setStyle((s) => ({ ...s, cornerColor: s.foreground ?? '#000000' }))}
              />
              <ColorPicker label="Inner corner" value={style.cornerDotColor ?? style.cornerColor ?? style.foreground ?? '#000000'}
                onChange={(v) => setStyle((s) => ({ ...s, cornerDotColor: v }))}
                onReset={() => setStyle((s) => ({ ...s, cornerDotColor: s.cornerColor ?? s.foreground ?? '#000000' }))}
              />
            </>
          )}

          {/* ── Shapes tab ── */}
          {designTab === 'shapes' && (
            <>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--text-tertiary)] mb-3">Body style</p>
                <div className="grid grid-cols-3 gap-2">
                  {DOT_STYLES.map((ds) => (
                    <DotStyleBtn key={ds.value} style={ds.value} label={ds.label}
                      active={style.dotStyle === ds.value}
                      onClick={() => setStyle((s) => ({ ...s, dotStyle: ds.value }))}
                    />
                  ))}
                </div>
              </div>
              <div className="h-px bg-[var(--border)]" />
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--text-tertiary)] mb-3">Outer corner</p>
                <div className="flex gap-2">
                  {CORNER_SQUARE_STYLES.map((cs) => (
                    <CornerSquareBtn key={cs.value} style={cs.value} label={cs.label}
                      active={style.cornerStyle === cs.value}
                      onClick={() => setStyle((s) => ({ ...s, cornerStyle: cs.value }))}
                    />
                  ))}
                </div>
              </div>
              <div className="h-px bg-[var(--border)]" />
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--text-tertiary)] mb-3">Inner corner</p>
                <div className="flex gap-2">
                  {CORNER_DOT_STYLES.map((cd) => (
                    <CornerDotBtn key={cd.value} style={cd.value} label={cd.label}
                      active={style.cornerDotStyle === cd.value}
                      onClick={() => setStyle((s) => ({ ...s, cornerDotStyle: cd.value }))}
                    />
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ── Logo tab ── */}
          {designTab === 'logo' && (
            <>
              <div className="flex gap-2">
                <button
                  onClick={() => logoInputRef.current?.click()}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-dashed border-[var(--border)] bg-[var(--bg)] py-3 text-[13px] font-medium text-[var(--text-secondary)] hover:border-[#0057FF]/50 hover:text-[#0057FF] transition-all"
                >
                  <Upload className="h-4 w-4" />
                  Upload logo
                </button>
                {style.logoUrl && (
                  <button
                    onClick={() => setStyle((s) => ({ ...s, logoUrl: '' }))}
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-[var(--border)] px-3 py-3 text-[12px] font-medium text-[var(--text-secondary)] hover:border-red-300 hover:text-red-500 transition-all"
                  >
                    <X className="h-3.5 w-3.5" />
                    Remove
                  </button>
                )}
                <input ref={logoInputRef} type="file" accept=".png,.jpg,.jpeg,.svg,.webp"
                  className="hidden" onChange={handleLogoUpload} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--text-tertiary)]">Logo size</p>
                  <span className="text-[12px] font-semibold text-[var(--text-primary)]">
                    {Math.round((style.logoSize ?? 0.3) * 100)}%
                  </span>
                </div>
                <input type="range" min={10} max={50} step={5}
                  value={Math.round((style.logoSize ?? 0.3) * 100)}
                  onChange={(e) => setStyle((s) => ({ ...s, logoSize: Number(e.target.value) / 100 }))}
                  className="w-full accent-[#0057FF]"
                />
                <p className="text-[11px] text-[var(--text-tertiary)]">
                  *.png, *.jpeg, *.svg, *.webp up to 1 MB
                </p>
              </div>
              <div className="h-px bg-[var(--border)]" />
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--text-tertiary)] mb-3">Library</p>
                <div className="grid grid-cols-4 gap-2">
                  {LOGO_LIBRARY.map((logo) => (
                    <button key={logo.name} onClick={() => setStyle((s) => ({ ...s, logoUrl: logo.url }))}
                      title={logo.name}
                      className={[
                        'flex flex-col items-center gap-1 rounded-xl border p-2 transition-all',
                        style.logoUrl === logo.url
                          ? 'border-[#0057FF] bg-[#0057FF]/08'
                          : 'border-[var(--border)] hover:border-[var(--border-strong)] bg-[var(--bg)]',
                      ].join(' ')}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={logo.url} alt={logo.name} width={24} height={24} className="h-6 w-6 object-contain" />
                      <span className="text-[9px] font-medium text-[var(--text-tertiary)] truncate w-full text-center">{logo.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ── Advanced tab ── */}
          {designTab === 'advanced' && (
            <div className="space-y-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--text-tertiary)] mb-3">
                  Error correction level
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {(['L', 'M', 'Q', 'H'] as const).map((level) => {
                    const pct = { L: '7%', M: '15%', Q: '25%', H: '30%' }[level]
                    const desc = { L: 'Low', M: 'Medium', Q: 'Quartile', H: 'High' }[level]
                    return (
                      <button key={level}
                        onClick={() => setStyle((s) => ({ ...s, errorCorrection: level }))}
                        className={[
                          'flex flex-col items-center gap-1 rounded-xl border p-2.5 transition-all',
                          style.errorCorrection === level
                            ? 'border-[#0057FF] bg-[#0057FF]/08 text-[#0057FF]'
                            : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]',
                        ].join(' ')}
                      >
                        <span className="text-[15px] font-bold">{level}</span>
                        <span className="text-[9px] font-medium">{pct}</span>
                        <span className="text-[9px] text-[var(--text-tertiary)]">{desc}</span>
                      </button>
                    )
                  })}
                </div>
                <p className="mt-3 text-[11.5px] text-[var(--text-tertiary)] leading-relaxed">
                  Higher correction = more damage tolerance, but larger QR. Use <strong className="text-[var(--text-secondary)]">H</strong> when adding a logo.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  /* ─── JSX ─────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-[26px] font-bold tracking-[-0.025em] text-[var(--text-primary)]">
              Create QR Code
            </h1>
            <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#0057FF] text-white shadow-[0_2px_8px_rgba(0,87,255,0.35)]">
              Beta
            </span>
          </div>
          <p className="mt-1 text-[14px] text-[var(--text-secondary)]">
            All 18 types{' '}
            <span className="font-semibold text-[var(--text-primary)]">free & unlimited</span>
            {' '}during beta — URL, Text, Wi-Fi & vCard work instantly. Premium types need a free account.
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">

          {/* ── LEFT: Type selector + form ── */}
          <div className="flex-1 space-y-6 min-w-0">

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
              {/* Type grid */}
              <div className="p-4 border-b border-[var(--border)]">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--text-tertiary)] mb-3">
                  Choose type
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {QR_TYPES.map((t) => {
                    const Icon = t.icon
                    const isActive = type === t.id
                    const needsAccount = !isLoggedIn && !BASIC_TYPE_IDS.has(t.id)
                    return (
                      <button key={t.id} onClick={() => switchType(t)}
                        className={[
                          'flex items-center gap-2 rounded-xl px-3.5 py-2 text-[13px] font-medium transition-all border',
                          isActive
                            ? 'bg-[#0057FF] text-white border-[#0057FF] shadow-[0_2px_8px_rgba(0,87,255,0.3)]'
                            : 'bg-[var(--bg)] text-[var(--text-secondary)] border-[var(--border)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)]',
                        ].join(' ')}>
                        <Icon className="h-3.5 w-3.5 shrink-0" />
                        {t.label}
                        {needsAccount && (
                          <UserPlus className="h-3 w-3 shrink-0 opacity-40 ml-auto" />
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Form */}
              <div className="p-4">
                {renderFields()}
              </div>
            </div>
          </div>

          {/* ── RIGHT: Preview + Design ── */}
          <div className="lg:w-[300px] xl:w-[320px] space-y-4 lg:sticky lg:top-6 shrink-0">

            {/* QR Preview card */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 flex flex-col items-center gap-4">
              <div className={debouncedContent && !requiresAccount ? 'animate-qr-appear' : ''}>
                <QRPreview content={!requiresAccount ? debouncedContent : ''} style={style} size={220} />
              </div>

              {debouncedContent && !requiresAccount ? (
                <>
                  <div className="w-full">
                    <QRDownload content={debouncedContent} style={style} filename={name || 'qrcode'} showPdf={true} />
                  </div>
                  <p className="text-[11px] text-[var(--text-tertiary)] text-center -mt-1">
                    No account needed to download
                  </p>
                  <div className="flex items-center gap-3 w-full">
                    <button onClick={() => setTestModalOpen(true)}
                      className="flex-1 text-center text-[13px] text-[#0057FF] hover:underline font-medium">
                      Test QR code →
                    </button>
                    <button
                      onClick={() => setStyle({
                        foreground: '#000000', background: '#FFFFFF',
                        cornerColor: '#000000', cornerDotColor: '#000000',
                        dotStyle: 'square', cornerStyle: 'square', cornerDotStyle: 'square',
                        logoSize: 0.3, errorCorrection: 'H',
                      })}
                      className="text-[12px] text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
                    >
                      Reset style
                    </button>
                  </div>
                </>
              ) : (
                <p className="text-[12px] text-[var(--text-tertiary)] text-center">Fill in the form to generate</p>
              )}
            </div>

            {/* Design panel */}
            {renderDesignPanel()}
          </div>
        </div>
      </div>

      {/* ── Sign-up to save modal ── */}
      {signUpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setSignUpModalOpen(false)}>
          <div className="bg-[var(--surface)] rounded-3xl p-8 shadow-[var(--shadow-xl)] max-w-sm w-full border border-[var(--border)]"
            onClick={(e) => e.stopPropagation()}>
            <div className="text-center mb-6">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0057FF]/10 mb-4">
                <BarChart2 className="h-7 w-7 text-[#0057FF]" />
              </div>
              <h3 className="text-[18px] font-bold text-[var(--text-primary)]">Save & track this QR code</h3>
              <p className="mt-2 text-[13.5px] text-[var(--text-secondary)] leading-relaxed">
                Create a free account to save your QR code and see real-time scan analytics.
              </p>
            </div>
            <div className="space-y-2.5 mb-6">
              {[
                'Real-time scan analytics — city, device, browser',
                'Update the destination URL anytime',
                'Unlimited QR codes saved to your dashboard',
                'Free forever — no credit card required',
              ].map((f) => (
                <div key={f} className="flex items-start gap-2.5 text-[13px] text-[var(--text-primary)]">
                  <svg className="shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" fill="#00C896" fillOpacity="0.15"/>
                    <path d="M5 8l2 2 4-4" stroke="#00C896" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {f}
                </div>
              ))}
            </div>
            <Link href="/signup?redirectTo=/create" className="block mb-3">
              <button className="w-full h-11 rounded-xl bg-[#0057FF] text-white text-[14px] font-semibold shadow-[0_4px_16px_rgba(0,87,255,0.3)] hover:bg-[#0049E0] transition-colors">
                Create free account <ArrowRight className="inline h-4 w-4 mb-0.5" />
              </button>
            </Link>
            <Link href="/login?redirectTo=/create" className="block mb-3">
              <button className="w-full h-10 rounded-xl border border-[var(--border)] text-[13.5px] font-medium text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)] transition-all">
                Sign in to existing account
              </button>
            </Link>
            <button onClick={() => setSignUpModalOpen(false)}
              className="w-full text-[13px] text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors py-1">
              Just download below — no account needed
            </button>
          </div>
        </div>
      )}

      {/* ── Test modal ── */}
      {testModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setTestModalOpen(false)}>
          <div className="bg-[var(--surface)] rounded-3xl p-8 shadow-[var(--shadow-xl)] flex flex-col items-center gap-5 max-w-sm w-full border border-[var(--border)]"
            onClick={(e) => e.stopPropagation()}>
            <h3 className="text-[17px] font-bold text-[var(--text-primary)]">Test Your QR Code</h3>
            <QRPreview content={debouncedContent} style={style} size={260} />
            <p className="text-[13px] text-[var(--text-secondary)] text-center">Scan with your phone camera to test</p>
            <Button variant="secondary" onClick={() => setTestModalOpen(false)} size="md">Close</Button>
          </div>
        </div>
      )}
    </div>
  )
}
