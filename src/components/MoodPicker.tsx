'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { Mood } from '@/types'

const moods: Mood[] = [
  {
    id: 'calm',
    name: 'Calm & Peaceful',
    emoji: '🧘‍♀️',
    description: 'I want to feel relaxed and recharged',
    color: 'mood-calm-accent',
    gradient: 'mood-card-calm'
  },
  {
    id: 'adventurous',
    name: 'Adventurous',
    emoji: '🏔️',
    description: 'I want to feel thrilled and challenged',
    color: 'mood-adventure-accent',
    gradient: 'mood-card-adventure'
  },
  {
    id: 'romantic',
    name: 'Romantic',
    emoji: '💕',
    description: 'I want to feel loved and connected',
    color: 'mood-romantic-accent',
    gradient: 'mood-card-romantic'
  },
  {
    id: 'creative',
    name: 'Creative & Inspired',
    emoji: '🎨',
    description: 'I want to feel inspired and artistic',
    color: 'mood-creative-accent',
    gradient: 'mood-card-creative'
  },
  {
    id: 'social',
    name: 'Social & Fun',
    emoji: '🎉',
    description: 'I want to feel energized and social',
    color: 'mood-social-accent',
    gradient: 'mood-card-social'
  },
  {
    id: 'celebrate',
    name: 'Celebratory',
    emoji: '🥳',
    description: 'I want to feel joyful and festive',
    color: 'mood-celebrate-accent',
    gradient: 'mood-card-celebrate'
  },
  {
    id: 'reflective',
    name: 'Reflective & Learning',
    emoji: '📚',
    description: 'I want to feel enriched and thoughtful',
    color: 'mood-reflective-accent',
    gradient: 'mood-card-reflective'
  },
  {
    id: 'luxury',
    name: 'Luxurious & Pampered',
    emoji: '💎',
    description: 'I want to feel spoiled and elegant',
    color: 'mood-luxury-accent',
    gradient: 'mood-card-luxury'
  }
]

interface MoodPickerProps {
  onMoodSelect: (mood: Mood, intensity: number) => void;
  onFindTrips: () => void;
  selectedMood?: Mood | null;
}

// Haptic feedback for mobile devices
const hapticFeedback = () => {
  if (typeof window !== 'undefined' && 'navigator' in window && 'vibrate' in navigator) {
    navigator.vibrate(50) // Light haptic feedback
  }
}

