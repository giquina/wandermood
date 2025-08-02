'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SearchBar from './SearchBar'

interface Destination {
  id: string
  name: string
  country: string
  image: string
  moods: string[]
  description: string
  priceRange: string
  duration: string
  rating: number
  experiences: number
  featured?: boolean
}

export default function DestinationsGallery() {
  const [selectedMood, setSelectedMood] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null)

  const moodFilters = [
    { id: 'all', name: 'All Destinations', color: 'bg-gray-900' },
    { id: 'calm', name: 'Calm & Peaceful', color: 'bg-blue-500' },
    { id: 'adventurous', name: 'Adventurous', color: 'bg-orange-500' },
    { id: 'romantic', name: 'Romantic', color: 'bg-pink-500' },
    { id: 'creative', name: 'Creative', color: 'bg-purple-500' },
    { id: 'social', name: 'Social & Fun', color: 'bg-yellow-500' },
    { id: 'luxury', name: 'Luxurious', color: 'bg-amber-600' },
    { id: 'reflective', name: 'Reflective', color: 'bg-green-500' }
  ]

  const destinations: Destination[] = [
    {
      id: '1',
      name: 'Bali',
      country: 'Indonesia',
      image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=600&h=400&fit=crop',
      moods: ['calm', 'creative', 'reflective'],
      description: 'Ancient temples, peaceful rice terraces, and spiritual wellness retreats',
      priceRange: '£1,200 - £2,800',
      duration: '5-7 days',
      rating: 4.8,
      experiences: 24,
      featured: true
    },
    {
      id: '2',
      name: 'Swiss Alps',
      country: 'Switzerland',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
      moods: ['adventurous', 'calm', 'luxury'],
      description: 'Mountain adventures, luxury spas, and breathtaking alpine views',
      priceRange: '£2,500 - £5,200',
      duration: '4-8 days',
      rating: 4.9,
      experiences: 18,
      featured: true
    },
    {
      id: '3',
      name: 'Santorini',
      country: 'Greece',
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&h=400&fit=crop',
      moods: ['romantic', 'calm', 'luxury'],
      description: 'Stunning sunsets, intimate dining, and charming whitewashed villages',
      priceRange: '£1,800 - £3,400',
      duration: '4-6 days',
      rating: 4.7,
      experiences: 16,
      featured: true
    },
    {
      id: '4',
      name: 'Tokyo',
      country: 'Japan',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=400&fit=crop',
      moods: ['creative', 'social', 'adventurous'],
      description: 'Cultural immersion, vibrant nightlife, and innovative experiences',
      priceRange: '£1,500 - £3,200',
      duration: '5-8 days',
      rating: 4.6,
      experiences: 32
    },
    {
      id: '5',
      name: 'Iceland',
      country: 'Iceland',
      image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&h=400&fit=crop',
      moods: ['adventurous', 'reflective', 'creative'],
      description: 'Northern lights, dramatic landscapes, and natural hot springs',
      priceRange: '£2,200 - £4,500',
      duration: '6-10 days',
      rating: 4.8,
      experiences: 14
    },
    {
      id: '6',
      name: 'Marrakech',
      country: 'Morocco',
      image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73a0e?w=600&h=400&fit=crop',
      moods: ['creative', 'social', 'adventurous'],
      description: 'Vibrant markets, cultural workshops, and desert adventures',
      priceRange: '£900 - £2,100',
      duration: '4-7 days',
      rating: 4.5,
      experiences: 22
    },
    {
      id: '7',
      name: 'Maldives',
      country: 'Maldives',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop',
      moods: ['calm', 'romantic', 'luxury'],
      description: 'Overwater villas, pristine beaches, and ultimate relaxation',
      priceRange: '£3,500 - £8,000',
      duration: '5-9 days',
      rating: 4.9,
      experiences: 12
    },
    {
      id: '8',
      name: 'Rio de Janeiro',
      country: 'Brazil',
      image: 'https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?w=600&h=400&fit=crop',
      moods: ['social', 'adventurous', 'creative'],
      description: 'Carnival energy, beach culture, and vibrant street art',
      priceRange: '£1,200 - £2,800',
      duration: '4-7 days',
      rating: 4.4,
      experiences: 28
    }
  ]

  const filteredDestinations = destinations.filter(destination => {
    const matchesMood = selectedMood === 'all' || destination.moods.includes(selectedMood)
    const matchesSearch = searchQuery === '' || 
      destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destination.country.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesMood && matchesSearch
  })

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  return (
    <section id="destinations" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Explore Destinations by Mood
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Discover destinations that match your emotional goals. Filter by the feeling you want to experience.
          </motion.p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <SearchBar onSearch={handleSearch} placeholder="Search destinations..." />
          </div>
        </div>

        {/* Mood Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {moodFilters.map((mood) => (
            <button
              key={mood.id}
              onClick={() => setSelectedMood(mood.id)}
              className={`inline-flex items-center px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedMood === mood.id
                  ? 'bg-gray-900 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <div className={`w-2 h-2 ${mood.color} rounded-full mr-2`} />
              {mood.name}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="text-center mb-8">
          <p className="text-gray-500">
            {filteredDestinations.length} destination{filteredDestinations.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Destinations Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          layout
        >
          <AnimatePresence>
            {filteredDestinations.map((destination) => (
              <motion.div
                key={destination.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group cursor-pointer"
                onClick={() => setSelectedDestination(destination)}
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Featured Badge */}
                    {destination.featured && (
                      <div className="absolute top-3 left-3">
                        <span className="bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-medium">
                          Featured
                        </span>
                      </div>
                    )}

                    {/* Rating */}
                    <div className="absolute top-3 right-3">
                      <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center space-x-1">
                        <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                        <span className="text-xs font-medium text-gray-900">{destination.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{destination.name}</h3>
                      <span className="text-sm text-gray-500">{destination.country}</span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {destination.description}
                    </p>

                    {/* Mood Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {destination.moods.slice(0, 3).map((mood) => {
                        const moodFilter = moodFilters.find(f => f.id === mood)
                        return (
                          <span
                            key={mood}
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              selectedMood === mood 
                                ? 'bg-gray-900 text-white' 
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            <div className={`w-1.5 h-1.5 ${moodFilter?.color} rounded-full mr-1`} />
                            {moodFilter?.name.split(' ')[0]}
                          </span>
                        )
                      })}
                    </div>

                    {/* Meta Info */}
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>{destination.duration}</span>
                      <span>{destination.experiences} experiences</span>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-900">{destination.priceRange}</span>
                        <button className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                          View Details →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredDestinations.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🌍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No destinations found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
            <button
              onClick={() => {
                setSelectedMood('all')
                setSearchQuery('')
              }}
              className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Destination Detail Modal */}
      <AnimatePresence>
        {selectedDestination && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedDestination(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedDestination.image}
                  alt={selectedDestination.name}
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={() => setSelectedDestination(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">{selectedDestination.name}</h2>
                    <p className="text-lg text-gray-600">{selectedDestination.country}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 mb-1">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                      <span className="font-semibold">{selectedDestination.rating}</span>
                    </div>
                    <p className="text-sm text-gray-500">{selectedDestination.experiences} experiences</p>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {selectedDestination.description}
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h3 className="font-semibold mb-3">Trip Details</h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>Duration:</strong> {selectedDestination.duration}</p>
                      <p><strong>Price Range:</strong> {selectedDestination.priceRange}</p>
                      <p><strong>Best For:</strong> {selectedDestination.moods.map(mood => 
                        moodFilters.find(f => f.id === mood)?.name
                      ).join(', ')}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3">What You'll Feel</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedDestination.moods.map((mood) => {
                        const moodFilter = moodFilters.find(f => f.id === mood)
                        return (
                          <span
                            key={mood}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700"
                          >
                            <div className={`w-2 h-2 ${moodFilter?.color} rounded-full mr-2`} />
                            {moodFilter?.name}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                </div>
                
                <button className="w-full bg-gray-900 text-white py-4 rounded-full font-semibold hover:bg-gray-800 transition-colors">
                  Start Planning This Journey
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}