export type BlockId =
  | 'profile-card'
  | 'stats'
  | 'subscription'
  | 'watch-time'
  | 'favorite-anime'
  | 'now-watching'
  | 'favorites'
  | 'social'
  | 'status'
  | 'friends'
  | 'schedule'
  | 'quote'
  | 'messenger'
  | 'customize'
  | 'achievements'
  | 'recent'
  | 'logout'
  | 'empty'

export type BlockSize =
  | '1x1' | '2x1' | '3x1'
  | '1x2' | '2x2' | '3x2'
  | '1x3' | '2x3' | '3x3'

export interface GridBlock {
  id: string
  blockId: BlockId
  size: BlockSize
}

export interface SocialLink {
  platform: string
  emoji: string
  url: string
  color: string
}

export interface ProfileConfig {
  bannerColor: string
  bannerImage: string
  accentColor: string
  aboutMe: string
  showBadges: boolean
  favoriteAnimeId: string | null
  nowWatchingId: string | null
  nowWatchingEpisode: number
  favoriteIds: string[]
  socialLinks: SocialLink[]
  statusText: string
  statusMood: string
  quoteText: string
  quoteAuthor: string
  watchShowHours: boolean
  watchShowEpisodes: boolean
  watchShowStreak: boolean
  watchShowTitles: boolean
  showAdultContent: boolean
  adultConfirmed: boolean
  gridLayout: GridBlock[]
}

export const DEFAULT_CONFIG: ProfileConfig = {
  bannerColor: 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)',
  bannerImage: '',
  accentColor: '#808080',
  aboutMe: '',
  showBadges: true,
  favoriteAnimeId: null,
  nowWatchingId: null,
  nowWatchingEpisode: 1,
  favoriteIds: [],
  socialLinks: [],
  statusText: '',
  statusMood: '😊',
  quoteText: '',
  quoteAuthor: '',
  watchShowHours: true,
  watchShowEpisodes: true,
  watchShowStreak: false,
  watchShowTitles: true,
  showAdultContent: false,
  adultConfirmed: false,
  gridLayout: [
    { id: 's1', blockId: 'profile-card',  size: '2x1' },
    { id: 's2', blockId: 'stats',         size: '1x1' },
    { id: 's3', blockId: 'subscription',  size: '1x1' },
    { id: 's4', blockId: 'watch-time',    size: '1x1' },
    { id: 's5', blockId: 'now-watching',  size: '1x1' },
    { id: 's6', blockId: 'logout',        size: '1x1' },
  ],
}

export const BLOCK_META: Record<BlockId, { label: string; icon: string; description: string }> = {
  'profile-card':  { label: 'Профиль',        icon: '👤', description: 'Аватар, баннер, имя, "о себе"' },
  'stats':         { label: 'Статистика',     icon: '📊', description: 'Смотрю / посмотрел / в планах' },
  'subscription':  { label: 'Подписка',       icon: '⭐', description: 'Текущий план и кнопка улучшить' },
  'watch-time':    { label: 'Время',          icon: '⏱️', description: 'Часы и серии просмотрено' },
  'favorite-anime':{ label: 'Любимое',        icon: '❤️', description: 'Одно любимое аниме' },
  'now-watching':  { label: 'Смотрю',         icon: '🎬', description: 'Текущее аниме + прогресс серий' },
  'favorites':     { label: 'Избранное',      icon: '🌟', description: 'До 5 любимых аниме' },
  'social':        { label: 'Соцсети',        icon: '🔗', description: 'Discord, Telegram и другие' },
  'status':        { label: 'Статус',         icon: '💭', description: 'Настроение и короткое сообщение' },
  'friends':       { label: 'Друзья',         icon: '👥', description: 'Онлайн-друзья (скоро)' },
  'schedule':      { label: 'Расписание',     icon: '📅', description: 'Выход новых серий (скоро)' },
  'quote':         { label: 'Цитата',         icon: '💬', description: 'Любимая цитата из аниме' },
  'messenger':     { label: 'Мессенджер',     icon: '📨', description: 'Чаты (скоро)' },
  'customize':     { label: 'Кастомизация',   icon: '🎨', description: 'Настройки внешнего вида' },
  'achievements':  { label: 'Достижения',     icon: '🏆', description: 'Значки и ачивки' },
  'recent':        { label: 'Недавнее',       icon: '🕐', description: 'Последние просмотренные' },
  'logout':        { label: 'Выход',          icon: '🚪', description: 'Выйти из аккаунта' },
  'empty':         { label: 'Пусто',          icon: '➕', description: 'Пустая секция' },
}

export const MAX_SLOTS = 12
export const MIN_SLOTS = 1

export const newSlotId = () => `s_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`
