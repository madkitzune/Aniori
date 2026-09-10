'use client'

import { useState, useEffect, useRef } from 'react'
import { BlockId, GridBlock, BlockSize, MAX_SLOTS, MIN_SLOTS, newSlotId } from '@/lib/profile-config'
import { useProfileConfig } from './useProfileConfig'
import ProfileCardBlock from './blocks/ProfileCardBlock'
import StatsBlock from './blocks/StatsBlock'
import SubscriptionBlock from './blocks/SubscriptionBlock'
import MessengerBlock from './blocks/MessengerBlock'
import AchievementsBlock from './blocks/AchievementsBlock'
import CustomizeBlock from './blocks/CustomizeBlock'
import LogoutBlock from './blocks/LogoutBlock'
import WatchTimeBlock from './blocks/WatchTimeBlock'
import QuoteBlock from './blocks/QuoteBlock'
import FavoriteAnimeBlock from './blocks/FavoriteAnimeBlock'
import NowWatchingBlock from './blocks/NowWatchingBlock'
import FavoritesBlock from './blocks/FavoritesBlock'
import SocialBlock from './blocks/SocialBlock'
import StatusBlock from './blocks/StatusBlock'
import FriendsBlock from './blocks/FriendsBlock'
import ScheduleBlock from './blocks/ScheduleBlock'
import EditPanel from './EditPanel'
import GridManager from './GridManager'
import CustomizeModal from './CustomizeModal'
import RecentlyWatched from '@/components/RecentlyWatched'

interface Props {
  username: string
  email: string
  joinedAt: string
}

function colSpan(size: BlockSize) { return Number(size[0]) || 1 }
function rowSpan(size: BlockSize) { return Number(size[2]) || 1 }

function BlockContent({ blockId, size, username, email, joinedAt, config, update, onCustomize }: {
  blockId: BlockId
  size: BlockSize
  username: string; email: string; joinedAt: string
  config: ReturnType<typeof useProfileConfig>['config']
  update: ReturnType<typeof useProfileConfig>['update']
  onCustomize: () => void
}) {
  switch (blockId) {
    case 'profile-card':
      return <ProfileCardBlock username={username} email={email} joinedAt={joinedAt} config={config} size={size} onCustomize={onCustomize} />
    case 'stats':          return <StatsBlock />
    case 'subscription':   return <SubscriptionBlock />
    case 'messenger':      return <MessengerBlock />
    case 'achievements':   return <AchievementsBlock />
    case 'customize':      return <CustomizeBlock onOpen={onCustomize} />
    case 'logout':         return <LogoutBlock />
    case 'watch-time':
      return <WatchTimeBlock
        showHours={config.watchShowHours} showEpisodes={config.watchShowEpisodes}
        showStreak={config.watchShowStreak} showTitles={config.watchShowTitles}
        onToggle={key => {
          const map = {
            showHours: 'watchShowHours', showEpisodes: 'watchShowEpisodes',
            showStreak: 'watchShowStreak', showTitles: 'watchShowTitles',
          } as const
          update({ [map[key]]: !config[map[key]] } as never)
        }}
      />
    case 'quote':
      return <QuoteBlock quote={config.quoteText} author={config.quoteAuthor}
        onUpdate={(q, a) => update({ quoteText: q, quoteAuthor: a })} />
    case 'friends':        return <FriendsBlock />
    case 'schedule':       return <ScheduleBlock />
    case 'favorite-anime':
      return <FavoriteAnimeBlock favoriteId={config.favoriteAnimeId} onSelect={id => update({ favoriteAnimeId: id })} />
    case 'now-watching':
      return <NowWatchingBlock
        animeId={config.nowWatchingId} episode={config.nowWatchingEpisode} totalEpisodes={0}
        onSelect={id => update({ nowWatchingId: id, nowWatchingEpisode: 1 })}
        onEpisodeChange={ep => update({ nowWatchingEpisode: ep })} />
    case 'favorites':
      return <FavoritesBlock favoriteIds={config.favoriteIds} onUpdate={ids => update({ favoriteIds: ids })} />
    case 'social':
      return <SocialBlock links={config.socialLinks} onUpdate={links => update({ socialLinks: links })} />
    case 'status':
      return <StatusBlock status={config.statusText} mood={config.statusMood}
        onUpdate={(s, m) => update({ statusText: s, statusMood: m })} />
    case 'recent':
      return (
        <div className="rounded-2xl h-full p-4 overflow-y-auto" style={{ background: '#1e1e1e', minHeight: 120 }}>
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#555' }}>🕐 Недавнее</p>
          <RecentlyWatched />
        </div>
      )
    case 'empty':
    default:
      return (
        <div className="rounded-2xl h-full flex items-center justify-center"
          style={{ background: '#1a1a1a', border: '1px dashed #252525', minHeight: 120 }}>
          <span style={{ color: '#2a2a2a', fontSize: 24 }}>+</span>
        </div>
      )
  }
}

