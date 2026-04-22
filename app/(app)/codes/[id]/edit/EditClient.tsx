'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { QRPreview } from '@/components/qr/QRPreview'
import { QRDownload } from '@/components/qr/QRDownload'
import { useToast } from '@/components/ui/Toast'
import { buildQRContent } from '@/lib/qr/generate'
import { QR_TYPES } from '@/lib/qr/types'
import type { Database, QRStyle } from '@/lib/db/schema'
import { ArrowLeft, RefreshCw, Info } from 'lucide-react'

type QRCode = Database['public']['Tables']['qr_codes']['Row']

interface EditClientProps {
  qr: QRCode
  userPlan: 'free' | 'pro' | 'business'
}

function parseDestination(type: string, destination: string): Record<string, string> {
  try {
    switch (type) {
      case 'url':   return { url: destination }
      case 'text':  return { text: destination }

      case 'wifi': {
        const enc  = destination.match(/T:([^;]+)/)?.[1] ?? 'WPA'
        const ssid = destination.match(/S:([^;]+)/)?.[1] ?? ''
        const pwd  = destination.match(/P:([^;]*)/)?.[1] ?? ''
        return { encryption: enc, ssid, password: pwd }
      }

      case 'vcard': {
        const fn    = destination.match(/FN:(.+)/)?.[1]?.trim() ?? ''
        const org   = destination.match(/ORG:(.+)/)?.[1]?.trim() ?? ''
        const tel   = destination.match(/TEL:(.+)/)?.[1]?.trim() ?? ''
        const email = destination.match(/EMAIL:(.+)/)?.[1]?.trim() ?? ''
        const url   = destination.match(/URL:(.+)/)?.[1]?.trim() ?? ''
        const adr   = destination.match(/ADR:;;(.+?);;;;/)?.[1]?.trim() ?? ''
        return { name: fn, company: org, phone: tel, email, website: url, address: adr }
      }

      case 'email': {
        const [base, qs] = destination.replace('mailto:', '').split('?')
        const params = new URLSearchParams(qs ?? '')
        return { email: base, subject: params.get('subject') ?? '', body: params.get('body') ?? '' }
      }

      case 'call':  return { phone: destination.replace('tel:', '') }

      case 'sms': {
        const rest = destination.replace('smsto:', '')
        const idx  = rest.indexOf(':')
        return idx === -1 ? { phone: rest, message: '' } : { phone: rest.slice(0, idx), message: rest.slice(idx + 1) }
      }

      case 'whatsapp': {
        const u = new URL(destination)
        return { phone: u.pathname.replace('/', ''), message: u.searchParams.get('text') ?? '' }
      }

      case 'facebook':  return { handle: destination.replace('https://facebook.com/', '') }
      case 'instagram': return { handle: destination.replace('https://instagram.com/', '') }

      case 'linkedin': {
        const handle = destination.replace(/https:\/\/linkedin\.com\/(in|company)\//, '')
        return { handle, type: destination.includes('/company/') ? 'company' : 'person' }
      }

      case 'tiktok':  return { handle: destination.replace('https://tiktok.com/@', '') }

      case 'youtube': {
        if (destination.includes('/watch?v=')) return { handle: destination, linkType: 'video' }
        return { handle: destination.replace('https://youtube.com/@', ''), linkType: 'channel' }
      }

      case 'pdf':
      case 'images':
      case 'video':
        return { url: destination }

      case 'app': return { appStore: destination }

      default: return { url: destination }
    }
  } catch {
    return { url: destination }
  }
}

const DIRECT_PAYLOAD_TYPES = new Set(['text', 'wifi', 'vcard', 'event'])

export function EditClient({ qr, userPlan }: EditClientProps) {
  const [data, setData]     = useState<Record<string, string>>(() => parseDestination(qr.type, qr.destination))
  const [name, setName]     = useState(qr.name)
  const [style]             = useState<QRStyle>((qr.style ?? {}) as QRStyle)
  const [saving, setSaving] = useState(false)
  const [debouncedContent, setDebouncedContent] = useState('')
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { toast } = useToast()
  const router = useRouter()

  const typeConfig = QR_TYPES.find((t) => t.id === qr.type)
  const isDirect   = DIRECT_PAYLOAD_TYPES.has(qr.type)
  const isDynamic  = qr.is_dynamic

  const content = buildQRContent(qr.type, data)

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setDebouncedContent(content), 280)
  }, [content])

  function updateData(key: string, value: string) {
    setData((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSave() {
    if (!debouncedContent) {
      toast('Fill in the required fields first', 'error')
      return
    }
    setSaving(true)
    try {
      const res = await fetch(`/api/qr/${qr.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim() || qr.name, destination: debouncedContent }),
      })
      if (!res.ok) {
        const b = await res.json().catch(() => ({}))
        toast(b.error ?? 'Failed to save', 'error')
        return
      }
      toast('Saved! Changes are live.')
      router.push('/dashboard')
    } finally {
      setSaving(false)
    }
  }

  if (!typeConfig) {
    return <div className="p-8 text-center text-[var(--text-secondary)]">Unknown QR type.</div>
  }

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <Link href="/dashboard" className="flex items-center gap-1.5 text-[13px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <div className="h-4 w-px bg-[var(--border)]" />
          <div>
            <h1 className="text-[22px] font-bold tracking-[-0.025em] text-[var(--text-primary)]">Edit QR Code</h1>
            <p className="mt-0.5 text-[13px] text-[var(--text-secondary)]">{qr.name}</p>
          </div>
        </div>

        {/* Dynamic update notice */}
        {isDynamic && !isDirect && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-[#10B981]/25 bg-[#10B981]/06 px-4 py-3.5">
            <RefreshCw className="mt-0.5 h-4 w-4 shrink-0 text-[#10B981]" />
            <p className="text-[13.5px] text-[var(--text-primary)]">
              <span className="font-semibold">Dynamic code — </span>
              Changes take effect instantly. Your printed QR code doesn&apos;t need to be reprinted.
            </p>
          </div>
        )}

        {/* Static / direct-payload notice */}
        {(!isDynamic || isDirect) && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3.5">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-[var(--text-secondary)]" />
            <p className="text-[13.5px] text-[var(--text-secondary)]">
              {!isDynamic
                ? 'This is a static QR code. Changing the content will generate a new QR pattern — you\'ll need to reprint it.'
                : 'This QR type encodes content directly. Changes will update the destination, but the QR pattern will change — reprint required.'}
            </p>
          </div>
        )}

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">

          {/* Left: Form */}
          <div className="flex-1 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl"
                style={{ background: typeConfig.iconBg }}>
                <typeConfig.icon className="h-4 w-4" style={{ color: typeConfig.iconColor }} />
              </div>
              <div>
                <div className="text-[13.5px] font-semibold text-[var(--text-primary)]">{typeConfig.label}</div>
                <div className="text-[12px] text-[var(--text-secondary)]">{typeConfig.description}</div>
              </div>
            </div>

            <div className="space-y-4">
              <Input
                label="QR Code Name"
                placeholder="e.g. Main Campaign URL"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              {typeConfig.fields.map((field) => {
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

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Button onClick={handleSave} loading={saving} size="lg" className="glow-blue-sm">
                  Save changes
                </Button>
                <Link href="/dashboard">
                  <Button variant="secondary" size="lg">Cancel</Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Right: Preview */}
          <div className="lg:w-64 xl:w-72 space-y-4 lg:sticky lg:top-[78px]">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 flex flex-col items-center gap-4">
              <p className="self-start text-[12px] font-semibold uppercase tracking-widest text-[var(--text-tertiary)]">Preview</p>
              <div className={debouncedContent ? 'animate-qr-appear' : ''}>
                <QRPreview content={debouncedContent} style={style} size={200} />
              </div>
              {debouncedContent && (
                <div className="w-full">
                  <QRDownload content={debouncedContent} style={style} filename={name || 'qrcode'} />
                </div>
              )}
            </div>

            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3.5 space-y-2">
              <p className="text-[11.5px] font-semibold uppercase tracking-widest text-[var(--text-tertiary)]">Code info</p>
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-[var(--text-secondary)]">Type</span>
                <span className="font-medium text-[var(--text-primary)]">{typeConfig.label}</span>
              </div>
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-[var(--text-secondary)]">Mode</span>
                <span className="font-medium text-[var(--text-primary)]">{qr.is_dynamic ? 'Dynamic' : 'Static'}</span>
              </div>
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-[var(--text-secondary)]">Total scans</span>
                <span className="font-medium text-[var(--text-primary)]">{qr.total_scans.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
