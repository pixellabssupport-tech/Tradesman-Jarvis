import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { getCurrentUser, getOrCreateProfile } from '@/lib/supabase-server'

export async function POST(request: NextRequest) {
  try {
    // Pro is tied to an account, so checkout requires sign-in.
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: 'Sign in first.', needLogin: true }, { status: 401 })
    }

    const profile = await getOrCreateProfile(user)
    if (profile.is_pro) {
      return NextResponse.json({ error: "You're already on Pro." }, { status: 400 })
    }

    const origin = request.nextUrl.origin

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Tradesman Jarvis Pro',
              description: 'Unlimited AI queries for tradespeople',
            },
            unit_amount: 999,
            recurring: { interval: 'month' },
          },
          quantity: 1,
        },
      ],
      // Links the payment back to this account in the webhook.
      client_reference_id: user.id,
      metadata: { user_id: user.id },
      subscription_data: { metadata: { user_id: user.id } },
      ...(profile.stripe_customer_id
        ? { customer: profile.stripe_customer_id }
        : user.email
          ? { customer_email: user.email }
          : {}),
      success_url: `${origin}/?upgrade=success`,
      cancel_url: `${origin}/`,
    })

    if (!session.url) {
      return NextResponse.json({ error: 'No checkout URL returned' }, { status: 500 })
    }
    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Could not start checkout. Try again.' },
      { status: 500 }
    )
  }
}
