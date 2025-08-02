import { SubscriptionTier } from '@/types';

export const SUBSCRIPTION_TIERS: SubscriptionTier[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Perfect for occasional travelers looking for inspiration',
    monthlyPrice: 0,
    yearlyPrice: 0,
    stripePriceIdMonthly: '', // No Stripe needed for free tier
    stripePriceIdYearly: '',
    features: [
      '3 mood-based recommendations per month',
      'Basic destination insights',
      'Standard support',
      'Mobile app access',
    ],
    maxRecommendations: 3,
    priority: false,
    customization: false,
    aiInsights: false,
  },
  {
    id: 'explorer',
    name: 'Explorer',
    description: 'For regular travelers who want more personalized experiences',
    monthlyPrice: 8.99,
    yearlyPrice: 79.99, // 2 months free
    stripePriceIdMonthly: process.env.STRIPE_EXPLORER_MONTHLY_PRICE_ID || '',
    stripePriceIdYearly: process.env.STRIPE_EXPLORER_YEARLY_PRICE_ID || '',
    features: [
      '25 mood-based recommendations per month',
      'Detailed destination insights',
      'Priority support',
      'Mood history tracking',
      'Basic trip planning tools',
      'Email notifications',
    ],
    maxRecommendations: 25,
    priority: true,
    customization: false,
    aiInsights: false,
  },
  {
    id: 'curator',
    name: 'Curator',
    description: 'For passionate travelers seeking deeply personalized journeys',
    monthlyPrice: 19.99,
    yearlyPrice: 199.99, // 2 months free
    stripePriceIdMonthly: process.env.STRIPE_CURATOR_MONTHLY_PRICE_ID || '',
    stripePriceIdYearly: process.env.STRIPE_CURATOR_YEARLY_PRICE_ID || '',
    features: [
      'Unlimited mood-based recommendations',
      'AI-powered travel insights',
      'Advanced customization options',
      'Personalized mood profiles',
      'Advanced trip planning suite',
      'Early access to new features',
      '24/7 premium support',
      'Custom mood categories',
    ],
    maxRecommendations: -1, // Unlimited
    priority: true,
    customization: true,
    aiInsights: true,
  },
  {
    id: 'connoisseur',
    name: 'Connoisseur',
    description: 'For luxury travelers and travel professionals',
    monthlyPrice: 49.99,
    yearlyPrice: 499.99, // 2 months free
    stripePriceIdMonthly: process.env.STRIPE_CONNOISSEUR_MONTHLY_PRICE_ID || '',
    stripePriceIdYearly: process.env.STRIPE_CONNOISSEUR_YEARLY_PRICE_ID || '',
    features: [
      'Everything in Curator',
      'Concierge travel planning service',
      'Exclusive luxury destinations',
      'Personal travel consultant',
      'VIP partner discounts',
      'White-label solutions',
      'API access for travel agencies',
      'Custom integrations',
      'Dedicated account manager',
    ],
    maxRecommendations: -1, // Unlimited
    priority: true,
    customization: true,
    aiInsights: true,
  },
];

export function getSubscriptionTier(tierId: string): SubscriptionTier | undefined {
  return SUBSCRIPTION_TIERS.find(tier => tier.id === tierId);
}

export function calculateYearlySavings(tier: SubscriptionTier): number {
  if (tier.monthlyPrice === 0) return 0;
  const monthlyAnnual = tier.monthlyPrice * 12;
  return monthlyAnnual - tier.yearlyPrice;
}

export function calculateYearlySavingsPercentage(tier: SubscriptionTier): number {
  if (tier.monthlyPrice === 0) return 0;
  const savings = calculateYearlySavings(tier);
  const monthlyAnnual = tier.monthlyPrice * 12;
  return Math.round((savings / monthlyAnnual) * 100);
}

// UK VAT calculations
export function calculateVAT(amount: number, vatRate: number = 0.20): number {
  return Math.round(amount * vatRate * 100) / 100;
}

export function calculateTotalWithVAT(amount: number, vatRate: number = 0.20): number {
  return Math.round((amount * (1 + vatRate)) * 100) / 100;
}

export function formatCurrency(amount: number, currency: string = 'GBP'): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}