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
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
