'use client'

import { useEffect, useState } from 'react'
import { getHistory } from '@/lib/watchHistory'

export default function StatsBlock() {
  const [watched, setWatched] = useState(0)

  useEffect(() => {
    setWatched(getHistory().length)
  }, [])

  const stats = [
    { label: 'Просмотрено', value: watched > 0 ? String(watched) : '—', color: '#34d399' },
    { label: 'Смотрю',      value: '—', color: '#60a5fa' },
    { label: 'В планах',    value: '—', color: '#a78bfa' },
  ]

  return (
    <div className="rounded-2xl h-full flex flex-col justify-between p-4" style={{ background: '#1e1e1e', minHeight: 120 }}>
      <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#555' }}>Статистика</p>
      <div className="flex flex-col gap-2">
        {stats.map(s => (
          <div key={s.label} className="flex items-center justify-between">
            <span className="text-sm" style={{ color: '#888' }}>{s.label}</span>
            <span className="text-sm font-bold" style={{ color: s.color }}>{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
