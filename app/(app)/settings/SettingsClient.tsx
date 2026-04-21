'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { useToast } from '@/components/ui/Toast'
import { createClient } from '@/lib/supabase/client'
import type { Database } from '@/lib/db/schema'

type Profile = Database['public']['Tables']['profiles']['Row']

interface SettingsClientProps {
  profile: Profile | null
  userEmail: string
}

export function SettingsClient({ profile, userEmail }: SettingsClientProps) {
  const [name, setName] = useState(profile?.name ?? '')
  const [saving, setSaving] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system')
  const { toast } = useToast()
  const supabase = createClient()

  async function saveProfile() {
    setSaving(true)
    const { error } = await supabase.from('profiles').update({ name }).eq('id', profile?.id ?? '')
    if (error) toast('Failed to save', 'error')
    else toast('Saved!')
    setSaving(false)
  }

  function applyTheme(t: 'light' | 'dark' | 'system') {
    setTheme(t)
    if (t === 'dark') {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else if (t === 'light') {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    } else {
      localStorage.removeItem('theme')
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      document.documentElement.classList.toggle('dark', prefersDark)
    }
  }

  async function handleUpgrade(plan: 'pro' | 'business') {
    const res = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan, billingCycle: 'monthly' }),
    })
    const { checkoutUrl } = await res.json()
    if (checkoutUrl) window.location.href = checkoutUrl
  }

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-8">Settings</h1>

      <div className="space-y-6">
        {/* Profile */}
        <Card className="p-6">
          <h2 className="text-base font-semibold text-[var(--text-primary)] mb-4">Profile</h2>
          <div className="space-y-4">
            <Input
              label="Display name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[var(--text-primary)]">Email</label>
              <div className="h-10 rounded-[8px] border border-[var(--border)] bg-[var(--surface)] px-3 flex items-center text-sm text-[var(--text-secondary)]">
                {userEmail}
              </div>
            </div>
            <Button onClick={saveProfile} loading={saving} size="sm">Save changes</Button>
          </div>
        </Card>

        {/* Appearance */}
        <Card className="p-6">
          <h2 className="text-base font-semibold text-[var(--text-primary)] mb-4">Appearance</h2>
          <div className="flex gap-2">
            {(['system', 'light', 'dark'] as const).map((t) => (
              <button
                key={t}
                onClick={() => applyTheme(t)}
                className={[
                  'flex-1 rounded-[8px] border py-2 text-sm capitalize transition-all',
                  theme === t
                    ? 'border-[#0066FF] bg-[#0066FF]/10 text-[#0066FF] font-medium'
                    : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-[#0066FF]',
                ].join(' ')}
              >
                {t}
              </button>
            ))}
          </div>
        </Card>

        {/* Plan */}
        <Card className="p-6">
          <h2 className="text-base font-semibold text-[var(--text-primary)] mb-1">Current plan</h2>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-lg font-bold text-[var(--text-primary)] capitalize">
              {profile?.plan ?? 'free'}
            </span>
            {profile?.plan === 'free' && (
              <span className="text-xs bg-[var(--surface)] border border-[var(--border)] rounded px-2 py-0.5 text-[var(--text-secondary)]">
                Free forever
              </span>
            )}
          </div>
          {profile?.plan === 'free' && (
            <div className="flex flex-wrap gap-2">
              <Button size="sm" onClick={() => handleUpgrade('pro')}>Upgrade to Pro — $5/mo</Button>
              <Button size="sm" variant="secondary" onClick={() => handleUpgrade('business')}>Upgrade to Business — $9/mo</Button>
            </div>
          )}
          {profile?.plan !== 'free' && (
            <p className="text-sm text-[var(--text-secondary)]">
              Manage your subscription at{' '}
              <a href="https://billing.stripe.com" target="_blank" rel="noopener noreferrer" className="text-[#0066FF] hover:underline">
                billing.stripe.com
              </a>
            </p>
          )}
        </Card>

        {/* Danger zone */}
        <Card className="p-6 border-[#EF4444]/30">
          <h2 className="text-base font-semibold text-[#EF4444] mb-4">Danger zone</h2>
          <p className="text-sm text-[var(--text-secondary)] mb-4">
            Deleting your account permanently removes all your QR codes and data. This cannot be undone.
          </p>
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              if (confirm('Are you absolutely sure? This will delete all your QR codes and data permanently.')) {
                toast('Contact support@qrwide.com to complete account deletion.', 'info')
              }
            }}
          >
            Delete account
          </Button>
        </Card>
      </div>
    </div>
  )
}
