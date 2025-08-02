'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {!showRecommendations ? (
          <motion.div
            key="mood-selection"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="gradient-bg min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
          >
            {/* Header */}
            <header className="relative z-10 pt-8 pb-4">
              <div className="container mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                    WanderMood
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-700 mb-2">
                    AI Travel Concierge
                  </p>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Stop planning trips. Start planning feelings. Discover travel experiences that match your emotional state.
                  </p>
                </motion.div>
              </div>
            </header>

            {/* Hero Section */}
            <main className="relative z-10 py-12">
              <div className="container mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="max-w-6xl mx-auto"
                >
                  {/* Mood Picker Section */}
                  <section className="mb-16">
                    <MoodPicker 
                      onMoodSelect={handleMoodSelect} 
                      onFindTrips={handleFindTrips}
                      selectedMood={selectedMood} 
                    />
                  </section>

                  {/* Features Preview */}
                  <motion.section
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="grid md:grid-cols-3 gap-8 mb-16 fade-in"
                  >
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center">
                      <div className="text-4xl mb-4">🧠</div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        Emotional Intelligence
                      </h3>
                      <p className="text-gray-600">
                        Our AI understands your feelings and matches them to perfect destinations
                      </p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center">
                      <div className="text-4xl mb-4">✨</div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        Personalized Experiences
                      </h3>
                      <p className="text-gray-600">
                        Every recommendation is tailored to your unique emotional needs and preferences
                      </p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center">
                      <div className="text-4xl mb-4">🌍</div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        Global Destinations
                      </h3>
                      <p className="text-gray-600">
                        From hidden gems to popular spots, find experiences that resonate with your soul
                      </p>
                    </div>
                  </motion.section>

                  {/* Coming Soon Features */}
                  <motion.section
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-center bg-white rounded-xl p-8 shadow-lg border border-gray-200 fade-in"
                  >
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                      Coming Soon
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6 text-left">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">🤖 AI Chat Concierge</h4>
                        <p className="text-gray-600 text-sm">
                          Have natural conversations about your travel dreams
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">📱 Mobile App</h4>
                        <p className="text-gray-600 text-sm">
                          Take your mood-based travel planning on the go
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">🎯 Smart Itineraries</h4>
                        <p className="text-gray-600 text-sm">
                          Complete trip plans with flights, hotels, and activities
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">👥 Group Planning</h4>
                        <p className="text-gray-600 text-sm">
                          Plan trips that satisfy everyone's mood and preferences
                        </p>
                      </div>
                    </div>
                  </motion.section>
                </motion.div>
              </div>
            </main>

            {/* Footer */}
            <footer className="relative z-10 py-8 mt-16">
              <div className="container mx-auto px-4 text-center">
                <p className="text-gray-600">
                  Built with ❤️ using Claude Code and Next.js
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  © 2025 WanderMood. Your emotional travel companion.
                </p>
              </div>
            </footer>
          </motion.div>
        ) : (
          <motion.div
            key="recommendations"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
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