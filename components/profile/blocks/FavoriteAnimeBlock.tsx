'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { animeList, Anime } from '@/lib/anime'

interface Props {
  favoriteId: string | null
  onSelect: (id: string) => void
}

export default function FavoriteAnimeBlock({ favoriteId, onSelect }: Props) {
  const [picking, setPicking] = useState(false)
  const router = useRouter()
  const anime = animeList.find(a => a.id === favoriteId) ?? null

  if (picking) {
    return (
      <div
        className="rounded-2xl h-full p-3 flex flex-col"
        style={{ background: '#1e1e1e', minHeight: 120, border: '1px solid #2a2a2a' }}
      >
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#555' }}>Выбрать аниме</p>
          <button onClick={() => setPicking(false)} className="text-xs" style={{ color: '#555' }}>✕</button>
        </div>
        <div className="flex flex-col gap-1 overflow-y-auto flex-1" style={{ maxHeight: 200 }}>
          {animeList.map(a => (
            <button
              key={a.id}
              onClick={() => { onSelect(a.id); setPicking(false) }}
              className="flex items-center gap-2 p-1.5 rounded-lg text-left transition-all hover:bg-[#2a2a2a]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={a.cover} alt={a.title} className="w-8 h-10 rounded object-cover flex-shrink-0" />
              <div>
                <p className="text-white text-xs font-medium leading-none mb-0.5">{a.title}</p>
                <p className="text-xs" style={{ color: '#555' }}>★ {a.rating}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (!anime) {
    return (
      <button
        onClick={() => setPicking(true)}
        className="rounded-2xl h-full w-full flex flex-col items-center justify-center gap-2 p-4 transition-all group"
        style={{ background: '#1e1e1e', minHeight: 120, border: '1px dashed #2a2a2a' }}
      >
        <span className="text-2xl group-hover:scale-110 transition-transform">❤️</span>
        <p className="text-sm" style={{ color: '#555' }}>Выбрать любимое аниме</p>
      </button>
    )
  }

  return (
    <div
      className="rounded-2xl h-full overflow-hidden relative cursor-pointer group"
      style={{ background: '#1e1e1e', minHeight: 120 }}
      onClick={() => router.push(`/watch/${anime.id}`)}
    >
      {/* Cover bg */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={anime.cover}
        alt={anime.title}
        className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity"
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 60%)' }} />

      <div className="relative z-10 p-4 h-full flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#888' }}>❤️ Любимое</span>
          <button
            onClick={e => { e.stopPropagation(); setPicking(true) }}
            className="text-xs px-2 py-0.5 rounded-lg transition-all hover:bg-white/10"
            style={{ color: '#555' }}
          >
            ✏️
          </button>
        </div>
        <div>
          <p className="text-white font-bold text-sm leading-tight">{anime.title}</p>
          <p className="text-xs mt-0.5" style={{ color: '#888' }}>{anime.titleRu} · ★ {anime.rating}</p>
        </div>
      </div>
    </div>
  )
}
