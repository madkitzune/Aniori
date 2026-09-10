'use client'

import { BlockId, GridBlock, BLOCK_META, BlockSize } from '@/lib/profile-config'

interface Props {
  slot: GridBlock
  index: number
  onUpdate: (updated: GridBlock) => void
  onClose: () => void
}

const CATEGORIES: { label: string; ids: BlockId[] }[] = [
  {
    label: 'Профиль',
    ids: ['profile-card', 'status', 'social', 'customize'],
  },
  {
    label: 'Аниме',
    ids: ['now-watching', 'favorites', 'favorite-anime', 'schedule', 'quote', 'recent'],
  },
  {
    label: 'Прогресс',
    ids: ['stats', 'watch-time', 'achievements'],
  },
  {
    label: 'Другое',
    ids: ['subscription', 'friends', 'messenger', 'logout', 'empty'],
  },
]

// Визуальные превью размеров — ширина × высота, до 3×3
const SIZE_PREVIEWS: { size: BlockSize; label: string; cols: number; rows: number }[] = [
  { size: '1x1', label: '1×1', cols: 1, rows: 1 },
  { size: '2x1', label: '2×1', cols: 2, rows: 1 },
  { size: '3x1', label: '3×1', cols: 3, rows: 1 },
  { size: '1x2', label: '1×2', cols: 1, rows: 2 },
  { size: '2x2', label: '2×2', cols: 2, rows: 2 },
  { size: '3x2', label: '3×2', cols: 3, rows: 2 },
  { size: '1x3', label: '1×3', cols: 1, rows: 3 },
  { size: '2x3', label: '2×3', cols: 2, rows: 3 },
  { size: '3x3', label: '3×3', cols: 3, rows: 3 },
]

export default function EditPanel({ slot, index, onUpdate, onClose }: Props) {
  const setBlockId = (blockId: BlockId) => onUpdate({ ...slot, blockId })
  const setSize = (size: BlockSize) => onUpdate({ ...slot, size })
  const activeMeta = BLOCK_META[slot.blockId]

  return (
    <div
      className="fixed top-[72px] right-0 h-[calc(100vh-72px)] z-[500] flex flex-col"
      style={{ width: 268, background: '#141414', borderLeft: '1px solid #222' }}
      onWheel={e => e.stopPropagation()}
    >
      {/* Header с градиентом */}
      <div
        className="flex items-center justify-between px-4 py-4"
        style={{
          background: 'linear-gradient(180deg, #1e1e1e 0%, #141414 100%)',
          borderBottom: '1px solid #1e1e1e',
        }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-base"
            style={{ background: '#252525' }}
          >
            {activeMeta.icon}
          </div>
          <div>
            <p className="text-white text-sm font-semibold leading-none">{activeMeta.label}</p>
            <p className="text-xs mt-0.5" style={{ color: '#444' }}>Секция {index + 1}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-sm transition-all hover:bg-white/5"
          style={{ color: '#444' }}
        >
          ✕
        </button>
      </div>

      {/* Контент */}
      <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>

        {/* Блок-пикер по категориям */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest px-1 mb-3" style={{ color: '#3a3a3a' }}>Блок</p>
          <div className="flex flex-col gap-3">
            {CATEGORIES.map(cat => (
              <div key={cat.label}>
                <p className="text-xs px-1 mb-1.5" style={{ color: '#333' }}>{cat.label}</p>
                <div className="grid grid-cols-3 gap-1.5">
                  {cat.ids.map(bid => {
                    const bm = BLOCK_META[bid]
                    const active = slot.blockId === bid
                    return (
                      <button
                        key={bid}
                        onClick={() => setBlockId(bid)}
                        title={bm.description}
                        className="rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all"
                        style={{
                          height: 58,
                          background: active ? '#242424' : '#1a1a1a',
                          border: active ? '1px solid #484848' : '1px solid #1e1e1e',
                          boxShadow: active ? '0 0 12px rgba(255,255,255,0.04)' : 'none',
                          color: active ? '#fff' : '#4a4a4a',
                        }}
                        onMouseEnter={e => {
                          if (!active) (e.currentTarget as HTMLElement).style.background = '#1e1e1e'
                        }}
                        onMouseLeave={e => {
                          if (!active) (e.currentTarget as HTMLElement).style.background = '#1a1a1a'
                        }}
                      >
                        <span style={{ fontSize: 18, lineHeight: 1, filter: active ? 'none' : 'grayscale(0.3) opacity(0.6)' }}>
                          {bm.icon}
                        </span>
                        <span style={{ fontSize: 9, lineHeight: 1.2, textAlign: 'center', fontWeight: active ? 600 : 400 }}>
                          {bm.label}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Размер — визуальные превью */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest px-1 mb-3" style={{ color: '#3a3a3a' }}>Размер</p>
          <div className="grid grid-cols-3 gap-1.5">
            {SIZE_PREVIEWS.map(({ size, label, cols, rows }) => {
              const active = slot.size === size
              return (
                <button
                  key={size}
                  onClick={() => setSize(size)}
                  className="flex flex-col items-center gap-2 py-2.5 rounded-xl transition-all"
                  style={{
                    background: active ? '#242424' : '#1a1a1a',
                    border: active ? '1px solid #484848' : '1px solid #1e1e1e',
                  }}
                >
                  {/* Мини-сетка превью 3×3 */}
                  <div className="grid gap-0.5" style={{ gridTemplateColumns: `repeat(3, 6px)` }}>
                    {Array.from({ length: 9 }).map((_, cell) => {
                      const cellCol = (cell % 3) + 1
                      const cellRow = Math.floor(cell / 3) + 1
                      const filled = cellCol <= cols && cellRow <= rows
                      return (
                        <div
                          key={cell}
                          className="rounded-sm"
                          style={{
                            width: 6, height: 6,
                            background: filled
                              ? (active ? '#888' : '#3a3a3a')
                              : (active ? '#2a2a2a' : '#222'),
                          }}
                        />
                      )
                    })}
                  </div>
                  <span style={{ fontSize: 9, color: active ? '#aaa' : '#3a3a3a', fontWeight: active ? 600 : 400 }}>
                    {label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Описание блока */}
        <div className="rounded-xl px-3 py-2.5" style={{ background: '#1a1a1a', border: '1px solid #1e1e1e' }}>
          <p className="text-xs leading-relaxed" style={{ color: '#3a3a3a' }}>
            {activeMeta.description}
          </p>
        </div>
      </div>
    </div>
  )
}
