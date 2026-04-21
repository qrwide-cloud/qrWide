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
import { QR_TYPES, FREE_TYPES, PLAN_LABELS, PLAN_COLORS, type QRTypeConfig } from '@/lib/qr/types'
import type { QRType, QRStyle } from '@/lib/db/schema'
import { getPlanLimits } from '@/lib/plans'
import { Lock, ArrowRight, Sparkles } from 'lucide-react'

const DOT_STYLES = [
  { value: 'square', label: 'Square' },
  { value: 'rounded', label: 'Rounded' },
  { value: 'dots', label: 'Dots' },
  { value: 'classy', label: 'Classy' },
]
const CORNER_STYLES = [
  { value: 'square', label: 'Square' },
  { value: 'rounded', label: 'Rounded' },
  { value: 'extra-rounded', label: 'Extra Round' },
]

interface CreateClientProps {
  userPlan?: 'free' | 'pro' | 'business'
}

export function CreateClient({ userPlan = 'free' }: CreateClientProps) {
  const searchParams = useSearchParams()
  const initialType = searchParams.get('type') ?? 'url'

  const [type, setType] = useState<QRType>(initialType as QRType)
  const [data, setData] = useState<Record<string, string>>({})
  const [style, setStyle] = useState<QRStyle>({
    foreground: '#000000',
    background: '#FFFFFF',
    dotStyle: 'square',
    cornerStyle: 'square',
  })
  const [debouncedContent, setDebouncedContent] = useState('')
  const [name, setName] = useState('')
  const [saving, setSaving] = useState(false)
  const [testModalOpen, setTestModalOpen] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { toast } = useToast()
  const router = useRouter()
  const planLimits = getPlanLimits(userPlan)

  // Restore from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('create_qr_data')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (!searchParams.get('type') && parsed.type) setType(parsed.type)
        if (parsed.data) setData(parsed.data)
        if (parsed.style) setStyle(parsed.style)
        if (parsed.name) setName(parsed.name)
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

  function canUse(plan: 'free' | 'pro' | 'business'): boolean {
    if (plan === 'free') return true
    if (plan === 'pro') return userPlan === 'pro' || userPlan === 'business'
    if (plan === 'business') return userPlan === 'business'
    return false
  }

  const activeConfig = QR_TYPES.find((t) => t.id === type)
  const isLocked = activeConfig ? !canUse(activeConfig.plan) : false

  async function handleSave() {
    if (isLocked) {
      router.push('/pricing')
      return
    }
    if (!debouncedContent) {
      toast('Enter some content first', 'error')
      return
    }
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
      if (res.status === 401) { router.push('/signup?redirectTo=/create'); return }
      if (!res.ok) { const b = await res.json(); toast(b.error ?? 'Failed to save', 'error'); return }
      const { id } = await res.json()
      localStorage.removeItem('create_qr_data')
      toast('QR code saved!')
      router.push(`/analytics/${id}`)
    } finally {
      setSaving(false)
    }
  }

  // Group types by plan
  const freeTypes     = QR_TYPES.filter((t) => t.plan === 'free')
  const proTypes      = QR_TYPES.filter((t) => t.plan === 'pro')
  const businessTypes = QR_TYPES.filter((t) => t.plan === 'business')

  function renderFields() {
    if (!activeConfig) return null
    return (
      <div className="space-y-4">
        <Input
          label="QR Code Name"
          placeholder={`e.g. ${activeConfig.label} — Main Campaign`}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {activeConfig.fields.map((field) => {
          if (field.type === 'textarea') {
            return (
              <div key={field.key} className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-[var(--text-primary)]">{field.label}</label>
                <textarea
                  rows={3}
                  placeholder={field.placeholder}
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
                <select
                  value={data[field.key] ?? field.options[0].value}
                  onChange={(e) => updateData(field.key, e.target.value)}
                  className="w-full h-10 rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3.5 text-[14px] text-[var(--text-primary)] outline-none focus:border-[#0057FF]/50 focus:ring-2 focus:ring-[#0057FF]/15 transition-all"
                >
                  {field.options.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
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
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    value={data[field.key] ?? ''}
                    onChange={(e) => updateData(field.key, e.target.value.replace('@', ''))}
                    className="flex-1 min-w-0 bg-transparent px-3 py-2.5 text-[14px] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none"
                  />
                </div>
              </div>
            )
          }
          return (
            <Input
              key={field.key}
              label={field.label}
              type={field.type as React.HTMLInputTypeAttribute}
              placeholder={field.placeholder}
              value={data[field.key] ?? ''}
              onChange={(e) => updateData(field.key, e.target.value)}
            />
          )
        })}
        <div className="pt-1 flex flex-wrap items-center gap-4">
          <Button onClick={handleSave} loading={saving} size="lg" className="glow-blue-sm">
            Save & Track Scans
          </Button>
          <p className="text-[12.5px] text-[var(--text-secondary)]">
            Creates a dynamic QR you can update anytime
          </p>
        </div>
      </div>
    )
  }

  function renderInlineUpsell() {
    if (!activeConfig) return null
    return (
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <Sparkles className="h-4 w-4 shrink-0" style={{ color: PLAN_COLORS[activeConfig.plan].text }} />
          <p className="text-[13px] text-[var(--text-secondary)]">
            <span className="font-semibold text-[var(--text-primary)]">{activeConfig.label}</span>
            {' '}requires {PLAN_LABELS[activeConfig.plan]}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => switchType(FREE_TYPES[0])}
            className="text-[12.5px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            Use free type
          </button>
          <Link href="/pricing">
            <Button size="sm" className="glow-blue-sm">
              Upgrade <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const activeInFree     = freeTypes.some((t) => t.id === type)
  const activeInPro      = proTypes.some((t) => t.id === type)
  const activeInBusiness = businessTypes.some((t) => t.id === type)

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-[26px] font-bold tracking-[-0.025em] text-[var(--text-primary)]">Create QR Code</h1>
          <p className="mt-1 text-[14px] text-[var(--text-secondary)]">
            Choose a type, fill in the details, and download or save with tracking.
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">

          {/* ══════════════════════════════════════
              LEFT: Type selector + inline form
          ══════════════════════════════════════ */}
          <div className="flex-1">

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">

              {/* Free types */}
              <div className="p-4 border-b border-[var(--border)]">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-[#10B981] mb-3">Free — always</p>
                <div className="flex flex-wrap gap-2">
                  {freeTypes.map((t) => {
                    const Icon = t.icon
                    const isActive = type === t.id
                    return (
                      <button
                        key={t.id}
                        onClick={() => switchType(t)}
                        className={[
                          'flex items-center gap-2 rounded-xl px-3.5 py-2 text-[13px] font-medium transition-all border',
                          isActive
                            ? 'bg-[#0057FF] text-white border-[#0057FF] shadow-[0_2px_8px_rgba(0,87,255,0.3)]'
                            : 'bg-[var(--bg)] text-[var(--text-secondary)] border-[var(--border)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)]',
                        ].join(' ')}
                      >
                        <Icon className="h-3.5 w-3.5 shrink-0" />
                        {t.label}
                      </button>
                    )
                  })}
                </div>
                {activeInFree && activeConfig && (
                  <div className="mt-5 pt-5 border-t border-[var(--border)]">
                    {renderFields()}
                  </div>
                )}
              </div>

              {/* Pro types */}
              <div className="p-4 border-b border-[var(--border)]">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-[#0057FF]">Pro — $5/mo</p>
                  {!canUse('pro') && (
                    <Link href="/pricing" className="text-[11px] font-semibold text-[#0057FF] hover:underline flex items-center gap-1">
                      Upgrade <ArrowRight className="h-3 w-3" />
                    </Link>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {proTypes.map((t) => {
                    const Icon = t.icon
                    const isActive = type === t.id
                    const unlocked = canUse('pro')
                    return (
                      <button
                        key={t.id}
                        onClick={() => switchType(t)}
                        className={[
                          'flex items-center gap-2 rounded-xl px-3.5 py-2 text-[13px] font-medium transition-all border relative',
                          isActive && unlocked
                            ? 'bg-[#0057FF] text-white border-[#0057FF] shadow-[0_2px_8px_rgba(0,87,255,0.3)]'
                            : isActive && !unlocked
                            ? 'bg-[#0057FF]/10 text-[#0057FF] border-[#0057FF]/30'
                            : unlocked
                            ? 'bg-[var(--bg)] text-[var(--text-secondary)] border-[var(--border)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)]'
                            : 'bg-[var(--bg)] text-[var(--text-tertiary)] border-[var(--border)] hover:border-[#0057FF]/30 cursor-pointer',
                        ].join(' ')}
                      >
                        <Icon className="h-3.5 w-3.5 shrink-0" />
                        {t.label}
                        {!unlocked && <Lock className="h-3 w-3 shrink-0 opacity-60" />}
                      </button>
                    )
                  })}
                </div>
                {activeInPro && activeConfig && (
                  <div className="mt-5 pt-5 border-t border-[var(--border)]">
                    {isLocked ? renderInlineUpsell() : renderFields()}
                  </div>
                )}
              </div>

              {/* Business types */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-[#8B5CF6]">Business — $9/mo</p>
                  {!canUse('business') && (
                    <Link href="/pricing" className="text-[11px] font-semibold text-[#8B5CF6] hover:underline flex items-center gap-1">
                      Upgrade <ArrowRight className="h-3 w-3" />
                    </Link>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {businessTypes.map((t) => {
                    const Icon = t.icon
                    const isActive = type === t.id
                    const unlocked = canUse('business')
                    return (
                      <button
                        key={t.id}
                        onClick={() => switchType(t)}
                        className={[
                          'flex items-center gap-2 rounded-xl px-3.5 py-2 text-[13px] font-medium transition-all border',
                          isActive && unlocked
                            ? 'bg-[#8B5CF6] text-white border-[#8B5CF6] shadow-[0_2px_8px_rgba(139,92,246,0.3)]'
                            : isActive && !unlocked
                            ? 'bg-[#8B5CF6]/10 text-[#8B5CF6] border-[#8B5CF6]/30'
                            : unlocked
                            ? 'bg-[var(--bg)] text-[var(--text-secondary)] border-[var(--border)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)]'
                            : 'bg-[var(--bg)] text-[var(--text-tertiary)] border-[var(--border)] hover:border-[#8B5CF6]/30 cursor-pointer',
                        ].join(' ')}
                      >
                        <Icon className="h-3.5 w-3.5 shrink-0" />
                        {t.label}
                        {!unlocked && <Lock className="h-3 w-3 shrink-0 opacity-60" />}
                      </button>
                    )
                  })}
                </div>
                {activeInBusiness && activeConfig && (
                  <div className="mt-5 pt-5 border-t border-[var(--border)]">
                    {isLocked ? renderInlineUpsell() : renderFields()}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════
              RIGHT: Preview + Style
          ══════════════════════════════════════ */}
          <div className="lg:w-72 xl:w-80 space-y-5 lg:sticky lg:top-[78px]">

            {/* QR Preview */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 flex flex-col items-center gap-4">
              <div className={debouncedContent && !isLocked ? 'animate-qr-appear' : ''}>
                <QRPreview content={!isLocked ? debouncedContent : ''} style={style} size={220} />
              </div>
              {!isLocked && debouncedContent && (
                <>
                  <div className="w-full">
                    <QRDownload
                      content={debouncedContent}
                      style={style}
                      filename={name || 'qrcode'}
                      showPdf={planLimits.pdfDownload}
                    />
                  </div>
                  <button
                    onClick={() => setTestModalOpen(true)}
                    className="text-[13px] text-[#0057FF] hover:underline font-medium"
                  >
                    Test this QR code →
                  </button>
                </>
              )}
              {isLocked && (
                <div className="text-center">
                  <Lock className="h-8 w-8 text-[var(--text-tertiary)] mx-auto mb-2" />
                  <p className="text-[12.5px] text-[var(--text-secondary)]">Unlock this type to preview and download</p>
                </div>
              )}
            </div>

            {/* Style controls */}
            {!isLocked && (
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 space-y-4">
                <h3 className="text-[13.5px] font-semibold text-[var(--text-primary)]">Style</h3>

                <div className="flex gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11.5px] text-[var(--text-secondary)]">Foreground</label>
                    <input type="color" value={style.foreground ?? '#000000'}
                      onChange={(e) => setStyle((s) => ({ ...s, foreground: e.target.value }))}
                      className="h-9 w-16 rounded-lg border border-[var(--border)] cursor-pointer" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11.5px] text-[var(--text-secondary)]">Background</label>
                    <input type="color" value={style.background ?? '#FFFFFF'}
                      onChange={(e) => setStyle((s) => ({ ...s, background: e.target.value }))}
                      className="h-9 w-16 rounded-lg border border-[var(--border)] cursor-pointer" />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11.5px] text-[var(--text-secondary)]">Dot style</label>
                  <div className="flex flex-wrap gap-1.5">
                    {DOT_STYLES.map((ds) => (
                      <button key={ds.value}
                        onClick={() => setStyle((s) => ({ ...s, dotStyle: ds.value as QRStyle['dotStyle'] }))}
                        className={[
                          'px-2.5 py-1 text-[12px] rounded-lg border transition-all',
                          style.dotStyle === ds.value
                            ? 'border-[#0057FF] bg-[#0057FF]/10 text-[#0057FF] font-medium'
                            : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]',
                        ].join(' ')}>
                        {ds.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11.5px] text-[var(--text-secondary)]">Corner style</label>
                  <div className="flex flex-wrap gap-1.5">
                    {CORNER_STYLES.map((cs) => (
                      <button key={cs.value}
                        onClick={() => setStyle((s) => ({ ...s, cornerStyle: cs.value as QRStyle['cornerStyle'] }))}
                        className={[
                          'px-2.5 py-1 text-[12px] rounded-lg border transition-all',
                          style.cornerStyle === cs.value
                            ? 'border-[#0057FF] bg-[#0057FF]/10 text-[#0057FF] font-medium'
                            : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]',
                        ].join(' ')}>
                        {cs.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Test modal */}
      {testModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setTestModalOpen(false)}>
          <div className="bg-[var(--surface)] rounded-3xl p-8 shadow-[var(--shadow-xl)] flex flex-col items-center gap-5 max-w-sm w-full border border-[var(--border)]"
            onClick={(e) => e.stopPropagation()}>
            <h3 className="text-[17px] font-bold text-[var(--text-primary)]">Test Your QR Code</h3>
            <QRPreview content={debouncedContent} style={style} size={260} />
            <p className="text-[13px] text-[var(--text-secondary)] text-center">
              Scan with your phone camera to test the destination
            </p>
            <Button variant="secondary" onClick={() => setTestModalOpen(false)} size="md">Close</Button>
          </div>
        </div>
      )}
    </div>
  )
}
