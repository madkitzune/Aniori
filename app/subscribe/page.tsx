import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import AnimatedBg from '@/components/AnimatedBg'

const plans = [
  {
    id: 'free',
    name: 'Базовый',
    price: 'Бесплатно',
    features: ['Каталог аниме', 'SD качество', 'Реклама'],
    highlighted: false,
  },
  {
    id: 'premium',
    name: 'Премиум',
    price: '$3.99 / мес',
    features: ['Весь каталог', 'FHD 1080p', 'Без рекламы', 'Профиль и списки'],
    highlighted: true,
  },
  {
    id: 'ultra',
    name: 'Ультра',
    price: '$7.99 / мес',
    features: ['Всё из Премиум', '4K качество', 'Совместный просмотр', 'Приоритетная поддержка'],
    highlighted: false,
  },
]

export default async function SubscribePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="relative min-h-screen px-5 md:px-10 py-12" style={{ background: '#111' }}>
      <AnimatedBg />
      <div className="relative z-[2] max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white text-center mb-2">Подписка Aniori</h1>
        <p className="text-[#888] text-center mb-10">Выберите план и смотри аниме без ограничений</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {plans.map(plan => (
            <div
              key={plan.id}
              className="rounded-2xl p-6 flex flex-col gap-4 relative"
              style={{
                background: plan.highlighted ? '#2a2a2a' : '#1e1e1e',
                border: plan.highlighted ? '1px solid #606060' : '1px solid #2e2e2e',
              }}
            >
              {plan.highlighted && (
                <span
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-xs font-semibold text-white"
                  style={{ background: 'linear-gradient(90deg, #606060, #a0a0a0)' }}
                >
                  Популярный
                </span>
              )}
              <div>
                <h2 className="text-lg font-bold text-white mb-1">{plan.name}</h2>
                <p className="text-2xl font-bold text-white">{plan.price}</p>
              </div>
              <ul className="flex flex-col gap-2 flex-1">
                {plan.features.map(f => (
                  <li key={f} className="text-sm text-[#bbb] flex items-center gap-2">
                    <span className="text-[#888]">✓</span> {f}
                  </li>
                ))}
              </ul>
              {user ? (
                <button
                  className={`py-2.5 rounded-xl text-sm font-medium border-none cursor-pointer ${plan.highlighted ? 'btn-shimmer text-white' : 'bg-[#2e2e2e] text-[#aaa] hover:bg-[#3a3a3a] hover:text-white transition-colors'}`}
                >
                  Выбрать план
                </button>
              ) : (
                <Link
                  href="/register"
                  className={`py-2.5 px-4 rounded-xl text-sm font-medium text-center block ${plan.highlighted ? 'btn-shimmer text-white' : 'bg-[#2e2e2e] text-[#aaa] hover:bg-[#3a3a3a] hover:text-white transition-colors'}`}
                  style={{ textDecoration: 'none' }}
                >
                  Зарегистрироваться
                </Link>
              )}
            </div>
          ))}
        </div>
        </div>
    </div>
  )
}
