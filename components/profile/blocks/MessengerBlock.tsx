export default function MessengerBlock() {
  return (
    <div
      className="rounded-2xl h-full flex flex-col items-center justify-center gap-3 p-4 cursor-pointer group"
      style={{ background: '#1e1e1e', minHeight: 120, border: '1px solid #2a2a2a' }}
    >
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-transform group-hover:scale-110"
        style={{ background: 'linear-gradient(135deg, #3a3a3a, #252525)' }}
      >
        💬
      </div>
      <div className="text-center">
        <p className="text-white font-semibold text-sm">Мессенджер</p>
        <p className="text-xs mt-0.5" style={{ color: '#555' }}>Скоро</p>
      </div>
      <span
        className="text-xs px-2.5 py-0.5 rounded-full"
        style={{ background: '#2a2a2a', color: '#666', border: '1px solid #333' }}
      >
        В разработке
      </span>
    </div>
  )
}
