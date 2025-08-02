import { NextRequest, NextResponse } from 'next/server';
import { stripe, STRIPE_CONFIG } from '@/lib/stripe';
import { getSubscriptionTier, calculateTotalWithVAT } from '@/lib/subscription-tiers';

export async function POST(request: NextRequest) {
  try {
    const { tierId, billingCycle, customerId, successUrl, cancelUrl } = await request.json();

    // Validate input
    if (!tierId || !billingCycle) {
      return NextResponse.json(
        { error: 'Missing required parameters: tierId and billingCycle' },
        { status: 400 }
      );
    }

    const tier = getSubscriptionTier(tierId);
    if (!tier) {
      return NextResponse.json(
        { error: 'Invalid subscription tier' },
        { status: 400 }
      );
    }

    // Free tier doesn't need checkout
    if (tier.id === 'free') {
      return NextResponse.json(
        { error: 'Free tier does not require checkout' },
        { status: 400 }
      );
    }

    // Get the correct price ID based on billing cycle
    const priceId = billingCycle === 'monthly' 
      ? tier.stripePriceIdMonthly 
      : tier.stripePriceIdYearly;

    if (!priceId) {
      return NextResponse.json(
        { error: 'Price ID not configured for this tier and billing cycle' },
        { status: 500 }
      );
    }

    // Create or get customer
    let customer;
    if (customerId) {
      try {
        customer = await stripe.customers.retrieve(customerId);
      } catch (error) {
        // Customer doesn't exist, we'll create one in the checkout session
        customer = null;
      }
    }

    // Create checkout session
    const sessionParams: any = {
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl || `${request.nextUrl.origin}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${request.nextUrl.origin}/pricing`,
      billing_address_collection: 'required',
      tax_id_collection: {
        enabled: true,
      },
      customer_creation: customer ? undefined : 'always',
      allow_promotion_codes: true,
      metadata: {
        tier: tierId,
        billing_cycle: billingCycle,
      },
      subscription_data: {
        metadata: {
          tier: tierId,
          billing_cycle: billingCycle,
        },
      },
      // UK-specific configuration
      locale: 'en-GB',
      currency: STRIPE_CONFIG.currency,
    };

    if (customer) {
      sessionParams.customer = customer.id;
    } else {
      sessionParams.customer_email = undefined; // Will be collected in checkout
    }

    // Add automatic tax calculation for UK
    sessionParams.automatic_tax = {
      enabled: true,
    };

    const session = await stripe.checkout.sessions.create(sessionParams);

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });

  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}