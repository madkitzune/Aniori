const FRIENDS = [
  { name: 'Otaku99',   initial: 'O', online: true,  status: 'Смотрит AoT' },
  { name: 'NightFox',  initial: 'N', online: true,  status: 'Онлайн' },
  { name: 'SakuraX',   initial: 'S', online: false, status: 'Был час назад' },
  { name: 'DarkMoon',  initial: 'D', online: false, status: 'Был вчера' },
]

export default function FriendsBlock() {
  return (
    <div className="rounded-2xl h-full p-4 flex flex-col" style={{ background: '#1e1e1e', minHeight: 120 }}>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs uppercase tracking-widest" style={{ color: '#555' }}>👥 Друзья</p>
        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: '#2a2a2a', color: '#555' }}>Скоро</span>
      </div>
      <div className="flex flex-col gap-2">
        {FRIENDS.map(f => (
          <div key={f.name} className="flex items-center gap-2.5">
            <div className="relative flex-shrink-0">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{ background: f.online ? '#2a3a2a' : '#2a2a2a' }}>
                {f.initial}
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2"
                style={{ background: f.online ? '#34d399' : '#444', borderColor: '#1e1e1e' }} />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-white truncate">{f.name}</p>
              <p className="text-xs truncate" style={{ color: '#444' }}>{f.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
