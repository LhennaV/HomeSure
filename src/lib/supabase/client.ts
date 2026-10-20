import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'
  return createBrowserClient(url, key)
}

// Lazy/guarded shared instance for legacy components
export const supabase = typeof window !== 'undefined'
  ? createClient()
  : (createClient() as ReturnType<typeof createBrowserClient>)
