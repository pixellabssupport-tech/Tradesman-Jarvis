import { NextResponse } from 'next/server'
import { createAuthClient } from '@/lib/supabase-server'

export async function POST() {
  try {
    const auth = await createAuthClient()
    await auth.auth.signOut()
  } catch (error) {
    console.error('Sign-out error:', error)
  }
  return NextResponse.json({ ok: true })
}
