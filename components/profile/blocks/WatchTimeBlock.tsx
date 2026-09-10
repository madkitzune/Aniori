'use client'

import { useState } from 'react'

interface Props {
  showHours: boolean
  showEpisodes: boolean
  showStreak: boolean
  showTitles: boolean
  onToggle: (key: 'showHours' | 'showEpisodes' | 'showStreak' | 'showTitles') => void
}

export default function WatchTimeBlock({ showHours, showEpisodes, showStreak, showTitles, onToggle }: Props) {
  const [settings, setSettings] = useState(false)

  const stats = [
    { key: 'showHours'    as const, label: 'Часов просмотрено',  value: '0',   unit: 'ч',    color: '#60a5fa', show: showHours },
    { key: 'showEpisodes' as const, label: 'Серий просмотрено',  value: '0',   unit: 'эп',   color: '#34d399', show: showEpisodes },
    { key: 'showStreak'   as const, label: 'Дней подряд',        value: '0',   unit: 'дн',   color: '#f472b6', show: showStreak },
    { key: 'showTitles'   as const, label: 'Тайтлов просмотрено',value: '0',   unit: 'тайт', color: '#a78bfa', show: showTitles },
  ]

  return (
    <div className="rounded-2xl h-full p-4 flex flex-col" style={{ background: '#1e1e1e' }}>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs uppercase tracking-widest" style={{ color: '#555' }}>⏱️ Статистика</p>
        <button
          onClick={() => setSettings(v => !v)}
          className="text-xs transition-colors hover:text-white"
          style={{ color: settings ? '#aaa' : '#444' }}
        >
          ⚙️
        </button>
      </div>

      {settings ? (
        /* Режим настроек — тогглы */
        <div className="flex flex-col gap-2 flex-1">
          {stats.map(s => (
            <div key={s.key} className="flex items-center justify-between gap-2">
              <span className="text-xs truncate min-w-0" style={{ color: '#888' }}>{s.label}</span>
              <button
                onClick={() => onToggle(s.key)}
                className="w-9 h-5 rounded-full transition-all relative flex-shrink-0"
                style={{ background: s.show ? '#60a5fa' : '#2a2a2a' }}
              >
                <span
                  className="absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all"
                  style={{ left: s.show ? '18px' : '2px' }}
                />
              </button>
            </div>
          ))}
          <button
            onClick={() => setSettings(false)}
            className="mt-auto text-xs py-1.5 rounded-lg transition-all"
            style={{ background: '#2a2a2a', color: '#888' }}
          >
            Готово
          </button>
        </div>
      ) : (
        /* Режим отображения */
        <div className="flex flex-col gap-2.5 flex-1 justify-center">
          {stats.filter(s => s.show).length === 0 ? (
            <p className="text-xs text-center" style={{ color: '#333' }}>Нет активных строк</p>
          ) : (
            stats.filter(s => s.show).map(s => (
              <div key={s.key}>
                <div className="flex items-end justify-between mb-1 gap-2">
                  <span className="text-xs truncate min-w-0" style={{ color: '#555' }}>{s.label}</span>
                  <span className="text-sm font-bold flex-shrink-0" style={{ color: s.color }}>
                    {s.value} <span className="text-xs font-normal" style={{ color: '#444' }}>{s.unit}</span>
                  </span>
                </div>
                <div className="w-full h-1 rounded-full" style={{ background: '#2a2a2a' }}>
                  <div className="h-1 rounded-full w-0" style={{ background: s.color }} />
                </div>
              </div>
            ))
          )}
          <p className="text-xs mt-1" style={{ color: '#2a2a2a' }}>Синхронизация с историей — скоро</p>
        </div>
      )}
    </div>
  )
}
