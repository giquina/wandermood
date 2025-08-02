'use client'

import { motion } from 'framer-motion'
import { Mood } from '@/types'

interface TripExperience {
  id: string
  title: string
  location: string
  description: string
  imageUrl: string
  estimatedCost: string
  duration: string
  moodTags: string[]
  rating: number
}

interface TripRecommendationsProps {
  selectedMood: Mood
  moodIntensity: number
  onBack: () => void
}

const sampleExperiences: TripExperience[] = [
  {
    id: '1',
    title: 'Zen Garden Retreat in Kyoto',
    location: 'Kyoto, Japan',
    description: 'Find inner peace at ancient temples with guided meditation sessions and traditional tea ceremonies.',
    imageUrl: 'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=400',
    estimatedCost: '$2,400',
    duration: '5 days',
    moodTags: ['calm', 'reflective'],
    rating: 4.8
  },
  {
    id: '2',
    title: 'Alpine Adventure in Swiss Alps',
    location: 'Interlaken, Switzerland',
    description: 'Heart-pumping activities including paragliding, mountain biking, and glacier hiking.',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
    estimatedCost: '$3,200',
    duration: '7 days',
    moodTags: ['adventurous', 'energetic'],
    rating: 4.9
  },
  {
    id: '3',
    title: 'Romantic Escape to Santorini',
    location: 'Santorini, Greece',
    description: 'Sunset dinners, private wine tastings, and intimate villa stays overlooking the Aegean Sea.',
    imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400',
    estimatedCost: '$2,800',
    duration: '6 days',
    moodTags: ['romantic', 'celebrate'],
    rating: 4.7
  },
  {
    id: '4',
    title: 'Art & Culture Immersion in Florence',
    location: 'Florence, Italy',
    description: 'Renaissance art workshops, sculpture classes, and private museum tours with local artists.',
    imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197047d463?w=400',
    estimatedCost: '$2,100',
    duration: '5 days',
    moodTags: ['creative', 'reflective'],
    rating: 4.6
  },
  {
    id: '5',
    title: 'Festival Circuit in Barcelona',
    location: 'Barcelona, Spain',
    description: 'Join local festivals, beach parties, and vibrant nightlife with fellow travelers.',
    imageUrl: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400',
    estimatedCost: '$1,800',
    duration: '4 days',
    moodTags: ['social', 'celebrate'],
    rating: 4.5
  },
  {
    id: '6',
    title: 'Wellness Retreat in Bali',
    location: 'Ubud, Bali',
    description: 'Yoga sessions, spa treatments, and mindfulness workshops in tropical paradise.',
    imageUrl: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=400',
    estimatedCost: '$1,600',
    duration: '8 days',
    moodTags: ['calm', 'reflective'],
    rating: 4.8
  }
]

export default function TripRecommendations({ selectedMood, moodIntensity, onBack }: TripRecommendationsProps) {
  // Filter experiences based on mood and intensity
  const getFilteredExperiences = () => {
    let filtered = sampleExperiences.filter(exp => 
      exp.moodTags.includes(selectedMood.id)
    )
    
    // If no direct matches, show all experiences
    if (filtered.length === 0) {
      filtered = sampleExperiences
    }
    
    // Sort by intensity preference (higher intensity = more adventurous/intense experiences first)
    return filtered.sort((a, b) => {
      if (moodIntensity >= 7) {
        // High intensity - prefer adventurous/energetic
        const aScore = (a.moodTags.includes('adventurous') || a.moodTags.includes('energetic')) ? 1 : 0
        const bScore = (b.moodTags.includes('adventurous') || b.moodTags.includes('energetic')) ? 1 : 0
        return bScore - aScore
      } else if (moodIntensity <= 4) {
        // Low intensity - prefer calm/reflective
        const aScore = (a.moodTags.includes('calm') || a.moodTags.includes('reflective')) ? 1 : 0
        const bScore = (b.moodTags.includes('calm') || b.moodTags.includes('reflective')) ? 1 : 0
        return bScore - aScore
      }
      return b.rating - a.rating // Default: sort by rating
    })
  }

  const filteredExperiences = getFilteredExperiences()

  const handlePlanTrip = (experience: TripExperience) => {
    alert(`🧳 Trip planning for "${experience.title}" coming soon! We'll help you book flights, hotels, and activities.`)
  }

  const showMoreExperiences = () => {
    alert('More amazing experiences coming soon! 🌍✨')
  }

  return (
    <motion.div
      id="resultsSection"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={onBack}
            className="mb-4 inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            ← Back to mood selection
          </button>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Perfect {selectedMood.name} Experiences
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Based on your {selectedMood.name.toLowerCase()} mood with intensity {moodIntensity}/10, 
            here are personalized travel recommendations just for you.
          </p>
        </div>

        {/* Recommendations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredExperiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48">
                <img
                  src={experience.imageUrl}
                  alt={experience.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-sm font-medium">
                    ⭐ {experience.rating}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-gray-800 flex-1">
                    {experience.title}
                  </h3>
                  <span className="text-lg font-bold text-blue-600 ml-2">
                    {experience.estimatedCost}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-3">📍 {experience.location}</p>
                <p className="text-gray-700 mb-4">{experience.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">⏰ {experience.duration}</span>
                  <div className="flex gap-2">
                    {experience.moodTags.slice(0, 2).map(tag => (
                      <span
                        key={tag}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          tag === selectedMood.id 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button
                  onClick={() => handlePlanTrip(experience)}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                >
                  Plan This Trip 🎯
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center">
          <button
            onClick={showMoreExperiences}
            className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300"
          >
            Show More Experiences 🌍
          </button>
        </div>
      </div>
    </motion.div>
  )
}