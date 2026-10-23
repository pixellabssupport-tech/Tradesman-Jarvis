import { NextRequest, NextResponse } from 'next/server'
import { createAuthClient } from '@/lib/supabase-server'

// Verifies the one-time code from the sign-in email. Works even when the
// email is opened on a different device or in an email app's browser.
export async function POST(request: NextRequest) {
  try {
    const { email, token } = await request.json()
    const cleanEmail = typeof email === 'string' ? email.trim().toLowerCase() : ''
    const cleanToken = typeof token === 'string' ? token.replace(/\s/g, '') : ''
    if (!cleanEmail || !/^\d{6,10}$/.test(cleanToken)) {
      return NextResponse.json({ error: 'Enter the code from the email.' }, { status: 400 })
    }

    const auth = await createAuthClient()
    const { error } = await auth.auth.verifyOtp({ email: cleanEmail, token: cleanToken, type: 'email' })
    if (error) {
      return NextResponse.json({ error: 'That code is wrong or expired. Request a new one.' }, { status: 400 })
    }
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Verify error:', error)
    return NextResponse.json({ error: 'Something went wrong. Try again.' }, { status: 500 })
  }
}
