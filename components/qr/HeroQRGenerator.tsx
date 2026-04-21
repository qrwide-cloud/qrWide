'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { QRPreview } from './QRPreview'
import { QRDownload } from './QRDownload'
import { FREE_TYPES, PRO_TYPES } from '@/lib/qr/types'
import { buildQRContent } from '@/lib/qr/generate'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Lock, Wifi, Sparkles } from 'lucide-react'

/* ─────────────────────────────────────────────────────────
   Demo rotation — cycles through 3 examples automatically
───────────────────────────────────────────────────────── */
const DEMOS: { type: string; label: string; data: Record<string, string>; displayText: string }[] = [
  { type: 'url',   label: 'Website', data: { url: 'https://qrwide.com' }, displayText: 'https://qrwide.com' },
  { type: 'wifi',  label: 'Wi-Fi',   data: { ssid: 'CoffeeShop_Guest', password: 'welcome2024', encryption: 'WPA' }, displayText: 'CoffeeShop_Guest' },
  { type: 'vcard', label: 'Contact', data: { name: 'Alex Johnson', company: 'QRWide', phone: '+1 555 000 1234', email: 'alex@qrwide.com' }, displayText: 'Alex Johnson' },
]

const CHAR_DELAY   = 55   // ms per character while typing
const HOLD_DELAY   = 3200 // ms to hold after full demo typed
const CLEAR_DELAY  = 600  // ms for clear animation before next

