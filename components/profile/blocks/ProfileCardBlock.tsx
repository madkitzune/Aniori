'use client'

import { ProfileConfig, BlockSize } from '@/lib/profile-config'

interface Props {
  username: string
  email: string
  joinedAt: string
  config: ProfileConfig
  size: BlockSize
  onCustomize: () => void
}

const BADGES = [
  { icon: '🌟', label: 'Ранний пользователь' },
  { icon: '🎌', label: 'Аниме-фанат' },
]

// Высота баннера зависит от размера блока в сетке
// gridAutoRows = 200px, gap = 12px
// 1 строка = 200px, 2 строки = 200*2 + 12 = 412px
const BANNER_HEIGHT: Record<BlockSize, number> = {
  '1x1': 60,  '2x1': 75,  '3x1': 85,
  '1x2': 140, '2x2': 160, '3x2': 175,
  '1x3': 220, '2x3': 240, '3x3': 260,
}

const AVATAR_SIZE: Record<BlockSize, number> = {
  '1x1': 52, '2x1': 60,  '3x1': 64,
  '1x2': 72, '2x2': 80,  '3x2': 88,
  '1x3': 84, '2x3': 96,  '3x3': 104,
}

export default function ProfileCardBlock({ username, email, joinedAt, config, size, onCustomize }: Props) {
  const bannerH = BANNER_HEIGHT[size]
  const avatarSize = AVATAR_SIZE[size]
  // Аватар висит на половине своей высоты ниже баннера
  const avatarTop = bannerH - avatarSize / 2
  const contentPadTop = avatarSize / 2 + 10
  const isTall = size[2] !== '1'

  return (
    <div className="relative rounded-2xl overflow-hidden h-full" style={{ background: '#1e1e1e' }}>
      {/* Banner */}
      <div
        className="w-full transition-all duration-300"
        style={{
          height: bannerH,
          background: config.bannerImage
            ? `url(${config.bannerImage}) center/cover`
            : config.bannerColor,
          borderBottom: `2px solid ${config.accentColor}33`,
        }}
      />

      {/* Avatar */}
      <div
        className="absolute flex items-center justify-center font-bold text-white rounded-full border-[3px] transition-all duration-300"
        style={{
          width: avatarSize,
          height: avatarSize,
          fontSize: avatarSize * 0.38,
          top: avatarTop,
          left: 18,
          background: `linear-gradient(135deg, ${config.accentColor}88, #333)`,
          borderColor: '#1e1e1e',
        }}
      >
        {username[0]?.toUpperCase()}
      </div>

      {/* Customize button */}
      <button
        onClick={onCustomize}
        className="absolute text-xs px-2.5 py-1 rounded-lg transition-all hover:opacity-80"
        style={{
          top: bannerH + 8,
          right: 14,
          background: '#2e2e2e',
          color: '#aaa',
          border: '1px solid #3a3a3a',
        }}
      >
        ✏️ Изменить
      </button>

      {/* Info */}
      <div style={{ paddingTop: contentPadTop, paddingLeft: 18, paddingRight: 14, paddingBottom: 12 }}>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-white font-bold leading-none" style={{ fontSize: isTall ? 18 : 15 }}>
            {username}
          </span>
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{ background: config.accentColor + '22', color: config.accentColor }}
          >
            Aniori
          </span>
        </div>

        <p className="text-xs mt-0.5" style={{ color: '#555' }}>{email}</p>

        {isTall && config.aboutMe && (
          <p className="text-sm mt-2 leading-relaxed" style={{ color: '#bbb' }}>
            {config.aboutMe}
          </p>
        )}

        {config.showBadges && (
          <div className="flex gap-1.5 mt-2 flex-wrap">
            {BADGES.map(b => (
              <span key={b.label} title={b.label} className="cursor-default"
                style={{ fontSize: isTall ? 16 : 13, filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.2))' }}>
                {b.icon}
              </span>
            ))}
          </div>
        )}

        {isTall && (
          <p className="text-xs mt-2" style={{ color: '#444' }}>На сайте с {joinedAt}</p>
        )}
      </div>
    </div>
  )
}
