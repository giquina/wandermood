'use client';

import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

export function getStripe(): Promise<Stripe | null> {
  if (!stripePromise) {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    
    if (!publishableKey) {
      throw new Error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set');
    }

    stripePromise = loadStripe(publishableKey);
  }
  
  return stripePromise;
}

export async function redirectToCheckout(
  tierId: string,
  billingCycle: 'monthly' | 'yearly',
  customerId?: string
): Promise<void> {
  try {
    const response = await fetch('/api/stripe/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tierId,
        billingCycle,
        customerId,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create checkout session');
    }

    const { url } = await response.json();
    
    // Redirect to Stripe Checkout
    window.location.href = url;
  } catch (error) {
    console.error('Error redirecting to checkout:', error);
    throw error;
  }
}

export async function redirectToCustomerPortal(
  customerId: string,
  returnUrl?: string
): Promise<void> {
  try {
    const response = await fetch('/api/stripe/customer-portal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerId,
        returnUrl,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create portal session');
    }

    const { url } = await response.json();
    
    // Redirect to Stripe Customer Portal
    window.location.href = url;
  } catch (error) {
    console.error('Error redirecting to customer portal:', error);
    throw error;
  }
}

export async function getSubscriptionStatus(
  customerId?: string,
  subscriptionId?: string
) {
  try {
    const params = new URLSearchParams();
    if (customerId) params.append('customerId', customerId);
    if (subscriptionId) params.append('subscriptionId', subscriptionId);

    const response = await fetch(`/api/stripe/subscription-status?${params}`);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch subscription status');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching subscription status:', error);
    throw error;
  }
}

export async function updateSubscription(
  subscriptionId: string,
  action: 'cancel' | 'reactivate' | 'change_plan',
  priceId?: string
) {
  try {
    const response = await fetch('/api/stripe/subscription-status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subscriptionId,
        action,
        priceId,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update subscription');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating subscription:', error);
    throw error;
  }
}