export interface Anime {
  id: string
  title: string
  titleRu: string
  description: string
  genre: string[]
  rating: number
  year: number
  episodes: number
  status: 'ongoing' | 'finished'
  cover: string
  video: string
  aliases?: string[]
  shikimoriId?: string
  anilibriaId?: number
  seasons?: { label: string; anilibriaId: number }[]
  tags?: string[]
  isAdult?: boolean
}

export const animeList: Anime[] = [
  {
    id: 'jujutsu-kaisen',
    title: 'Jujutsu Kaisen',
    titleRu: 'Магическая битва',
    description: 'Юдзи Итадори — обычный старшеклассник с невероятной физической силой. После трагических событий он оказывается втянут в мир проклятых духов и начинает обучение в Токийской школе Дзюдзюцу.',
    genre: ['Экшн', 'Фэнтези', 'Школа'],
    rating: 8.7,
    year: 2020,
    episodes: 24,
    status: 'ongoing',
    cover: 'https://cdn.myanimelist.net/images/anime/1171/109222.jpg',
    video: 'https://www.youtube.com/embed/PKHQuQF1S8k',
    aliases: ['jjk', 'дзюдзюцу кайсен', 'магичка'],
    shikimoriId: '40748',
    tags: ['Сёнен', 'Сверхспособности', 'Магия'],
    anilibriaId: 8789,
    seasons: [
      { label: '1 сезон', anilibriaId: 8789 },
      { label: '2 сезон', anilibriaId: 9470 },
    ],
  },
  {
    id: 'attack-on-titan',
    title: 'Attack on Titan',
    titleRu: 'Атака титанов',
    description: 'Человечество живёт за гигантскими стенами, спасаясь от титанов — огромных существ, поедающих людей. Эрен Йегер клянётся уничтожить каждого титана после гибели матери.',
    genre: ['Экшн', 'Драма', 'Тёмное фэнтези'],
    rating: 9.0,
    year: 2013,
    episodes: 87,
    status: 'finished',
    cover: 'https://cdn.myanimelist.net/images/anime/10/47347.jpg',
    video: 'https://www.youtube.com/embed/MGRm4IzK1SQ',
    aliases: ['атака на титанов', 'вторжение титанов', 'aot', 'snk', 'shingeki no kyojin'],
    shikimoriId: '16498',
    tags: ['Сёнен', 'Постапокалипсис'],
  },
  {
    id: 'death-note',
    title: 'Death Note',
    titleRu: 'Тетрадь смерти',
    description: 'Школьник Лайт Ягами находит «Тетрадь смерти» — тот, чьё имя вписано в неё, умирает. Лайт решает создать идеальный мир, уничтожая преступников, но детектив Л начинает охоту на него.',
    genre: ['Психологическое', 'Триллер', 'Детектив'],
    rating: 9.1,
    year: 2006,
    episodes: 37,
    status: 'finished',
    cover: 'https://cdn.myanimelist.net/images/anime/9/9453.jpg',
    video: 'https://www.youtube.com/embed/OHIxz3aPFiU',
    aliases: ['дн', 'деснот', 'дез нот'],
    shikimoriId: '1535',
    tags: ['Детектив', 'Сверхспособности'],
  },
  {
    id: 'fullmetal-alchemist-brotherhood',
    title: 'Fullmetal Alchemist: Brotherhood',
    titleRu: 'Стальной алхимик: Братство',
    description: 'Братья Эдвард и Алфонс Элрик пытаются вернуть потерянные тела с помощью философского камня. Их путь полон тайн, предательства и войны.',
    genre: ['Экшн', 'Приключения', 'Фэнтези'],
    rating: 9.3,
    year: 2009,
    episodes: 64,
    status: 'finished',
    cover: 'https://cdn.myanimelist.net/images/anime/1223/96541.jpg',
    video: 'https://www.youtube.com/embed/--IcmZkvL0Q',
    aliases: ['fmab', 'fma', 'цельнометаллический алхимик'],
    shikimoriId: '5114',
    tags: ['Сёнен', 'Магия'],
    anilibriaId: 9528,
  },
  {
    id: 'steins-gate',
    title: 'Steins;Gate',
    titleRu: 'Врата Штейна',
    description: 'Студент Ринтаро Окабэ случайно изобретает машину времени из микроволновки. Игры с прошлым влекут катастрофические последствия, и он должен спасти тех, кого любит.',
    genre: ['Психологическое', 'Sci-Fi', 'Триллер'],
    rating: 9.2,
    year: 2011,
    episodes: 25,
    status: 'finished',
    cover: 'https://cdn.myanimelist.net/images/anime/5/73199.jpg',
    video: 'https://www.youtube.com/embed/27OZc-ku6is',
    aliases: ['штейнс гейт', 'sg', 'стейнс гейт'],
    shikimoriId: '9253',
    tags: ['Сэйнэн', 'Путешествия во времени'],
    anilibriaId: 8674,
  },
  {
    id: 'one-punch-man',
    title: 'One Punch Man',
    titleRu: 'Ванпанчмен',
    description: 'Сайтама стал героем для развлечения и тренировался так усердно, что потерял волосы и способность радоваться победе — он убивает любого врага одним ударом.',
    genre: ['Экшн', 'Комедия', 'Пародия'],
    rating: 8.8,
    year: 2015,
    episodes: 25,
    status: 'ongoing',
    cover: 'https://cdn.myanimelist.net/images/anime/12/76049.jpg',
    video: 'https://www.youtube.com/embed/qing5JtKqv8',
    aliases: ['опм', 'opm', 'один удар', 'ванпачмен'],
    shikimoriId: '30276',
    tags: ['Сёнен', 'Сверхспособности'],
    anilibriaId: 1210,
    seasons: [
      { label: '1 сезон', anilibriaId: 1210 },
      { label: '2 сезон', anilibriaId: 8335 },
    ],
  },
  {
    id: 'demon-slayer',
    title: 'Demon Slayer',
    titleRu: 'Клинок, рассекающий демонов',
    description: 'Тандзиро Камадо возвращается домой и находит семью убитой. Его сестра Незуко превратилась в демона. Он становится охотником на демонов, чтобы вернуть ей человеческий облик.',
    genre: ['Экшн', 'Фэнтези', 'Историческое'],
    rating: 8.9,
    year: 2019,
    episodes: 44,
    status: 'ongoing',
    cover: 'https://cdn.myanimelist.net/images/anime/1286/99889.jpg',
    video: 'https://www.youtube.com/embed/VQGCKyvzIM4',
    aliases: ['крд', 'истребитель демонов', 'кимэцу но яйба', 'kny'],
    shikimoriId: '38000',
    tags: ['Сёнен', 'Сверхспособности'],
    anilibriaId: 8325,
    seasons: [
      { label: '1 сезон', anilibriaId: 8325 },
      { label: 'Поезд «Бесконечный»', anilibriaId: 9103 },
      { label: 'Квартал красных фонарей', anilibriaId: 9093 },
      { label: 'Деревня кузнецов', anilibriaId: 9406 },
      { label: 'Тренировка столпов', anilibriaId: 9660 },
    ],
  },
  {
    id: 'hunter-x-hunter',
    title: 'Hunter x Hunter',
    titleRu: 'Охотник × Охотник',
    description: 'Гон Фрикс хочет стать Охотником — элитным специалистом по поиску сокровищ, редких существ и людей. В пути он находит друзей и раскрывает тайну исчезновения своего отца.',
    genre: ['Экшн', 'Приключения', 'Фэнтези'],
    rating: 9.1,
    year: 2011,
    episodes: 148,
    status: 'finished',
    cover: 'https://cdn.myanimelist.net/images/anime/1337/99013.jpg',
    video: 'https://www.youtube.com/embed/D4GGh1VBFLs',
    aliases: ['хантер', 'hxh', 'хантер х хантер'],
    shikimoriId: '11061',
    tags: ['Сёнен', 'Сверхспособности'],
  },
  {
    id: 'neon-genesis-evangelion',
    title: 'Neon Genesis Evangelion',
    titleRu: 'Евангелион',
    description: 'В мире после катастрофы подростки управляют гигантскими роботами-EVA, защищая Токио-3 от таинственных существ-Ангелов. Психологическая глубина этого аниме не имеет аналогов.',
    genre: ['Меха', 'Психологическое', 'Драма'],
    rating: 8.9,
    year: 1995,
    episodes: 26,
    status: 'finished',
    cover: 'https://cdn.myanimelist.net/images/anime/1314/108941.jpg',
    video: 'https://www.youtube.com/embed/zqbMt0Y5x_E',
    aliases: ['нге', 'eva', 'ева', 'евангелион нового поколения'],
    shikimoriId: '30',
    tags: ['Меха', 'Психология', 'Постапокалипсис'],
  },
  {
    id: 'your-lie-in-april',
    title: 'Your Lie in April',
    titleRu: 'Твоя апрельская ложь',
    description: 'Вундеркинд-пианист Коусей Арима перестал слышать собственную игру после смерти матери. Знакомство с яркой скрипачкой Каори возвращает его к музыке и жизни.',
    genre: ['Романтика', 'Драма', 'Музыка'],
    rating: 8.8,
    year: 2014,
    episodes: 22,
    status: 'finished',
    cover: 'https://cdn.myanimelist.net/images/anime/3/67177.jpg',
    video: 'https://www.youtube.com/embed/KqrBqJC1L0Q',
    aliases: ['ложь в апреле', 'твоя ложь в апреле'],
    shikimoriId: '23273',
    tags: ['Музыка', 'Школа'],
  },
  {
    id: 'mob-psycho-100',
    title: 'Mob Psycho 100',
    titleRu: 'Моб Психо 100',
    description: 'Школьник Сигео «Моб» Кагэяма — сильнейший экстрасенс, но подавляет свои эмоции. Когда счётчик достигает 100%, последствия непредсказуемы.',
    genre: ['Экшн', 'Комедия', 'Психологическое'],
    rating: 8.9,
    year: 2016,
    episodes: 37,
    status: 'finished',
    cover: 'https://cdn.myanimelist.net/images/anime/8/80356.jpg',
    video: 'https://www.youtube.com/embed/nGxMGbHoOqE',
    aliases: ['моб психо', 'mp100'],
    shikimoriId: '32182',
    tags: ['Сверхспособности', 'Школа'],
    anilibriaId: 2622,
    seasons: [
      { label: '1 сезон', anilibriaId: 2622 },
      { label: '2 сезон', anilibriaId: 8033 },
      { label: '3 сезон', anilibriaId: 9262 },
    ],
  },
  {
    id: 'violet-evergarden',
    title: 'Violet Evergarden',
    titleRu: 'Виолет Эвергарден',
    description: 'Бывший солдат Виолет Эвергарден учится жить в мирное время, работая Auto Memory Doll — переписчицей писем. Через чужие истории она ищет смысл слов «я тебя люблю».',
    genre: ['Драма', 'Фэнтези', 'Романтика'],
    rating: 8.7,
    year: 2018,
    episodes: 13,
    status: 'finished',
    cover: 'https://cdn.myanimelist.net/images/anime/1795/95088.jpg',
    video: 'https://www.youtube.com/embed/0CJeDetA45Q',
    aliases: ['вайолет эвергарден'],
    shikimoriId: '33352',
    tags: ['Психология'],
    anilibriaId: 5620,
  },
]

