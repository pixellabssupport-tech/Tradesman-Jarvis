import { createServerClient } from '@supabase/ssr'
import { createClient, type User } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

// Server-side only. Nothing in this file is imported by client components.

const supabaseUrl = () => process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''

/**
 * Auth client bound to the current request's cookies. Use it only for
 * auth calls (sign in, verify, get user, sign out), never for table queries.
 * The anon key is preferred; the service key is a server-only fallback so
 * sign-in works without exposing any key to the browser.
 */
export async function createAuthClient() {
  const cookieStore = await cookies()
  const key =
    process.env.SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    ''

  return createServerClient(supabaseUrl(), key, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
      },
    },
  })
}

/** Admin client for table reads/writes. Bypasses row-level security. */
export function createAdminClient() {
  return createClient(supabaseUrl(), process.env.SUPABASE_SERVICE_ROLE_KEY ?? '', {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const auth = await createAuthClient()
    const { data } = await auth.auth.getUser()
    return data.user ?? null
  } catch {
    return null
  }
}

export interface Profile {
  id: string
  email: string | null
  is_pro: boolean
  stripe_customer_id: string | null
  subscription_status: string | null
}

/** Returns the user's profile row, creating it on first use. */
export async function getOrCreateProfile(user: User): Promise<Profile> {
  const admin = createAdminClient()
  const columns = 'id, email, is_pro, stripe_customer_id, subscription_status'

  const { data: existing, error } = await admin
    .from('profiles')
    .select(columns)
    .eq('id', user.id)
    .maybeSingle()
  if (error) throw error
  if (existing) return existing as Profile

  const { data: created, error: insertError } = await admin
    .from('profiles')
    .upsert({ id: user.id, email: user.email ?? null }, { onConflict: 'id' })
    .select(columns)
    .single()
  if (insertError) throw insertError
  return created as Profile
}
