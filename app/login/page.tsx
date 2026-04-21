import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'
import Link from 'next/link'
import { AuthForm } from '@/components/auth/AuthForm'

export const metadata: Metadata = {
  title: 'Log in | QRWide',
  robots: { index: false, follow: false },
}

export default function LoginPage({ searchParams }: { searchParams: { redirectTo?: string } }) {
  const signupHref = searchParams.redirectTo
    ? `/signup?redirectTo=${encodeURIComponent(searchParams.redirectTo)}`
    : '/signup'

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[var(--surface)]">
      <Link href="/" className="font-bold text-[#0066FF] text-2xl mb-8">QRWide</Link>
      <div className="w-full max-w-sm bg-white dark:bg-[#141414] rounded-[16px] border border-[var(--border)] p-8 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
        <h1 className="text-xl font-bold text-[var(--text-primary)] mb-1">Welcome back</h1>
        <p className="text-sm text-[var(--text-secondary)] mb-6">Sign in to your QRWide account</p>
        <AuthForm mode="login" redirectTo={searchParams.redirectTo} />
        <p className="mt-6 text-center text-sm text-[var(--text-secondary)]">
          Don't have an account?{' '}
          <Link href={signupHref} className="text-[#0066FF] hover:underline font-medium">Sign up free</Link>
        </p>
      </div>
    </div>
  )
}
