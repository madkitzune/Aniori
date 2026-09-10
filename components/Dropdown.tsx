'use client'

import { useRouter, usePathname } from 'next/navigation'
import { logout } from '@/app/auth/actions'

interface Props {
  open: boolean
  onClose: () => void
  isLoggedIn: boolean
  username?: string
}

export default function Dropdown({ open, onClose, isLoggedIn, username }: Props) {
  const router = useRouter()
  const pathname = usePathname()

  const go = (path: string) => {
    router.push(path)
    onClose()
  }

  const initial = username?.[0]?.toUpperCase() ?? '?'
  const title = isLoggedIn ? (username ?? 'Aniori') : 'Aniori'
  const at = (path: string) => pathname === path

  return (
    <>
      <div
        className={`fixed inset-0 z-[1000] transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ background: 'rgba(0,0,0,0.5)' }}
        onClick={onClose}
      />

      <nav
        className={`dropdown-menu fixed top-[72px] left-0 z-[1001] h-[calc(100vh-72px)] flex flex-col p-5 shadow-2xl ${open ? 'open' : ''}`}
        style={{ width: 240, background: '#111', gap: 0 }}
      >
        {/* Шапка */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: '#2a2a2a', display: 'flex', alignItems: 'center',
            justifyContent: 'center', color: '#aaa', fontSize: 14, fontWeight: 600,
            flexShrink: 0,
          }}>
            {initial}
          </div>
          <span style={{ color: '#fff', fontSize: 16, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</span>
        </div>

        {/* Пункты */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
          {isLoggedIn ? (
            <>
              {!at('/profile')   && <NavItem icon="ti-user"   label="Профиль"   onClick={() => go('/profile')} />}
              {!at('/catalog')   && <NavItem icon="ti-movie"  label="Каталог"   onClick={() => go('/catalog')} />}
              <NavItem icon="ti-bookmark" label="Избранное" onClick={() => go('/catalog')} />
              {!at('/subscribe') && <NavItem icon="ti-star"   label="Подписка"  accent onClick={() => go('/subscribe')} />}
              <Divider />
              <NavItem icon="ti-brand-telegram" label="Telegram" onClick={() => window.open('https://t.me/AnioriStream', '_blank')} />
              <NavItem icon="ti-logout" label="Выйти" onClick={() => { logout(); onClose() }} />
            </>
          ) : (
            <>
              {!at('/login')     && <NavItem icon="ti-login"  label="Войти"         onClick={() => go('/login')} />}
              {!at('/register')  && <NavItem icon="ti-user-plus" label="Регистрация" onClick={() => go('/register')} />}
              {!at('/catalog')   && <NavItem icon="ti-movie"  label="Каталог"        onClick={() => go('/catalog')} />}
              {!at('/subscribe') && <NavItem icon="ti-star"   label="Подписка"       accent onClick={() => go('/subscribe')} />}
              <Divider />
              <NavItem icon="ti-brand-telegram" label="Telegram" onClick={() => window.open('https://t.me/AnioriStream', '_blank')} />
            </>
          )}
        </div>
      </nav>
    </>
  )
}

function NavItem({
  icon, label, onClick, active, accent,
}: {
  icon: string
  label: string
  onClick: () => void
  active?: boolean
  accent?: boolean
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '9px 10px', borderRadius: 8, border: 'none', cursor: 'pointer',
        background: active ? '#222' : 'transparent',
        transition: 'background 0.15s',
        width: '100%', textAlign: 'left',
      }}
      onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = '#1a1a1a' }}
      onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent' }}
    >
      <i
        className={`ti ${icon}`}
        style={{ fontSize: 16, color: accent ? '#e6a817' : active ? '#ccc' : '#666', flexShrink: 0 }}
        aria-hidden="true"
      />
      <span style={{ fontSize: 13, color: accent ? '#e6a817' : active ? '#fff' : '#888' }}>
        {label}
      </span>
    </button>
  )
}

function Divider() {
  return <div style={{ height: 1, background: '#1e1e1e', margin: '6px 0' }} />
}
