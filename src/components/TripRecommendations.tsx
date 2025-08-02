'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mood } from '@/types'
import Breadcrumbs from './Breadcrumbs'

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
  category: string
  highlights: string[]
}

interface TripRecommendationsProps {
  selectedMood: Mood
  moodIntensity: number
  onBack: () => void
}

// Expanded cinematic travel experiences
const sampleExperiences: TripExperience[] = [
  // Calm & Peaceful Experiences
  {
    id: '1',
    title: 'Zen Garden Retreat in Kyoto',
    location: 'Kyoto, Japan',
    description: 'Find inner peace at ancient temples with guided meditation sessions and traditional tea ceremonies.',
    imageUrl: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80',
    estimatedCost: '£2,400',
    duration: '5 days',
    moodTags: ['calm', 'reflective'],
    rating: 4.8,
    category: 'Spiritual Retreat',
    highlights: ['Temple meditation', 'Tea ceremonies', 'Garden walks']
  },
  {
    id: '2',
    title: 'Maldives Overwater Sanctuary',
    location: 'Maldives',
    description: 'Ultimate relaxation in crystal-clear waters with spa treatments and sunset yoga.',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
    estimatedCost: '£4,200',
    duration: '7 days',
    moodTags: ['calm', 'luxury'],
    rating: 4.9,
    category: 'Beach Retreat',
    highlights: ['Overwater villa', 'Spa treatments', 'Sunset yoga']
  },
  
  // Adventure Experiences
  {
    id: '3',
    title: 'Alpine Adventure in Swiss Alps',
    location: 'Interlaken, Switzerland',
    description: 'Heart-pumping activities including paragliding, mountain biking, and glacier hiking.',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    estimatedCost: '£3,200',
    duration: '7 days',
    moodTags: ['adventurous'],
    rating: 4.9,
    category: 'Mountain Adventure',
    highlights: ['Paragliding', 'Glacier hiking', 'Mountain biking']
  },
  {
    id: '4',
    title: 'Iceland Northern Lights Quest',
    location: 'Reykjavik, Iceland',
    description: 'Chase the aurora borealis while exploring ice caves and geothermal hot springs.',
    imageUrl: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80',
    estimatedCost: '£2,800',
    duration: '6 days',
    moodTags: ['adventurous', 'creative'],
    rating: 4.7,
    category: 'Natural Phenomenon',
    highlights: ['Northern lights', 'Ice caves', 'Hot springs']
  },

  // Romantic Experiences
  {
    id: '5',
    title: 'Romantic Escape to Santorini',
    location: 'Santorini, Greece',
    description: 'Sunset dinners, private wine tastings, and intimate villa stays overlooking the Aegean Sea.',
    imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80',
    estimatedCost: '£2,800',
    duration: '6 days',
    moodTags: ['romantic', 'celebrate'],
    rating: 4.7,
    category: 'Romantic Getaway',
    highlights: ['Sunset dinners', 'Wine tasting', 'Private villa']
  },
  {
    id: '6',
    title: 'Paris City of Love Experience',
    location: 'Paris, France',
    description: 'Seine river cruises, private museum tours, and candlelit dinners in hidden bistros.',
    imageUrl: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&q=80',
    estimatedCost: '£3,400',
    duration: '5 days',
    moodTags: ['romantic', 'creative'],
    rating: 4.8,
    category: 'City Romance',
    highlights: ['Seine cruise', 'Louvre private tour', 'Hidden bistros']
  },

  // Creative & Inspired
  {
    id: '7',
    title: 'Art & Culture Immersion in Florence',
    location: 'Florence, Italy',
    description: 'Renaissance art workshops, sculpture classes, and private museum tours with local artists.',
    imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197047d463?w=800&q=80',
    estimatedCost: '£2,100',
    duration: '5 days',
    moodTags: ['creative', 'reflective'],
    rating: 4.6,
    category: 'Art Immersion',
    highlights: ['Art workshops', 'Sculpture classes', 'Private tours']
  },
  {
    id: '8',
    title: 'Morocco Creative Journey',
    location: 'Marrakech, Morocco',
    description: 'Photography workshops, traditional craft sessions, and colorful market explorations.',
    imageUrl: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73a0e?w=800&q=80',
    estimatedCost: '£1,900',
    duration: '6 days',
    moodTags: ['creative', 'social'],
    rating: 4.5,
    category: 'Cultural Discovery',
    highlights: ['Photography tours', 'Craft workshops', 'Market exploration']
  },

  // Social & Fun
  {
    id: '9',
    title: 'Festival Circuit in Barcelona',
    location: 'Barcelona, Spain',
    description: 'Join local festivals, beach parties, and vibrant nightlife with fellow travelers.',
    imageUrl: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80',
    estimatedCost: '£1,800',
    duration: '4 days',
    moodTags: ['social', 'celebrate'],
    rating: 4.5,
    category: 'Festival Experience',
    highlights: ['Local festivals', 'Beach parties', 'Nightlife tours']
  },
  {
    id: '10',
    title: 'Rio Carnival Celebration',
    location: 'Rio de Janeiro, Brazil',
    description: 'Experience the world\'s biggest party with samba lessons and street celebrations.',
    imageUrl: 'https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?w=800&q=80',
    estimatedCost: '£2,200',
    duration: '5 days',
    moodTags: ['social', 'celebrate'],
    rating: 4.8,
    category: 'Cultural Celebration',
    highlights: ['Carnival parades', 'Samba lessons', 'Street parties']
  },

  // Luxury & Pampered
  {
    id: '11',
    title: 'Dubai Luxury Desert Experience',
    location: 'Dubai, UAE',
    description: 'Five-star desert camps, private helicopter tours, and exclusive shopping experiences.',
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
    estimatedCost: '£4,800',
    duration: '5 days',
    moodTags: ['luxury', 'celebrate'],
    rating: 4.9,
    category: 'Luxury Experience',
    highlights: ['Desert camps', 'Helicopter tours', 'Exclusive shopping']
  },
  {
    id: '12',
    title: 'Swiss Spa Mountain Retreat',
    location: 'St. Moritz, Switzerland',
    description: 'World-class spa treatments with alpine views and gourmet dining experiences.',
    imageUrl: 'https://images.unsplash.com/photo-1544737151-6e4b2a8cf734?w=800&q=80',
    estimatedCost: '£5,200',
    duration: '4 days',
    moodTags: ['luxury', 'calm'],
    rating: 4.8,
    category: 'Mountain Spa',
    highlights: ['Alpine spa', 'Gourmet dining', 'Mountain views']
  }
]

