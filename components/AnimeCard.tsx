'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Anime } from '@/lib/anime'

interface Props {
  anime: Anime
  watched?: boolean
  onHide?: () => void
}

export default function AnimeCard({ anime, watched, onHide }: Props) {
  const router = useRouter()

  return (
    <div
      className="anime-card"
      style={{ width: 160, minWidth: 160, opacity: watched ? 0.55 : 1 }}
      onClick={() => router.push(`/watch/${anime.id}`)}
    >
      {onHide && (
        <button
          className="hide-btn"
          onClick={e => { e.stopPropagation(); onHide() }}
          title="Не интересует"
          aria-label="Не интересует"
          style={{
            position: 'absolute', top: 8, right: 8, zIndex: 5,
            width: 26, height: 26, borderRadius: '50%', border: 'none', cursor: 'pointer',
            background: 'rgba(0,0,0,0.75)', color: '#ddd',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(4px)',
          }}
        >
          <i className="ti ti-eye-off" style={{ fontSize: 14 }} aria-hidden="true" />
        </button>
      )}
      <Image
        src={anime.cover}
        alt={anime.title}
        width={160}
        height={220}
        className="rounded-xl"
        style={{ height: 220, objectFit: 'cover', display: 'block' }}
        unoptimized
      />

      {watched && (
        <div style={{
          position: 'absolute', bottom: 8, right: 8, zIndex: 4,
          background: 'rgba(0,0,0,0.72)', color: '#6ee7b7',
          fontSize: 10, fontWeight: 600, padding: '3px 7px', borderRadius: 20,
          display: 'flex', alignItems: 'center', gap: 3, pointerEvents: 'none',
          backdropFilter: 'blur(4px)',
        }}>
          <i className="ti ti-check" style={{ fontSize: 11 }} aria-hidden="true" /> просмотрено
        </div>
      )}

      {/* Рейтинг поверх обложки */}
      <div style={{
        position: 'absolute', top: 8, left: 8,
        background: 'rgba(0,0,0,0.72)',
        color: '#f5c542',
        fontSize: 11, fontWeight: 600,
        padding: '3px 7px', borderRadius: 20,
        zIndex: 4, pointerEvents: 'none',
        backdropFilter: 'blur(4px)',
      }}>
        ★ {anime.rating}
      </div>

      {/* Онгоинг-бейдж */}
      {anime.status === 'ongoing' && (
        <div style={{
          position: 'absolute', top: 8, right: 8,
          background: 'rgba(0,0,0,0.72)',
          color: '#6ee7b7',
          fontSize: 10, fontWeight: 600,
          padding: '3px 7px', borderRadius: 20,
          zIndex: 4, pointerEvents: 'none',
          backdropFilter: 'blur(4px)',
        }}>
          онгоинг
        </div>
      )}

      <div className="card-backdrop" />

      <div className="card-overlay">
        <h3 style={{ fontSize: 13, fontWeight: 600, marginBottom: 4, color: '#fff' }}>
          {anime.title}
        </h3>
        <p style={{ fontSize: 11, color: '#ccc', marginBottom: 8, lineHeight: 1.4 }}>
          {anime.genre.slice(0, 2).join(' · ')}
        </p>
      </div>

      <button
        className="watch-btn btn-shimmer"
        style={{
          padding: '7px 22px',
          borderRadius: 20,
          border: 'none',
          fontSize: 12,
          color: '#fff',
          cursor: 'pointer',
        }}
        onClick={e => {
          e.stopPropagation()
          router.push(`/watch/${anime.id}`)
        }}
      >
        Смотреть
      </button>
    </div>
  )
}
