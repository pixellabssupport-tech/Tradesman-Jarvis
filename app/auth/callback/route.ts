import { NextRequest, NextResponse } from 'next/server'
import type { EmailOtpType } from '@supabase/supabase-js'
import { createAuthClient } from '@/lib/supabase-server'

// Landing page for the link in the sign-in email.
// Handles both the default link (?code=) and a token-hash link (?token_hash=&type=).
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl
  const code = searchParams.get('code')
  const tokenHash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null

  try {
    const auth = await createAuthClient()
    if (code) {
      const { error } = await auth.auth.exchangeCodeForSession(code)
      if (!error) return NextResponse.redirect(`${origin}/?signedin=1`)
      console.error('Code exchange error:', error)
    } else if (tokenHash && type) {
      const { error } = await auth.auth.verifyOtp({ token_hash: tokenHash, type })
      if (!error) return NextResponse.redirect(`${origin}/?signedin=1`)
      console.error('Token hash verify error:', error)
    }
  } catch (error) {
    console.error('Auth callback error:', error)
  }
  return NextResponse.redirect(`${origin}/?auth_error=1`)
}
