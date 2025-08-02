'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
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
    id: 'reflective',
    name: 'Reflective',
    emoji: '🌅',
    description: 'Time for introspection and growth',
    color: 'from-teal-400 to-cyan-500',
    gradient: 'bg-gradient-to-br from-teal-100 to-cyan-200'
  },
  {
    id: 'energetic',
    name: 'Energetic & Active',
    emoji: '⚡',
    description: 'Want high-energy experiences',
    color: 'from-green-400 to-emerald-500',
    gradient: 'bg-gradient-to-br from-green-100 to-emerald-200'
  },
  {
    id: 'curious',
    name: 'Curious & Learning',
    emoji: '🤔',
    description: 'Eager to discover and understand',
    color: 'from-amber-400 to-yellow-500',
    gradient: 'bg-gradient-to-br from-amber-100 to-yellow-200'
  }
]

interface MoodPickerProps {
  onMoodSelect: (mood: Mood) => void;
  selectedMood?: Mood | null;
}

export default function MoodPicker({ onMoodSelect, selectedMood }: MoodPickerProps) {
  const [hoveredMood, setHoveredMood] = useState<string | null>(null)

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          How are you feeling?
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Your mood helps us find the perfect travel experience that matches your emotional needs
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {moods.map((mood, index) => (
          <motion.div
            key={mood.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`
              relative cursor-pointer rounded-xl p-6 text-center transition-all duration-300
              ${selectedMood?.id === mood.id 
                ? `bg-gradient-to-br ${mood.color} text-white shadow-lg scale-105` 
                : 'bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300'
              }
            `}
            onClick={() => onMoodSelect(mood)}
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
                We'll find experiences that match your vibe
              </p>
            </div>
          </div>
          
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
            Find My Perfect Trip ✨
          </button>
        </motion.div>
      )}
    </div>
  )
}