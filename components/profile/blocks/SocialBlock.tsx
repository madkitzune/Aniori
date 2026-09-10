'use client'

import { useState } from 'react'
import { sanitizeUrl, checkUrl } from '@/lib/security'

interface SocialLink { platform: string; url: string; color: string; emoji: string }
interface Props {
  links: SocialLink[]
  onUpdate: (links: SocialLink[]) => void
}

const PRESETS = [
  { platform: 'Discord',  emoji: '💬', color: '#5865F2', placeholder: 'discord.gg/...' },
  { platform: 'Telegram', emoji: '✈️', color: '#26A5E4', placeholder: 't.me/...' },
  { platform: 'VK',       emoji: '🔵', color: '#0077FF', placeholder: 'vk.com/...' },
  { platform: 'GitHub',   emoji: '🐙', color: '#8b949e', placeholder: 'github.com/...' },
  { platform: 'YouTube',  emoji: '▶️', color: '#FF0000', placeholder: 'youtube.com/...' },
  { platform: 'Twitter',  emoji: '🐦', color: '#1DA1F2', placeholder: 'x.com/...' },
  { platform: 'TikTok',   emoji: '🎵', color: '#ff2d55', placeholder: 'tiktok.com/@...' },
  { platform: 'Twitch',   emoji: '🎮', color: '#9146FF', placeholder: 'twitch.tv/...' },
  { platform: 'Steam',    emoji: '🎲', color: '#66c0f4', placeholder: 'steamcommunity.com/...' },
]