export function HeroQRGenerator() {
  const [activeType, setActiveType] = useState('url')
  const [data, setData]             = useState<Record<string, string>>({})
  const [inputVal, setInputVal]     = useState('')    // what's visible in the text input
  const [demoMode, setDemoMode]     = useState(true)  // false once user interacts
  const [demoLabel, setDemoLabel]   = useState('')
  const [demoIndex, setDemoIndex]   = useState(0)
  const [isTyping, setIsTyping]     = useState(false)
  const [debouncedContent, setDebouncedContent] = useState('')
  const [showProTeaser, setShowProTeaser]       = useState(false)

  const timerRef      = useRef<ReturnType<typeof setTimeout> | null>(null)
  const debounceRef   = useRef<ReturnType<typeof setTimeout> | null>(null)
  const demoRunning   = useRef(false)
  const userActive    = useRef(false)

  /* ── debounce content → QR preview ── */
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    const content = buildQRContent(activeType, data)
    debounceRef.current = setTimeout(() => setDebouncedContent(content), 220)
  }, [data, activeType])

  /* ── Run one demo cycle ── */
  const runDemo = useCallback((idx: number) => {
    if (userActive.current) return
    demoRunning.current = true

    const demo = DEMOS[idx % DEMOS.length]
    const primaryKey = demo.type === 'url' ? 'url' : demo.type === 'wifi' ? 'ssid' : 'name'
    const text = demo.displayText

    setActiveType(demo.type)
    setDemoLabel(demo.label)
    setIsTyping(true)
    setInputVal('')
    setData({})
    setShowProTeaser(false)

    // Typewriter: add one character at a time
    let i = 0
    function typeNext() {
      if (userActive.current) { demoRunning.current = false; return }
      i++
      const partial = text.slice(0, i)
      setInputVal(partial)

      // Build realistic data as we type
      const partialData: Record<string, string> = { ...demo.data, [primaryKey]: partial }
      setData(partialData)

      if (i < text.length) {
        timerRef.current = setTimeout(typeNext, CHAR_DELAY)
      } else {
        // Finished typing — set full data, hold, then advance
        setData(demo.data)
        setIsTyping(false)
        timerRef.current = setTimeout(() => {
          if (userActive.current) return
          // Fade out
          setInputVal('')
          setData({})
          setDebouncedContent('')
          timerRef.current = setTimeout(() => {
            if (!userActive.current) {
              setDemoIndex((prev) => prev + 1)
            }
          }, CLEAR_DELAY)
        }, HOLD_DELAY)
      }
    }

    timerRef.current = setTimeout(typeNext, 400) // initial pause
  }, [])

  /* ── Trigger runDemo whenever demoIndex changes (and demoMode is on) ── */
  useEffect(() => {
    if (!demoMode) return
    runDemo(demoIndex)
  }, [demoIndex, demoMode, runDemo])

  /* ── User interaction — kill demo ── */
  function handleUserInteract() {
    if (!demoMode) return
    userActive.current = true
    demoRunning.current = false
    if (timerRef.current) clearTimeout(timerRef.current)
    setDemoMode(false)
    setDemoLabel('')
    setIsTyping(false)
    setInputVal('')
    setData({})
    setActiveType('url')
    setShowProTeaser(false)
  }

  /* ── Update data from user input ── */
  function handleInputChange(key: string, value: string) {
    if (demoMode) handleUserInteract()
    setInputVal(value)
    setData((prev) => ({ ...prev, [key]: value }))
  }

  function switchType(id: string) {
    handleUserInteract()
    setActiveType(id)
    setData({})
    setInputVal('')
    setShowProTeaser(false)
  }

  function handleProTab() {
    handleUserInteract()
    setShowProTeaser(true)
  }

  const typeConfig  = FREE_TYPES.find((t) => t.id === activeType)
  const isDemo      = demoMode && !showProTeaser
  const currentDemo = DEMOS[demoIndex % DEMOS.length]

  return (
    <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-xl)] overflow-hidden">

      {/* ── Tab strip ── */}
      <div className="border-b border-[var(--border)] bg-[var(--bg)] px-4 pt-4">
        <div className="flex items-center gap-0.5 overflow-x-auto scrollbar-none pb-0">
          {FREE_TYPES.map((t) => {
            const Icon = t.icon
            const isActive = activeType === t.id && !showProTeaser && (!demoMode || currentDemo.type === t.id)
            return (
              <button
                key={t.id}
                onClick={() => switchType(t.id)}
                className={[
                  'flex shrink-0 items-center gap-1.5 rounded-t-lg px-3.5 py-2.5 text-[13px] font-medium border-b-2 transition-all duration-150',
                  isActive
                    ? 'border-[#0057FF] text-[#0057FF] bg-[var(--surface)]'
                    : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)]',
                ].join(' ')}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" />
                {t.label}
              </button>
            )
          })}

          <div className="mx-2 h-5 w-px shrink-0 bg-[var(--border)]" />

          {/* Pro tab */}
          <button
            onClick={handleProTab}
            className={[
              'flex shrink-0 items-center gap-1.5 rounded-t-lg px-3.5 py-2.5 text-[13px] font-medium border-b-2 transition-all duration-150',
              showProTeaser
                ? 'border-[#0057FF] text-[#0057FF] bg-[var(--surface)]'
                : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)]',
            ].join(' ')}
          >
            <Lock className="h-3 w-3 shrink-0" />
            <span>More types</span>
            <span className="rounded-full bg-[#0057FF]/10 px-1.5 py-0.5 text-[10px] font-bold text-[#0057FF]">
              {PRO_TYPES.length + 4}+
            </span>
          </button>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="p-6">
        {showProTeaser ? (
          /* ── Pro teaser ── */
          <div className="flex flex-col gap-5">
            <div className="text-center">
              <div className="mx-auto mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0057FF]/10">
                <Sparkles className="h-5 w-5 text-[#0057FF]" />
              </div>
              <h3 className="text-[15px] font-bold text-[var(--text-primary)]">Unlock 11+ more QR types</h3>
              <p className="mt-1.5 text-[13px] text-[var(--text-secondary)]">
                Email, Call, SMS, WhatsApp, all social networks, events & more.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {PRO_TYPES.slice(0, 9).map((t) => {
                const Icon = t.icon
                return (
                  <div key={t.id}
                    className="flex flex-col items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-3">
                    <div className="h-7 w-7 rounded-lg flex items-center justify-center" style={{ background: t.iconBg }}>
                      <Icon className="h-4 w-4" style={{ color: t.iconColor }} />
                    </div>
                    <span className="text-[11px] font-medium text-[var(--text-secondary)] text-center leading-tight">{t.label}</span>
                  </div>
                )
              })}
            </div>
            <Link href="/signup" className="block">
              <Button size="md" className="w-full glow-blue-sm">
                Get started free — unlock all types
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <p className="text-center text-[12px] text-[var(--text-tertiary)]">Pro from $5/mo · Cancel anytime</p>
          </div>

        ) : (
          /* ── Main generator ── */
          <div className="flex flex-col gap-5">

            {/* Header row */}
            <div className="flex items-center justify-between">
              <p className="text-[13px] font-medium text-[var(--text-secondary)]">
                {isDemo
                  ? <>Showing <span className="font-semibold text-[var(--text-primary)]">{demoLabel}</span> example</>
                  : typeConfig?.description ?? 'Fill in the fields below'}
              </p>
              <div className="flex items-center gap-2">
                {isDemo && (
                  <span className="flex items-center gap-1.5 rounded-full bg-[#0057FF]/10 px-2.5 py-1 text-[11px] font-semibold text-[#0057FF]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#0057FF]"
                      style={{ animation: 'pulseGlow 1.2s ease-in-out infinite' }} />
                    Demo
                  </span>
                )}
                {debouncedContent && !isDemo && (
                  <span className="rounded-full bg-[#10B981]/10 px-2.5 py-0.5 text-[11px] font-semibold text-[#10B981]">
                    Ready
                  </span>
                )}
              </div>
            </div>

            {/* Input fields */}
            {activeType === 'url' && (
              <div className="relative">
                <Input
                  type="url"
                  placeholder="https://your-website.com"
                  value={isDemo ? inputVal : (data.url ?? '')}
                  onChange={(e) => handleInputChange('url', e.target.value)}
                  onFocus={handleUserInteract}
                  autoComplete="off"
                />
                {isTyping && (
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-0.5 bg-[#0057FF] rounded-full"
                    style={{ animation: 'pulseGlow 0.8s ease-in-out infinite' }} />
                )}
              </div>
            )}

            {(activeType === 'wifi' || (isDemo && currentDemo.type === 'wifi')) && (
              <div className="space-y-2.5">
                <Input placeholder="Network name (SSID)"
                  value={isDemo ? inputVal : (data.ssid ?? '')}
                  onChange={(e) => handleInputChange('ssid', e.target.value)}
                  onFocus={handleUserInteract} />
                <Input type="password" placeholder="Password"
                  value={isDemo ? (data.password ?? '') : (data.password ?? '')}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  onFocus={handleUserInteract} />
              </div>
            )}

            {(activeType === 'vcard' || (isDemo && currentDemo.type === 'vcard')) && (
              <div className="space-y-2.5">
                <Input placeholder="Full name *"
                  value={isDemo ? inputVal : (data.name ?? '')}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  onFocus={handleUserInteract} />
                <Input placeholder="Company"
                  value={isDemo ? (data.company ?? '') : (data.company ?? '')}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  onFocus={handleUserInteract} />
                <div className="grid grid-cols-2 gap-2.5">
                  <Input type="tel" placeholder="Phone"
                    value={isDemo ? (data.phone ?? '') : (data.phone ?? '')}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    onFocus={handleUserInteract} />
                  <Input type="email" placeholder="Email"
                    value={isDemo ? (data.email ?? '') : (data.email ?? '')}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    onFocus={handleUserInteract} />
                </div>
              </div>
            )}

            {activeType === 'text' && !isDemo && (
              <textarea rows={3} placeholder="Type any text, note, or message…"
                value={data.text ?? ''}
                onChange={(e) => handleInputChange('text', e.target.value)}
                onFocus={handleUserInteract}
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3.5 py-2.5 text-[14px] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none focus:border-[#0057FF]/50 focus:ring-2 focus:ring-[#0057FF]/15 resize-none transition-all"
              />
            )}

            {/* QR Preview */}
            <div className="flex justify-center">
              <div className={debouncedContent ? 'animate-qr-appear' : ''}>
                <QRPreview content={debouncedContent} size={200} />
              </div>
            </div>

            {/* Actions */}
            {debouncedContent && !isDemo ? (
              <>
                <QRDownload content={debouncedContent} filename="qrwide-code" />
                <div className="flex items-center justify-center gap-1.5 text-[13px] text-[var(--text-secondary)]">
                  <Link href="/signup"
                    className="inline-flex items-center gap-1 font-semibold text-[#0057FF] hover:underline">
                    Save & track scans <ArrowRight className="h-3 w-3" />
                  </Link>
                  <span>· Free, 30 seconds</span>
                </div>
              </>
            ) : debouncedContent && isDemo ? (
              /* Demo actions — nudge user to try their own */
              <div className="flex flex-col items-center gap-3">
                <p className="text-[12.5px] text-[var(--text-secondary)] text-center">
                  Click the input above to try with your own URL
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <QRDownload content={debouncedContent} filename="qrwide-demo" />
                </div>
                <Link href="/signup"
                  className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#0057FF] hover:underline">
                  Sign up to save & track scans <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            ) : (
              <p className="text-center text-[12.5px] text-[var(--text-tertiary)]">
                Fill in the fields above — QR code appears instantly
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
