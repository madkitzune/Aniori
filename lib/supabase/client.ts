import { createBrowserClient } from '@supabase/ssr'
import { guestClient, isSupabaseConfigured, supabaseAnonKey, supabaseUrl } from './guest'

export const createClient = () =>
  isSupabaseConfigured ? createBrowserClient(supabaseUrl!, supabaseAnonKey!) : guestClient
