'use client'

import { useState } from 'react'
import { GridBlock, BLOCK_META, MAX_SLOTS, MIN_SLOTS, newSlotId } from '@/lib/profile-config'

interface Props {
  layout: GridBlock[]
  onUpdate: (layout: GridBlock[]) => void
}

export default function GridManager({ layout, onUpdate }: Props) {
  const [open, setOpen] = useState(false)

  const add = () => {
    if (layout.length >= MAX_SLOTS) return
    onUpdate([...layout, { id: newSlotId(), blockId: 'empty', size: '1x1' }])
  }

  const remove = (id: string) => {
    if (layout.length <= MIN_SLOTS) return
    onUpdate(layout.filter(b => b.id !== id))
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:brightness-125"
        style={{
          background: open ? '#3a3a3a' : '#252525',
          border: `1px solid ${open ? '#555' : '#333'}`,
          color: open ? '#fff' : '#666',
          fontSize: 15,
        }}
        title="Управление секциями"
      >
        ⊞
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-[400]" onClick={() => setOpen(false)} />
          <div
            className="absolute z-[401] rounded-2xl p-3"
            onClick={e => e.stopPropagation()}
            style={{
              bottom: '110%',
              right: 0,
              width: 220,
              background: '#1a1a1a',
              border: '1px solid #2a2a2a',
              boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-widest" style={{ color: '#555' }}>
                Секции {layout.length}/{MAX_SLOTS}
              </span>
              <button
                onClick={add}
                disabled={layout.length >= MAX_SLOTS}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs transition-all disabled:opacity-30"
                style={{ background: '#2a2a2a', color: '#aaa', border: '1px solid #333' }}
              >
                + Добавить
              </button>
            </div>

            <div className="flex flex-col gap-1 max-h-48 overflow-y-auto" style={{ scrollbarWidth: 'none' }}
              onWheel={e => e.stopPropagation()}>
              {layout.map((slot, i) => {
                const meta = BLOCK_META[slot.blockId]
                return (
                  <div key={slot.id} className="flex items-center gap-2 px-2 py-1.5 rounded-lg" style={{ background: '#222' }}>
                    <span style={{ fontSize: 13 }}>{meta.icon}</span>
                    <span className="text-xs text-white flex-1 truncate">{meta.label}</span>
                    <span className="text-xs" style={{ color: '#444' }}>#{i + 1}</span>
                    <button
                      onClick={() => remove(slot.id)}
                      disabled={layout.length <= MIN_SLOTS}
                      className="w-5 h-5 rounded flex items-center justify-center text-xs transition-all disabled:opacity-20 hover:bg-red-900/30"
                      style={{ color: '#555' }}
                    >
                      ✕
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
