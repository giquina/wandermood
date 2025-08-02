'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mood } from '@/types'

const moods: Mood[] = [
  {
    id: 'calm',
    name: 'Calm & Peaceful',
    emoji: '🧘‍♀️',
    description: 'Need to recharge and find tranquility',
    color: 'from-blue-400 to-blue-600',
    gradient: 'bg-gradient-to-br from-blue-100 to-blue-200'
  },
  {
    id: 'adventurous',
    name: 'Adventurous',
    emoji: '🏔️',
    description: 'Ready for thrills and exploration',
    color: 'from-orange-400 to-red-500',
    gradient: 'bg-gradient-to-br from-orange-100 to-red-200'
  },
  {
    id: 'romantic',
    name: 'Romantic',
    emoji: '💕',
    description: 'Seeking intimate and beautiful moments',
    color: 'from-pink-400 to-rose-500',
    gradient: 'bg-gradient-to-br from-pink-100 to-rose-200'
  },
  {
    id: 'creative',
    name: 'Creative & Inspired',
    emoji: '🎨',
    description: 'Want to spark imagination and artistry',
    color: 'from-purple-400 to-indigo-500',
    gradient: 'bg-gradient-to-br from-purple-100 to-indigo-200'
  },
  {
    id: 'social',
    name: 'Social & Fun',
    emoji: '🎉',
    description: 'Looking to connect and celebrate',
    color: 'from-yellow-400 to-orange-500',
    gradient: 'bg-gradient-to-br from-yellow-100 to-orange-200'
  },
  {
    id: 'celebrate',
    name: 'Celebratory',
    emoji: '🥳',
    description: 'Ready to party and make memories',
    color: 'from-red-400 to-pink-500',
    gradient: 'bg-gradient-to-br from-red-100 to-pink-200'
  }
]

interface MoodPickerProps {
  onMoodSelect: (mood: Mood, intensity: number) => void;
  onFindTrips: () => void;
  selectedMood?: Mood | null;
}

export default function MoodPicker({ onMoodSelect, onFindTrips, selectedMood }: MoodPickerProps) {
  const [hoveredMood, setHoveredMood] = useState<string | null>(null)
  const [moodIntensity, setMoodIntensity] = useState(5)
  const [showIntensitySlider, setShowIntensitySlider] = useState(false)
  const [clickCount, setClickCount] = useState(0)

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Press 'M' to focus on first mood card
      if (e.key === 'm' || e.key === 'M') {
        e.preventDefault()
        const firstMoodCard = document.querySelector('[data-mood]') as HTMLElement
        firstMoodCard?.focus()
      }
      
      // Press 'F' to trigger find trips
      if ((e.key === 'f' || e.key === 'F') && selectedMood) {
        e.preventDefault()
        handleFindTrips()
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [selectedMood])

  const handleMoodSelection = (mood: Mood) => {
    onMoodSelect(mood, moodIntensity)
    setShowIntensitySlider(true)
  }

  const handleFindTrips = () => {
    if (selectedMood) {
      onFindTrips()
    }
  }

  // Easter egg
  const handleEasterEgg = () => {
    setClickCount(prev => prev + 1)
    if (clickCount >= 4) {
      setClickCount(0)
      alert('🎉 You found the secret! WanderMood loves curious travelers like you!')
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="text-center mb-8">
        <h2 
          className="text-3xl font-bold text-gray-800 mb-3 cursor-pointer floating-animation"
          onClick={handleEasterEgg}
        >
          How are you feeling?
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Your mood helps us find the perfect travel experience that matches your emotional needs
        </p>
        <p className="text-sm text-gray-400 mt-2">
          💡 Keyboard shortcuts: Press 'M' for mood selection, 'F' to find trips
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {moods.map((mood, index) => (
          <motion.div
            key={mood.id}
            data-mood={mood.id}
            tabIndex={0}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`
              relative cursor-pointer rounded-xl p-6 text-center transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300
              ${selectedMood?.id === mood.id 
                ? `bg-gradient-to-br ${mood.color} text-white shadow-lg ring-4 ring-orange-300 transform scale-105` 
                : 'bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300'
              }
            `}
            onClick={() => handleMoodSelection(mood)}
            onKeyPress={(e) => e.key === 'Enter' && handleMoodSelection(mood)}
            onMouseEnter={() => setHoveredMood(mood.id)}
            onMouseLeave={() => setHoveredMood(null)}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className={`text-4xl mb-3 ${selectedMood?.id === mood.id ? 'animate-bounce' : ''}`}>
              {mood.emoji}
            </div>
            <h3 className={`font-semibold text-sm mb-2 ${
              selectedMood?.id === mood.id ? 'text-white' : 'text-gray-800'
            }`}>
              {mood.name}
            </h3>
            <p className={`text-xs ${
              selectedMood?.id === mood.id ? 'text-gray-100' : 'text-gray-600'
            }`}>
              {mood.description}
            </p>
            
            {hoveredMood === mood.id && selectedMood?.id !== mood.id && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-xl"
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Mood Intensity Slider */}
      <AnimatePresence>
        {selectedMood && showIntensitySlider && (
          <motion.div
            id="moodSlider"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 mb-6"
          >
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                <span id="selectedMoodText">{selectedMood.name} mood</span>
              </h3>
              <p className="text-gray-600">How intense is this feeling? (1-10)</p>
            </div>
            
            <div className="relative mb-6">
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
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, rgb(59 130 246) 0%, rgb(59 130 246) ${(moodIntensity / 10) * 100}%, rgb(229 231 235) ${(moodIntensity / 10) * 100}%, rgb(229 231 235) 100%)`
                }}
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>Subtle</span>
                <span className="font-medium text-gray-700">{moodIntensity}/10</span>
                <span>Intense</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Find Trips Button */}
      {selectedMood && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center bg-white rounded-xl p-6 shadow-lg border border-gray-200"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-3xl">{selectedMood.emoji}</span>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                Perfect! You're feeling {selectedMood.name.toLowerCase()}
              </h3>
              <p className="text-gray-600">
                Intensity: {moodIntensity}/10 - We'll find experiences that match your vibe
              </p>
            </div>
          </div>
          
          <button 
            id="findTripsBtn"
            onClick={handleFindTrips}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 pulse-glow"
          >
            Find My Perfect Trip ✨
          </button>
        </motion.div>
      )}

      <style jsx>{`
        .floating-animation {
          transition: transform 0.3s ease;
        }
        .floating-animation:hover {
          transform: translateY(-2px);
        }
        .pulse-glow {
          animation: pulse-glow 2s infinite;
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.4); }
          50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.8); }
        }
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  )
}