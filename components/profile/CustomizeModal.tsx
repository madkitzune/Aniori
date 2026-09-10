'use client'

import { useState } from 'react'
import { ProfileConfig } from '@/lib/profile-config'
import { isSafeImageUrl } from '@/lib/security'
import AgeConfirmModal from '@/components/AgeConfirmModal'

interface Props {
  config: ProfileConfig
  username: string
  onUpdate: (patch: Partial<ProfileConfig>) => void
  onClose: () => void
}

const BANNER_PRESETS = [
  { label: 'Серый',     value: 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)' },
  { label: 'Закат',     value: 'linear-gradient(135deg, #3d1a1a 0%, #1a1a2e 100%)' },
  { label: 'Океан',     value: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)' },
  { label: 'Лес',       value: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)' },
  { label: 'Ночь',      value: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)' },
  { label: 'Сакура',    value: 'linear-gradient(135deg, #2d1b2e 0%, #3d2c3e 100%)' },
]

const ACCENT_PRESETS = [
  '#808080', '#60a5fa', '#34d399', '#a78bfa',
  '#f472b6', '#fb923c', '#facc15', '#f87171',
]

export default function CustomizeModal({ config, username, onUpdate, onClose }: Props) {
  const [aboutMe, setAboutMe] = useState(config.aboutMe)
  const [bannerImage, setBannerImage] = useState(config.bannerImage)
  const [bannerImageError, setBannerImageError] = useState('')
  const [showAgeConfirm, setShowAgeConfirm] = useState(false)

  const handleBannerImageBlur = () => {
    if (bannerImage && !isSafeImageUrl(bannerImage)) {
      setBannerImageError('Небезопасная ссылка — только https://')
      setBannerImage('')
    } else {
      setBannerImageError('')
      onUpdate({ bannerImage })
    }
  }

  const handleAdultToggle = () => {
    if (!config.showAdultContent) {
      if (config.adultConfirmed) {
        onUpdate({ showAdultContent: true })
      } else {
        setShowAgeConfirm(true)
      }
    } else {
      onUpdate({ showAdultContent: false })
    }
  }

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div
        className="relative w-full max-w-2xl rounded-2xl overflow-hidden"
        style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', maxHeight: '90vh', overflowY: 'auto' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid #2a2a2a' }}>
          <h2 className="text-white font-bold text-lg">🎨 Кастомизация профиля</h2>
          <button onClick={onClose} className="text-[#666] hover:text-white transition-colors text-xl">✕</button>
        </div>

        {/* Preview */}
        <div className="px-6 pt-5">
          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#555' }}>Предпросмотр</p>
          <div className="rounded-2xl overflow-hidden" style={{ background: '#222' }}>
            <div
              className="w-full"
              style={{
                height: 80,
                background: bannerImage ? `url(${bannerImage}) center/cover` : config.bannerColor,
              }}
            />
            <div className="px-4 pb-4" style={{ paddingTop: 36, position: 'relative' }}>
              <div
                className="absolute flex items-center justify-center text-xl font-bold text-white rounded-full border-[3px]"
                style={{
                  width: 56, height: 56, top: -28, left: 16,
                  background: `linear-gradient(135deg, ${config.accentColor}88, #333)`,
                  borderColor: '#222',
                }}
              >
                {username[0]?.toUpperCase()}
              </div>
              <p className="text-white font-bold">{username}</p>
              {aboutMe && <p className="text-sm mt-1" style={{ color: '#bbb' }}>{aboutMe}</p>}
            </div>
          </div>
        </div>

        <div className="px-6 py-5 flex flex-col gap-6">
          {/* Banner presets */}
          <div>
            <p className="text-sm font-semibold mb-3 text-white">Баннер</p>
            <div className="grid grid-cols-6 gap-2">
              {BANNER_PRESETS.map(p => (
                <button
                  key={p.label}
                  title={p.label}
                  onClick={() => onUpdate({ bannerColor: p.value })}
                  className="rounded-lg h-10 transition-all hover:scale-105"
                  style={{
                    background: p.value,
                    border: config.bannerColor === p.value ? `2px solid ${config.accentColor}` : '2px solid transparent',
                  }}
                />
              ))}
            </div>
            <div className="mt-3">
              <p className="text-xs mb-1.5" style={{ color: '#666' }}>URL изображения (необязательно)</p>
              <input
                type="text"
                value={bannerImage}
                onChange={e => setBannerImage(e.target.value)}
                onBlur={handleBannerImageBlur}
                placeholder="https://..."
                className="input-aniori text-sm"
              />
              {bannerImageError && (
                <p className="text-xs mt-1" style={{ color: '#ff6b6b' }}>{bannerImageError}</p>
              )}
            </div>
          </div>

          {/* Accent color */}
          <div>
            <p className="text-sm font-semibold mb-3 text-white">Акцент-цвет</p>
            <div className="flex gap-2 flex-wrap">
              {ACCENT_PRESETS.map(c => (
                <button
                  key={c}
                  onClick={() => onUpdate({ accentColor: c })}
                  className="w-8 h-8 rounded-full transition-all hover:scale-110"
                  style={{
                    background: c,
                    border: config.accentColor === c ? '2px solid white' : '2px solid transparent',
                    boxShadow: config.accentColor === c ? `0 0 8px ${c}` : 'none',
                  }}
                />
              ))}
            </div>
          </div>

          {/* About me */}
          <div>
            <p className="text-sm font-semibold mb-2 text-white">О себе</p>
            <textarea
              value={aboutMe}
              onChange={e => setAboutMe(e.target.value)}
              onBlur={() => onUpdate({ aboutMe })}
              placeholder="Расскажи о себе..."
              maxLength={200}
              rows={3}
              className="input-aniori text-sm resize-none"
              style={{ lineHeight: 1.5 }}
            />
            <p className="text-xs mt-1 text-right" style={{ color: '#444' }}>{aboutMe.length}/200</p>
          </div>

          {/* 18+ toggle */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-white">Контент 18+ <span style={{ fontSize: 11 }}>🔞</span></p>
              <p className="text-xs" style={{ color: '#555' }}>Показывать аниме для взрослых в каталоге</p>
            </div>
            <button
              onClick={handleAdultToggle}
              className="w-12 h-6 rounded-full transition-all relative flex-shrink-0"
              style={{ background: config.showAdultContent ? '#cc3333' : '#333' }}
            >
              <span className="absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all"
                style={{ left: config.showAdultContent ? '26px' : '2px' }} />
            </button>
          </div>

          {/* Badges toggle */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-white">Показывать значки</p>
              <p className="text-xs" style={{ color: '#555' }}>Отображать достижения на профиле</p>
            </div>
            <button
              onClick={() => onUpdate({ showBadges: !config.showBadges })}
              className="w-12 h-6 rounded-full transition-all relative"
              style={{ background: config.showBadges ? config.accentColor : '#333' }}
            >
              <span
                className="absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all"
                style={{ left: config.showBadges ? '26px' : '2px' }}
              />
            </button>
          </div>
        </div>
      </div>

      {showAgeConfirm && (
        <AgeConfirmModal
          onConfirm={() => {
            onUpdate({ showAdultContent: true, adultConfirmed: true })
            setShowAgeConfirm(false)
          }}
          onCancel={() => setShowAgeConfirm(false)}
        />
      )}
    </div>
  )
}
