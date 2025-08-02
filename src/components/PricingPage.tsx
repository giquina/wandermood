'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SUBSCRIPTION_TIERS } from '@/lib/subscription-tiers';
import PricingCard from './PricingCard';

interface PricingPageProps {
  onSelectPlan: (tierId: string, billingCycle: 'monthly' | 'yearly') => void;
  isLoading?: boolean;
}

export default function PricingPage({ onSelectPlan, isLoading = false }: PricingPageProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Choose Your{' '}
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Adventure Level
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Unlock personalized mood-based travel recommendations designed for your emotional journey. 
          Start free and upgrade as your wanderlust grows.
        </p>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className={`font-medium ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
            Monthly
          </span>
          <motion.button
            className="relative w-14 h-8 bg-gray-200 rounded-full p-1 transition-colors duration-300"
            style={{
              backgroundColor: billingCycle === 'yearly' ? '#8B5CF6' : '#E5E7EB',
            }}
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="w-6 h-6 bg-white rounded-full shadow-sm"
              animate={{
                x: billingCycle === 'yearly' ? 24 : 0,
              }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </motion.button>
          <div className="flex items-center gap-2">
            <span className={`font-medium ${billingCycle === 'yearly' ? 'text-gray-900' : 'text-gray-500'}`}>
              Yearly
            </span>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs font-semibold">
              Save up to 26%
            </span>
          </div>
        </div>
      </motion.div>

      {/* Pricing Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence mode="wait">
          {SUBSCRIPTION_TIERS.map((tier, index) => (
            <motion.div key={`${tier.id}-${billingCycle}`} variants={itemVariants}>
              <PricingCard
                tier={tier}
                billingCycle={billingCycle}
                isPopular={tier.id === 'curator'}
                onSelectPlan={onSelectPlan}
                isLoading={isLoading}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
          Frequently Asked Questions
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can I change my plan anytime?</h3>
              <p className="text-gray-600 text-sm">
                Yes! You can upgrade, downgrade, or cancel your subscription at any time. 
                Changes will be reflected in your next billing cycle.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Is VAT included in the prices?</h3>
              <p className="text-gray-600 text-sm">
                Yes, all prices include UK VAT (20%). The final price you see is exactly what you'll pay.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600 text-sm">
                We accept all major credit and debit cards, including Visa, Mastercard, and American Express.
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Do you offer refunds?</h3>
              <p className="text-gray-600 text-sm">
                We offer a 14-day money-back guarantee for all paid plans. No questions asked.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How does the mood-based system work?</h3>
              <p className="text-gray-600 text-sm">
                Our AI analyzes your emotional state and preferences to suggest destinations and 
                experiences that match your desired mood and travel goals.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Is my data secure?</h3>
              <p className="text-gray-600 text-sm">
                Absolutely. We use industry-standard encryption and never share your personal 
                information with third parties.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Trust Badges */}
      <motion.div
        className="flex justify-center items-center gap-8 mt-12 pt-8 border-t border-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="flex items-center gap-2 text-gray-500">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-medium">SSL Secured</span>
        </div>
        
        <div className="flex items-center gap-2 text-gray-500">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-medium">PCI Compliant</span>
        </div>
        
        <div className="flex items-center gap-2 text-gray-500">
          <span className="text-sm font-medium">🇬🇧 UK Registered Company</span>
        </div>
      </motion.div>
    </div>
  );
}