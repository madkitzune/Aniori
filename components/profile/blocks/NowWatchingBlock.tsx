'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { animeList } from '@/lib/anime'

interface Props {
  animeId: string | null
  episode: number
  totalEpisodes: number
  onSelect: (id: string) => void
  onEpisodeChange: (ep: number) => void
}

export default function NowWatchingBlock({ animeId, episode, totalEpisodes, onSelect, onEpisodeChange }: Props) {
  const [picking, setPicking] = useState(false)
  const router = useRouter()
  const anime = animeList.find(a => a.id === animeId) ?? null
  const progress = anime ? Math.round((episode / anime.episodes) * 100) : 0

  if (picking) {
    return (
      <div className="rounded-2xl h-full p-3 flex flex-col" style={{ background: '#1e1e1e', minHeight: 120 }}>
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#555' }}>Выбрать аниме</p>
          <button onClick={() => setPicking(false)} className="text-xs" style={{ color: '#555' }}>✕</button>
        </div>
        <div className="flex flex-col gap-1 overflow-y-auto flex-1" style={{ maxHeight: 200 }}>
          {animeList.map(a => (
            <button key={a.id} onClick={() => { onSelect(a.id); setPicking(false) }}
              className="flex items-center gap-2 p-1.5 rounded-lg text-left transition-all hover:bg-[#2a2a2a]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={a.cover} alt={a.title} className="w-8 h-10 rounded object-cover flex-shrink-0" />
              <div>
                <p className="text-white text-xs font-medium leading-none mb-0.5">{a.title}</p>
                <p className="text-xs" style={{ color: '#555' }}>{a.episodes} эп.</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (!anime) {
    return (
      <button onClick={() => setPicking(true)}
        className="rounded-2xl h-full w-full flex flex-col items-center justify-center gap-2 p-4 transition-all group"
        style={{ background: '#1e1e1e', minHeight: 120, border: '1px dashed #2a2a2a' }}>
        <span className="text-2xl group-hover:scale-110 transition-transform">🎬</span>
        <p className="text-sm" style={{ color: '#555' }}>Выбрать аниме</p>
      </button>
    )
  }

  return (
    <div className="rounded-2xl h-full overflow-hidden relative" style={{ background: '#1e1e1e', minHeight: 120 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={anime.cover} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 100%)' }} />
      <div className="relative z-10 p-4 h-full flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <p className="text-xs uppercase tracking-widest" style={{ color: '#888' }}>🎬 Смотрю</p>
          <button onClick={() => setPicking(true)} className="text-xs" style={{ color: '#444' }}>✏️</button>
        </div>
        <div>
          <p className="text-white font-bold text-sm mb-1 leading-tight">{anime.title}</p>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs" style={{ color: '#888' }}>Серия {episode} / {anime.episodes}</span>
            <div className="flex gap-1">
              <button onClick={() => onEpisodeChange(Math.max(1, episode - 1))}
                className="w-5 h-5 rounded text-xs flex items-center justify-center hover:bg-white/10 transition-all" style={{ color: '#666' }}>−</button>
              <button onClick={() => onEpisodeChange(Math.min(anime.episodes, episode + 1))}
                className="w-5 h-5 rounded text-xs flex items-center justify-center hover:bg-white/10 transition-all" style={{ color: '#aaa' }}>+</button>
            </div>
          </div>
          <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: '#2a2a2a' }}>
            <div className="h-full rounded-full transition-all duration-300" style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #60a5fa, #a78bfa)' }} />
          </div>
          <button onClick={() => router.push(`/watch/${anime.id}`)}
            className="mt-2 w-full py-1.5 rounded-lg text-xs btn-shimmer text-white transition-all">
            ▶ Продолжить
          </button>
        </div>
      </div>
    </div>
  )
}
