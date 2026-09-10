const KEY = 'aniori_bookmarks'

export function getBookmarks(): string[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '[]')
  } catch {
    return []
  }
}

export function isBookmarked(id: string): boolean {
  return getBookmarks().includes(id)
}

export function toggleBookmark(id: string): boolean {
  const list = getBookmarks()
  const has = list.includes(id)
  const next = has ? list.filter(x => x !== id) : [...list, id]
  localStorage.setItem(KEY, JSON.stringify(next))
  return !has
}
