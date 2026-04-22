'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useToast } from '@/components/ui/Toast'
import { createClient } from '@/lib/supabase/client'

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const { toast } = useToast()
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    try {
      const redirectTo = `${window.location.origin}/auth/callback?next=/auth/update-password`
      const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo })
      if (error) throw error
      setSent(true)
    } catch (err: unknown) {
      toast((err as Error).message ?? 'Something went wrong', 'error')
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="text-center space-y-3">
        <div className="text-4xl">📬</div>
        <h3 className="font-semibold text-[var(--text-primary)]">Check your email</h3>
        <p className="text-sm text-[var(--text-secondary)]">
          We sent a reset link to <strong>{email}</strong>. It expires in 1 hour.
        </p>
        <p className="text-xs text-[var(--text-tertiary)]">
          Didn't get it? Check your spam folder or{' '}
          <button onClick={() => setSent(false)} className="text-[#0057FF] hover:underline">try again</button>.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="email"
      />
      <Button type="submit" className="w-full" loading={loading}>
        Send reset link
      </Button>
    </form>
  )
}
