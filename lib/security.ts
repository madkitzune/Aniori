// Домены 18+ сайтов и рекламных сетей
const BLOCKED_DOMAINS = [
  // 18+ / adult
  'pornhub.com', 'xvideos.com', 'xnxx.com', 'xhamster.com', 'redtube.com',
  'youporn.com', 'tube8.com', 'spankbang.com', 'brazzers.com', 'onlyfans.com',
  'faphouse.com', 'hentaihaven.xxx', 'nhentai.net', 'rule34.xxx', 'e621.net',
  'gelbooru.com', 'danbooru.donmai.us', 'sankakucomplex.com', 'r34.xxx',
  'hentai.tv', 'hanime.tv', 'fakku.net', 'tsumino.com', 'hentaigasm.com',
  // Рекламные сети и трекеры
  'doubleclick.net', 'googlesyndication.com', 'adnxs.com', 'moatads.com',
  'outbrain.com', 'taboola.com', 'popads.net', 'popcash.net', 'propellerads.com',
  'exoclick.com', 'trafficjunky.com', 'adsterra.com', 'hilltopads.net',
  // Фишинг / малварь паттерны (часть доменов)
  'bit.ly', 'tinyurl.com', 'cutt.ly', 'rebrand.ly', 'shorturl.at',
]

const ALLOWED_PROTOCOLS = ['https:', 'http:']
const BLOCKED_PATTERNS = [
  /javascript:/i,
  /data:/i,
  /vbscript:/i,
  /on\w+\s*=/i,        // onclick=, onload=, etc.
  /<script/i,
  /base64/i,
]

export function isSafeUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false
  const trimmed = url.trim()
  if (!trimmed) return false

  if (BLOCKED_PATTERNS.some(p => p.test(trimmed))) return false

  try {
    const withProto = trimmed.startsWith('http') ? trimmed : `https://${trimmed}`
    const parsed = new URL(withProto)
    if (!ALLOWED_PROTOCOLS.includes(parsed.protocol)) return false

    // Проверяем домен на блок-лист
    const hostname = parsed.hostname.replace(/^www\./, '')
    if (BLOCKED_DOMAINS.some(d => hostname === d || hostname.endsWith(`.${d}`))) return false

    return true
  } catch {
    return false
  }
}

// TLD взрослых доменов
const ADULT_TLDS = ['.xxx', '.porn', '.adult', '.sex', '.sexy']

// Ключевые слова в домене/пути указывающие на 18+ контент
const ADULT_KEYWORDS = [
  'porn', 'xxx', 'hentai', 'nsfw', 'nude', 'naked', 'adult', 'erotic',
  'xvideo', 'xhamster', 'redtube', 'youporn', 'spankbang', 'brazzers',
  'onlyfan', 'faphouse', 'nhentai', 'rule34', 'gelbooru', 'danbooru',
  'hanime', 'fakku', 'tsumino', 'lewd', 'hentaigasm', 'doujin',
]

// Известные рекламные домены
const AD_DOMAINS = [
  'doubleclick.net', 'googlesyndication.com', 'adnxs.com', 'moatads.com',
  'outbrain.com', 'taboola.com', 'popads.net', 'popcash.net', 'propellerads.com',
  'exoclick.com', 'trafficjunky.com', 'adsterra.com', 'hilltopads.net',
]

// Сокращатели ссылок
const SHORTENERS = ['bit.ly', 'tinyurl.com', 'cutt.ly', 'rebrand.ly', 'shorturl.at', 'ow.ly', 'is.gd']

export type UrlCheckResult = { ok: true } | { ok: false; reason: 'unsafe' | 'blocked_adult' | 'blocked_ads' | 'shortener' }

export function checkUrl(url: string): UrlCheckResult {
  if (!url?.trim()) return { ok: false, reason: 'unsafe' }
  const trimmed = url.trim()

  if (BLOCKED_PATTERNS.some(p => p.test(trimmed))) return { ok: false, reason: 'unsafe' }

  try {
    const withProto = trimmed.startsWith('http') ? trimmed : `https://${trimmed}`
    const parsed = new URL(withProto)
    if (!ALLOWED_PROTOCOLS.includes(parsed.protocol)) return { ok: false, reason: 'unsafe' }

    const hostname = parsed.hostname.replace(/^www\./, '').toLowerCase()
    const fullUrl = (hostname + parsed.pathname).toLowerCase()

    // 1. Взрослые TLD (.xxx, .porn и т.д.)
    if (ADULT_TLDS.some(tld => hostname.endsWith(tld))) {
      return { ok: false, reason: 'blocked_adult' }
    }

    // 2. Ключевые слова в домене
    if (ADULT_KEYWORDS.some(kw => hostname.includes(kw))) {
      return { ok: false, reason: 'blocked_adult' }
    }

    // 3. Известные взрослые домены из блок-листа
    if (BLOCKED_DOMAINS.some(d => hostname === d || hostname.endsWith(`.${d}`))) {
      return { ok: false, reason: 'blocked_adult' }
    }

    // 4. Рекламные сети
    if (AD_DOMAINS.some(d => hostname === d || hostname.endsWith(`.${d}`))) {
      return { ok: false, reason: 'blocked_ads' }
    }

    // 5. Сокращатели
    if (SHORTENERS.some(d => hostname === d || hostname.endsWith(`.${d}`))) {
      return { ok: false, reason: 'shortener' }
    }

    return { ok: true }
  } catch {
    return { ok: false, reason: 'unsafe' }
  }
}

export function sanitizeUrl(url: string): string {
  if (!url) return ''
  const trimmed = url.trim()
  if (!isSafeUrl(trimmed)) return ''
  // Убеждаемся что есть протокол
  return trimmed.startsWith('http') ? trimmed : `https://${trimmed}`
}

export function sanitizeText(text: string, maxLength = 500): string {
  if (!text || typeof text !== 'string') return ''
  return text
    .slice(0, maxLength)
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim()
}

// Проверяем что URL ведёт на изображение с доверенного домена
const TRUSTED_IMAGE_DOMAINS = [
  'cdn.myanimelist.net',
  'upload.wikimedia.org',
  'shikimori.one',
  'i.pinimg.com',
  'images.wallpapersden.com',
  'wallpaper.dog',
  'img.freepik.com',
  'i.imgur.com',
  'imgur.com',
  'media.giphy.com',
]

export function isTrustedImageUrl(url: string): boolean {
  if (!isSafeUrl(url)) return false
  try {
    const withProto = url.startsWith('http') ? url : `https://${url}`
    const parsed = new URL(withProto)
    return TRUSTED_IMAGE_DOMAINS.some(d => parsed.hostname === d || parsed.hostname.endsWith(`.${d}`))
  } catch {
    return false
  }
}

// Валидация для произвольных изображений (менее строгая — только протокол)
export function isSafeImageUrl(url: string): boolean {
  return isSafeUrl(url)
}
