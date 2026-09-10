# Changelog — Aniori Rewrite

Всё что было сделано в рамках переписывания проекта.

---

## v0.4 — Профиль: динамическая сетка + новые блоки *(текущая)*

### Новые блоки профиля
- `WatchTimeBlock` — время просмотра (часы, серии, дней подряд), прогресс-бары, заглушка под реальные данные
- `FavoriteAnimeBlock` — выбрать любимое аниме из каталога, отображает обложку как фон + мета

### Динамическая сетка
- Кнопка **«+ Добавить секцию»** появляется в режиме редактирования
- Кнопка **✕** на каждой секции удаляет её
- Ограничения: минимум 1 секция, максимум 12
- Счётчик `x / 12` внизу в режиме редактирования
- `newSlotId()` — генератор уникальных id для новых слотов

### Хедер
- Поиск скрыт на странице `/profile` через `usePathname()`

### Конфиг
- Добавлены `BlockId`: `watch-time`, `favorite-anime`
- Добавлено поле `favoriteAnimeId: string | null` в `ProfileConfig`
- Экспортированы `MAX_SLOTS = 12`, `MIN_SLOTS = 1`, `newSlotId()`

---

## v0.3 — Профиль: Discord Nitro стиль + блоки

### Система блоков профиля
- `lib/profile-config.ts` — типы, конфиг, BLOCK_META
- `useProfileConfig` — хук, localStorage
- `ProfileDashboard` — CSS Grid 3 колонки, управление состоянием
- `EditPanel` — боковая панель: выбор блока и размера для каждой секции
- `CustomizeModal` — Discord-стиль: баннер, акцент-цвет, "о себе", значки

### Блоки
| Блок | Описание |
|------|---------|
| ProfileCardBlock | Баннер + аватар поверх, имя, акцент, "о себе", значки |
| StatsBlock | Смотрю / посмотрел / в планах |
| SubscriptionBlock | Текущий план + ссылка |
| MessengerBlock | Заглушка «Скоро» |
| AchievementsBlock | 6 значков, разблокированные/нет |
| CustomizeBlock | Кнопка открытия кастомизации |
| LogoutBlock | Выход с hover красного цвета |

---

## v0.2 — Анимированный фон + визуал каталога

### AnimatedBg
- Компонент с 7 фоновыми изображениями, анимация fadeSlide
- Многослойный градиент-оверлей (параметр `overlay`)
- Добавлен на все страницы: каталог, вотч, логин, регистрация, профиль, подписка

### Каталог
- Обложки заменены на `cdn.myanimelist.net` (надёжный источник)
- `section-title` с text-shadow glow
- Оверлей с z-index обёрткой

---

## v0.1 — Базовое переписывание

### Стек
| Было | Стало |
|------|-------|
| Node.js + Express | Next.js 16 (App Router) |
| Ванильный HTML/CSS/JS | TypeScript + Tailwind CSS |
| PostgreSQL (сломан) | Supabase (Auth + PostgreSQL) |
| Хардкод паролей | Supabase Auth (bcrypt под капотом) |
| Нет адаптивности | Полная адаптивность |

### Конфигурация
- `package.json`, `next.config.ts`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.js`
- `.env.local`, `.gitignore`, `proxy.ts`

### Дизайн-система (`globals.css`)
Анимации: `logoGradient`, `shimmer`, `gradientGlow`, `fadeSlide`, `fadeInUp`
Классы: `.anime-card`, `.anime-row`, `.btn-shimmer`, `.glow-border`, `.logo-gradient`, `.input-aniori`, `.rating-badge`, `.section-title`, `.dropdown-menu`, `.bg-slide`

### Компоненты
- `Header` — лого+dropdown, поиск, аватар/войти
- `Dropdown` — боковое меню, разные пункты по статусу авторизации
- `AnimeCard` — blur hover, overlay, рейтинг
- `AnimeRow` — горизонтальный ряд с заголовком

### Страницы
- `/catalog` — hero, 3 ряда, поиск
- `/watch/[id]` — плеер, слайдшоу фон, glassmorphism
- `/login`, `/register` — glassmorphism + анимированный фон
- `/subscribe` — 3 плана
- `/profile` → `ProfileDashboard`

### Данные (`lib/anime.ts`)
12 аниме с обложками MAL: JJK, AoT, Death Note, FMAB, Steins;Gate, OPM, Demon Slayer, HxH, NGE, YLiA, Mob Psycho, Violet Evergarden

### Исправленные баги
- Пароли открытым текстом → Supabase Auth
- Нет адаптивности → Tailwind + clamp()
- `searchParams`/`params` синхронные → await (Next.js 16)
- XSS через innerHTML → React JSX
- Session secret хардкодом → `.env.local`
