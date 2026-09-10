'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getHistory, WatchEntry } from '@/lib/watchHistory'

export default function RecentlyWatched() {
  const [history, setHistory] = useState<WatchEntry[]>([])
  const router = useRouter()

  useEffect(() => {
    setHistory(getHistory())
  }, [])

  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-[#555]">
        <span className="text-3xl mb-2">📺</span>
        <p className="text-sm">Вы ещё ничего не смотрели</p>
      </div>
    )
  }

  return (
    <div className="flex flex-wrap gap-3">
      {history.slice(0, 12).map(entry => (
        <button
          key={entry.id}
          onClick={() => router.push(`/watch/${entry.id}`)}
          className="group w-[130px] text-left"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={entry.cover}
            alt={entry.title}
            className="w-full h-[180px] object-cover rounded-xl mb-2 transition-all duration-300 group-hover:brightness-75 group-hover:scale-[1.03]"
          />
          <p className="text-xs text-white font-medium leading-tight truncate">{entry.titleRu}</p>
          <p className="text-[11px] text-[#666] mt-0.5">
            {new Date(entry.watchedAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}
          </p>
        </button>
      ))}
    </div>
  )
}
