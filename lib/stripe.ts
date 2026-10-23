import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2024-04-10',
})

/** Subscription statuses that keep Pro unlocked (past_due = Stripe is retrying the card). */
export const PRO_STATUSES = new Set(['active', 'trialing', 'past_due'])
