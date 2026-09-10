import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const BASE = 'https://anilibria.top/api/v1'

interface SearchRelease {
  id: number
  alias: string
  name: { main?: string; english?: string; alternative?: string | null }
  year?: number
}

interface ReleaseEpisode {
  ordinal: number
  name: string | null
  hls_480?: string | null
  hls_720?: string | null
  hls_1080?: string | null
}

export interface AniLibriaEpisode {
  ordinal: number
  name: string | null
  hls1080: string | null
  hls720: string | null
  hls480: string | null
}

const norm = (s: string) =>
  s.toLowerCase().replace(/[ё]/g, 'е').replace(/[^a-zа-я0-9]+/gi, ' ').trim()

function pickBest(results: SearchRelease[], title: string, year?: number): SearchRelease | null {
  if (!results.length) return null
  const q = norm(title)
  const scored = results.map(r => {
    const en = norm(r.name.english ?? '')
    const ru = norm(r.name.main ?? '')
    let score = 0
    if (en === q || ru === q) score = 100
    else if (en.startsWith(q) || ru.startsWith(q)) score = 80
    else if (en.includes(q) || ru.includes(q) || q.includes(en) || q.includes(ru)) score = 60
    if (year && r.year === year) score += 10
    return { r, score }
  })
  scored.sort((a, b) => b.score - a.score)
  return scored[0].score > 0 ? scored[0].r : results[0]
}

async function loadEpisodes(releaseId: number) {
  const relRes = await fetch(`${BASE}/anime/releases/${releaseId}`, { cache: 'no-store' })
  if (!relRes.ok) return null
  const release = (await relRes.json()) as { episodes?: ReleaseEpisode[] }
  return (release.episodes ?? [])
    .filter(e => e.hls_480 || e.hls_720 || e.hls_1080)
    .map(e => ({
      ordinal: e.ordinal,
      name: e.name,
      hls1080: e.hls_1080 ?? null,
      hls720: e.hls_720 ?? null,
      hls480: e.hls_480 ?? null,
    }))
    .sort((a, b) => a.ordinal - b.ordinal) as AniLibriaEpisode[]
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const idParam = searchParams.get('id')?.trim()
  const title = searchParams.get('title')?.trim()
  const year = searchParams.get('year')?.trim()

  try {
    // Точный релиз по id — без поиска, без риска подтянуть не тот тайтл
    if (idParam) {
      const episodes = await loadEpisodes(Number(idParam))
      if (!episodes || !episodes.length) {
        return NextResponse.json({ found: false, error: 'no_episodes' })
      }
      return NextResponse.json({ found: true, id: Number(idParam), episodes })
    }

    // Фолбэк — поиск по названию
    if (!title) {
      return NextResponse.json({ found: false, error: 'no_query' }, { status: 400 })
    }
    const searchRes = await fetch(
      `${BASE}/app/search/releases?query=${encodeURIComponent(title)}`,
      { cache: 'no-store' }
    )
    if (!searchRes.ok) return NextResponse.json({ found: false, error: 'search_failed' })
    const results = (await searchRes.json()) as SearchRelease[]
    const best = pickBest(results, title, year ? Number(year) : undefined)
    if (!best) return NextResponse.json({ found: false, error: 'not_found' })

    const episodes = await loadEpisodes(best.id)
    if (!episodes || !episodes.length) {
      return NextResponse.json({ found: false, error: 'no_episodes' })
    }
    return NextResponse.json({
      found: true,
      id: best.id,
      title: best.name.main ?? best.name.english,
      episodes,
    })
  } catch {
    return NextResponse.json({ found: false, error: 'fetch_failed' })
  }
}
