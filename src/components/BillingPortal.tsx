'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Calendar, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  ExternalLink,
  Crown,
  Zap,
  Sparkles
} from 'lucide-react';
import { UserSubscription } from '@/types';
import { getSubscriptionStatus, redirectToCustomerPortal, updateSubscription } from '@/lib/stripe-client';
import { formatCurrency, SUBSCRIPTION_TIERS } from '@/lib/subscription-tiers';

interface BillingPortalProps {
  customerId: string;
  subscriptionId?: string;
}

const statusColors = {
  active: 'text-green-600 bg-green-50',
  canceled: 'text-red-600 bg-red-50',
  past_due: 'text-yellow-600 bg-yellow-50',
  unpaid: 'text-red-600 bg-red-50',
  incomplete: 'text-gray-600 bg-gray-50',
};

const statusIcons = {
  active: CheckCircle,
  canceled: AlertCircle,
  past_due: Clock,
  unpaid: AlertCircle,
  incomplete: Clock,
};

const tierIcons = {
  free: null,
  explorer: Zap,
  curator: Sparkles,
  connoisseur: Crown,
};

export default function BillingPortal({ customerId, subscriptionId }: BillingPortalProps) {
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSubscriptionStatus();
  }, [customerId, subscriptionId]);

  const fetchSubscriptionStatus = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getSubscriptionStatus(customerId, subscriptionId);
      setSubscription(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load subscription');
      console.error('Error fetching subscription:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleManageBilling = async () => {
    try {
      await redirectToCustomerPortal(customerId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to open billing portal');
    }
  };

  const handleCancelSubscription = async () => {
    if (!subscription?.id) return;
    
    const confirmed = window.confirm(
      'Are you sure you want to cancel your subscription? You will still have access until the end of your current billing period.'
    );
    
    if (!confirmed) return;

    try {
      setActionLoading('cancel');
      await updateSubscription(subscription.id, 'cancel');
      await fetchSubscriptionStatus(); // Refresh data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to cancel subscription');
    } finally {
      setActionLoading(null);
    }
  };

  const handleReactivateSubscription = async () => {
    if (!subscription?.id) return;

    try {
      setActionLoading('reactivate');
      await updateSubscription(subscription.id, 'reactivate');
      await fetchSubscriptionStatus(); // Refresh data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reactivate subscription');
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <span className="text-red-800 font-medium">Error loading subscription</span>
        </div>
        <p className="text-red-700 mt-2">{error}</p>
        <button
          onClick={fetchSubscriptionStatus}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No active subscription found.</p>
      </div>
    );
  }

  const StatusIcon = statusIcons[subscription.status as keyof typeof statusIcons];
  const tier = SUBSCRIPTION_TIERS.find(t => t.id === subscription.tier);
  const TierIcon = tier ? tierIcons[tier.id as keyof typeof tierIcons] : null;

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Subscription Overview */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Current Subscription</h2>
            <div className="flex items-center gap-2">
              {TierIcon && (
                <div className="p-1 rounded bg-purple-100">
                  <TierIcon className="w-4 h-4 text-purple-600" />
                </div>
              )}
              <span className="text-lg font-semibold text-gray-800">
                {tier?.name || subscription.tier}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                statusColors[subscription.status as keyof typeof statusColors]
              }`}>
                <StatusIcon className="w-3 h-3" />
                {subscription.status.replace('_', ' ')}
              </span>
            </div>
          </div>
          
          <button
            onClick={handleManageBilling}
            className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            <CreditCard className="w-4 h-4" />
            Manage Billing
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>

        {/* Subscription Details */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Billing Information</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Billing Cycle:</span>
                <span className="font-medium capitalize">{subscription.billingCycle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Current Period:</span>
                <span className="font-medium">
                  {new Date(subscription.currentPeriodStart).toLocaleDateString()} - {' '}
                  {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                </span>
              </div>
              {subscription.latestInvoice && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Payment:</span>
                  <span className="font-medium">
                    {formatCurrency(subscription.latestInvoice.amountPaid / 100)}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-3">Features Included</h3>
            <div className="space-y-1">
              {tier?.features.slice(0, 4).map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  <span className="text-gray-600">{feature}</span>
                </div>
              ))}
              {tier && tier.features.length > 4 && (
                <div className="text-xs text-gray-500 mt-1">
                  +{tier.features.length - 4} more features
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Cancellation Warning */}
        {subscription.cancelAtPeriodEnd && (
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="font-medium text-yellow-800">
                  Subscription scheduled for cancellation
                </p>
                <p className="text-yellow-700 text-sm mt-1">
                  Your subscription will end on {new Date(subscription.currentPeriodEnd).toLocaleDateString()}.
                  You will still have access until then.
                </p>
                <button
                  onClick={handleReactivateSubscription}
                  disabled={actionLoading === 'reactivate'}
                  className="mt-3 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors disabled:opacity-50"
                >
                  {actionLoading === 'reactivate' ? 'Reactivating...' : 'Reactivate Subscription'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {subscription.status === 'active' && !subscription.cancelAtPeriodEnd && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={handleCancelSubscription}
              disabled={actionLoading === 'cancel'}
              className="text-red-600 hover:text-red-700 text-sm font-medium disabled:opacity-50"
            >
              {actionLoading === 'cancel' ? 'Cancelling...' : 'Cancel Subscription'}
            </button>
          </div>
        )}
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        
        {subscription.latestInvoice ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-full">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Payment Successful</p>
                  <p className="text-sm text-gray-600">
                    {new Date(subscription.latestInvoice.created).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">
                  {formatCurrency(subscription.latestInvoice.amountPaid / 100)}
                </p>
                <p className="text-xs text-gray-500 uppercase">
                  {subscription.latestInvoice.currency}
                </p>
              </div>
            </div>
            
            <button
              onClick={handleManageBilling}
              className="text-purple-600 hover:text-purple-700 text-sm font-medium"
            >
              View full billing history →
            </button>
          </div>
        ) : (
          <p className="text-gray-600">No payment history available.</p>
        )}
      </div>
    </motion.div>
  );
}