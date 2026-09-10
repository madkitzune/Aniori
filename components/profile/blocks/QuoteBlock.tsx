'use client'

import { useState } from 'react'

interface Props {
  quote: string
  author: string
  onUpdate: (quote: string, author: string) => void
}

export default function QuoteBlock({ quote, author, onUpdate }: Props) {
  const [editing, setEditing] = useState(false)
  const [draftQuote, setDraftQuote] = useState(quote)
  const [draftAuthor, setDraftAuthor] = useState(author)

  const save = () => { onUpdate(draftQuote, draftAuthor); setEditing(false) }

  if (editing) {
    return (
      <div className="rounded-2xl h-full p-4 flex flex-col gap-3" style={{ background: '#1e1e1e' }}>
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-widest" style={{ color: '#555' }}>💬 Цитата</p>
          <button onClick={save} className="text-xs px-2.5 py-1 rounded-lg btn-shimmer text-white">✓</button>
        </div>
        <textarea
          value={draftQuote}
          onChange={e => setDraftQuote(e.target.value.slice(0, 200))}
          placeholder="Любимая цитата из аниме..."
          rows={3}
          className="input-aniori text-sm resize-none flex-1"
          style={{ lineHeight: 1.6 }}
          autoFocus
        />
        <input
          type="text"
          value={draftAuthor}
          onChange={e => setDraftAuthor(e.target.value.slice(0, 60))}
          placeholder="— Персонаж, аниме"
          className="input-aniori text-xs"
        />
      </div>
    )
  }

  if (!quote) {
    return (
      <button onClick={() => setEditing(true)}
        className="rounded-2xl h-full w-full flex flex-col items-center justify-center gap-2 p-4 group transition-all"
        style={{ background: '#1e1e1e', border: '1px dashed #2a2a2a' }}>
        <span className="text-2xl group-hover:scale-110 transition-transform">💬</span>
        <p className="text-sm" style={{ color: '#555' }}>Добавить цитату</p>
      </button>
    )
  }

  return (
    <div
      className="rounded-2xl h-full p-5 flex flex-col justify-between relative overflow-hidden"
      style={{ background: '#1e1e1e' }}
    >
      {/* Декоративная кавычка */}
      <span
        className="absolute top-2 left-4 font-serif select-none pointer-events-none"
        style={{ fontSize: 72, color: '#2a2a2a', lineHeight: 1 }}
      >
        "
      </span>

      <button onClick={() => setEditing(true)}
        className="absolute top-3 right-3 text-xs transition-colors hover:text-white"
        style={{ color: '#333' }}>
        ✏️
      </button>

      <div className="relative z-10 flex flex-col justify-between h-full">
        <p className="text-sm leading-relaxed italic" style={{ color: '#ccc', paddingTop: 8 }}>
          {quote}
        </p>
        {author && (
          <p className="text-xs mt-3" style={{ color: '#555' }}>
            {author}
          </p>
        )}
      </div>
    </div>
  )
}
