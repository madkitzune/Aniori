const ACHIEVEMENTS = [
  { icon: '🌟', label: 'Ранний пользователь', unlocked: true },
  { icon: '🎌', label: 'Аниме-фанат',         unlocked: true },
  { icon: '👁️', label: '100 серий',           unlocked: false },
  { icon: '🔥', label: '30 дней подряд',       unlocked: false },
  { icon: '💎', label: 'Премиум',              unlocked: false },
  { icon: '🎭', label: '10 жанров',            unlocked: false },
]

export default function AchievementsBlock() {
  const unlocked = ACHIEVEMENTS.filter(a => a.unlocked).length

  return (
    <div className="rounded-2xl h-full p-4 flex flex-col" style={{ background: '#1e1e1e', minHeight: 120 }}>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#555' }}>Достижения</p>
        <span className="text-xs" style={{ color: '#444' }}>{unlocked}/{ACHIEVEMENTS.length}</span>
      </div>
      <div
        className="grid grid-cols-3 gap-2 overflow-y-auto flex-1"
        style={{ gridAutoRows: 48, scrollbarWidth: 'none', minHeight: 0 }}
      >
        {ACHIEVEMENTS.map(a => (
          <div
            key={a.label}
            title={a.label}
            className="flex items-center justify-center rounded-xl cursor-default transition-all"
            style={{
              fontSize: 20,
              background: a.unlocked ? '#2a2a2a' : '#1a1a1a',
              filter: a.unlocked ? 'none' : 'grayscale(1) opacity(0.3)',
              border: a.unlocked ? '1px solid #3a3a3a' : '1px solid #222',
            }}
          >
            {a.icon}
          </div>
        ))}
      </div>
    </div>
  )
}
