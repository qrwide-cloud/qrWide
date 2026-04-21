import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'
import Link from 'next/link'
import { AuthForm } from '@/components/auth/AuthForm'

export const metadata: Metadata = {
  title: 'Sign up free | QRWide',
  robots: { index: false, follow: false },
}

export default function SignupPage({ searchParams }: { searchParams: { redirectTo?: string } }) {
  const loginHref = searchParams.redirectTo
    ? `/login?redirectTo=${encodeURIComponent(searchParams.redirectTo)}`
    : '/login'

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[var(--surface)]">
      <Link href="/" className="font-bold text-[#0066FF] text-2xl mb-8">QRWide</Link>
      <div className="w-full max-w-sm bg-white dark:bg-[#141414] rounded-[16px] border border-[var(--border)] p-8 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
        <h1 className="text-xl font-bold text-[var(--text-primary)] mb-1">Create your account</h1>
        <p className="text-sm text-[var(--text-secondary)] mb-6">Free forever. No credit card required.</p>
        <AuthForm mode="signup" redirectTo={searchParams.redirectTo} />
        <p className="mt-6 text-center text-sm text-[var(--text-secondary)]">
          Already have an account?{' '}
          <Link href={loginHref} className="text-[#0066FF] hover:underline font-medium">Log in</Link>
        </p>
      </div>
    </div>
  )
}
