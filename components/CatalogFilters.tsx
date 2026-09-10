'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

const GENRES = [
  'Экшн', 'Драма', 'Комедия', 'Фэнтези', 'Романтика',
  'Психологическое', 'Sci-Fi', 'Триллер', 'Приключения', 'Меха',
]

interface Pill {
  label: string
  key: string
  value: string
  icon?: string
}

const STATUS_PILLS: Pill[] = [
  { label: 'Онгоинг', key: 'status', value: 'ongoing' },
  { label: 'Завершено', key: 'status', value: 'finished' },
]

const SORT_PILLS: Pill[] = [
  { label: '★ Топ рейтинг', key: 'sort', value: 'rating' },
  { label: 'Новее', key: 'sort', value: 'year_desc' },
  { label: 'А–Я', key: 'sort', value: 'title' },
]

export default function CatalogFilters() {
  const router = useRouter()
  const params = useSearchParams()

  const genre = params.get('genre') ?? ''
  const status = params.get('status') ?? ''
  const sort = params.get('sort') ?? ''

  const toggle = useCallback(
    (key: string, value: string) => {
      const p = new URLSearchParams(params.toString())
      p.delete('q')
      if (p.get(key) === value) p.delete(key)
      else p.set(key, value)
      router.push(`/catalog?${p.toString()}`)
    },
    [params, router]
  )

  const pillStyle = (active: boolean): React.CSSProperties => ({
    padding: '5px 13px',
    borderRadius: 20,
    fontSize: 12,
    fontWeight: active ? 600 : 400,
    border: 'none',
    cursor: 'pointer',
    background: active ? '#fff' : '#1e1e1e',
    color: active ? '#111' : '#777',
    transition: 'background 0.15s, color 0.15s',
    whiteSpace: 'nowrap' as const,
    fontFamily: 'Rubik, sans-serif',
  })

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
      {/* Жанры */}
      {GENRES.map(g => (
        <button key={g} style={pillStyle(genre === g)} onClick={() => toggle('genre', g)}>
          {g}
        </button>
      ))}

      <div style={{ width: 1, background: '#2a2a2a', margin: '0 2px', alignSelf: 'stretch' }} />

      {/* Статус */}
      {STATUS_PILLS.map(p => (
        <button key={p.value} style={pillStyle(status === p.value)} onClick={() => toggle(p.key, p.value)}>
          {p.label}
        </button>
      ))}

      <div style={{ width: 1, background: '#2a2a2a', margin: '0 2px', alignSelf: 'stretch' }} />

      {/* Сортировка */}
      {SORT_PILLS.map(p => (
        <button key={p.value} style={pillStyle(sort === p.value)} onClick={() => toggle(p.key, p.value)}>
          {p.label}
        </button>
      ))}
    </div>
  )
}
