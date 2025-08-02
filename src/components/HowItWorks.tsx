'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      number: "01",
      title: "Share Your Desired Mood",
      description: "Tell us how you want to feel during your travels - calm, adventurous, romantic, or inspired.",
      details: "Our emotional assessment helps you identify your travel goals, not just your current state. Choose from 8 carefully crafted mood categories, each designed to capture different emotional experiences you might seek.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop",
      icon: "🎭",
      features: [
        "8 distinct emotional categories",
        "Intensity slider for precise matching",
        "Future-focused mindset",
        "No judgment, just understanding"
      ]
    },
    {
      number: "02", 
      title: "Get Intelligent Matches",
      description: "Our platform analyzes your emotional preferences and matches you with destinations that create those feelings.",
      details: "Using behavioral psychology and travel data, we understand which environments, activities, and experiences naturally evoke specific emotions. Every recommendation is crafted to help you achieve your desired emotional state.",
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=500&h=400&fit=crop",
      icon: "🧠",
      features: [
        "Psychology-based matching",
        "Curated experiences, not just places",
        "Activity and environment optimization",
        "Personalized intensity levels"
      ]
    },
    {
      number: "03",
      title: "Book with Confidence", 
      description: "Reserve your emotional journey with our trusted travel partners and 24/7 support.",
      details: "We partner with verified accommodations, activity providers, and local guides who understand the importance of emotional travel experiences. Every booking comes with our satisfaction guarantee.",
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500&h=400&fit=crop",
      icon: "✅",
      features: [
        "Verified travel partners",
        "Flexible booking options", 
        "24/7 travel support",
        "Satisfaction guarantee"
      ]
    }
  ]

  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.h2 
            className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            How WanderMood Works
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Three simple steps to discover travel experiences that match your emotional goals and create lasting memories.
          </motion.p>
        </div>

        {/* Steps Navigation */}
        <div className="flex justify-center mb-16">
          <div className="flex space-x-4 bg-gray-100 rounded-full p-1">
            {steps.map((step, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeStep === index
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Step {step.number}
              </button>
            ))}
          </div>
        </div>

        {/* Active Step Content */}
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid lg:grid-cols-2 gap-12 items-center mb-16"
        >
          {/* Content */}
          <div className="order-2 lg:order-1">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl">
                {steps[activeStep].icon}
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500 mb-1">
                  Step {steps[activeStep].number}
                </div>
                <h3 className="text-3xl font-bold text-gray-900">
                  {steps[activeStep].title}
                </h3>
              </div>
            </div>
            
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              {steps[activeStep].description}
            </p>
            
            <p className="text-gray-600 mb-8 leading-relaxed">
              {steps[activeStep].details}
            </p>

            <div className="space-y-3">
              {steps[activeStep].features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              <motion.img
                src={steps[activeStep].image}
                alt={steps[activeStep].title}
                className="w-full h-80 object-cover rounded-2xl shadow-lg"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              
              {/* Overlay Badge */}
              <div className="absolute top-6 left-6">
                <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-sm font-medium text-gray-900">
                    Step {steps[activeStep].number}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-16">
          <div className="flex items-center space-x-4">
            {steps.map((_, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                    index === activeStep ? 'bg-gray-900' : 'bg-gray-300'
                  }`}
                />
                {index < steps.length - 1 && (
                  <div className="w-8 h-px bg-gray-300 mx-2" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center bg-gray-50 rounded-3xl p-12"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to start your emotional journey?
          </h3>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who've discovered their perfect emotional travel experiences through WanderMood.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => document.querySelector('#mood-selection')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center px-8 py-4 bg-black text-white text-lg font-medium rounded-full hover:bg-gray-800 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Start Your Journey
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>No booking required to explore</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}