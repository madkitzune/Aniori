'use client'

interface Props {
  onConfirm: () => void
  onCancel: () => void
}

export default function AgeConfirmModal({ onConfirm, onCancel }: Props) {
  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onCancel} />
      <div
        className="relative w-full max-w-sm rounded-2xl p-7 text-center"
        style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', boxShadow: '0 8px 40px rgba(0,0,0,0.7)' }}
      >
        <div className="text-5xl mb-4">🔞</div>
        <h2 className="text-white font-bold text-lg mb-2">Контент 18+</h2>
        <p className="text-sm leading-relaxed mb-6" style={{ color: '#777' }}>
          Этот раздел содержит материалы, предназначенные только для взрослых.
          Подтверждая, вы заявляете, что вам исполнилось 18 лет.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl text-sm transition-all"
            style={{ background: '#252525', color: '#777', border: '1px solid #2a2a2a' }}
          >
            Мне нет 18
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all hover:brightness-110"
            style={{ background: '#cc3333', color: '#fff' }}
          >
            Мне есть 18
          </button>
        </div>
      </div>
    </div>
  )
}
