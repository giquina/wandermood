'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import BillingPortal from '@/components/BillingPortal';

export default function BillingPage() {
  // TODO: Get this from user authentication/session
  const [customerId] = useState('cus_example123'); // This would come from your auth system
  const [subscriptionId] = useState('sub_example456'); // Optional, if you have it

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href="/account" className="text-gray-500 hover:text-gray-700">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Billing & Subscription</h1>
              <p className="text-gray-600 mt-1">
                Manage your subscription, payment methods, and billing history
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <BillingPortal 
            customerId={customerId}
            subscriptionId={subscriptionId}
          />
        </motion.div>
      </div>
    </div>
  );
}