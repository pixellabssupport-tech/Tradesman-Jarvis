import { NextRequest, NextResponse } from 'next/server'
import { createAuthClient } from '@/lib/supabase-server'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Sends a sign-in email containing both a link and a one-time code.
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    const clean = typeof email === 'string' ? email.trim().toLowerCase() : ''
    if (!EMAIL_RE.test(clean)) {
      return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 })
    }

    const auth = await createAuthClient()
    const { error } = await auth.auth.signInWithOtp({
      email: clean,
      options: {
        shouldCreateUser: true,
        emailRedirectTo: `${request.nextUrl.origin}/auth/callback`,
      },
    })

    if (error) {
      console.error('Sign-in email error:', error)
      const message = error.status === 429
        ? 'Too many sign-in emails. Wait a minute and try again.'
        : 'Could not send the sign-in email. Try again in a minute.'
      return NextResponse.json({ error: message }, { status: error.status === 429 ? 429 : 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Sign-in error:', error)
    return NextResponse.json({ error: 'Something went wrong. Try again.' }, { status: 500 })
  }
}
