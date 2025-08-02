'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import PricingPage from '@/components/PricingPage';
import { redirectToCheckout } from '@/lib/stripe-client';

export default function PricingPageContainer() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelectPlan = async (tierId: string, billingCycle: 'monthly' | 'yearly') => {
    if (tierId === 'free') {
      // Handle free tier signup (no Stripe needed)
      // This would typically involve:
      // 1. Creating/updating user account
      // 2. Setting subscription to free tier
      // 3. Redirecting to dashboard
      console.log('Free tier selected - implement account creation');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      // TODO: Get current user's customer ID if they're logged in
      // const customerId = getCurrentUser()?.stripeCustomerId;
      
      await redirectToCheckout(tierId, billingCycle);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start checkout');
      console.error('Checkout error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {error && (
        <motion.div
          className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 mx-4 mt-4 rounded-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="font-medium">Payment Error</p>
          <p className="text-sm mt-1">{error}</p>
          <button
            onClick={() => setError(null)}
            className="text-red-600 hover:text-red-700 text-sm font-medium mt-2"
          >
            Dismiss
          </button>
        </motion.div>
      )}
      
      <PricingPage 
        onSelectPlan={handleSelectPlan}
        isLoading={isLoading}
      />
    </div>
  );
}