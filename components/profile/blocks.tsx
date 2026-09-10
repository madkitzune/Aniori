'use client'

export type BlockId = 'profile' | 'stats' | 'subscription' | 'recent' | 'logout' | 'empty'

export interface BlockDef {
  id: BlockId
  label: string
  icon: string
}

export const BLOCK_DEFS: BlockDef[] = [
  { id: 'profile',      label: 'Профиль',         icon: '👤' },
  { id: 'stats',        label: 'Статистика',       icon: '📊' },
  { id: 'subscription', label: 'Подписка',         icon: '⭐' },
  { id: 'recent',       label: 'Недавнее',         icon: '🕐' },
  { id: 'logout',       label: 'Выход',            icon: '🚪' },
]

export const DEFAULT_LAYOUT: BlockId[] = ['profile', 'stats', 'subscription', 'logout']
