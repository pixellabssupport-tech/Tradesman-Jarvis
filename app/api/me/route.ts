import { NextResponse } from 'next/server'
import { getCurrentUser, getOrCreateProfile } from '@/lib/supabase-server'

export const dynamic = 'force-dynamic'

// Who is signed in, and are they Pro?
export async function GET() {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ signedIn: false, email: null, isPro: false })

  try {
    const profile = await getOrCreateProfile(user)
    return NextResponse.json({ signedIn: true, email: user.email ?? null, isPro: profile.is_pro })
  } catch (error) {
    console.error('Profile lookup error:', error)
    return NextResponse.json({ signedIn: true, email: user.email ?? null, isPro: false })
  }
}
