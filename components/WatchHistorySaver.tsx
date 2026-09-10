'use client'

import { useEffect } from 'react'
import { saveToHistory } from '@/lib/watchHistory'

interface Props {
  id: string
  title: string
  titleRu: string
  cover: string
}

export default function WatchHistorySaver({ id, title, titleRu, cover }: Props) {
  useEffect(() => {
    saveToHistory({ id, title, titleRu, cover })
  }, [id, title, titleRu, cover])

  return null
}