export default function TripRecommendations({ selectedMood, moodIntensity, onBack }: TripRecommendationsProps) {
  const [savedExperiences, setSavedExperiences] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedExperience, setSelectedExperience] = useState<TripExperience | null>(null)

  // Filter experiences based on mood and intensity
  const getFilteredExperiences = () => {
    let filtered = sampleExperiences.filter(exp => 
      exp.moodTags.includes(selectedMood.id)
    )
    
    // If no direct matches, show complementary experiences
    if (filtered.length === 0) {
      filtered = sampleExperiences.slice(0, 6)
    }

    // Filter by category if selected
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(exp => exp.category.toLowerCase().includes(selectedCategory))
    }
    
    // Sort by intensity preference
    return filtered.sort((a, b) => {
      if (moodIntensity >= 7) {
        const aScore = (a.moodTags.includes('adventurous') || a.moodTags.includes('social')) ? 1 : 0
        const bScore = (b.moodTags.includes('adventurous') || b.moodTags.includes('social')) ? 1 : 0
        return bScore - aScore
      } else if (moodIntensity <= 4) {
        const aScore = (a.moodTags.includes('calm') || a.moodTags.includes('reflective')) ? 1 : 0
        const bScore = (b.moodTags.includes('calm') || b.moodTags.includes('reflective')) ? 1 : 0
        return bScore - aScore
      }
      return b.rating - a.rating
    })
  }

  const filteredExperiences = getFilteredExperiences()
  const categories = ['all', 'adventure', 'retreat', 'culture', 'luxury', 'romance']

  const handleSave = (experienceId: string) => {
    setSavedExperiences(prev => 
      prev.includes(experienceId) 
        ? prev.filter(id => id !== experienceId)
        : [...prev, experienceId]
    )
  }

  const handlePlanTrip = (experience: TripExperience) => {
    setSelectedExperience(experience)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen gradient-bg relative overflow-hidden"
    >
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-mood-calm-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-mood-romantic-primary/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-mood-creative-primary/20 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Breadcrumbs */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Breadcrumbs
            items={[
              { label: 'Home', onClick: onBack },
              { label: 'Mood Selection', onClick: onBack },
              { label: `${selectedMood.name} Experiences` }
            ]}
          />
        </motion.div>

        {/* Cinematic Header */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.button
            onClick={onBack}
            className="mb-8 cinematic-button px-6 py-3 bg-white/80 text-foreground backdrop-blur-md border border-white/20 hover:bg-white/90"
            whileHover={{ scale: 1.05, x: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center gap-2">
              ← Back to mood selection
            </span>
          </motion.button>
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="text-6xl">{selectedMood.emoji}</span>
              <div className="text-left">
                <h1 className="text-4xl md:text-5xl font-heading font-bold cinematic-heading">
                  {selectedMood.name} Adventures
                </h1>
                <p className="text-xl text-muted-foreground cinematic-body">
                  Curated for your mood intensity: {moodIntensity}/10
                </p>
              </div>
            </div>
            
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto cinematic-body leading-relaxed">
              Discover travel experiences that perfectly match your {selectedMood.name.toLowerCase()} mood. 
              Each recommendation is tailored to your emotional state and intensity level.
            </p>
          </motion.div>

          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3 mb-8"
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`
                  cinematic-button px-6 py-2 text-sm font-medium rounded-full transition-all duration-300
                  ${selectedCategory === category 
                    ? 'bg-primary text-primary-foreground shadow-cinematic-md' 
                    : 'bg-white/60 text-foreground hover:bg-white/80'
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Pinterest-Style Masonry Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
        >
          {filteredExperiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
              className="break-inside-avoid mb-6"
            >
              <motion.div
                className="cinematic-card overflow-hidden cursor-pointer group relative"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                onClick={() => handlePlanTrip(experience)}
              >
                {/* Image Container */}
                <div className="relative overflow-hidden">
                  <motion.img
                    src={experience.imageUrl}
                    alt={experience.title}
                    className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  
                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Save Button */}
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleSave(experience.id)
                    }}
                    className={`
                      absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300
                      ${savedExperiences.includes(experience.id) 
                        ? 'bg-red-500 text-white' 
                        : 'bg-white/80 text-foreground hover:bg-white'
                      }
                    `}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {savedExperiences.includes(experience.id) ? '❤️' : '🤍'}
                  </motion.button>

                  {/* Rating Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-foreground">
                      ⭐ {experience.rating}
                    </span>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-primary/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-primary-foreground">
                      {experience.category}
                    </span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-heading font-bold text-foreground cinematic-subheading flex-1">
                      {experience.title}
                    </h3>
                    <span className="text-lg font-bold text-primary ml-3">
                      {experience.estimatedCost}
                    </span>
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-3 flex items-center gap-2">
                    <span>📍</span> {experience.location}
                  </p>
                  
                  <p className="text-foreground/80 mb-4 cinematic-body leading-relaxed">
                    {experience.description}
                  </p>
                  
                  {/* Highlights */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {experience.highlights.slice(0, 3).map((highlight, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-secondary/50 text-muted-foreground text-xs rounded-md"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <span>⏰</span> {experience.duration}
                    </span>
                    <div className="flex gap-2">
                      {experience.moodTags.slice(0, 2).map(tag => (
                        <span
                          key={tag}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            tag === selectedMood.id 
                              ? 'bg-primary/20 text-primary' 
                              : 'bg-secondary/50 text-muted-foreground'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <motion.button
                    className="w-full cinematic-button bg-primary text-primary-foreground py-3 font-heading font-semibold"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      handlePlanTrip(experience)
                    }}
                  >
                    Plan This Journey ✨
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-center mt-16"
        >
          <motion.button
            className="cinematic-button px-12 py-4 bg-white/80 text-foreground backdrop-blur-md border border-white/20 hover:bg-white/90 font-heading font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Discover More Experiences 🌍
          </motion.button>
          
          <p className="text-muted-foreground mt-4 cinematic-body">
            {savedExperiences.length > 0 && `${savedExperiences.length} experiences saved to your wishlist`}
          </p>
        </motion.div>
      </div>

      {/* Experience Detail Modal */}
      <AnimatePresence>
        {selectedExperience && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedExperience(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="cinematic-card max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedExperience.imageUrl}
                  alt={selectedExperience.title}
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={() => setSelectedExperience(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <div className="p-8">
                <h2 className="text-3xl font-heading font-bold mb-4 cinematic-heading">
                  {selectedExperience.title}
                </h2>
                <p className="text-lg text-muted-foreground mb-6 cinematic-body">
                  {selectedExperience.description}
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h3 className="font-heading font-semibold mb-3">Experience Highlights</h3>
                    <ul className="space-y-2">
                      {selectedExperience.highlights.map((highlight, i) => (
                        <li key={i} className="text-muted-foreground flex items-center gap-2">
                          <span className="w-2 h-2 bg-primary rounded-full"></span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-heading font-semibold mb-3">Trip Details</h3>
                    <div className="space-y-2 text-muted-foreground">
                      <p><strong>Duration:</strong> {selectedExperience.duration}</p>
                      <p><strong>Location:</strong> {selectedExperience.location}</p>
                      <p><strong>Estimated Cost:</strong> {selectedExperience.estimatedCost}</p>
                      <p><strong>Rating:</strong> ⭐ {selectedExperience.rating}/5</p>
                    </div>
                  </div>
                </div>
                
                <motion.button
                  className="w-full cinematic-button bg-primary text-primary-foreground py-4 text-lg font-heading font-bold"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    alert(`🧳 Trip planning for "${selectedExperience.title}" coming soon! We'll help you book flights, hotels, and activities.`)
                    setSelectedExperience(null)
                  }}
                >
                  Start Planning This Adventure ✨
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}