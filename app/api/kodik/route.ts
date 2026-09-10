import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

interface KodikResult {
  link: string
  title?: string
  translation?: { title?: string }
}

export async function GET(req: NextRequest) {
  const token = process.env.KODIK_TOKEN
  if (!token) {
    return NextResponse.json({ link: null, error: 'no_token' }, { status: 200 })
  }

  const { searchParams } = new URL(req.url)
  const title = searchParams.get('title')?.trim()
  const year = searchParams.get('year')?.trim()
  const shikimoriId = searchParams.get('shikimori_id')?.trim()

  if (!title && !shikimoriId) {
    return NextResponse.json({ link: null, error: 'no_query' }, { status: 400 })
  }

  const params = new URLSearchParams({
    token,
    limit: '1',
    with_material_data: 'false',
    types: 'anime,anime-serial',
  })
  if (shikimoriId) params.set('shikimori_id', shikimoriId)
  else if (title) params.set('title', title)
  if (year) params.set('year', year)

  try {
    const res = await fetch(`https://kodikapi.com/search?${params.toString()}`, {
      cache: 'no-store',
    })
    if (!res.ok) {
      return NextResponse.json({ link: null, error: 'kodik_error' }, { status: 200 })
    }
    const data = (await res.json()) as { results?: KodikResult[] }
    const first = data.results?.[0]
    if (!first?.link) {
      return NextResponse.json({ link: null, error: 'not_found' }, { status: 200 })
    }
    // Kodik отдаёт протокол-относительную ссылку (//kodik.info/...)
    const link = first.link.startsWith('//') ? `https:${first.link}` : first.link
    return NextResponse.json({ link }, { status: 200 })
  } catch {
    return NextResponse.json({ link: null, error: 'fetch_failed' }, { status: 200 })
  }
}
