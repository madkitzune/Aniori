'use client'

import { useEffect, useState } from 'react'
import { isBookmarked, toggleBookmark } from '@/lib/bookmarks'

export default function WatchActions({ id }: { id: string }) {
  const [saved, setSaved] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setSaved(isBookmarked(id))
  }, [id])

  const toggleSave = () => {
    setSaved(toggleBookmark(id))
  }

  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch { /* ignore */ }
  }

  const btn: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: 7,
    fontSize: 13, fontFamily: 'Rubik, sans-serif',
    padding: '8px 14px', borderRadius: 9, cursor: 'pointer',
    border: '1px solid #2a2a2a', transition: 'all 0.15s', whiteSpace: 'nowrap',
  }

  return (
    <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
      <button
        onClick={toggleSave}
        style={{ ...btn, background: saved ? '#fff' : '#1a1a1a', color: saved ? '#111' : '#ccc', borderColor: saved ? '#fff' : '#2a2a2a' }}
      >
        <i className={`ti ${saved ? 'ti-check' : 'ti-bookmark'}`} style={{ fontSize: 15 }} aria-hidden="true" />
        {saved ? 'В списке' : 'В список'}
      </button>
      <button
        onClick={share}
        style={{ ...btn, background: '#1a1a1a', color: copied ? '#6ee7b7' : '#ccc' }}
        aria-label="Поделиться"
      >
        <i className={`ti ${copied ? 'ti-check' : 'ti-share'}`} style={{ fontSize: 15 }} aria-hidden="true" />
        {copied ? 'Скопировано' : 'Поделиться'}
      </button>
    </div>
  )
}
