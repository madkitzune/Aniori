import { filterAndSort, searchAnime } from '@/lib/anime'
import AnimeCard from '@/components/AnimeCard'
import AnimatedBg from '@/components/AnimatedBg'
import CatalogFilters from '@/components/CatalogFilters'
import CatalogSearch from '@/components/CatalogSearch'
import CatalogBoard from '@/components/catalog/CatalogBoard'

interface Props {
  searchParams: Promise<{ q?: string; genre?: string; status?: string; sort?: string }>
}

export default async function CatalogPage({ searchParams }: Props) {
  const { q, genre, status, sort } = await searchParams
  const query = q?.toLowerCase().trim() ?? ''
  const hasFilters = genre || status || sort

  // ── Режим поиска ─────────────────────────────────────────────────────────────
  if (query) {
    const results = searchAnime(query)
    return (
      <div className="relative px-5 md:px-10 py-8">
        <AnimatedBg />
        <div className="fixed inset-0 z-[1] bg-black/60 pointer-events-none" />
        <div className="relative z-[2]">
          <CatalogSearch defaultValue={q} />
          <h2 className="text-lg font-semibold mb-4 text-white">
            Результаты по «{q}»
            <span className="text-[#555] font-normal text-sm ml-2">{results.length} аниме</span>
          </h2>
          {results.length === 0 ? (
            <p className="text-[#aaa]">Ничего не найдено.</p>
          ) : (
            <div className="flex flex-wrap gap-4">
              {results.map(a => <AnimeCard key={a.id} anime={a} />)}
            </div>
          )}
        </div>
      </div>
    )
  }

  // ── Режим фильтрации ─────────────────────────────────────────────────────────
  if (hasFilters) {
    const results = filterAndSort({ genre, status, sort })
    return (
      <div className="relative px-5 md:px-10 py-8">
        <AnimatedBg />
        <div className="fixed inset-0 z-[1] bg-black/60 pointer-events-none" />
        <div className="relative z-[2]">
          <CatalogSearch />
          <CatalogFilters />
          <h2 className="text-lg font-semibold mb-4 text-white">
            {results.length} {results.length === 1 ? 'аниме' : 'аниме'}
            {genre && <span className="text-[#aaa] font-normal"> · {genre}</span>}
            {status && <span className="text-[#aaa] font-normal"> · {status === 'ongoing' ? 'Онгоинг' : 'Завершено'}</span>}
          </h2>
          {results.length === 0 ? (
            <p className="text-[#aaa]">По выбранным фильтрам ничего не найдено.</p>
          ) : (
            <div className="flex flex-wrap gap-4">
              {results.map(a => <AnimeCard key={a.id} anime={a} />)}
            </div>
          )}
        </div>
      </div>
    )
  }

  // ── Главная страница каталога ─────────────────────────────────────────────────
  return (
    <div className="relative px-5 md:px-10 py-6">
      <AnimatedBg overlay="rgba(10,10,10,0.45)" />
      <div className="relative z-[2]">
        {/* Поиск */}
        <CatalogSearch />

        {/* Настраиваемые ленты (включая баннер) */}
        <CatalogBoard />
      </div>
    </div>
  )
}
