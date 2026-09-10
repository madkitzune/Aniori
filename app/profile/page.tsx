import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AnimatedBg from '@/components/AnimatedBg'
import ProfileDashboard from '@/components/profile/ProfileDashboard'

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const username = user.user_metadata?.username ?? user.email?.split('@')[0] ?? 'Аноним'
  const email = user.email ?? ''
  const joinedAt = new Date(user.created_at).toLocaleDateString('ru-RU', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <div className="relative min-h-screen px-5 md:px-10 py-10" style={{ background: '#111' }}>
      <AnimatedBg />
      <div className="relative z-[2]">
        <ProfileDashboard username={username} email={email} joinedAt={joinedAt} />
      </div>
    </div>
  )
}
