'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import AnimatedBg from '@/components/AnimatedBg'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/catalog')
      router.refresh()
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4" style={{ background: '#111' }}>
      <AnimatedBg />
      <div
        className="relative z-10 w-full max-w-md rounded-2xl p-8"
        style={{ background: 'rgba(25,25,25,0.85)', backdropFilter: 'blur(12px)', boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}
      >
        <h1 className="logo-gradient text-2xl font-bold mb-1" style={{ fontFamily: 'Rubik, sans-serif' }}>
          Aniori
        </h1>
        <p className="text-[#888] text-sm mb-8">Войдите в аккаунт</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm text-[#aaa] mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="input-aniori"
            />
          </div>
          <div>
            <label className="block text-sm text-[#aaa] mb-1.5">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="input-aniori"
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="btn-shimmer mt-2 py-3 rounded-lg text-white font-medium border-none cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Входим...' : 'Войти'}
          </button>
        </form>

        <p className="text-center text-sm text-[#777] mt-6">
          Нет аккаунта?{' '}
          <Link href="/register" className="text-[#aaa] hover:text-white transition-colors">
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </div>
  )
}
