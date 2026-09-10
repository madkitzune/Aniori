const KEY = 'aniori_not_interested'

export function getHidden(): string[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '[]')
  } catch {
    return []
  }
}

export function addHidden(id: string): string[] {
  const list = getHidden()
  if (list.includes(id)) return list
  const next = [...list, id]
  localStorage.setItem(KEY, JSON.stringify(next))
  return next
}

export function clearHidden() {
  if (typeof window === 'undefined') return
  localStorage.removeItem(KEY)
}
