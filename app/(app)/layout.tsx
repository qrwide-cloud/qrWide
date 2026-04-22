import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { AppSidebar } from '@/components/layout/AppSidebar'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = headers().get('x-pathname') ?? ''
  const publicAppPaths = new Set(['/create'])

  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user && publicAppPaths.has(pathname)) {
    return <>{children}</>
  }

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div className="flex min-h-screen bg-[var(--bg)]">
      <AppSidebar user={user} profile={profile} />
      <main className="flex-1 min-w-0 flex flex-col">
        {/* Mobile: pad below fixed top bar */}
        <div className="md:hidden h-14 shrink-0" />
        {children}
        {/* Mobile: pad above fixed bottom tab bar */}
        <div className="md:hidden shrink-0" style={{ height: 'calc(56px + env(safe-area-inset-bottom, 0px))' }} />
      </main>
    </div>
  )
}
