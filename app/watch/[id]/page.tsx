import { getAnime, animeList } from '@/lib/anime'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import WatchHistorySaver from '@/components/WatchHistorySaver'
import AnimePlayer from '@/components/AnimePlayer'
import WatchActions from '@/components/WatchActions'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return animeList.map(a => ({ id: a.id }))
}

export default async function WatchPage({ params }: Props) {
  const { id } = await params
  const anime = getAnime(id)
  if (!anime) notFound()

  return (
    <div className="relative min-h-screen" style={{ background: '#0d0d0d' }}>
      <WatchHistorySaver id={anime.id} title={anime.title} titleRu={anime.titleRu} cover={anime.cover} />

      {/* Кинематографичный фон из обложки тайтла */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${anime.cover})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(32px) brightness(0.3)',
          transform: 'scale(1.15)',
        }}
      />
      <div
        className="fixed inset-0 z-0"
        style={{ background: 'linear-gradient(to bottom, rgba(13,13,13,0.55) 0%, rgba(13,13,13,0.9) 70%, #0d0d0d 100%)' }}
      />

      <div className="relative z-10 px-4 md:px-6 py-6">
        <div className="mx-auto" style={{ maxWidth: 1040 }}>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-1.5 text-sm text-[#888] hover:text-white transition-colors mb-4"
          >
            <i className="ti ti-arrow-left" style={{ fontSize: 16 }} aria-hidden="true" /> Каталог
          </Link>

          {/* Плеер */}
          <div style={{ boxShadow: '0 24px 60px rgba(0,0,0,0.55)', borderRadius: 14 }}>
            <AnimePlayer
              title={anime.title}
              year={anime.year}
              fallback={anime.video}
              shikimoriId={anime.shikimoriId}
              anilibriaId={anime.anilibriaId}
              seasons={anime.seasons}
            />
          </div>

          {/* Инфо-строка */}
          <div className="flex items-start justify-between gap-4 mt-5 flex-wrap">
            <div style={{ minWidth: 0 }}>
              <h1 className="text-xl md:text-3xl font-bold text-white leading-tight">{anime.titleRu}</h1>
              <p className="text-[#888] text-sm mt-1.5">
                {anime.title} · {anime.year} · ★ {anime.rating} · {anime.episodes} эп.
                {anime.status === 'ongoing' && <span style={{ color: '#6ee7b7' }}> · онгоинг</span>}
              </p>
            </div>
            <WatchActions id={anime.id} />
          </div>

          {/* Жанры */}
          <div className="flex gap-2 mt-3 flex-wrap">
            {anime.genre.map(g => (
              <Link
                key={g}
                href={`/catalog?genre=${encodeURIComponent(g)}`}
                style={{
                  background: 'rgba(255,255,255,0.07)', color: '#bbb',
                  fontSize: 12, padding: '4px 12px', borderRadius: 20,
                  textDecoration: 'none', transition: 'background 0.15s',
                }}
              >
                {g}
              </Link>
            ))}
          </div>

          {/* Описание */}
          <p className="mt-5 text-[#aaa] text-sm leading-relaxed" style={{ maxWidth: 760 }}>
            {anime.description}
          </p>
        </div>
      </div>
    </div>
  )
}
