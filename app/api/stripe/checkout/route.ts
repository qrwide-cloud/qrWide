import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getStripe, PRICE_IDS } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { plan, billingCycle } = await request.json() as {
    plan: 'pro' | 'business'
    billingCycle: 'monthly' | 'yearly'
  }

  const priceId = PRICE_IDS[plan]?.[billingCycle]
  if (!priceId) return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })

  const { data: profile } = await supabase
    .from('profiles')
    .select('stripe_customer_id, email')
    .eq('id', user.id)
    .single()

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://qrwide.com'

  const stripe = getStripe()
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    customer: profile?.stripe_customer_id ?? undefined,
    customer_email: profile?.stripe_customer_id ? undefined : (profile?.email ?? user.email),
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${appUrl}/dashboard?upgraded=true`,
    cancel_url: `${appUrl}/pricing`,
    metadata: { user_id: user.id, plan, billing_cycle: billingCycle },
    subscription_data: { metadata: { user_id: user.id } },
  })

  return NextResponse.json({ checkoutUrl: session.url })
}
