'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Crown, Zap, Sparkles } from 'lucide-react';
import { SubscriptionTier } from '@/types';
import { calculateYearlySavingsPercentage, formatCurrency } from '@/lib/subscription-tiers';

interface PricingCardProps {
  tier: SubscriptionTier;
  billingCycle: 'monthly' | 'yearly';
  isPopular?: boolean;
  onSelectPlan: (tierId: string, billingCycle: 'monthly' | 'yearly') => void;
  isLoading?: boolean;
}

const tierIcons = {
  free: null,
  explorer: <Zap className="w-5 h-5" />,
  curator: <Sparkles className="w-5 h-5" />,
  connoisseur: <Crown className="w-5 h-5" />,
};

const tierColors = {
  free: 'from-gray-50 to-gray-100 border-gray-200',
  explorer: 'from-blue-50 to-indigo-100 border-blue-200',
  curator: 'from-purple-50 to-pink-100 border-purple-200',
  connoisseur: 'from-amber-50 to-orange-100 border-amber-200',
};

const buttonStyles = {
  free: 'bg-gray-600 hover:bg-gray-700 text-white',
  explorer: 'bg-blue-600 hover:bg-blue-700 text-white',
  curator: 'bg-purple-600 hover:bg-purple-700 text-white',
  connoisseur: 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white',
};

export default function PricingCard({ 
  tier, 
  billingCycle, 
  isPopular = false, 
  onSelectPlan, 
  isLoading = false 
}: PricingCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const price = billingCycle === 'monthly' ? tier.monthlyPrice : tier.yearlyPrice;
  const savings = billingCycle === 'yearly' ? calculateYearlySavingsPercentage(tier) : 0;
  const icon = tierIcons[tier.id as keyof typeof tierIcons];
  const colorClass = tierColors[tier.id as keyof typeof tierColors];
  const buttonClass = buttonStyles[tier.id as keyof typeof buttonStyles];

  const handleSelectPlan = () => {
    if (!isLoading) {
      onSelectPlan(tier.id, billingCycle);
    }
  };

  return (
    <motion.div
      className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${colorClass} ${
        isPopular ? 'ring-2 ring-purple-500 ring-offset-2' : ''
      }`}
      whileHover={{ scale: 1.02, y: -4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          {icon && (
            <div className={`p-2 rounded-lg bg-white/50 ${tier.id === 'connoisseur' ? 'text-amber-600' : 'text-gray-600'}`}>
              {icon}
            </div>
          )}
          <h3 className="text-xl font-bold text-gray-900">{tier.name}</h3>
        </div>
        
        <p className="text-gray-600 text-sm mb-4">{tier.description}</p>
        
        <div className="mb-4">
          {price === 0 ? (
            <div className="text-3xl font-bold text-gray-900">Free</div>
          ) : (
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-3xl font-bold text-gray-900">
                {formatCurrency(price)}
              </span>
              <span className="text-gray-500 text-sm">
                /{billingCycle === 'monthly' ? 'month' : 'year'}
              </span>
            </div>
          )}
          
          {savings > 0 && (
            <div className="text-green-600 text-sm font-medium mt-1">
              Save {savings}% with yearly billing
            </div>
          )}
          
          {price > 0 && (
            <div className="text-xs text-gray-500 mt-1">
              VAT included
            </div>
          )}
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {tier.features.map((feature, index) => (
          <motion.div
            key={feature}
            className="flex items-start gap-3"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700 text-sm">{feature}</span>
          </motion.div>
        ))}
      </div>

      <button
        onClick={handleSelectPlan}
        disabled={isLoading}
        className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${buttonClass} ${
          isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg transform hover:-translate-y-0.5'
        }`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Processing...
          </div>
        ) : tier.id === 'free' ? (
          'Get Started Free'
        ) : (
          `Choose ${tier.name}`
        )}
      </button>

      {tier.id === 'connoisseur' && (
        <div className="mt-4 text-center">
          <span className="text-xs text-gray-500">
            Includes dedicated account manager
          </span>
        </div>
      )}
    </motion.div>
  );
}