'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mood, UKTravelExperience, UKDestination, TransportOption, UKAccommodation } from '@/types'
import { ukDestinations } from '@/data/ukDestinations'
import { ukTransportOptions, getTransportOptions, calculateJourneyCost } from '@/data/ukTransport'
import { ukAccommodations, getAccommodationsByMood, calculateSeasonalPrice } from '@/data/ukAccommodation'
import { getSeasonalRecommendations, getCurrentSeasonalStrength } from '@/data/seasonalMoodMapping'
import { calculateTripCost } from '@/lib/ukPricingAlgorithms'
import Breadcrumbs from './Breadcrumbs'

interface UKTripRecommendationsProps {
  selectedMood: Mood
  moodIntensity: number
  onBack: () => void
}

interface UKTripExperience {
  id: string
  title: string
  destination: UKDestination
  transport: TransportOption[]
  accommodation: UKAccommodation[]
  estimatedCost: string
  duration: string
  moodTags: string[]
  rating: number
  category: string
  highlights: string[]
  seasonalRating: number
  sustainabilityScore: number
  accessibilityScore: number
}

export default function UKTripRecommendations({ selectedMood, moodIntensity, onBack }: UKTripRecommendationsProps) {
  const [savedExperiences, setSavedExperiences] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedExperience, setSelectedExperience] = useState<UKTripExperience | null>(null)
  const [tripExperiences, setTripExperiences] = useState<UKTripExperience[]>([])
  const [loading, setLoading] = useState(true)

  // Get current season for recommendations
  const getCurrentSeason = (): 'spring' | 'summer' | 'autumn' | 'winter' => {
    const month = new Date().getMonth()
    if (month >= 2 && month <= 4) return 'spring'
    if (month >= 5 && month <= 7) return 'summer'
    if (month >= 8 && month <= 10) return 'autumn'
    return 'winter'
  }

  const currentSeason = getCurrentSeason()

  // Generate UK trip experiences based on mood and intensity
  useEffect(() => {
    const generateTripExperiences = async () => {
      setLoading(true)
      
      // Filter destinations by mood
      const relevantDestinations = ukDestinations.filter(destination =>
        destination.moodMapping.primary.includes(selectedMood.id) ||
        destination.moodMapping.secondary.includes(selectedMood.id)
      )

      // Get seasonal recommendations
      const seasonalRecommendations = getSeasonalRecommendations(selectedMood.id, currentSeason)

      // Sort destinations by mood intensity preference and seasonal rating
      const sortedDestinations = relevantDestinations.sort((a, b) => {
        const aSeasonalMatch = seasonalRecommendations.find(r => r.destinationId === a.id)
        const bSeasonalMatch = seasonalRecommendations.find(r => r.destinationId === b.id)
        
        const aScore = (aSeasonalMatch ? 1.2 : 1.0) * 
                      (a.moodMapping.primary.includes(selectedMood.id) ? 1.5 : 1.0) *
                      getCurrentSeasonalStrength(selectedMood.id)
        
        const bScore = (bSeasonalMatch ? 1.2 : 1.0) * 
                      (b.moodMapping.primary.includes(selectedMood.id) ? 1.5 : 1.0) *
                      getCurrentSeasonalStrength(selectedMood.id)
        
        return bScore - aScore
      })

      // Create trip experiences
      const experiences: UKTripExperience[] = []
      
      for (const destination of sortedDestinations.slice(0, 12)) {
        // Get transport options to destination
        const transportOptions = getTransportOptions('London', destination.name)
        
        // Get accommodation options
        const accommodationOptions = getAccommodationsByMood(selectedMood.id)
          .filter(acc => acc.location.toLowerCase().includes(destination.county.toLowerCase()))
        
        if (accommodationOptions.length === 0) {
          // Add generic accommodation if none found
          accommodationOptions.push(...ukAccommodations.slice(0, 1))
        }

        // Calculate trip cost
        const duration = moodIntensity >= 7 ? 5 : moodIntensity >= 4 ? 3 : 2
        const tripCost = calculateTripCost(
          destination,
          transportOptions.slice(0, 1),
          accommodationOptions.slice(0, 1),
          duration,
          1, // single traveler for base calculation
          moodIntensity >= 8 ? 'luxury' : moodIntensity >= 6 ? 'premium' : moodIntensity >= 4 ? 'moderate' : 'budget',
          selectedMood.id,
          currentSeason
        )

        // Get seasonal rating
        const seasonalMatch = seasonalRecommendations.find(r => r.destinationId === destination.id)
        const seasonalRating = destination.whenToVisit.find(w => w.season === currentSeason)?.rating || 3

        const experience: UKTripExperience = {
          id: `uk-${destination.id}`,
          title: `${selectedMood.name} Experience in ${destination.name}`,
          destination,
          transport: transportOptions.slice(0, 2),
          accommodation: accommodationOptions.slice(0, 2),
          estimatedCost: `£${tripCost.total.min}-${tripCost.total.max}`,
          duration: `${duration} days`,
          moodTags: destination.moodMapping.primary.concat(destination.moodMapping.secondary),
          rating: 4.2 + (Math.random() * 0.6), // Simulated rating
          category: getCategoryFromDestination(destination),
          highlights: destination.highlights.slice(0, 3),
          seasonalRating,
          sustainabilityScore: calculateSustainabilityScore(transportOptions),
          accessibilityScore: calculateAccessibilityScore(destination, accommodationOptions)
        }

        experiences.push(experience)
      }

      setTripExperiences(experiences)
      setLoading(false)
    }

    generateTripExperiences()
  }, [selectedMood, moodIntensity, currentSeason])

  // Helper functions
  const getCategoryFromDestination = (destination: UKDestination): string => {
    const typeMap: Record<string, string> = {
      'city': 'Urban Experience',
      'town': 'Cultural Town',
      'village': 'Village Charm',
      'nationalpark': 'Nature Adventure',
      'coastline': 'Coastal Experience',
      'countryside': 'Rural Retreat',
      'heritage': 'Historic Journey'
    }
    return typeMap[destination.type] || 'UK Experience'
  }

  const calculateSustainabilityScore = (transport: TransportOption[]): number => {
    if (transport.length === 0) return 5
    const avgCarbon = transport.reduce((sum, t) => sum + t.carbonFootprint, 0) / transport.length
    return Math.max(1, 10 - (avgCarbon / 20)) // Scale from 1-10
  }

  const calculateAccessibilityScore = (destination: UKDestination, accommodation: UKAccommodation[]): number => {
    let score = 0
    
    // Destination accessibility
    if (destination.accessibility.wheelchairAccessible) score += 3
    if (destination.accessibility.hearingLoop) score += 2
    if (destination.accessibility.visualAids) score += 2
    if (destination.accessibility.mobilitySupport) score += 3
    
    // Accommodation accessibility (if available)
    if (accommodation.length > 0) {
      const acc = accommodation[0]
      if (acc.accessibility.wheelchairAccessible) score += 3
      if (acc.accessibility.mobilitySupport) score += 2
    }
    
    return Math.min(10, score)
  }

  // Filter experiences based on category
  const getFilteredExperiences = () => {
    let filtered = tripExperiences

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(exp => 
        exp.category.toLowerCase().includes(selectedCategory) ||
        exp.destination.type.includes(selectedCategory)
      )
    }
    
    // Sort by mood intensity preference
    return filtered.sort((a, b) => {
      if (moodIntensity >= 7) {
        // High intensity: prefer adventure, luxury, celebratory
        const aScore = (a.moodTags.includes('adventurous') || a.moodTags.includes('luxury') || a.moodTags.includes('celebratory')) ? 1 : 0
        const bScore = (b.moodTags.includes('adventurous') || b.moodTags.includes('luxury') || b.moodTags.includes('celebratory')) ? 1 : 0
        return bScore - aScore
      } else if (moodIntensity <= 4) {
        // Low intensity: prefer calm, reflective
        const aScore = (a.moodTags.includes('calm') || a.moodTags.includes('reflective')) ? 1 : 0
        const bScore = (b.moodTags.includes('calm') || b.moodTags.includes('reflective')) ? 1 : 0
        return bScore - aScore
      }
      // Medium intensity: sort by seasonal rating and overall rating
      return (b.seasonalRating * b.rating) - (a.seasonalRating * a.rating)
    })
  }

  const filteredExperiences = getFilteredExperiences()
  const categories = ['all', 'nature', 'cultural', 'urban', 'coastal', 'heritage', 'luxury']

  const handleSave = (experienceId: string) => {
    setSavedExperiences(prev => 
      prev.includes(experienceId) 
        ? prev.filter(id => id !== experienceId)
        : [...prev, experienceId]
    )
  }

  const handlePlanTrip = (experience: UKTripExperience) => {
    setSelectedExperience(experience)
  }

  if (loading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Curating perfect UK experiences for your {selectedMood.name.toLowerCase()} mood...</p>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen gradient-bg relative overflow-hidden"
    >
      {/* Background Elements */}
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
              { label: `UK ${selectedMood.name} Experiences` }
            ]}
          />
        </motion.div>

        {/* Header */}
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
                  UK {selectedMood.name} Adventures
                </h1>
                <p className="text-xl text-muted-foreground cinematic-body">
                  Curated for your mood intensity: {moodIntensity}/10 • {currentSeason} season
                </p>
              </div>
            </div>
            
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto cinematic-body leading-relaxed">
              Discover authentic British experiences perfectly matched to your {selectedMood.name.toLowerCase()} mood. 
              Each recommendation includes realistic transport options, local accommodation, and seasonal considerations.
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

        {/* UK Experiences Grid */}
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
                    src={experience.destination.imageGallery[0] || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4'}
                    alt={experience.title}
                    className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  
                  {/* Overlay */}
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

                  {/* Badges */}
                  <div className="absolute top-4 left-4 space-y-2">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-foreground">
                      ⭐ {experience.rating.toFixed(1)}
                    </span>
                    <div className="bg-primary/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-primary-foreground">
                      {experience.category}
                    </div>
                  </div>

                  {/* Seasonal Rating */}
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-green-500/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-white">
                      {currentSeason} ⭐{experience.seasonalRating}/5
                    </span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-heading font-bold text-foreground cinematic-subheading flex-1">
                      {experience.destination.name}
                    </h3>
                    <span className="text-lg font-bold text-primary ml-3">
                      {experience.estimatedCost}
                    </span>
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-3 flex items-center gap-2">
                    <span>📍</span> {experience.destination.county}, {experience.destination.region}
                  </p>
                  
                  <p className="text-foreground/80 mb-4 cinematic-body leading-relaxed">
                    {experience.destination.description.slice(0, 120)}...
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

                  {/* Transport Options */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold mb-2">Transport Options:</h4>
                    <div className="space-y-1">
                      {experience.transport.slice(0, 2).map((transport, i) => (
                        <div key={i} className="text-xs text-muted-foreground flex justify-between">
                          <span>{transport.provider} ({transport.type})</span>
                          <span>£{transport.cost.min}-{transport.cost.max}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Scores */}
                  <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
                    <div className="text-center">
                      <div className="font-semibold">Sustainability</div>
                      <div className="text-green-600">{experience.sustainabilityScore.toFixed(1)}/10</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold">Accessibility</div>
                      <div className="text-blue-600">{experience.accessibilityScore.toFixed(1)}/10</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold">Duration</div>
                      <div className="text-purple-600">{experience.duration}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
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
                    Plan This UK Journey ✨
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
            Discover More UK Experiences 🇬🇧
          </motion.button>
          
          <p className="text-muted-foreground mt-4 cinematic-body">
            {savedExperiences.length > 0 && `${savedExperiences.length} UK experiences saved to your wishlist`}
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
              className="cinematic-card max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedExperience.destination.imageGallery[0]}
                  alt={selectedExperience.destination.name}
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
                  {selectedExperience.destination.name}
                </h2>
                <p className="text-lg text-muted-foreground mb-6 cinematic-body">
                  {selectedExperience.destination.description}
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h3 className="font-heading font-semibold mb-3">Experience Highlights</h3>
                    <ul className="space-y-2">
                      {selectedExperience.destination.highlights.map((highlight, i) => (
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
                      <p><strong>Location:</strong> {selectedExperience.destination.county}, {selectedExperience.destination.region}</p>
                      <p><strong>Estimated Cost:</strong> {selectedExperience.estimatedCost}</p>
                      <p><strong>Best Season:</strong> {currentSeason} (⭐{selectedExperience.seasonalRating}/5)</p>
                      <p><strong>Sustainability Score:</strong> {selectedExperience.sustainabilityScore.toFixed(1)}/10</p>
                      <p><strong>Accessibility Score:</strong> {selectedExperience.accessibilityScore.toFixed(1)}/10</p>
                    </div>
                  </div>
                </div>

                {/* Transport Options */}
                <div className="mb-6">
                  <h3 className="font-heading font-semibold mb-3">Transport Options</h3>
                  <div className="grid gap-3">
                    {selectedExperience.transport.map((transport, i) => (
                      <div key={i} className="p-3 bg-secondary/20 rounded-lg flex justify-between items-center">
                        <div>
                          <span className="font-medium">{transport.provider}</span>
                          <span className="text-sm text-muted-foreground ml-2">({transport.type})</span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">£{transport.cost.min}-{transport.cost.max}</div>
                          <div className="text-sm text-muted-foreground">{transport.duration}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Accommodation Options */}
                <div className="mb-8">
                  <h3 className="font-heading font-semibold mb-3">Accommodation Options</h3>
                  <div className="grid gap-3">
                    {selectedExperience.accommodation.map((acc, i) => (
                      <div key={i} className="p-3 bg-secondary/20 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium">{acc.name}</span>
                          <span className="font-bold">£{acc.priceRange.min}-{acc.priceRange.max}/night</span>
                        </div>
                        <div className="text-sm text-muted-foreground">{acc.type} • ⭐{acc.guestRating.toFixed(1)}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <motion.button
                  className="w-full cinematic-button bg-primary text-primary-foreground py-4 text-lg font-heading font-bold"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    alert(`🧳 Detailed trip planning for "${selectedExperience.destination.name}" coming soon! This will include booking links for transport and accommodation.`)
                    setSelectedExperience(null)
                  }}
                >
                  Start Planning This UK Adventure ✨
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}