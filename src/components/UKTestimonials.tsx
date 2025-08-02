'use client'

import { motion } from 'framer-motion'

interface Testimonial {
  id: string
  name: string
  location: string
  avatar: string
  rating: number
  text: string
  tripDestination: string
  mood: string
}

export default function UKTestimonials() {
  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      location: 'London',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b123?w=100&h=100&fit=crop&crop=face',
      rating: 5,
      text: "WanderMood perfectly captured my need for tranquility. The Kyoto retreat was exactly what my soul needed after a stressful year. Every detail was spot-on.",
      tripDestination: 'Kyoto, Japan',
      mood: 'Peaceful'
    },
    {
      id: '2',
      name: 'James Mitchell',
      location: 'Manchester',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      rating: 5,
      text: "As someone who rarely travels, I was nervous about planning. WanderMood understood my adventurous side and planned the perfect Swiss Alps experience. Incredible!",
      tripDestination: 'Swiss Alps',
      mood: 'Adventurous'
    },
    {
      id: '3',
      name: 'Emma Watson',
      location: 'Edinburgh',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      rating: 5,
      text: "The romantic Santorini getaway was pure magic. WanderMood knew exactly how to make our anniversary unforgettable. Every sunset felt crafted just for us.",
      tripDestination: 'Santorini, Greece',
      mood: 'Romantic'
    },
    {
      id: '4',
      name: 'David Thompson',
      location: 'Birmingham',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      rating: 5,
      text: "After my career change, I needed space to think. The Iceland Northern Lights quest gave me clarity and wonder I hadn't felt in years. Life-changing experience.",
      tripDestination: 'Iceland',
      mood: 'Reflective'
    }
  ]

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Stories from UK Travelers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real experiences from fellow Brits who let their emotions guide their adventures
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-gray-700 mb-6 italic leading-relaxed">
                "{testimonial.text}"
              </blockquote>

              {/* Trip Info */}
              <div className="mb-6">
                <div className="flex items-center space-x-2 text-sm text-gray-500 mb-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Traveled to {testimonial.tripDestination}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span>Seeking: {testimonial.mood}</span>
                </div>
              </div>

              {/* Author */}
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>2,400+ UK travelers</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>4.9/5 average rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>ABTA protected</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}