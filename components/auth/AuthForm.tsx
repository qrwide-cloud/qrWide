'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useToast } from '@/components/ui/Toast'
import { createClient } from '@/lib/supabase/client'

interface AuthFormProps {
  mode: 'login' | 'signup'
  redirectTo?: string
}

export function AuthForm({ mode, redirectTo = '/dashboard' }: AuthFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const supabase = createClient()
  const router = useRouter()
  const { toast } = useToast()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      if (mode === 'signup') {
        const encodedRedirect = encodeURIComponent(redirectTo)
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodedRedirect}` },
        })
        if (error) throw error
        setSent(true)
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        router.push(redirectTo)
        router.refresh()
      }
    } catch (err: unknown) {
      toast((err as Error).message ?? 'Something went wrong', 'error')
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogle() {
    setGoogleLoading(true)
    const encodedRedirect = encodeURIComponent(redirectTo)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodedRedirect}`,
      },
    })
    if (error) toast(error.message, 'error')
    setGoogleLoading(false)
  }

  if (sent) {
    return (
      <div className="text-center space-y-3">
        <div className="text-4xl">📬</div>
        <h3 className="font-semibold text-[var(--text-primary)]">Check your email</h3>
        <p className="text-sm text-[var(--text-secondary)]">
          We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Google OAuth */}
      <Button
        variant="secondary"
        className="w-full"
        loading={googleLoading}
        onClick={handleGoogle}
        type="button"
      >
        <GoogleIcon />
        Continue with Google
      </Button>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-[var(--border)]" />
        <span className="text-xs text-[var(--text-secondary)]">or</span>
        <div className="flex-1 h-px bg-[var(--border)]" />
      </div>

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
        <Input
          label="Password"
          type="password"
          placeholder={mode === 'signup' ? 'At least 8 characters' : 'Your password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
          minLength={8}
        />
        <Button type="submit" className="w-full" loading={loading}>
          {mode === 'signup' ? 'Create free account' : 'Sign in'}
        </Button>
      </form>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M15.68 8.18c0-.57-.05-1.12-.14-1.64H8v3.1h4.3a3.68 3.68 0 01-1.6 2.41v2h2.58c1.51-1.39 2.4-3.44 2.4-5.87z" fill="#4285F4"/>
      <path d="M8 16c2.16 0 3.97-.71 5.3-1.93l-2.58-2a4.8 4.8 0 01-7.14-2.52H.94v2.07A8 8 0 008 16z" fill="#34A853"/>
      <path d="M3.58 9.55A4.8 4.8 0 013.34 8c0-.54.09-1.06.24-1.55V4.38H.94A8 8 0 000 8c0 1.29.31 2.51.94 3.62l2.64-2.07z" fill="#FBBC05"/>
      <path d="M8 3.2a4.34 4.34 0 013.07 1.2l2.3-2.3A7.72 7.72 0 008 0 8 8 0 00.94 4.38L3.58 6.45A4.77 4.77 0 018 3.2z" fill="#EA4335"/>
    </svg>
  )
}
