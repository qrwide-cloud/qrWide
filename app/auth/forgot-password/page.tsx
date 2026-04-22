import type { Metadata } from 'next'
import Link from 'next/link'
import { ForgotPasswordForm } from './ForgotPasswordForm'
import { QRMark } from '@/components/layout/Navbar'

export const metadata: Metadata = {
  title: 'Reset password | QRWide',
  robots: { index: false, follow: false },
}

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[var(--surface)]">
      <Link href="/" className="flex items-center gap-2.5 mb-8 group">
        <QRMark size={28} />
        <span className="font-bold text-[15px] tracking-[-0.02em] text-[var(--text-primary)] group-hover:text-[#0057FF] transition-colors">
          QRWide
        </span>
      </Link>
      <div className="w-full max-w-sm bg-white dark:bg-[#141414] rounded-[16px] border border-[var(--border)] p-8 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
        <h1 className="text-xl font-bold text-[var(--text-primary)] mb-1">Reset your password</h1>
        <p className="text-sm text-[var(--text-secondary)] mb-6">
          Enter your email and we'll send you a reset link.
        </p>
        <ForgotPasswordForm />
        <p className="mt-6 text-center text-sm text-[var(--text-secondary)]">
          Remember it?{' '}
          <Link href="/login" className="text-[#0057FF] hover:underline font-medium">Back to login</Link>
        </p>
      </div>
    </div>
  )
}
