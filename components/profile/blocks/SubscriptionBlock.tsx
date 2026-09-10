import Link from 'next/link'

export default function SubscriptionBlock() {
  return (
    <div className="rounded-2xl h-full flex flex-col justify-between p-4" style={{ background: '#1e1e1e', minHeight: 120 }}>
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: '#555' }}>Подписка</p>
        <p className="text-white font-semibold">Бесплатный план</p>
        <p className="text-xs mt-0.5" style={{ color: '#666' }}>SD качество · Реклама</p>
      </div>
      <Link
        href="/subscribe"
        className="mt-3 block text-center text-sm py-2 rounded-xl font-medium btn-shimmer text-white"
        style={{ textDecoration: 'none' }}
      >
        ⭐ Улучшить
      </Link>
    </div>
  )
}