export default function SocialBlock({ links, onUpdate }: Props) {
  const [editing, setEditing] = useState(false)
  const [drafts, setDrafts] = useState<SocialLink[]>(links.length ? links : [])
  const [showPresets, setShowPresets] = useState(false)
  const [errors, setErrors] = useState<Record<number, string>>({})

  const URL_ERRORS: Record<string, string> = {
    unsafe:       '⛔ Небезопасная ссылка',
    blocked_adult:'🔞 Сайт с 18+ контентом запрещён',
    blocked_ads:  '📵 Рекламные сети запрещены',
    shortener:    '🔗 Сокращатели ссылок запрещены',
  }

  const addCustom = () => {
    setDrafts(d => [...d, { platform: '', url: '', color: '#808080', emoji: '🔗' }])
  }

  const addPreset = (preset: typeof PRESETS[number]) => {
    if (drafts.some(d => d.platform === preset.platform)) return
    setDrafts(d => [...d, { platform: preset.platform, url: '', color: preset.color, emoji: preset.emoji }])
    setShowPresets(false)
  }

  const updateDraft = (i: number, patch: Partial<SocialLink>) => {
    setDrafts(d => d.map((item, idx) => idx === i ? { ...item, ...patch } : item))
  }

  const removeDraft = (i: number) => {
    setDrafts(d => d.filter((_, idx) => idx !== i))
  }

  const save = () => {
    const newErrors: Record<number, string> = {}
    drafts.forEach((d, i) => {
      if (!d.url.trim()) return
      const check = checkUrl(d.url)
      if (!check.ok) newErrors[i] = URL_ERRORS[check.reason]
    })
    if (Object.keys(newErrors).length) {
      setErrors(newErrors)
      return
    }
    setErrors({})
    const safe = drafts
      .map(d => ({ ...d, url: sanitizeUrl(d.url) }))
      .filter(d => d.url && d.platform.trim())
    onUpdate(safe)
    setEditing(false)
  }

  const openEdit = () => {
    setDrafts(links.length ? [...links] : [])
    setEditing(true)
  }

  if (editing) {
    return (
      <div className="rounded-2xl h-full p-3 flex flex-col" style={{ background: '#1e1e1e', overflow: 'hidden' }}>
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs uppercase tracking-widest" style={{ color: '#555' }}>🔗 Соцсети</p>
          <button onClick={save} className="text-xs px-2.5 py-1 rounded-lg btn-shimmer text-white">✓</button>
        </div>

        {/* Список */}
        <div className="flex flex-col gap-1.5 overflow-y-auto flex-1 mb-2" style={{ scrollbarWidth: 'none' }}>
          {drafts.map((d, i) => (
            <div key={i} className="flex flex-col gap-0.5">
            <div className="flex items-center gap-1.5 rounded-lg p-1.5" style={{ background: errors[i] ? '#2a1a1a' : '#252525', border: errors[i] ? '1px solid #cc333340' : '1px solid transparent' }}>
              {/* Эмодзи */}
              <input
                type="text"
                value={d.emoji}
                onChange={e => updateDraft(i, { emoji: e.target.value.slice(-2) || '🔗' })}
                className="w-8 text-center bg-transparent border-none outline-none text-base"
              />
              {/* Название */}
              <input
                type="text"
                value={d.platform}
                onChange={e => updateDraft(i, { platform: e.target.value })}
                placeholder="Название"
                className="text-xs bg-transparent border-none outline-none text-white flex-1 min-w-0"
                style={{ maxWidth: 60 }}
              />
              {/* URL */}
              <input
                type="text"
                value={d.url}
                onChange={e => updateDraft(i, { url: e.target.value })}
                placeholder="ссылка..."
                className="text-xs bg-transparent border-none outline-none flex-1 min-w-0"
                style={{ color: '#888' }}
              />
              {/* Цвет — нативная палитра */}
              <label className="flex-shrink-0 cursor-pointer relative" title="Выбрать цвет">
                <div
                  className="w-5 h-5 rounded-full border-2 transition-all hover:scale-110"
                  style={{ background: d.color, borderColor: 'rgba(255,255,255,0.2)' }}
                />
                <input
                  type="color"
                  value={d.color}
                  onChange={e => updateDraft(i, { color: e.target.value })}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
              </label>
              <button onClick={() => removeDraft(i)} className="text-xs ml-1 flex-shrink-0" style={{ color: '#444' }}>✕</button>
            </div>
            {errors[i] && (
              <p className="text-xs px-1.5" style={{ color: '#ff6b6b' }}>{errors[i]}</p>
            )}
            </div>
          ))}
        </div>

        {/* Кнопки добавления */}
        <div className="flex gap-1.5 flex-wrap">
          <button onClick={() => setShowPresets(v => !v)}
            className="text-xs px-2 py-1 rounded-lg transition-all hover:bg-[#2a2a2a]"
            style={{ background: '#222', color: '#888', border: '1px solid #2a2a2a' }}>
            + Платформа
          </button>
          <button onClick={addCustom}
            className="text-xs px-2 py-1 rounded-lg transition-all hover:bg-[#2a2a2a]"
            style={{ background: '#222', color: '#888', border: '1px solid #2a2a2a' }}>
            + Своя
          </button>
        </div>

        {/* Пресеты */}
        {showPresets && (
          <div className="flex flex-wrap gap-1 mt-2">
            {PRESETS.map(p => (
              <button key={p.platform} onClick={() => addPreset(p)}
                className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs transition-all hover:brightness-125"
                style={{ background: p.color + '20', border: `1px solid ${p.color}40`, color: p.color }}>
                {p.emoji} {p.platform}
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }

  if (links.length === 0) {
    return (
      <button onClick={openEdit}
        className="rounded-2xl h-full w-full flex flex-col items-center justify-center gap-2 p-4 group transition-all"
        style={{ background: '#1e1e1e', border: '1px dashed #2a2a2a' }}>
        <span className="text-2xl group-hover:scale-110 transition-transform">🔗</span>
        <p className="text-sm" style={{ color: '#555' }}>Добавить ссылки</p>
      </button>
    )
  }

  return (
    <div className="rounded-2xl h-full p-4 flex flex-col" style={{ background: '#1e1e1e' }}>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs uppercase tracking-widest" style={{ color: '#555' }}>🔗 Соцсети</p>
        <button onClick={openEdit} className="text-xs" style={{ color: '#444' }}>✏️</button>
      </div>
      <div className="flex flex-col gap-2 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
        {links.map(l => (
          <a key={l.platform} href={l.url.startsWith('http') ? l.url : `https://${l.url}`}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all hover:brightness-125"
            style={{ background: l.color + '15', border: `1px solid ${l.color}25`, textDecoration: 'none' }}>
            <span style={{ fontSize: 14 }}>{l.emoji}</span>
            <span className="text-sm font-medium" style={{ color: l.color }}>{l.platform}</span>
            <span className="ml-auto text-xs truncate" style={{ color: '#555', maxWidth: 90 }}>{l.url}</span>
          </a>
        ))}
      </div>
    </div>
  )
}
