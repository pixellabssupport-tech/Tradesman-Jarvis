import Stripe from 'stripe'
import { NextRequest, NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2024-04-10',
})

export async function POST(request: NextRequest) {
  try {
    const origin = request.headers.get('origin') || 'https://tradesman-jarvis.vercel.app'

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Tradesman Jarvis Pro',
              description: 'Unlimited AI queries for tradespeople',
            },
            unit_amount: 999,
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/?upgrade=success`,
      cancel_url: `${origin}/`,
    })

    if (!session.url) {
      return NextResponse.json({ error: 'No checkout URL returned' }, { status: 500 })
    }

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      { error: `Checkout error: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    )
  }
}
