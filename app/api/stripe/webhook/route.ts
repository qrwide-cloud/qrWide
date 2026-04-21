import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { createServiceClient } from '@/lib/supabase/server'
// Stripe types for webhook event payloads
type StripeCheckoutSession = {
  metadata?: Record<string, string>
  customer?: string | null
  subscription?: string | null
}
type StripeSub = {
  status: string
  metadata?: Record<string, string>
}

export async function POST(request: NextRequest) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')!

  const stripe = getStripe()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let event: any
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const supabase = createServiceClient()

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as StripeCheckoutSession
      const userId = session.metadata?.user_id
      const plan = session.metadata?.plan
      if (!userId || !plan) break

      await supabase
        .from('profiles')
        .update({
          plan: plan as 'pro' | 'business',
          stripe_customer_id: session.customer as string,
          stripe_subscription_id: session.subscription as string,
        })
        .eq('id', userId)
      break
    }

    case 'customer.subscription.updated': {
      const sub = event.data.object as StripeSub
      const userId = sub.metadata?.user_id
      if (!userId) break

      const status = sub.status
      if (status === 'active' || status === 'trialing') {
        // Plan is stored in metadata set at checkout
        break
      }
      // Subscription cancelled or past_due — downgrade
      if (status === 'canceled' || status === 'past_due' || status === 'unpaid') {
        await supabase.from('profiles').update({ plan: 'free' }).eq('id', userId)
      }
      break
    }

    case 'customer.subscription.deleted': {
      const sub = event.data.object as StripeSub
      const userId = sub.metadata?.user_id
      if (userId) {
        await supabase.from('profiles').update({ plan: 'free' }).eq('id', userId)
      }
      break
    }
  }

  return NextResponse.json({ received: true })
}
