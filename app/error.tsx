'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[var(--bg)]">
      <div className="max-w-md text-center">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">Something went wrong</h2>
        <p className="text-[var(--text-secondary)] mb-6">
          {error.message ?? 'An unexpected error occurred. Our team has been notified.'}
        </p>
        <button
          onClick={reset}
          className="bg-[#0066FF] text-white rounded-[8px] px-6 py-2.5 font-medium hover:bg-[#0052CC] transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
