'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  const footerSections = [
    {
      title: 'Company',
      links: [
        { name: 'About', href: '#about' },
        { name: 'Careers', href: '#careers' },
        { name: 'Press', href: '#press' },
        { name: 'Blog', href: '#blog' }
      ]
    },
    {
      title: 'Product',
      links: [
        { name: 'Discover', href: '#discover' },
        { name: 'How It Works', href: '#how-it-works' },
        { name: 'Destinations', href: '#destinations' },
        { name: 'Pricing', href: '#pricing' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '#help' },
        { name: 'Contact', href: '#contact' },
        { name: 'Privacy', href: '#privacy' },
        { name: 'Terms', href: '#terms' }
      ]
    },
    {
      title: 'Connect',
      links: [
        { name: 'Instagram', href: 'https://instagram.com' },
        { name: 'Twitter', href: 'https://twitter.com' },
        { name: 'YouTube', href: 'https://youtube.com' },
        { name: 'LinkedIn', href: 'https://linkedin.com' }
      ]
    }
  ]

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="col-span-2 lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                WanderMood
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Travel that matches your emotions, not just your preferences. Discover destinations that resonate with your soul.
              </p>
            </div>
            
            {/* Social Icons */}
            <div className="flex space-x-4">
              {['Instagram', 'Twitter', 'YouTube', 'LinkedIn'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors duration-200"
                >
                  <span className="sr-only">{social}</span>
                  <div className="w-4 h-4 bg-gray-600 rounded-sm"></div>
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title} className="col-span-1">
              <h4 className="text-sm font-semibold text-gray-900 mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="max-w-md">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              Get mood-based travel inspiration
            </h4>
            <p className="text-gray-600 text-sm mb-4">
              Weekly curated destinations that match your emotional state.
            </p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900"
              />
              <button className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <p className="text-sm text-gray-500">
                © 2025 WanderMood. All rights reserved.
              </p>
            </div>
            
            {/* Trust Badges */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span>Secure booking</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span>24/7 support</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <div className="w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span>Trusted by 50k+ travelers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}