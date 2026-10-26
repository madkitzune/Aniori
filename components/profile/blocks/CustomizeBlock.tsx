'use client'

interface Props { onOpen: () => void }

export default function CustomizeBlock({ onOpen }: Props) {
  return (
    <button
      onClick={onOpen}
      className="rounded-2xl h-full w-full flex flex-col items-center justify-center gap-3 p-4 group transition-all"
      style={{ background: '#1e1e1e', minHeight: 120, border: '1px solid #2a2a2a' }}
    >
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-transform group-hover:scale-110 group-hover:rotate-12"
        style={{ background: 'linear-gradient(135deg, #4a4a4a, #2a2a2a)' }}
      >
        🎨
      </div>
      <div className="text-center">
        <p className="text-white font-semibold text-sm">Кастомизация</p>
        <p className="text-xs mt-0.5" style={{ color: '#555' }}>Баннер, цвета, &quot;о себе&quot;</p>
      </div>
    </button>
  )
}
