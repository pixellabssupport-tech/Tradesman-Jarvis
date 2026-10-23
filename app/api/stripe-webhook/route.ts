import { NextRequest, NextResponse } from 'next/server'
import type Stripe from 'stripe'
import { stripe, PRO_STATUSES } from '@/lib/stripe'
import { createAdminClient } from '@/lib/supabase-server'

// Stripe calls this after payments and subscription changes.
// It is the only place Pro gets turned on or off.
export async function POST(request: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secret) {
    console.error('STRIPE_WEBHOOK_SECRET is not set')
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 })
  }

  const signature = request.headers.get('stripe-signature')
  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  const body = await request.text()
  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, secret)
  } catch (error) {
    console.error('Webhook signature check failed:', error)
    return NextResponse.json({ error: 'Bad signature' }, { status: 400 })
  }

  const admin = createAdminClient()
  const now = new Date().toISOString()
  const idOf = (v: string | { id: string } | null | undefined) =>
    typeof v === 'string' ? v : v?.id ?? null

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        if (session.mode !== 'subscription') break
        if (session.payment_status !== 'paid' && session.payment_status !== 'no_payment_required') break
        const userId = session.client_reference_id || session.metadata?.user_id
        if (!userId) {
          console.error('Checkout session has no user id:', session.id)
          break
        }
        const { error } = await admin.from('profiles').upsert(
          {
            id: userId,
            is_pro: true,
            stripe_customer_id: idOf(session.customer),
            stripe_subscription_id: idOf(session.subscription),
            subscription_status: 'active',
            updated_at: now,
          },
          { onConflict: 'id' }
        )
        if (error) throw error
        break
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription
        const isPro = event.type !== 'customer.subscription.deleted' && PRO_STATUSES.has(sub.status)
        const changes = {
          is_pro: isPro,
          subscription_status: event.type === 'customer.subscription.deleted' ? 'canceled' : sub.status,
          stripe_subscription_id: sub.id,
          stripe_customer_id: idOf(sub.customer),
          updated_at: now,
        }
        const userId = sub.metadata?.user_id
        const query = admin.from('profiles').update(changes)
        const { error } = userId
          ? await query.eq('id', userId)
          : await query.eq('stripe_customer_id', idOf(sub.customer) ?? '')
        if (error) throw error
        break
      }
    }
  } catch (error) {
    console.error(`Webhook handling failed for ${event.type}:`, error)
    // A 500 makes Stripe retry later.
    return NextResponse.json({ error: 'Handler failed' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
