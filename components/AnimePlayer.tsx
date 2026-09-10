'use client'

import { useEffect, useRef, useState } from 'react'

interface Episode {
  ordinal: number
  name: string | null
  hls1080: string | null
  hls720: string | null
  hls480: string | null
}

type Quality = '1080' | '720' | '480'

interface Season {
  label: string
  anilibriaId: number
}

interface Props {
  title: string
  year: number
  fallback: string
  shikimoriId?: string
  anilibriaId?: number
  seasons?: Season[]
}

type Source = 'loading' | 'anilibria' | 'kodik' | 'trailer'

function epUrl(ep: Episode, q: Quality): string | null {
  if (q === '1080') return ep.hls1080 ?? ep.hls720 ?? ep.hls480
  if (q === '720') return ep.hls720 ?? ep.hls1080 ?? ep.hls480
  return ep.hls480 ?? ep.hls720 ?? ep.hls1080
}

function availableQualities(ep: Episode): Quality[] {
  const q: Quality[] = []
  if (ep.hls1080) q.push('1080')
  if (ep.hls720) q.push('720')
  if (ep.hls480) q.push('480')
  return q
}

export default function AnimePlayer({ title, year, fallback, shikimoriId, anilibriaId, seasons }: Props) {
  const seasonList: Season[] = seasons?.length
    ? seasons
    : anilibriaId
      ? [{ label: '', anilibriaId }]
      : []
  const seasonsKey = seasonList.map(s => s.anilibriaId).join(',')

  const [source, setSource] = useState<Source>('loading')
  const [kodikLink, setKodikLink] = useState('')
  const [trailerReason, setTrailerReason] = useState('')
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [loadedSeasonId, setLoadedSeasonId] = useState<number | null>(null)
  const [seasonIndex, setSeasonIndex] = useState(0)
  const [epIndex, setEpIndex] = useState(0)
  const [epLoading, setEpLoading] = useState(false)
  const [quality, setQuality] = useState<Quality>('720')
  const videoRef = useRef<HTMLVideoElement>(null)

  // 1) Определяем источник: AniLibria (по точному id) → Kodik → трейлер
  useEffect(() => {
    let cancelled = false
    const run = async () => {
      if (seasonList.length) {
        try {
          const firstId = seasonList[0].anilibriaId
          const res = await fetch(`/api/anilibria?id=${firstId}`)
          const data = await res.json()
          if (!cancelled && data.found && data.episodes?.length) {
            setEpisodes(data.episodes)
            setLoadedSeasonId(firstId)
            setSeasonIndex(0)
            setEpIndex(0)
            setSource('anilibria')
            return
          }
        } catch { /* идём дальше */ }
      }

      try {
        const params = new URLSearchParams()
        if (shikimoriId) params.set('shikimori_id', shikimoriId)
        else params.set('title', title)
        params.set('year', String(year))
        const res = await fetch(`/api/kodik?${params.toString()}`)
        const data = await res.json()
        if (!cancelled && data.link) {
          setKodikLink(data.link)
          setSource('kodik')
          return
        }
        if (!cancelled) { setTrailerReason(data.error ?? 'not_found'); setSource('trailer') }
      } catch {
        if (!cancelled) { setTrailerReason('fetch_failed'); setSource('trailer') }
      }
    }
    run()
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, year, shikimoriId, seasonsKey])

  // 2) Смена сезона — подгружаем серии выбранного релиза
  useEffect(() => {
    if (source !== 'anilibria') return
    const target = seasonList[seasonIndex]?.anilibriaId
    if (!target || target === loadedSeasonId) return
    let cancelled = false
    setEpLoading(true)
    fetch(`/api/anilibria?id=${target}`)
      .then(r => r.json())
      .then(data => {
        if (cancelled) return
        if (data.found && data.episodes?.length) {
          setEpisodes(data.episodes)
          setLoadedSeasonId(target)
          setEpIndex(0)
        }
      })
      .finally(() => !cancelled && setEpLoading(false))
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seasonIndex])

  // 3) Подключаем HLS-поток
  useEffect(() => {
    if (source !== 'anilibria') return
    const video = videoRef.current
    const ep = episodes[epIndex]
    if (!video || !ep) return
    const url = epUrl(ep, quality)
    if (!url) return

    let hls: { destroy: () => void } | null = null
    let disposed = false

    const attach = async () => {
      const HlsMod = (await import('hls.js')).default
      if (disposed) return
      if (HlsMod.isSupported()) {
        const instance = new HlsMod()
        instance.loadSource(url)
        instance.attachMedia(video)
        hls = instance
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = url
      }
    }
    attach()

    return () => {
      disposed = true
      if (hls) hls.destroy()
    }
  }, [source, episodes, epIndex, quality])

  if (source === 'loading') {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-3 rounded-xl" style={{ background: '#0a0a0a', aspectRatio: '16 / 9' }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', border: '3px solid #2a2a2a', borderTopColor: '#888', animation: 'spin 0.8s linear infinite' }} />
        <p style={{ color: '#555', fontSize: 13 }}>Ищем серии…</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    )
  }

  if (source === 'kodik') {
    return (
      <iframe
        src={kodikLink}
        allowFullScreen
        allow="autoplay; encrypted-media; fullscreen"
        className="w-full border-none rounded-xl"
        style={{ aspectRatio: '16 / 9' }}
        title={title}
      />
    )
  }

  if (source === 'trailer') {
    return (
      <div className="w-full relative">
        <iframe src={fallback} allowFullScreen allow="autoplay; encrypted-media; fullscreen" className="w-full border-none rounded-xl" style={{ aspectRatio: '16 / 9' }} title={title} />
        <div style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(0,0,0,0.7)', color: '#f5c542', fontSize: 11, padding: '4px 10px', borderRadius: 20, pointerEvents: 'none' }}>
          Серии не найдены — трейлер
        </div>
      </div>
    )
  }

  // source === 'anilibria'
  const ep = episodes[epIndex]
  const qualities = ep ? availableQualities(ep) : []

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="relative w-full rounded-xl overflow-hidden" style={{ background: '#000', aspectRatio: '16 / 9' }}>
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video ref={videoRef} controls className="w-full h-full" style={{ background: '#000' }} />
        {qualities.length > 1 && (
          <div style={{ position: 'absolute', top: 10, right: 10, display: 'flex', gap: 4 }}>
            {qualities.map(q => (
              <button
                key={q}
                onClick={() => setQuality(q)}
                style={{
                  fontSize: 11, padding: '3px 8px', borderRadius: 6, border: 'none', cursor: 'pointer',
                  background: quality === q ? '#fff' : 'rgba(0,0,0,0.55)',
                  color: quality === q ? '#111' : '#ccc',
                  backdropFilter: 'blur(4px)',
                }}
              >
                {q}p
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Панель выбора */}
      <div style={{ background: '#141414', border: '1px solid #1f1f1f', borderRadius: 14, padding: 14 }}>
        {/* Сезоны */}
        {seasonList.length > 1 && (
          <div className="no-scrollbar" style={{ display: 'flex', gap: 6, overflowX: 'auto', marginBottom: 14 }}>
            {seasonList.map((s, i) => (
              <button
                key={s.anilibriaId}
                onClick={() => setSeasonIndex(i)}
                style={{
                  flexShrink: 0, padding: '6px 14px', borderRadius: 20, border: 'none', cursor: 'pointer',
                  fontSize: 12.5, fontFamily: 'Rubik, sans-serif', whiteSpace: 'nowrap',
                  background: i === seasonIndex ? '#fff' : '#1f1f1f',
                  color: i === seasonIndex ? '#111' : '#888',
                  fontWeight: i === seasonIndex ? 600 : 400,
                  transition: 'all 0.15s',
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        )}

        {/* Заголовок */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <p style={{ color: '#888', fontSize: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Серии
          </p>
          <span style={{ color: '#555', fontSize: 12 }}>{episodes.length}</span>
        </div>

        {/* Сетка серий */}
        <div
          className="no-scrollbar"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(42px, 1fr))',
            gap: 6,
            maxHeight: 188,
            overflowY: 'auto',
            opacity: epLoading ? 0.4 : 1,
            transition: 'opacity 0.2s',
          }}
        >
          {episodes.map((e, i) => {
            const active = i === epIndex
            return (
              <button
                key={e.ordinal}
                onClick={() => setEpIndex(i)}
                title={e.name ?? `Серия ${e.ordinal}`}
                style={{
                  height: 38, borderRadius: 9, cursor: 'pointer',
                  fontSize: 13, fontFamily: 'Rubik, sans-serif',
                  border: active ? '1px solid #fff' : '1px solid #262626',
                  background: active ? '#fff' : '#1a1a1a',
                  color: active ? '#111' : '#999',
                  fontWeight: active ? 600 : 400,
                  transition: 'all 0.12s',
                }}
                onMouseEnter={e2 => { if (!active) { const el = e2.currentTarget; el.style.background = '#242424'; el.style.color = '#fff' } }}
                onMouseLeave={e2 => { if (!active) { const el = e2.currentTarget; el.style.background = '#1a1a1a'; el.style.color = '#999' } }}
              >
                {e.ordinal}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
