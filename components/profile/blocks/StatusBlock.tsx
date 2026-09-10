'use client'

import { useState } from 'react'

const MOODS = ['😊','😎','🤔','😴','🔥','💀','🎉','👻','🫠','⚡']

interface Props {
  status: string
  mood: string
  onUpdate: (status: string, mood: string) => void
}

export default function StatusBlock({ status, mood, onUpdate }: Props) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(status)
  const [draftMood, setDraftMood] = useState(mood || '😊')

  const save = () => { onUpdate(draft, draftMood); setEditing(false) }

  return (
    <div className="rounded-2xl h-full p-4 flex flex-col justify-between" style={{ background: '#1e1e1e', minHeight: 120 }}>
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs uppercase tracking-widest" style={{ color: '#555' }}>💭 Статус</p>
        <button onClick={() => editing ? save() : setEditing(true)}
          className="text-xs transition-colors" style={{ color: '#555' }}>
          {editing ? '✓ Сохранить' : '✏️'}
        </button>
      </div>

      {editing ? (
        <div className="flex flex-col gap-2 flex-1">
          <div className="flex gap-1.5 flex-wrap">
            {MOODS.map(m => (
              <button key={m} onClick={() => setDraftMood(m)}
                className="text-lg transition-all hover:scale-125"
                style={{ filter: draftMood === m ? 'none' : 'grayscale(0.6) opacity(0.5)' }}>
                {m}
              </button>
            ))}
          </div>
          <input
            type="text"
            value={draft}
            onChange={e => setDraft(e.target.value.slice(0, 60))}
            onKeyDown={e => e.key === 'Enter' && save()}
            placeholder="Что сейчас..."
            className="input-aniori text-sm"
            autoFocus
          />
        </div>
      ) : (
        <div className="flex items-center gap-3 flex-1">
          <span style={{ fontSize: 32 }}>{mood || '😊'}</span>
          <p className="text-sm leading-relaxed" style={{ color: status ? '#ccc' : '#333' }}>
            {status || 'Нет статуса'}
          </p>
        </div>
      )}
    </div>
  )
}