export default function MoodPicker({ onMoodSelect, onFindTrips, selectedMood }: MoodPickerProps) {
  const [hoveredMood, setHoveredMood] = useState<string | null>(null)
  const [moodIntensity, setMoodIntensity] = useState(5)
  const [showIntensitySlider, setShowIntensitySlider] = useState(false)

  const handleMoodSelection = (mood: Mood) => {
    hapticFeedback() // Add haptic feedback on selection
    onMoodSelect(mood, moodIntensity)
    setShowIntensitySlider(true)
  }

  const handleFindTrips = () => {
    if (selectedMood) {
      onFindTrips()
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto mood-picker">
      {/* Modern Mood Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mb-12">
        {/* Mobile: Add swipe hint */}
        <div className="col-span-2 md:col-span-4 text-center mb-4 md:hidden">
          <p className="text-sm text-gray-500">Tap cards to select your desired mood</p>
        </div>
        {moods.map((mood, index) => (
          <motion.div
            key={mood.id}
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              delay: index * 0.1, 
              duration: 0.6,
              ease: [0.4, 0, 0.2, 1]
            }}
            className="group relative"
          >
            <motion.div
              className={`
                relative cursor-pointer p-6 text-center bg-white rounded-2xl border transition-all duration-200
                ${selectedMood?.id === mood.id 
                  ? 'border-gray-900 shadow-lg ring-4 ring-gray-900/10' 
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }
              `}
              onClick={() => handleMoodSelection(mood)}
              onMouseEnter={() => setHoveredMood(mood.id)}
              onMouseLeave={() => setHoveredMood(null)}
              whileHover={{ 
                y: -4,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
            >
              {/* Emoji */}
              <motion.div 
                className="text-4xl md:text-5xl mb-4"
                animate={selectedMood?.id === mood.id ? {
                  scale: [1, 1.1, 1]
                } : {}}
                transition={{ duration: 1.5, repeat: selectedMood?.id === mood.id ? Infinity : 0 }}
              >
                {mood.emoji}
              </motion.div>
              
              {/* Mood Name */}
              <h3 className={`
                font-semibold text-base md:text-lg mb-2
                ${selectedMood?.id === mood.id ? 'text-gray-900' : 'text-gray-900'}
              `}>
                {mood.name}
              </h3>
              
              {/* Description */}
              <p className={`
                text-sm leading-relaxed
                ${selectedMood?.id === mood.id ? 'text-gray-600' : 'text-gray-500'}
              `}>
                {mood.description}
              </p>
              
              {/* Selection Indicator */}
              {selectedMood?.id === mood.id && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute top-4 right-4 w-5 h-5 bg-gray-900 rounded-full flex items-center justify-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="w-2 h-2 bg-white rounded-full"
                  />
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Modern Mood Intensity Slider */}
      <AnimatePresence>
        {selectedMood && showIntensitySlider && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl border border-gray-200 p-8 mb-12"
          >
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-center gap-4 mb-4"
              >
                <span className="text-4xl">{selectedMood.emoji}</span>
                <div className="text-left">
                  <h3 className="text-2xl font-semibold text-gray-900">
                    {selectedMood.name}
                  </h3>
                  <p className="text-gray-600">
                    {selectedMood.description}
                  </p>
                </div>
              </motion.div>
              
              <motion.p 
                className="text-lg text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                How strongly do you want to experience this feeling?
              </motion.p>
            </div>
            
            {/* Cinematic Intensity Slider */}
            <div className="relative mb-8 max-w-md mx-auto">
              <div className="relative">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={moodIntensity}
                  onChange={(e) => {
                    const value = parseInt(e.target.value)
                    setMoodIntensity(value)
                    onMoodSelect(selectedMood, value)
                  }}
                  className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-900/20"
                />
                
                {/* Intensity Visual Feedback */}
                <div 
                  className="absolute top-0 left-0 h-2 bg-gray-900 rounded-full pointer-events-none transition-all duration-300"
                  style={{ width: `${(moodIntensity / 10) * 100}%` }}
                />
              </div>
              
              {/* Intensity Labels */}
              <div className="flex justify-between text-sm text-gray-500 mt-4">
                <span>Subtle</span>
                <motion.span 
                  className="font-semibold text-lg text-gray-900"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 0.2 }}
                  key={moodIntensity}
                >
                  {moodIntensity}/10
                </motion.span>
                <span>Intense</span>
              </div>
              
              {/* Intensity Description */}
              <motion.p 
                className="text-center text-sm text-gray-500 mt-3"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {moodIntensity <= 3 && "A gentle, subtle experience"}
                {moodIntensity > 3 && moodIntensity <= 7 && "A moderate, balanced experience"}
                {moodIntensity > 7 && "An intense, immersive experience"}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modern Find Trips Button */}
      {selectedMood && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="text-center"
        >
          <motion.button 
            onClick={handleFindTrips}
            className="inline-flex items-center px-8 py-4 bg-black text-white text-lg font-medium rounded-full hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Discover My Perfect Trip
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.button>
          
          <motion.p 
            className="text-sm text-gray-500 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            We'll curate experiences that help you feel {selectedMood.name.toLowerCase()} at intensity {moodIntensity}/10
          </motion.p>
        </motion.div>
      )}

      <style jsx>{`
        .cinematic-slider::-webkit-slider-thumb {
          appearance: none;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: hsl(var(--primary));
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          border: 2px solid white;
          transition: all 0.2s ease;
        }
        
        .cinematic-slider::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 16px rgba(0,0,0,0.2);
        }
        
        .cinematic-slider::-moz-range-thumb {
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: hsl(var(--primary));
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          transition: all 0.2s ease;
        }
        
        .cinematic-slider::-moz-range-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 16px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  )
}