'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function SocialProof() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      location: "San Francisco, CA",
      mood: "Calm & Peaceful",
      destination: "Bali, Indonesia",
      text: "WanderMood understood exactly what I needed. After a stressful year, the peaceful temple retreats in Bali were exactly the emotional reset I was looking for.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b332446c?w=64&h=64&fit=crop&crop=face",
      verified: true
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      location: "Austin, TX", 
      mood: "Adventurous",
      destination: "Swiss Alps",
      text: "The adrenaline rush from paragliding in Interlaken was incredible. The platform matched my need for adventure perfectly - every activity was a thrill!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
      verified: true
    },
    {
      id: 3,
      name: "Emily & James",
      location: "London, UK",
      mood: "Romantic",
      destination: "Santorini, Greece",
      text: "Our honeymoon was magical. The sunset dinners and private villa overlooking the Aegean Sea created memories we'll treasure forever.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=64&h=64&fit=crop&crop=face",
      verified: true
    }
  ]

  const recentBookings = [
    { destination: "Kyoto, Japan", mood: "Reflective", time: "2 minutes ago", user: "Alex M." },
    { destination: "Iceland", mood: "Adventurous", time: "8 minutes ago", user: "Sophie L." },
    { destination: "Maldives", mood: "Calm", time: "15 minutes ago", user: "David K." },
    { destination: "Morocco", mood: "Creative", time: "23 minutes ago", user: "Maya P." },
    { destination: "Swiss Alps", mood: "Adventurous", time: "31 minutes ago", user: "Tom R." }
  ]

  const pressLogos = [
    { name: "Travel + Leisure", logo: "🏆" },
    { name: "Conde Nast", logo: "✈️" },
    { name: "National Geographic", logo: "🌍" },
    { name: "Lonely Planet", logo: "📍" }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Loved by emotional travelers worldwide
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Join thousands of travelers who've discovered their perfect emotional journey through WanderMood.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Testimonial Carousel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  ))}
                </div>
                
                <blockquote className="text-lg text-gray-900 mb-6 leading-relaxed">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>
                
                <div className="flex items-center space-x-4">
                  <img 
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-semibold text-gray-900">{testimonials[currentTestimonial].name}</p>
                      {testimonials[currentTestimonial].verified && (
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{testimonials[currentTestimonial].location}</p>
                    <p className="text-sm text-gray-600">
                      Wanted to feel <span className="font-medium">{testimonials[currentTestimonial].mood}</span> in {testimonials[currentTestimonial].destination}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Testimonial Navigation */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                    index === currentTestimonial ? 'bg-gray-900' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Recent Activity & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Recent Bookings */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <h3 className="font-semibold text-gray-900">Recent bookings</h3>
              </div>
              <div className="space-y-3">
                {recentBookings.slice(0, 4).map((booking, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between py-2"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">{booking.user}</p>
                      <p className="text-xs text-gray-500">{booking.destination} • {booking.mood}</p>
                    </div>
                    <span className="text-xs text-gray-400">{booking.time}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">50K+</div>
                <div className="text-sm text-gray-600">Happy Travelers</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">4.9</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">150+</div>
                <div className="text-sm text-gray-600">Destinations</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">98%</div>
                <div className="text-sm text-gray-600">Satisfaction</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Press Mentions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-sm text-gray-500 mb-6">Featured in</p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {pressLogos.map((press, index) => (
              <div key={index} className="flex items-center space-x-2 text-gray-400">
                <span className="text-2xl">{press.logo}</span>
                <span className="font-medium">{press.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}