const SCHEDULE = [
  { day: 'Пн', title: 'Jujutsu Kaisen',  ep: 24, time: '19:00' },
  { day: 'Ср', title: 'Demon Slayer',     ep: 12, time: '20:30' },
  { day: 'Пт', title: 'One Punch Man',    ep: 8,  time: '18:00' },
  { day: 'Вс', title: 'Attack on Titan',  ep: 88, time: '21:00' },
]

const TODAY = ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'][new Date().getDay() === 0 ? 6 : new Date().getDay() - 1]

export default function ScheduleBlock() {
  return (
    <div className="rounded-2xl h-full p-4 flex flex-col" style={{ background: '#1e1e1e', minHeight: 120 }}>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs uppercase tracking-widest" style={{ color: '#555' }}>📅 Расписание</p>
        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: '#2a2a2a', color: '#555' }}>Скоро</span>
      </div>
      <div className="flex flex-col gap-2 overflow-y-auto flex-1" style={{ scrollbarWidth: 'none', minHeight: 0 }}>
        {SCHEDULE.map(s => {
          const isToday = s.day === TODAY
          return (
            <div key={s.title} className="flex items-center gap-2.5 rounded-lg px-2 py-1.5"
              style={{ background: isToday ? '#232323' : 'transparent', border: isToday ? '1px solid #2e2e2e' : '1px solid transparent' }}>
              <span className="text-xs font-bold w-5 text-center flex-shrink-0"
                style={{ color: isToday ? '#60a5fa' : '#444' }}>{s.day}</span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium truncate" style={{ color: isToday ? '#fff' : '#888' }}>{s.title}</p>
                <p className="text-xs" style={{ color: '#444' }}>Эп. {s.ep} · {s.time}</p>
              </div>
              {isToday && <span className="text-xs flex-shrink-0" style={{ color: '#60a5fa' }}>Сегодня</span>}
            </div>
          )
        })}
      </div>
    </div>
  )
}
