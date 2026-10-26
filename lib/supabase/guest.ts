import type { SupabaseClient } from '@supabase/supabase-js'

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

const authDisabled = { message: 'Авторизация недоступна: Supabase не настроен' }
const noSession = { user: null, session: null }

// Без ключей Supabase сайт работает в гостевом режиме: вход и регистрация возвращают ошибку вместо падения страницы
export const guestClient = {
  auth: {
    getUser: async () => ({ data: { user: null }, error: null }),
    signInWithPassword: async () => ({ data: noSession, error: authDisabled }),
    signUp: async () => ({ data: noSession, error: authDisabled }),
    signOut: async () => ({ error: null }),
    exchangeCodeForSession: async () => ({ data: noSession, error: authDisabled }),
  },
} as unknown as SupabaseClient
