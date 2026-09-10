import type { Metadata } from 'next'
import './globals.css'
import { createClient } from '@/lib/supabase/server'
import Header from '@/components/Header'

export const metadata: Metadata = {
  title: 'Aniori — Смотри аниме',
  description: 'Стриминг аниме в высоком качестве',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const username = user?.user_metadata?.username ?? user?.email?.split('@')[0]

  return (
    <html lang="ru">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css" />
      </head>
      <body suppressHydrationWarning>
        <Header isLoggedIn={!!user} username={username} />
        <main style={{ paddingTop: 72 }}>
          {children}
        </main>
      </body>
    </html>
  )
}
