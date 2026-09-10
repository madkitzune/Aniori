import { Anime } from './anime'

export type CatalogBlockType =
  | 'hero'
  | 'continue'
  | 'my-list'
  | 'random'
  | 'popular'
  | 'new'
  | 'top'
  | 'ongoing'
  | 'genre'
  | 'custom'

export type StatusFilter = 'ongoing' | 'finished' | undefined

export interface CatalogBlock {
  key: string
  type: CatalogBlockType
  genre?: string
  // Для своей ленты (type === 'custom')
  name?: string
  genres?: string[]
  tags?: string[]
  status?: StatusFilter
}

// «Темы» (гипер-жанры), отличные от базовых жанров — как в AniLibria.
// «Перерождение» намеренно есть в словаре, но не назначено ни одному тайтлу —
// чтобы показать предупреждение о слишком узкой комбинации.
export const THEMES: string[] = [
  'Сёнен', 'Сэйнэн', 'Сверхспособности', 'Перерождение',
  'Путешествия во времени', 'Постапокалипсис', 'Магия',
  'Музыка', 'Детектив', 'Меха', 'Школа', 'Психология',
]

export function matchesCustom(a: Anime, b: CatalogBlock): boolean {
  if (b.status && a.status !== b.status) return false
  if (b.genres?.length && !b.genres.every(g => a.genre.includes(g))) return false
  if (b.tags?.length && !b.tags.every(t => a.tags?.includes(t))) return false
  return true
}

const KEY = 'aniori_catalog_config'

// Типы-одиночки (могут быть только в одном экземпляре)
export const SINGLE_TYPES: CatalogBlockType[] = [
  'hero', 'continue', 'my-list', 'random', 'popular', 'new', 'top', 'ongoing',
]

export const DEFAULT_CATALOG: CatalogBlock[] = [
  { key: 'hero',     type: 'hero'     },
  { key: 'continue', type: 'continue' },
  { key: 'my-list',  type: 'my-list'  },
  { key: 'random',   type: 'random'   },
  { key: 'popular',  type: 'popular'  },
  { key: 'new',      type: 'new'      },
  { key: 'ongoing',  type: 'ongoing'  },
  { key: 'top',      type: 'top'      },
  { key: 'g-action', type: 'genre', genre: 'Экшн'      },
  { key: 'g-romance',type: 'genre', genre: 'Романтика' },
]

export function blockTitle(b: CatalogBlock): string {
  switch (b.type) {
    case 'hero':     return 'Главный баннер'
    case 'continue': return 'Продолжить просмотр'
    case 'my-list':  return 'Мой список'
    case 'random':   return 'Что посмотреть?'
    case 'popular':  return 'Популярное'
    case 'new':      return 'Новинки'
    case 'top':      return 'Высший рейтинг'
    case 'ongoing':  return 'Онгоинги'
    case 'genre':    return b.genre ?? 'Жанр'
    case 'custom':   return b.name || 'Своя лента'
  }
}

export function loadCatalogConfig(): CatalogBlock[] {
  if (typeof window === 'undefined') return DEFAULT_CATALOG
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return DEFAULT_CATALOG
    const parsed = JSON.parse(raw) as CatalogBlock[]
    if (!Array.isArray(parsed) || !parsed.length) return DEFAULT_CATALOG
    // Миграция: если баннер ещё не сохранён — добавляем сверху
    if (!parsed.some(b => b.type === 'hero')) {
      parsed.unshift({ key: 'hero', type: 'hero' })
    }
    return parsed
  } catch {
    return DEFAULT_CATALOG
  }
}

export function saveCatalogConfig(config: CatalogBlock[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(KEY, JSON.stringify(config))
}

export function resetCatalogConfig() {
  if (typeof window === 'undefined') return
  localStorage.removeItem(KEY)
}
