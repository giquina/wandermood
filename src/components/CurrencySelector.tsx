'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Currency {
  code: string
  symbol: string
  name: string
  flag: string
}

interface CurrencySelectorProps {
  selectedCurrency: string
  onCurrencyChange: (currency: string) => void
  className?: string
}

export default function CurrencySelector({ selectedCurrency, onCurrencyChange, className = '' }: CurrencySelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  const currencies: Currency[] = [
    { code: 'GBP', symbol: '£', name: 'British Pound', flag: '🇬🇧' },
    { code: 'EUR', symbol: '€', name: 'Euro', flag: '🇪🇺' },
    { code: 'USD', symbol: '$', name: 'US Dollar', flag: '🇺🇸' },
  ]

  const currentCurrency = currencies.find(c => c.code === selectedCurrency) || currencies[0]

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors duration-200"
      >
        <span className="text-lg">{currentCurrency.flag}</span>
        <span className="font-medium text-gray-900">{currentCurrency.symbol}</span>
        <svg className={`w-4 h-4 text-gray-500 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[160px]"
          >
            {currencies.map((currency) => (
              <button
                key={currency.code}
                onClick={() => {
                  onCurrencyChange(currency.code)
                  setIsOpen(false)
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 ${
                  currency.code === selectedCurrency ? 'bg-gray-50' : ''
                }`}
              >
                <span className="text-lg">{currency.flag}</span>
                <div>
                  <div className="font-medium text-gray-900">{currency.symbol} {currency.code}</div>
                  <div className="text-sm text-gray-500">{currency.name}</div>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay to close dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}