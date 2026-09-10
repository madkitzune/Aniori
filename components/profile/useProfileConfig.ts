'use client'

import { useState, useEffect, useCallback } from 'react'
import { ProfileConfig, DEFAULT_CONFIG } from '@/lib/profile-config'

const STORAGE_KEY = 'aniori-profile-config'

export function useProfileConfig() {
  const [config, setConfig] = useState<ProfileConfig>(DEFAULT_CONFIG)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setConfig({ ...DEFAULT_CONFIG, ...JSON.parse(saved) })
    } catch {}
    setLoaded(true)
  }, [])

  const update = useCallback((patch: Partial<ProfileConfig>) => {
    setConfig(prev => {
      const next = { ...prev, ...patch }
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch {}
      return next
    })
  }, [])

  return { config, update, loaded }
}