export const getAnime = (id: string) => animeList.find(a => a.id === id)

export const filterAdult = (list: Anime[], showAdult: boolean) =>
  showAdult ? list : list.filter(a => !a.isAdult)

export const getFeatured = (showAdult = false) =>
  filterAdult(animeList, showAdult)[0] ?? animeList[0]

export const getPopular = (showAdult = false) =>
  filterAdult(animeList, showAdult).slice(0, 6)

export const getNewReleases = (showAdult = false) =>
  filterAdult(animeList, showAdult).slice(6, 12)

export const getTopRated = (showAdult = false) =>
  [...filterAdult(animeList, showAdult)].sort((a, b) => b.rating - a.rating).slice(0, 6)

export interface FilterParams {
  genre?: string
  status?: string
  sort?: string
  showAdult?: boolean
}

export function filterAndSort(params: FilterParams): Anime[] {
  let list = filterAdult(animeList, params.showAdult ?? false)

  if (params.genre) {
    list = list.filter(a => a.genre.includes(params.genre!))
  }
  if (params.status === 'ongoing' || params.status === 'finished') {
    list = list.filter(a => a.status === params.status)
  }

  switch (params.sort) {
    case 'rating':    return [...list].sort((a, b) => b.rating - a.rating)
    case 'year_desc': return [...list].sort((a, b) => b.year - a.year)
    case 'year_asc':  return [...list].sort((a, b) => a.year - b.year)
    case 'title':     return [...list].sort((a, b) => a.titleRu.localeCompare(b.titleRu, 'ru'))
    default:          return list
  }
}

