import AnimeCard from './AnimeCard'
import { Anime } from '@/lib/anime'
import Link from 'next/link'

interface Props {
  title: string
  items: Anime[]
  genre?: string
  watchedIds?: Set<string>
  onHide?: (id: string) => void
}

export default function AnimeRow({ title, items, genre, watchedIds, onHide }: Props) {
  return (
    <section className="mb-8">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <h2 className="section-title" style={{ margin: 0, whiteSpace: 'nowrap' }}>{title}</h2>
        <div style={{ flex: 1, height: 1, background: '#1e1e1e' }} />
        {genre && (
          <Link
            href={`/catalog?genre=${encodeURIComponent(genre)}`}
            style={{ color: '#555', fontSize: 12, whiteSpace: 'nowrap', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#aaa')}
            onMouseLeave={e => (e.currentTarget.style.color = '#555')}
          >
            Все →
          </Link>
        )}
      </div>
      <div className="anime-row">
        {items.map(anime => (
          <AnimeCard
            key={anime.id}
            anime={anime}
            watched={watchedIds?.has(anime.id)}
            onHide={onHide ? () => onHide(anime.id) : undefined}
          />
        ))}
      </div>
    </section>
  )
}
