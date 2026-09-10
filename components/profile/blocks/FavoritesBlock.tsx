'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { animeList } from '@/lib/anime'

interface Props {
  favoriteIds: string[]
  onUpdate: (ids: string[]) => void
}

export default function FavoritesBlock({ favoriteIds, onUpdate }: Props) {
  const [editing, setEditing] = useState(false)
  const router = useRouter()
  const favorites = favoriteIds.map(id => animeList.find(a => a.id === id)).filter(Boolean)

  const toggle = (id: string) => {
    if (favoriteIds.includes(id)) {
      onUpdate(favoriteIds.filter(f => f !== id))
    } else if (favoriteIds.length < 5) {
      onUpdate([...favoriteIds, id])
    }
  }

  if (editing) {
    return (
      <div className="rounded-2xl h-full p-3 flex flex-col" style={{ background: '#1e1e1e', minHeight: 140 }}>
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs uppercase tracking-widest" style={{ color: '#555' }}>Выбрать (до 5)</p>
          <button onClick={() => setEditing(false)} className="text-xs px-2 py-0.5 rounded" style={{ background: '#2a2a2a', color: '#aaa' }}>Готово</button>
        </div>
        <div className="flex flex-col gap-1 overflow-y-auto flex-1" style={{ maxHeight: 220 }}>
          {animeList.map(a => {
            const selected = favoriteIds.includes(a.id)
            return (
              <button key={a.id} onClick={() => toggle(a.id)}
                className="flex items-center gap-2 p-1.5 rounded-lg text-left transition-all"
                style={{ background: selected ? '#2a2a2a' : 'transparent', border: selected ? '1px solid #444' : '1px solid transparent' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={a.cover} alt={a.title} className="w-7 h-9 rounded object-cover flex-shrink-0" />
                <p className="text-xs font-medium" style={{ color: selected ? '#fff' : '#777' }}>{a.title}</p>
                {selected && <span className="ml-auto text-xs" style={{ color: '#60a5fa' }}>✓</span>}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  if (favorites.length === 0) {
    return (
      <button onClick={() => setEditing(true)}
        className="rounded-2xl h-full w-full flex flex-col items-center justify-center gap-2 p-4 group transition-all"
        style={{ background: '#1e1e1e', minHeight: 120, border: '1px dashed #2a2a2a' }}>
        <span className="text-2xl group-hover:scale-110 transition-transform">⭐</span>
        <p className="text-sm" style={{ color: '#555' }}>Добавить избранное</p>
      </button>
    )
  }

  return (
    <div className="rounded-2xl h-full p-4 flex flex-col" style={{ background: '#1e1e1e', minHeight: 120 }}>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs uppercase tracking-widest" style={{ color: '#555' }}>⭐ Избранное</p>
        <button onClick={() => setEditing(true)} className="text-xs" style={{ color: '#444' }}>✏️</button>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {favorites.map(a => a && (
          <button key={a.id} onClick={() => router.push(`/watch/${a.id}`)}
            className="flex-shrink-0 rounded-lg overflow-hidden transition-all hover:scale-105 hover:brightness-110"
            style={{ width: 52, height: 70 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={a.cover} alt={a.title} className="w-full h-full object-cover" title={a.title} />
          </button>
        ))}
      </div>
    </div>
  )
}