// ── Умный поиск: подстроки, алиасы/аббревиатуры, опечатки ──────────────────────

const normalize = (s: string) =>
  s.toLowerCase().replace(/[ё]/g, 'е').replace(/[^a-zа-я0-9]+/gi, ' ').trim()

function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length
  if (m === 0) return n
  if (n === 0) return m
  const dp = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)])
  for (let j = 0; j <= n; j++) dp[0][j] = j
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost)
    }
  }
  return dp[m][n]
}

function scoreAnime(anime: Anime, q: string): number {
  const haystacks = [anime.titleRu, anime.title, ...(anime.aliases ?? [])].map(normalize)
  const genres = anime.genre.map(normalize)

  let best = 0
  for (const h of haystacks) {
    if (h === q) return 100
    if (h.startsWith(q)) best = Math.max(best, 80)
    else if (h.includes(q)) best = Math.max(best, 60)
    else {
      // опечатки: допускаем дистанцию до 2 на коротких запросах
      const maxDist = q.length <= 4 ? 1 : 2
      const words = h.split(' ')
      for (const w of words) {
        if (Math.abs(w.length - q.length) <= maxDist && levenshtein(w, q) <= maxDist) {
          best = Math.max(best, 40)
        }
      }
    }
  }
  for (const g of genres) {
    if (g.includes(q)) best = Math.max(best, 30)
  }
  return best
}

export function searchAnime(query: string, showAdult = false): Anime[] {
  const q = normalize(query)
  if (!q) return []
  return filterAdult(animeList, showAdult)
    .map(a => ({ a, score: scoreAnime(a, q) }))
    .filter(x => x.score > 0)
    .sort((x, y) => y.score - x.score || y.a.rating - x.a.rating)
    .map(x => x.a)
}
