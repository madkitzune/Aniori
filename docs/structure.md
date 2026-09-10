# Структура проекта

```
Anime-Streams-main/
│
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (Header, body)
│   ├── page.tsx                  # Редирект → /catalog
│   ├── globals.css               # Все стили, анимации, CSS-классы
│   │
│   ├── catalog/page.tsx          # Главная страница каталога
│   ├── watch/[id]/page.tsx       # Страница просмотра аниме
│   ├── login/page.tsx            # Вход
│   ├── register/page.tsx         # Регистрация
│   ├── subscribe/page.tsx        # Страница подписки
│   ├── profile/page.tsx          # Профиль пользователя
│   │
│   └── auth/
│       ├── actions.ts            # Server Actions: login, register, logout
│       └── callback/route.ts     # OAuth callback
│
├── components/
│   ├── Header.tsx                # Хедер с логотипом, поиском, аватаром
│   ├── Dropdown.tsx              # Боковое меню
│   ├── AnimeCard.tsx             # Карточка аниме с hover-эффектами
│   ├── AnimeRow.tsx              # Горизонтальный ряд карточек
│   ├── AnimatedBg.tsx            # Анимированный слайдшоу фон
│   │
│   └── profile/
│       ├── ProfileDashboard.tsx  # Главный дашборд профиля
│       ├── useProfileConfig.ts   # Хук для localStorage конфига
│       ├── CustomizeModal.tsx    # Модалка кастомизации (Discord-стиль)
│       ├── EditPanel.tsx         # Боковая панель редактора сетки
│       │
│       └── blocks/
│           ├── ProfileCardBlock.tsx   # Карточка профиля (баннер, аватар)
│           ├── StatsBlock.tsx         # Статистика просмотров
│           ├── SubscriptionBlock.tsx  # Блок подписки
│           ├── MessengerBlock.tsx     # Заглушка мессенджера
│           ├── AchievementsBlock.tsx  # Достижения/значки
│           ├── CustomizeBlock.tsx     # Кнопка кастомизации
│           └── LogoutBlock.tsx        # Кнопка выхода
│
├── lib/
│   ├── anime.ts                  # Данные 12 аниме + хелперы
│   ├── profile-config.ts         # Типы и дефолтный конфиг профиля
│   │
│   └── supabase/
│       ├── client.ts             # Browser Supabase client
│       └── server.ts             # Server Supabase client (async cookies)
│
├── docs/                         # Документация проекта
│   ├── prompts.md                # История промтов пользователя
│   ├── changelog.md              # Всё что сделано
│   ├── roadmap.md                # Планы и следующие шаги
│   └── structure.md              # Этот файл
│
├── proxy.ts                      # Next.js 16 proxy (защита /profile)
├── next.config.ts                # Конфиг Next.js
├── tailwind.config.ts            # Конфиг Tailwind
├── tsconfig.json                 # Конфиг TypeScript
├── postcss.config.js
├── package.json
├── .env.local                    # Supabase ключи (не в git!)
├── .env.local.example            # Шаблон для .env.local
└── .gitignore
```

---

## Цветовая палитра

| Переменная | Значение | Применение |
|-----------|---------|-----------|
| `--bg` | `#1a1a1a` | Фон страниц |
| `--card` | `#2a2a2a` | Фон карточек |
| `--header` | `#111111` | Фон хедера |
| `--accent` | `#808080` | Акцент (серебро) |
| `--highlight` | `#a0a0a0` | Выделение |
| `--text` | `#ffffff` | Основной текст |
| `--text-secondary` | `#aaaaaa` | Второстепенный текст |

---

## Переменные окружения

```env
NEXT_PUBLIC_SUPABASE_URL=https://rkzttpiflolxlvjdabxh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_...
```

---

## Запуск

```bash
npm install --legacy-peer-deps
npm run dev        # http://localhost:3000
npm run build      # Продакшн сборка
npm start          # Запуск продакшн сервера
```