export default function ProfileDashboard({ username, email, joinedAt }: Props) {
  const { config, update, loaded } = useProfileConfig()
  const [editMode, setEditMode] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [customizeOpen, setCustomizeOpen] = useState(false)

  const gridRef = useRef<HTMLDivElement>(null)
  const [cols, setCols] = useState(3)

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      const newCols = w < 640 ? 1 : w < 1024 ? 2 : 3
      setCols(newCols)
      if (gridRef.current) {
        gridRef.current.style.gridTemplateColumns = `repeat(${newCols}, 1fr)`
      }
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  if (!loaded) return null

  const layout: GridBlock[] = config.gridLayout
  const selectedSlot = layout.find(b => b.id === selectedId) ?? null
  const selectedIndex = layout.findIndex(b => b.id === selectedId)

  const updateSlot = (updated: GridBlock) => {
    update({ gridLayout: layout.map(b => b.id === updated.id ? updated : b) })
  }

  const canAdd = layout.length < MAX_SLOTS
  const canRemove = layout.length > MIN_SLOTS

  const addSlot = () => {
    if (!canAdd) return
    update({ gridLayout: [...layout, { id: newSlotId(), blockId: 'empty', size: '1x1' }] })
  }

  const removeSlot = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (!canRemove) return
    if (selectedId === id) setSelectedId(null)
    update({ gridLayout: layout.filter(b => b.id !== id) })
  }

  const handleSlotClick = (id: string) => {
    if (!editMode) return
    setSelectedId(prev => prev === id ? null : id)
  }

  const closePanel = () => setSelectedId(null)

  const exitEdit = () => {
    setEditMode(false)
    setSelectedId(null)
  }

  return (
    <div
      className="w-full max-w-5xl mx-auto transition-all duration-300"
      style={{ paddingRight: selectedSlot ? 272 : 0 }}
    >
      {/* Top bar */}
      <div className="mb-5">
        <h1 className="text-white font-bold text-xl">Мой профиль</h1>
      </div>

      {/* Фиксированная кнопка в правом нижнем углу */}
      <div className="fixed bottom-6 right-6 z-[300] flex items-center gap-2">
        {editMode && (
          <GridManager layout={layout} onUpdate={l => update({ gridLayout: l })} />
        )}
        {editMode ? (
          <button onClick={exitEdit}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium btn-shimmer text-white shadow-lg">
            ✓ Готово
          </button>
        ) : (
          <button onClick={() => setEditMode(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:brightness-125"
            style={{
              background: '#1e1e1e',
              color: '#aaa',
              border: '1px solid #2a2a2a',
              boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
            }}>
            ⚙️ Редактировать
          </button>
        )}
      </div>

      {/* Grid */}
      <div
        ref={gridRef}
        className="grid gap-3"
        style={{ gridTemplateColumns: 'repeat(3, 1fr)', gridAutoRows: '200px', gridAutoFlow: 'dense' }}
      >
        {layout.map((slot, i) => {
          const isSelected = selectedId === slot.id
          // Ограничиваем span по текущему количеству колонок
          const effectiveColSpan = Math.min(colSpan(slot.size), cols)
          // На 1 колонке отключаем row span — нет смысла в башне
          const effectiveRowSpan = cols === 1 ? 1 : rowSpan(slot.size)
          return (
            <div
              key={slot.id}
              className="relative transition-all duration-200"
              style={{
                gridColumn: `span ${effectiveColSpan}`,
                gridRow: `span ${effectiveRowSpan}`,
                cursor: editMode ? 'pointer' : 'default',
              }}
              onClick={() => handleSlotClick(slot.id)}
            >
              {/* Highlight при выборе */}
              {isSelected && (
                <div className="absolute inset-0 rounded-2xl z-10 pointer-events-none"
                  style={{ border: '2px solid #808080', boxShadow: '0 0 16px rgba(128,128,128,0.2)' }} />
              )}
              {/* Затемнение незаданных секций в режиме редактирования */}
              {editMode && !isSelected && (
                <div className="absolute inset-0 rounded-2xl z-10 pointer-events-none transition-all"
                  style={{ background: 'rgba(0,0,0,0.25)' }} />
              )}

              <BlockContent
                blockId={slot.blockId}
                size={slot.size}
                username={username} email={email} joinedAt={joinedAt}
                config={config} update={update}
                onCustomize={() => setCustomizeOpen(true)}
              />

              {/* Номер секции */}
              {editMode && (
                <div className="absolute top-2 left-2 z-20 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: isSelected ? '#808080' : '#2a2a2a', color: isSelected ? '#fff' : '#555' }}>
                  {i + 1}
                </div>
              )}

              {/* Кнопка удаления */}
              {editMode && canRemove && (
                <button
                  onClick={e => removeSlot(slot.id, e)}
                  className="absolute z-20 flex items-center justify-center rounded-full transition-all hover:scale-110 hover:brightness-125"
                  style={{
                    top: 8, right: 8,
                    width: 22, height: 22,
                    background: 'rgba(30,30,30,0.9)',
                    border: '1px solid #3a3a3a',
                    color: '#666',
                    fontSize: 10,
                  }}
                  title="Удалить секцию"
                >
                  ✕
                </button>
              )}
            </div>
          )
        })}

        {/* Кнопка добавления секции прямо в сетке */}
        {editMode && canAdd && (
          <button
            onClick={addSlot}
            className="rounded-2xl flex flex-col items-center justify-center gap-2 transition-all group"
            style={{
              background: '#181818',
              border: '1px dashed #2a2a2a',
              color: '#333',
            }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all group-hover:scale-110 group-hover:bg-[#2a2a2a]"
              style={{ background: '#222', fontSize: 16 }}
            >
              +
            </div>
            <span style={{ fontSize: 11 }}>Добавить</span>
          </button>
        )}
      </div>

      {/* Подсказка в режиме редактирования */}
      {editMode && !selectedSlot && (
        <p className="text-center text-xs mt-4" style={{ color: '#333' }}>
          Нажми на секцию чтобы настроить
        </p>
      )}

      {/* Панель выбранной секции */}
      {selectedSlot && (
        <EditPanel
          slot={selectedSlot}
          index={selectedIndex}
          onUpdate={updateSlot}
          onClose={closePanel}
        />
      )}

      {customizeOpen && (
        <CustomizeModal
          config={config} username={username}
          onUpdate={update}
          onClose={() => setCustomizeOpen(false)}
        />
      )}
    </div>
  )
}
