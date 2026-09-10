'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { searchAnime, Anime } from '@/lib/anime'

interface Props {
  defaultValue?: string
}

export default function CatalogSearch({ defaultValue = '' }: Props) {
  const [query, setQuery] = useState(defaultValue)
  const [suggestions, setSuggestions] = useState<Anime[]>([])
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setSuggestions(searchAnime(query).slice(0, 6))
    setActive(-1)
    setOpen(query.trim().length > 0)
  }, [query])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Двойной быстрый Enter — фокус на поиск
  useEffect(() => {
    let lastEnter = 0
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Enter') return
      const el = document.activeElement
      if (el === inputRef.current) return
      const tag = (el?.tagName ?? '').toLowerCase()
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return
      const now = Date.now()
      if (now - lastEnter < 400) {
        e.preventDefault()
        inputRef.current?.focus()
        lastEnter = 0
      } else {
        lastEnter = now
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const submit = (q: string) => {
    const trimmed = q.trim()
    setOpen(false)
    setQuery(trimmed)
    if (trimmed) router.push(`/catalog?q=${encodeURIComponent(trimmed)}`)
    else router.push('/catalog')
  }

  const clear = () => {
    setQuery('')
    setOpen(false)
    router.push('/catalog')
    inputRef.current?.focus()
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (!open || suggestions.length === 0) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive(v => Math.min(v + 1, suggestions.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive(v => Math.max(v - 1, -1))
    } else if (e.key === 'Enter') {
      if (active >= 0) {
        e.preventDefault()
        submit(suggestions[active].titleRu)
      }
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <div ref={containerRef} className="w-full mb-6" style={{ position: 'relative' }}>
      <form onSubmit={e => { e.preventDefault(); submit(query) }}>
        <div
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: '#1e1e1e',
            border: `1px solid ${open && suggestions.length > 0 ? '#3a3a3a' : '#2a2a2a'}`,
            borderRadius: open && suggestions.length > 0 ? '12px 12px 0 0' : 12,
            height: 48, padding: '0 16px',
            transition: 'border-color 0.2s, border-radius 0.15s',
          }}
        >
          <i className="ti ti-search" style={{ fontSize: 18, color: '#555', flexShrink: 0 }} aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => query.trim() && setOpen(true)}
            onKeyDown={handleKey}
            placeholder="Поиск: название, жанр или аббревиатура (КРД, JJK)…"
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              color: '#fff', fontSize: 14, fontFamily: 'Rubik, sans-serif',
            }}
            autoComplete="off"
          />
          {query && (
            <button type="button" onClick={clear} aria-label="Очистить"
              style={{ color: '#555', background: 'none', border: 'none', cursor: 'pointer', padding: 4, lineHeight: 1, flexShrink: 0 }}>
              <i className="ti ti-x" style={{ fontSize: 16 }} aria-hidden="true" />
            </button>
          )}
          <button
            type="submit"
            style={{
              background: '#2a2a2a', border: 'none', borderRadius: 8,
              color: '#aaa', cursor: 'pointer', padding: '6px 14px',
              fontSize: 13, fontFamily: 'Rubik, sans-serif', flexShrink: 0,
              transition: 'background 0.2s, color 0.2s',
            }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#333'; el.style.color = '#fff' }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#2a2a2a'; el.style.color = '#aaa' }}
          >
            Найти
          </button>
        </div>
      </form>

      {open && suggestions.length > 0 && (
        <div style={{
          position: 'absolute', top: 48, left: 0, right: 0, zIndex: 50,
          background: '#1e1e1e', border: '1px solid #3a3a3a', borderTop: 'none',
          borderRadius: '0 0 12px 12px', overflow: 'hidden',
        }}>
          {suggestions.map((anime, i) => (
            <button
              key={anime.id}
              onMouseDown={() => submit(anime.titleRu)}
              onMouseEnter={() => setActive(i)}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                width: '100%', padding: '10px 16px', border: 'none', cursor: 'pointer',
                background: i === active ? '#2a2a2a' : 'transparent',
                textAlign: 'left', transition: 'background 0.1s',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={anime.cover} alt=""
                style={{ width: 32, height: 44, objectFit: 'cover', borderRadius: 5, flexShrink: 0, background: '#111' }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ color: '#fff', fontSize: 13, fontWeight: 500, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {anime.titleRu}
                </p>
                <p style={{ color: '#555', fontSize: 11, margin: '2px 0 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {anime.title} · {anime.genre.slice(0, 2).join(', ')}
                </p>
              </div>
              <span style={{ color: '#555', fontSize: 11, flexShrink: 0 }}>★ {anime.rating}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
