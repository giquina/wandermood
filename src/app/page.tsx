'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MoodPicker from '@/components/MoodPicker'
import TripRecommendations from '@/components/TripRecommendations'
import { Mood } from '@/types'

export default function HomePage() {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null)
  const [moodIntensity, setMoodIntensity] = useState(5)
  const [showRecommendations, setShowRecommendations] = useState(false)

  const handleMoodSelect = (mood: Mood, intensity: number) => {
    setSelectedMood(mood)
    setMoodIntensity(intensity)
  }

  const handleFindTrips = () => {
    setShowRecommendations(true)
  }

  const handleBackToMoodSelection = () => {
    setShowRecommendations(false)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <AnimatePresence mode="wait">
        {!showRecommendations ? (
          <motion.div
            key="mood-selection"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen"
          >
            {/* 2025 Modern Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
              {/* Subtle background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white" />
              
              {/* Modern grid pattern */}
              <div className="absolute inset-0 opacity-[0.02]">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0,0,0) 1px, transparent 0)`,
                  backgroundSize: '24px 24px'
                }} />
              </div>

              <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center">
                  {/* Modern hero text */}
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.21, 1, 0.81, 1] }}
                    className="mb-8"
                  >
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-gray-900 mb-6">
                      WanderMood
                    </h1>
                    <p className="text-xl sm:text-2xl lg:text-3xl text-gray-600 font-medium mb-4 max-w-4xl mx-auto leading-tight">
                      Travel that matches your emotions,<br />
                      not just your preferences
                    </p>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
                      Intelligent travel discovery that understands how you feel and finds destinations that resonate with your soul.
                    </p>
                  </motion.div>

                  {/* Modern CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: [0.21, 1, 0.81, 1] }}
                    className="mb-16"
                  >
                    <button 
                      onClick={() => document.querySelector('#mood-selection')?.scrollIntoView({ behavior: 'smooth' })}
                      className="inline-flex items-center px-8 py-4 bg-black text-white text-lg font-medium rounded-full hover:bg-gray-800 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      Discover Your Journey
                      <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </button>
                  </motion.div>

                  {/* Trust signals and features */}
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4, ease: [0.21, 1, 0.81, 1] }}
                    className="space-y-6"
                  >
                    {/* User count */}
                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-4">
                        Trusted by <span className="font-semibold text-gray-900">50,000+</span> emotional travelers
                      </p>
                      {/* User avatars */}
                      <div className="flex justify-center -space-x-2 mb-6">
                        {[1,2,3,4,5].map(i => (
                          <div key={i} className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full border-2 border-white" />
                        ))}
                        <div className="w-10 h-10 bg-gray-200 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">
                          +45k
                        </div>
                      </div>
                    </div>
                    
                    {/* Feature badges */}
                    <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center px-4 py-2 bg-gray-50 rounded-full">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                        Smart Matching
                      </div>
                      <div className="flex items-center px-4 py-2 bg-gray-50 rounded-full">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
                        Global Destinations
                      </div>
                      <div className="flex items-center px-4 py-2 bg-gray-50 rounded-full">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mr-2" />
                        Emotion-Aware
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Modern Mood Selection Section */}
            <section id="mood-selection" className="py-24 bg-gray-50">
              <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-center mb-16"
                >
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                    How do you want to feel?
                  </h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Choose the emotional experience you're seeking, and we'll curate travel destinations that help you achieve that feeling.
                  </p>
                </motion.div>
                
                <MoodPicker 
                  onMoodSelect={handleMoodSelect} 
                  onFindTrips={handleFindTrips}
                  selectedMood={selectedMood} 
                />
              </div>
            </section>

            {/* Modern Features Section */}
            <section className="py-24">
              <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-20">
                  <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                    Emotional Intelligence Meets Travel
                  </h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Experience the future of travel planning with technology that understands your emotions and finds destinations that speak to your heart.
                  </p>
                </div>
                
                <div className="grid lg:grid-cols-3 gap-8">
                  <motion.div 
                    className="p-8 bg-white rounded-2xl border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-lg group"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Emotional Intelligence
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Our platform understands your feelings and matches them to destinations that resonate with your emotional state.
                    </p>
                  </motion.div>

                  <motion.div 
                    className="p-8 bg-white rounded-2xl border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-lg group"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Personalized Experiences
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Every recommendation is tailored to your unique emotional needs and travel preferences.
                    </p>
                  </motion.div>

                  <motion.div 
                    className="p-8 bg-white rounded-2xl border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-lg group"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Global Destinations
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      From hidden gems to popular spots, discover experiences worldwide that match your emotional state.
                    </p>
                  </motion.div>
                </div>
              </div>
            </section>

            <Footer />
          </motion.div>
        ) : (
          <motion.div
            key="recommendations"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <TripRecommendations 
              selectedMood={selectedMood!}
              moodIntensity={moodIntensity}
              onBack={handleBackToMoodSelection}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}