'use client'

import { logout } from '@/app/auth/actions'

export default function LogoutBlock() {
  return (
    <div className="rounded-2xl h-full flex flex-col items-center justify-center p-4" style={{ background: '#1e1e1e', minHeight: 120 }}>
      <form action={logout} className="w-full">
        <button
          type="submit"
          className="w-full py-2.5 rounded-xl text-sm transition-all group"
          style={{ color: '#666', border: '1px solid #2a2a2a', background: 'transparent' }}
          onMouseEnter={e => {
            ;(e.currentTarget as HTMLButtonElement).style.color = '#ff6b6b'
            ;(e.currentTarget as HTMLButtonElement).style.borderColor = '#ff6b6b33'
            ;(e.currentTarget as HTMLButtonElement).style.background = '#ff6b6b11'
          }}
          onMouseLeave={e => {
            ;(e.currentTarget as HTMLButtonElement).style.color = '#666'
            ;(e.currentTarget as HTMLButtonElement).style.borderColor = '#2a2a2a'
            ;(e.currentTarget as HTMLButtonElement).style.background = 'transparent'
          }}
        >
          🚪 Выйти из аккаунта
        </button>
      </form>
    </div>
  )
}
