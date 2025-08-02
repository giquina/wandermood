'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface UKDestination {
  id: string
  name: string
  region: string
  image: string
  moods: string[]
  description: string
  priceRange: string
  duration: string
  highlights: string[]
  featured?: boolean
}

export default function UKDestinations() {
  const [selectedMood, setSelectedMood] = useState<string>('all')

  const moodFilters = [
    { id: 'all', name: 'All', color: 'bg-gray-900' },
    { id: 'calm', name: 'Peaceful', color: 'bg-blue-500' },
    { id: 'adventurous', name: 'Adventurous', color: 'bg-orange-500' },
    { id: 'romantic', name: 'Romantic', color: 'bg-pink-500' },
    { id: 'cultural', name: 'Cultural', color: 'bg-purple-500' },
    { id: 'coastal', name: 'Coastal', color: 'bg-cyan-500' }
  ]

  const ukDestinations: UKDestination[] = [
    {
      id: '1',
      name: 'Lake District',
      region: 'Cumbria, England',
      image: 'https://images.unsplash.com/photo-1586154673468-3b93e38b5e7e?w=600&h=400&fit=crop',
      moods: ['calm', 'adventurous'],
      description: 'Breathtaking lakes, mountains, and literary heritage in England\'s most beautiful national park',
      priceRange: '£150 - £400',
      duration: '2-4 days',
      highlights: ['Lake Windermere', 'Helvellyn hikes', 'Beatrix Potter sites'],
      featured: true
    },
    {
      id: '2',
      name: 'Scottish Highlands',
      region: 'Scotland',
      image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73a0e?w=600&h=400&fit=crop',
      moods: ['adventurous', 'calm'],
      description: 'Dramatic landscapes, ancient castles, and whisky distilleries in Scotland\'s wild heart',
      priceRange: '£200 - £600',
      duration: '3-7 days',
      highlights: ['Isle of Skye', 'Glencoe', 'Whisky trail'],
      featured: true
    },
    {
      id: '3',
      name: 'Cornwall',
      region: 'Southwest England',
      image: 'https://images.unsplash.com/photo-1513735492246-483525079686?w=600&h=400&fit=crop',
      moods: ['coastal', 'romantic', 'calm'],
      description: 'Stunning coastlines, charming fishing villages, and England\'s surfing capital',
      priceRange: '£120 - £350',
      duration: '2-5 days',
      highlights: ['St Ives', 'Eden Project', 'Coastal walks'],
      featured: true
    },
    {
      id: '4',
      name: 'Cotswolds',
      region: 'Central England',
      image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=600&h=400&fit=crop',
      moods: ['romantic', 'calm', 'cultural'],
      description: 'Picture-perfect villages, honey-colored stone cottages, and quintessential English countryside',
      priceRange: '£180 - £450',
      duration: '2-4 days',
      highlights: ['Bourton-on-the-Water', 'Chipping Campden', 'Country pubs']
    },
    {
      id: '5',
      name: 'Edinburgh',
      region: 'Scotland',
      image: 'https://images.unsplash.com/photo-1549890762-0a3f8933bc5d?w=600&h=400&fit=crop',
      moods: ['cultural', 'romantic'],
      description: 'Historic royal mile, stunning castle, and vibrant cultural scene in Scotland\'s capital',
      priceRange: '£160 - £400',
      duration: '2-4 days',
      highlights: ['Edinburgh Castle', 'Royal Mile', 'Whisky tasting']
    },
    {
      id: '6',
      name: 'Bath',
      region: 'Somerset, England',
      image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=600&h=400&fit=crop',
      moods: ['cultural', 'romantic', 'calm'],
      description: 'Roman baths, Georgian architecture, and thermal spa experiences in this UNESCO World Heritage city',
      priceRange: '£140 - £380',
      duration: '1-3 days',
      highlights: ['Roman Baths', 'Royal Crescent', 'Thermae Spa']
    }
  ]

  const filteredDestinations = selectedMood === 'all' 
    ? ukDestinations 
    : ukDestinations.filter(dest => dest.moods.includes(selectedMood))

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Discover Amazing UK Destinations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Experience the beauty and diversity of Britain, from peaceful lakeshores to dramatic highlands
          </p>

          {/* Mood Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {moodFilters.map((mood) => (
              <button
                key={mood.id}
                onClick={() => setSelectedMood(mood.id)}
                className={`inline-flex items-center px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedMood === mood.id
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div className={`w-2 h-2 ${mood.color} rounded-full mr-2`} />
                {mood.name}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300 group"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {destination.featured && (
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Featured
                  </div>
                )}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex flex-wrap gap-1">
                    {destination.moods.slice(0, 2).map((mood) => {
                      const moodFilter = moodFilters.find(m => m.id === mood)
                      return (
                        <span
                          key={mood}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-800"
                        >
                          <div className={`w-1.5 h-1.5 ${moodFilter?.color} rounded-full mr-1`} />
                          {moodFilter?.name}
                        </span>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-3">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{destination.name}</h3>
                  <p className="text-sm text-gray-500">{destination.region}</p>
                </div>

                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {destination.description}
                </p>

                {/* Highlights */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {destination.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price and Duration */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{destination.priceRange}</span>
                  <span>{destination.duration}</span>
                </div>

                {/* CTA */}
                <button className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200">
                  Explore {destination.name}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* UK Travel Info */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16 p-8 bg-gray-50 rounded-2xl"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose UK Adventures?</h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-600">
            <div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="font-medium text-gray-900 mb-1">No Passport Needed</div>
              <p>Explore incredible destinations right on your doorstep</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="font-medium text-gray-900 mb-1">Great Value</div>
              <p>Amazing experiences at a fraction of international costs</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="font-medium text-gray-900 mb-1">Easy to Reach</div>
              <p>Short travel times mean more time enjoying your destination</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}