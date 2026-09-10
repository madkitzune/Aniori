'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Dropdown from './Dropdown'

interface Props {
  isLoggedIn: boolean
  username?: string
}

export default function Header({ isLoggedIn, username }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const onProfile = pathname === '/profile'

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-[1002] flex items-center justify-between px-6 md:px-10"
        style={{ height: 72, background: '#111' }}
      >
        <button
          className="logo-gradient text-[22px] font-semibold bg-transparent border-none cursor-pointer px-3 py-2 rounded-lg transition-all duration-200 hover:bg-white/5 relative overflow-hidden"
          onClick={() => setMenuOpen(v => !v)}
          style={{ fontFamily: 'Rubik, sans-serif' }}
        >
          Aniori
          <span
            className="absolute bottom-0 left-0 h-[2px] w-full"
            style={{
              background: 'linear-gradient(to right, #b0b0b0, #e0e0e0, #909090)',
              transform: menuOpen ? 'scaleX(1)' : 'scaleX(0)',
              transformOrigin: menuOpen ? 'left' : 'right',
              transition: 'transform 0.3s ease',
            }}
          />
        </button>

        {isLoggedIn ? (
          !onProfile && (
            <button
              onClick={() => router.push('/profile')}
              className="w-9 h-9 rounded-full bg-[#333] flex items-center justify-center text-white text-sm font-semibold hover:bg-[#444] transition-colors"
              title={username}
            >
              {username?.[0]?.toUpperCase() ?? '?'}
            </button>
          )
        ) : (
          <button
            onClick={() => router.push('/login')}
            className="text-sm text-[#aaa] hover:text-white transition-colors"
          >
            Войти
          </button>
        )}
      </header>

      <Dropdown open={menuOpen} onClose={() => setMenuOpen(false)} isLoggedIn={isLoggedIn} username={username} />
    </>
  )
}
