'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import {
  animeList, getAnime, getFeatured, getPopular, getNewReleases, getTopRated, Anime,
} from '@/lib/anime'
import {
  CatalogBlock, CatalogBlockType, StatusFilter, loadCatalogConfig, saveCatalogConfig, resetCatalogConfig,
  blockTitle, DEFAULT_CATALOG, SINGLE_TYPES, THEMES, matchesCustom,
} from '@/lib/catalog-config'
import { getHistory } from '@/lib/watchHistory'
import { getBookmarks, isBookmarked, toggleBookmark } from '@/lib/bookmarks'
import { getHidden, addHidden, clearHidden } from '@/lib/hidden'
import AnimeRow from '@/components/AnimeRow'
import AnimeCard from '@/components/AnimeCard'

const DISCOVERY: CatalogBlockType[] = ['popular', 'new', 'top', 'ongoing', 'genre', 'custom']

const ALL_GENRES = Array.from(new Set(animeList.flatMap(a => a.genre)))

export default function CatalogBoard() {
  const [config, setConfig] = useState<CatalogBlock[]>(DEFAULT_CATALOG)
  const [loaded, setLoaded] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [showPicker, setShowPicker] = useState(false)
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [history, setHistory] = useState<Anime[]>([])
  const [bookmarks, setBookmarks] = useState<Anime[]>([])
  const [watchedIds, setWatchedIds] = useState<Set<string>>(new Set())
  const [hidden, setHidden] = useState<Set<string>>(new Set())
  const [randomId, setRandomId] = useState<string | null>(null)

  useEffect(() => {
    setConfig(loadCatalogConfig())
    const hist = getHistory()
    setHistory(hist.map(h => getAnime(h.id)).filter((a): a is Anime => !!a))
    setBookmarks(getBookmarks().map(id => getAnime(id)).filter((a): a is Anime => !!a))
    setWatchedIds(new Set(hist.map(h => h.id)))
    setHidden(new Set(getHidden()))
    setRandomId(animeList[Math.floor(Math.random() * animeList.length)].id)
    setLoaded(true)
  }, [])

  const hideAnime = (id: string) => setHidden(new Set(addHidden(id)))
  const showAllHidden = () => { clearHidden(); setHidden(new Set()) }

  const persist = (next: CatalogBlock[]) => {
    setConfig(next)
    saveCatalogConfig(next)
  }

  const remove = (key: string) => persist(config.filter(b => b.key !== key))

  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir
    if (j < 0 || j >= config.length) return
    const next = [...config]
    ;[next[i], next[j]] = [next[j], next[i]]
    persist(next)
  }

  // Перетаскивание: живой перенос элемента на позицию i
  const onDragEnter = (i: number) => {
    if (dragIndex === null || dragIndex === i) return
    const next = [...config]
    const [item] = next.splice(dragIndex, 1)
    next.splice(i, 0, item)
    persist(next)
    setDragIndex(i)
  }

  const addBlock = (type: CatalogBlockType, genre?: string) => {
    const key = type === 'genre' ? `g-${genre}` : type
    if (config.some(b => b.key === key)) return
    persist([...config, { key, type, genre }])
    setShowPicker(false)
  }

  const reset = () => {
    resetCatalogConfig()
    setConfig(DEFAULT_CATALOG)
    setShowPicker(false)
  }

  const itemsFor = (b: CatalogBlock): Anime[] => {
    switch (b.type) {
      case 'hero':     return []
      case 'continue': return history
      case 'my-list':  return bookmarks
      case 'popular':  return getPopular()
      case 'new':      return getNewReleases()
      case 'top':      return getTopRated()
      case 'ongoing':  return animeList.filter(a => a.status === 'ongoing')
      case 'genre':    return animeList.filter(a => b.genre && a.genre.includes(b.genre))
      case 'custom':   return animeList.filter(a => matchesCustom(a, b))
      case 'random':   return []
    }
  }

  const addCustom = (block: CatalogBlock) => {
    persist([...config, block])
    setShowPicker(false)
  }

  const randomAnime = useMemo(() => (randomId ? getAnime(randomId) : null), [randomId])
  const reroll = () => setRandomId(animeList[Math.floor(Math.random() * animeList.length)].id)
  const featured = getFeatured()

  // Доступные для добавления варианты
  const presentKeys = new Set(config.map(b => b.key))
  const availableSingles = SINGLE_TYPES.filter(t => !presentKeys.has(t))
  const availableGenres = ALL_GENRES.filter(g => !presentKeys.has(`g-${g}`))

  if (!loaded) {
    return <div style={{ minHeight: 300 }} />
  }

  return (
    <div className={`transition-all duration-300 ${editMode ? 'md:pr-[356px]' : ''}`}>
      {/* Кнопка настройки */}
      <div className="flex justify-end mb-3">
        <button
          onClick={() => { setEditMode(v => !v); setShowPicker(false) }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all"
          style={{
            background: editMode ? '#fff' : '#1a1a1a',
            color: editMode ? '#111' : '#aaa',
            border: '1px solid #2a2a2a',
          }}
        >
          <i className={`ti ${editMode ? 'ti-check' : 'ti-adjustments-horizontal'}`} style={{ fontSize: 16 }} aria-hidden="true" />
          {editMode ? 'Готово' : 'Настроить ленты'}
        </button>
      </div>

      {/* Панель настройки — боковая панель, как в профиле */}
      {editMode && (
        <>
          <div className="fixed inset-0 z-[1999] md:hidden" style={{ background: 'rgba(0,0,0,0.5)' }} onClick={() => { setEditMode(false); setShowPicker(false) }} />
          <div className="fixed right-0 z-[2000] flex flex-col" style={{ top: 72, height: 'calc(100vh - 72px)', width: 'min(340px, 92vw)', background: '#141414', borderLeft: '1px solid #222' }}>
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid #222' }}>
              <h2 className="text-white font-semibold" style={{ fontSize: 16 }}>Настройка лент</h2>
              <button onClick={() => { setEditMode(false); setShowPicker(false) }} className="text-[#666] hover:text-white transition-colors" aria-label="Закрыть">
                <i className="ti ti-x" style={{ fontSize: 18 }} aria-hidden="true" />
              </button>
            </div>
            <div className="px-5 py-4 no-scrollbar" style={{ overflowY: 'auto', flex: 1, minHeight: 0 }}>
          <div className="flex items-center justify-between mb-2">
            <p style={{ color: '#888', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Ленты</p>
            <button onClick={reset} style={{ color: '#666', fontSize: 12, background: 'none', border: 'none', cursor: 'pointer' }}>Сбросить</button>
          </div>

          {hidden.size > 0 && (
            <div className="flex items-center justify-between mb-3 px-2 py-2 rounded-lg" style={{ background: '#1a1410', border: '1px solid #2a2218' }}>
              <span style={{ color: '#9a8a6a', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                <i className="ti ti-eye-off" style={{ fontSize: 14 }} aria-hidden="true" /> Скрыто: {hidden.size}
              </span>
              <button onClick={showAllHidden} style={{ color: '#c0a87a', fontSize: 12, background: 'none', border: 'none', cursor: 'pointer' }}>
                Показать все
              </button>
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            {config.map((b, i) => (
              <div
                key={b.key}
                onDragOver={e => e.preventDefault()}
                onDragEnter={() => onDragEnter(i)}
                className={`flex items-center gap-2 px-2 py-2 rounded-lg ${dragIndex === i ? 'drag-shimmer' : ''}`}
                style={{ background: '#1a1a1a', position: 'relative', opacity: dragIndex === i ? 0.92 : 1 }}
              >
                <i
                  className="ti ti-grip-vertical"
                  draggable
                  onDragStart={() => setDragIndex(i)}
                  onDragEnd={() => { setDragIndex(null); saveCatalogConfig(config) }}
                  style={{ fontSize: 16, color: '#666', flexShrink: 0, cursor: 'grab' }}
                  aria-hidden="true"
                />
                <span style={{ flex: 1, color: '#fff', fontSize: 13 }}>{blockTitle(b)}</span>
                <button onClick={() => move(i, -1)} disabled={i === 0} aria-label="Вверх"
                  style={{ color: '#777', background: 'none', border: 'none', cursor: i === 0 ? 'default' : 'pointer', opacity: i === 0 ? 0.3 : 1, fontSize: 16 }}>
                  <i className="ti ti-chevron-up" aria-hidden="true" />
                </button>
                <button onClick={() => move(i, 1)} disabled={i === config.length - 1} aria-label="Вниз"
                  style={{ color: '#777', background: 'none', border: 'none', cursor: i === config.length - 1 ? 'default' : 'pointer', opacity: i === config.length - 1 ? 0.3 : 1, fontSize: 16 }}>
                  <i className="ti ti-chevron-down" aria-hidden="true" />
                </button>
                <button onClick={() => remove(b.key)} aria-label="Удалить"
                  style={{ color: '#a35', background: 'none', border: 'none', cursor: 'pointer', fontSize: 15 }}>
                  <i className="ti ti-trash" aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>

          {/* Добавление лент */}
          {(availableSingles.length > 0 || availableGenres.length > 0) && (
            <div className="mt-3">
              <button
                onClick={() => setShowPicker(v => !v)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm w-full justify-center transition-all"
                style={{ background: '#1f1f1f', color: '#aaa', border: '1px dashed #333' }}
              >
                <i className={`ti ${showPicker ? 'ti-x' : 'ti-plus'}`} style={{ fontSize: 15 }} aria-hidden="true" />
                {showPicker ? 'Закрыть' : 'Добавить ленту'}
              </button>

              {showPicker && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {availableSingles.map(t => (
                    <button key={t} onClick={() => addBlock(t)}
                      className="px-3 py-1.5 rounded-lg text-xs transition-all hover:brightness-125"
                      style={{ background: '#242424', color: '#ccc', border: '1px solid #2e2e2e' }}>
                      + {blockTitle({ key: t, type: t })}
                    </button>
                  ))}
                  {availableGenres.map(g => (
                    <button key={g} onClick={() => addBlock('genre', g)}
                      className="px-3 py-1.5 rounded-lg text-xs transition-all hover:brightness-125"
                      style={{ background: '#242424', color: '#9aa', border: '1px solid #2e2e2e' }}>
                      + {g}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Конструктор своей ленты */}
          <CustomBuilder onCreate={addCustom} />
            </div>
          </div>
        </>
      )}

      {/* Ленты */}
      {config.map(b => {
        if (b.type === 'hero') {
          return featured ? <HeroBlock key={b.key} anime={featured} /> : null
        }
        if (b.type === 'random') {
          if (!randomAnime) return null
          return <RandomSpotlight key={b.key} anime={randomAnime} onReroll={reroll} />
        }
        const isDiscovery = DISCOVERY.includes(b.type)
        let items = itemsFor(b)
        if (isDiscovery) items = items.filter(a => !hidden.has(a.id))
        const onHide = isDiscovery ? hideAnime : undefined

        // Своя лента показывается даже пустой — с пометкой-предупреждением
        if (b.type === 'custom') {
          return <CustomRail key={b.key} title={blockTitle(b)} items={items} watchedIds={watchedIds} onHide={onHide} />
        }
        if (items.length === 0) return null
        const dim = b.type !== 'continue' && b.type !== 'my-list'
        return (
          <AnimeRow
            key={b.key}
            title={blockTitle(b)}
            items={items}
            genre={b.type === 'genre' ? b.genre : undefined}
            watchedIds={dim ? watchedIds : undefined}
            onHide={onHide}
          />
        )
      })}
    </div>
  )
}

function CustomRail({ title, items, watchedIds, onHide }: { title: string; items: Anime[]; watchedIds: Set<string>; onHide?: (id: string) => void }) {
  const empty = items.length === 0
  return (
    <section className="mb-8">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <h2 className="section-title" style={{ margin: 0, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 6 }}>
          {title}
          {empty && (
            <i className="ti ti-alert-triangle" style={{ fontSize: 14, color: '#f5b942' }} title="Пока нет тайтлов" aria-hidden="true" />
          )}
        </h2>
        <div style={{ flex: 1, height: 1, background: '#1e1e1e' }} />
      </div>
      {empty ? (
        <div style={{ background: '#141414', border: '1px dashed #2a2a2a', borderRadius: 12, padding: 18, display: 'flex', alignItems: 'center', gap: 10, color: '#666', fontSize: 13 }}>
          <i className="ti ti-mood-empty" style={{ fontSize: 18 }} aria-hidden="true" />
          Пока нет тайтлов в этой категории — появятся, как только добавим подходящие.
        </div>
      ) : (
        <div className="anime-row">
          {items.map(a => (
            <AnimeCard key={a.id} anime={a} watched={watchedIds.has(a.id)} onHide={onHide ? () => onHide(a.id) : undefined} />
          ))}
        </div>
      )}
    </section>
  )
}

function HeroBlock({ anime }: { anime: Anime }) {
  const [saved, setSaved] = useState(false)
  useEffect(() => { setSaved(isBookmarked(anime.id)) }, [anime.id])

  return (
    <section
      className="relative rounded-xl overflow-hidden mb-8 flex flex-col justify-end"
      style={{ minHeight: 'clamp(220px, 32vw, 380px)', background: '#1a1a1a' }}
    >
      <div className="absolute inset-0" style={{ backgroundImage: `url(${anime.cover})`, backgroundSize: 'cover', backgroundPosition: 'center top' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0.1) 100%)' }} />
      <div className="absolute bottom-0 left-0 right-0" style={{ height: 90, background: 'linear-gradient(to top, #0d0d0d, transparent)' }} />

      <div className="relative z-10 p-6 md:p-10">
        <div className="flex gap-2 flex-wrap mb-3">
          {anime.genre.map(g => (
            <span key={g} style={{ background: 'rgba(255,255,255,0.1)', color: '#ccc', fontSize: 11, padding: '3px 10px', borderRadius: 20, backdropFilter: 'blur(4px)' }}>{g}</span>
          ))}
          <span style={{ background: 'rgba(245,197,66,0.15)', color: '#f5c542', fontSize: 11, padding: '3px 10px', borderRadius: 20 }}>★ {anime.rating}</span>
        </div>
        <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">{anime.titleRu}</h1>
        <p className="text-sm text-[#bbb] mb-5 max-w-lg leading-relaxed hidden sm:block">{anime.description.slice(0, 140)}…</p>
        <div className="flex gap-3 flex-wrap">
          <Link href={`/watch/${anime.id}`}
            style={{ background: '#fff', color: '#111', fontSize: 13, fontWeight: 600, padding: '8px 20px', borderRadius: 9, display: 'flex', alignItems: 'center', gap: 7, textDecoration: 'none' }}>
            <i className="ti ti-player-play" style={{ fontSize: 14 }} aria-hidden="true" /> Смотреть
          </Link>
          <button
            onClick={() => setSaved(toggleBookmark(anime.id))}
            style={{ background: saved ? '#fff' : 'rgba(255,255,255,0.1)', color: saved ? '#111' : '#fff', fontSize: 13, padding: '8px 18px', borderRadius: 9, border: 'none', cursor: 'pointer', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <i className={`ti ${saved ? 'ti-check' : 'ti-plus'}`} style={{ fontSize: 14 }} aria-hidden="true" /> {saved ? 'В списке' : 'В список'}
          </button>
        </div>
      </div>
    </section>
  )
}

function CustomBuilder({ onCreate }: { onCreate: (b: CatalogBlock) => void }) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [genres, setGenres] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [status, setStatus] = useState<StatusFilter>(undefined)

  const toggle = (arr: string[], setArr: (v: string[]) => void, v: string) =>
    setArr(arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v])

  const draft: CatalogBlock = { key: '_draft', type: 'custom', name, genres, tags, status }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const count = useMemo(() => animeList.filter(a => matchesCustom(a, draft)).length, [genres, tags, status])
  const willBeEmpty = Boolean(genres.length || tags.length || status) && count === 0
  const canCreate = name.trim().length > 0

  const create = () => {
    if (!canCreate) return
    onCreate({
      key: `custom-${Date.now()}`,
      type: 'custom',
      name: name.trim(),
      genres: genres.length ? genres : undefined,
      tags: tags.length ? tags : undefined,
      status,
    })
    setName(''); setGenres([]); setTags([]); setStatus(undefined); setOpen(false)
  }

  const chip = (active: boolean): React.CSSProperties => ({
    padding: '5px 11px', borderRadius: 20, fontSize: 12, cursor: 'pointer',
    border: 'none', fontFamily: 'Rubik, sans-serif', transition: 'all 0.12s',
    background: active ? '#fff' : '#242424',
    color: active ? '#111' : '#999',
    fontWeight: active ? 600 : 400,
  })

  if (!open) {
    return (
      <button onClick={() => setOpen(true)}
        className="mt-2 flex items-center gap-2 px-3 py-2 rounded-lg text-sm w-full justify-center transition-all"
        style={{ background: '#1f1f1f', color: '#aaa', border: '1px dashed #3a3a3a' }}>
        <i className="ti ti-wand" style={{ fontSize: 15 }} aria-hidden="true" /> Создать свою ленту
      </button>
    )
  }

  return (
    <div className="mt-3" style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 12, padding: 12 }}>
      <div className="flex items-center justify-between mb-3">
        <p style={{ color: '#ccc', fontSize: 13, fontWeight: 500 }}>Своя лента</p>
        <button onClick={() => setOpen(false)} style={{ color: '#666', background: 'none', border: 'none', cursor: 'pointer' }}>
          <i className="ti ti-x" style={{ fontSize: 16 }} aria-hidden="true" />
        </button>
      </div>

      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Название ленты (напр. «Экшн-романтика»)"
        style={{
          width: '100%', background: '#111', border: '1px solid #2a2a2a', borderRadius: 8,
          color: '#fff', fontSize: 13, padding: '9px 12px', outline: 'none', marginBottom: 12,
          fontFamily: 'Rubik, sans-serif',
        }}
      />

      <p style={{ color: '#666', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Жанры</p>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {ALL_GENRES.map(g => (
          <button key={g} style={chip(genres.includes(g))} onClick={() => toggle(genres, setGenres, g)}>{g}</button>
        ))}
      </div>

      <p style={{ color: '#666', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Темы</p>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {THEMES.map(t => (
          <button key={t} style={chip(tags.includes(t))} onClick={() => toggle(tags, setTags, t)}>{t}</button>
        ))}
      </div>

      <p style={{ color: '#666', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Статус</p>
      <div className="flex flex-wrap gap-1.5 mb-3">
        <button style={chip(status === undefined)} onClick={() => setStatus(undefined)}>Любой</button>
        <button style={chip(status === 'ongoing')} onClick={() => setStatus('ongoing')}>Онгоинг</button>
        <button style={chip(status === 'finished')} onClick={() => setStatus('finished')}>Завершено</button>
      </div>

      {/* Живой счётчик + предупреждение (не блокирует создание) */}
      {willBeEmpty ? (
        <div style={{ background: '#2a1f12', border: '1px solid #5a4322', borderRadius: 8, padding: '8px 11px', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
          <i className="ti ti-alert-triangle" style={{ fontSize: 15, color: '#f5b942', flexShrink: 0 }} aria-hidden="true" />
          <span style={{ color: '#e0b873', fontSize: 12 }}>На сайте пока нет таких тайтлов — лента будет пустой, с пометкой. Появятся — подтянутся сами.</span>
        </div>
      ) : (
        <p style={{ color: '#666', fontSize: 12, marginBottom: 10 }}>Подходит тайтлов: <span style={{ color: '#aaa' }}>{count}</span></p>
      )}

      <button onClick={create} disabled={!canCreate}
        className="w-full py-2 rounded-lg text-sm transition-all"
        style={{
          background: canCreate ? '#fff' : '#222',
          color: canCreate ? '#111' : '#555',
          border: 'none', cursor: canCreate ? 'pointer' : 'default',
          fontWeight: 600, fontFamily: 'Rubik, sans-serif',
        }}>
        Создать ленту
      </button>
    </div>
  )
}

function RandomSpotlight({ anime, onReroll }: { anime: Anime; onReroll: () => void }) {
  return (
    <section className="mb-8">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <h2 className="section-title" style={{ margin: 0, whiteSpace: 'nowrap' }}>Что посмотреть?</h2>
        <div style={{ flex: 1, height: 1, background: '#1e1e1e' }} />
      </div>
      <div className="relative rounded-xl overflow-hidden flex items-end" style={{ minHeight: 180 }}>
        <div className="absolute inset-0" style={{ backgroundImage: `url(${anime.cover})`, backgroundSize: 'cover', backgroundPosition: 'center top' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.92), rgba(0,0,0,0.4))' }} />
        <div className="relative z-10 p-5 md:p-7">
          <p style={{ color: '#aaa', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
            {anime.genre.join(' · ')} · ★ {anime.rating}
          </p>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{anime.titleRu}</h3>
          <div className="flex gap-2 flex-wrap">
            <Link href={`/watch/${anime.id}`}
              style={{ background: '#fff', color: '#111', fontSize: 13, fontWeight: 600, padding: '8px 18px', borderRadius: 9, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
              <i className="ti ti-player-play" style={{ fontSize: 14 }} aria-hidden="true" /> Смотреть
            </Link>
            <button onClick={onReroll}
              style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', fontSize: 13, padding: '8px 16px', borderRadius: 9, border: 'none', cursor: 'pointer', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <i className="ti ti-refresh" style={{ fontSize: 14 }} aria-hidden="true" /> Другое
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
