export interface WatchEntry {
  id: string
  title: string
  titleRu: string
  cover: string
  watchedAt: number
}

const KEY = 'aniori_watch_history'
const MAX = 20

export function saveToHistory(entry: Omit<WatchEntry, 'watchedAt'>) {
  if (typeof window === 'undefined') return
  const prev: WatchEntry[] = getHistory()
  const filtered = prev.filter(e => e.id !== entry.id)
  const updated = [{ ...entry, watchedAt: Date.now() }, ...filtered].slice(0, MAX)
  localStorage.setItem(KEY, JSON.stringify(updated))
}

export function getHistory(): WatchEntry[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '[]')
  } catch {
    return []
  }
}

export function clearHistory() {
  if (typeof window === 'undefined') return
  localStorage.removeItem(KEY)
}
