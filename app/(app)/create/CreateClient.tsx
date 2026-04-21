'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { QRPreview } from '@/components/qr/QRPreview'
import { QRDownload } from '@/components/qr/QRDownload'
import { useToast } from '@/components/ui/Toast'
import { buildQRContent } from '@/lib/qr/generate'
import type { QRType, QRStyle } from '@/lib/db/schema'

const TABS: { type: QRType; label: string; emoji: string }[] = [
  { type: 'url', label: 'URL', emoji: '🔗' },
  { type: 'wifi', label: 'WiFi', emoji: '📶' },
  { type: 'vcard', label: 'vCard', emoji: '👤' },
  { type: 'text', label: 'Text', emoji: '📝' },
  { type: 'instagram', label: 'Instagram', emoji: '📸' },
]

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

export function CreateClient() {
  const [type, setType] = useState<QRType>('url')
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

  // Restore from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('create_qr_data')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (parsed.data) setData(parsed.data)
        if (parsed.type) setType(parsed.type)
        if (parsed.style) setStyle(parsed.style)
        if (parsed.name) setName(parsed.name)
      } catch {}
    }
  }, [])

  const content = buildQRContent(type, data)

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setDebouncedContent(content), 300)

    // Autosave
    localStorage.setItem('create_qr_data', JSON.stringify({ type, data, style, name }))
  }, [content, type, data, style, name])

  function updateData(key: string, value: string) {
    setData((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSave() {
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

      if (res.status === 401) {
        router.push('/login?redirectTo=/create')
        return
      }

      if (!res.ok) {
        const body = await res.json()
        toast(body.error ?? 'Failed to save', 'error')
        return
      }

      const { id } = await res.json()
      localStorage.removeItem('create_qr_data')
      toast('QR code saved!')
      router.push(`/analytics/${id}`)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Create QR Code</h1>

      <div className="flex flex-col-reverse gap-8 lg:flex-row lg:gap-12 max-w-5xl">
        {/* === LEFT: Input === */}
        <div className="flex-1 space-y-6">
          {/* Type tabs */}
          <div>
            <div className="flex flex-wrap gap-1 rounded-[10px] bg-[var(--surface)] p-1">
              {TABS.map((tab) => (
                <button
                  key={tab.type}
                  onClick={() => { setType(tab.type); setData({}) }}
                  className={[
                    'flex items-center gap-1.5 rounded-[8px] px-3 py-2 text-sm font-medium transition-all',
                    type === tab.type
                      ? 'bg-white dark:bg-[#141414] text-[var(--text-primary)] shadow-sm'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
                  ].join(' ')}
                >
                  <span>{tab.emoji}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Fields */}
          <div className="space-y-4">
            <Input
              label="QR Code Name"
              placeholder="e.g. Restaurant Menu - Table 1"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {type === 'url' && (
              <Input
                label="URL"
                type="url"
                placeholder="https://your-website.com"
                value={data.url ?? ''}
                onChange={(e) => updateData('url', e.target.value)}
              />
            )}

            {type === 'wifi' && (
              <>
                <Input
                  label="Network Name (SSID)"
                  placeholder="My WiFi Network"
                  value={data.ssid ?? ''}
                  onChange={(e) => updateData('ssid', e.target.value)}
                />
                <Input
                  label="Password"
                  type="password"
                  placeholder="Network password"
                  value={data.password ?? ''}
                  onChange={(e) => updateData('password', e.target.value)}
                />
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-[var(--text-primary)]">Encryption</label>
                  <select
                    value={data.encryption ?? 'WPA'}
                    onChange={(e) => updateData('encryption', e.target.value)}
                    className="h-10 rounded-[8px] border border-[var(--border)] bg-white dark:bg-[#141414] px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                  >
                    <option value="WPA">WPA/WPA2</option>
                    <option value="WEP">WEP</option>
                    <option value="nopass">None</option>
                  </select>
                </div>
              </>
            )}

            {type === 'vcard' && (
              <>
                <Input label="Full Name" placeholder="Jane Smith" value={data.name ?? ''} onChange={(e) => updateData('name', e.target.value)} />
                <Input label="Company" placeholder="Acme Inc" value={data.company ?? ''} onChange={(e) => updateData('company', e.target.value)} />
                <Input label="Phone" type="tel" placeholder="+1 555 123 4567" value={data.phone ?? ''} onChange={(e) => updateData('phone', e.target.value)} />
                <Input label="Email" type="email" placeholder="jane@example.com" value={data.email ?? ''} onChange={(e) => updateData('email', e.target.value)} />
                <Input label="Website" type="url" placeholder="https://jane.com" value={data.website ?? ''} onChange={(e) => updateData('website', e.target.value)} />
              </>
            )}

            {type === 'text' && (
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[var(--text-primary)]">Text</label>
                <textarea
                  rows={4}
                  placeholder="Any text you want to encode"
                  value={data.text ?? ''}
                  onChange={(e) => updateData('text', e.target.value)}
                  className="rounded-[8px] border border-[var(--border)] bg-white dark:bg-[#141414] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0066FF] resize-y"
                />
              </div>
            )}

            {type === 'instagram' && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-[var(--text-secondary)] font-medium">instagram.com/</span>
                <Input
                  placeholder="yourhandle"
                  value={data.handle ?? ''}
                  onChange={(e) => updateData('handle', e.target.value.replace('@', ''))}
                />
              </div>
            )}
          </div>

          {/* Save button */}
          <div className="pt-2">
            <Button onClick={handleSave} loading={saving} className="w-full sm:w-auto" size="lg">
              Save & Track Scans
            </Button>
            <p className="text-xs text-[var(--text-secondary)] mt-2">
              Saving creates a dynamic QR code you can update anytime
            </p>
          </div>
        </div>

        {/* === RIGHT: Preview + Style === */}
        <div className="lg:w-80 space-y-6">
          {/* QR Preview */}
          <div className="flex flex-col items-center">
            <QRPreview content={debouncedContent} style={style} size={240} />
            <div className="mt-4 w-full">
              <QRDownload content={debouncedContent} style={style} filename={name || 'qrcode'} showPdf />
            </div>
            <button
              onClick={() => setTestModalOpen(true)}
              disabled={!debouncedContent}
              className="mt-3 text-sm text-[#0066FF] hover:underline disabled:opacity-50"
            >
              Test this QR code →
            </button>
          </div>

          {/* Style controls */}
          <div className="space-y-4 rounded-[12px] border border-[var(--border)] p-4 bg-white dark:bg-[#141414]">
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">Style</h3>

            <div className="flex gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-[var(--text-secondary)]">Foreground</label>
                <input
                  type="color"
                  value={style.foreground ?? '#000000'}
                  onChange={(e) => setStyle((s) => ({ ...s, foreground: e.target.value }))}
                  className="h-9 w-16 rounded-[6px] border border-[var(--border)] cursor-pointer"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-[var(--text-secondary)]">Background</label>
                <input
                  type="color"
                  value={style.background ?? '#FFFFFF'}
                  onChange={(e) => setStyle((s) => ({ ...s, background: e.target.value }))}
                  className="h-9 w-16 rounded-[6px] border border-[var(--border)] cursor-pointer"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-[var(--text-secondary)]">Dot style</label>
              <div className="flex flex-wrap gap-1">
                {DOT_STYLES.map((ds) => (
                  <button
                    key={ds.value}
                    onClick={() => setStyle((s) => ({ ...s, dotStyle: ds.value as QRStyle['dotStyle'] }))}
                    className={[
                      'px-2.5 py-1 text-xs rounded-[6px] border transition-all',
                      style.dotStyle === ds.value
                        ? 'border-[#0066FF] bg-[#0066FF]/10 text-[#0066FF]'
                        : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-[#0066FF]',
                    ].join(' ')}
                  >
                    {ds.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-[var(--text-secondary)]">Corner style</label>
              <div className="flex flex-wrap gap-1">
                {CORNER_STYLES.map((cs) => (
                  <button
                    key={cs.value}
                    onClick={() => setStyle((s) => ({ ...s, cornerStyle: cs.value as QRStyle['cornerStyle'] }))}
                    className={[
                      'px-2.5 py-1 text-xs rounded-[6px] border transition-all',
                      style.cornerStyle === cs.value
                        ? 'border-[#0066FF] bg-[#0066FF]/10 text-[#0066FF]'
                        : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-[#0066FF]',
                    ].join(' ')}
                  >
                    {cs.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Test modal */}
      {testModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setTestModalOpen(false)}
        >
          <div
            className="bg-white dark:bg-[#141414] rounded-[16px] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.2)] flex flex-col items-center gap-4 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-[var(--text-primary)]">Test Your QR Code</h3>
            <QRPreview content={debouncedContent} style={style} size={280} />
            <p className="text-sm text-[var(--text-secondary)] text-center">
              Scan with your phone camera to test the destination
            </p>
            <Button variant="secondary" onClick={() => setTestModalOpen(false)}>Close</Button>
          </div>
        </div>
      )}
    </div>
  )
}
