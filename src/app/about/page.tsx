'use client'

import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
                About WanderMood
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                We believe travel should match your emotions, not just your preferences. Founded by emotional travel enthusiasts, we're revolutionizing how people discover their next adventure.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -32 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  WanderMood was born from a simple realization: traditional travel planning focuses on logistics, but rarely considers your emotional state. Whether you're seeking tranquility after a stressful period, adventure to reignite your spirit, or romance to deepen connections, your mood should guide your journey.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Our founders, Sarah and James, experienced this firsthand when planning a post-wedding trip. Despite beautiful destinations, nothing felt right until they asked: "How do we want to feel?" That question changed everything.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Today, we've helped thousands of travelers discover experiences that truly resonate with their emotional needs, creating not just trips, but transformative journeys.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 32 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <img
                  src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop"
                  alt="Beautiful travel destination"
                  className="rounded-2xl shadow-lg"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                To make emotional travel accessible to everyone, connecting people with destinations that speak to their soul.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: "💚",
                  title: "Emotional Intelligence",
                  description: "We understand that travel is deeply personal and emotional. Our platform recognizes your feelings and matches them with perfect destinations."
                },
                {
                  icon: "🌍",
                  title: "Global Reach",
                  description: "From hidden UK gems to international wonders, we curate experiences worldwide that align with your emotional journey."
                },
                {
                  icon: "✨",
                  title: "Transformative Experiences",
                  description: "Every recommendation is crafted to create meaningful memories and personal growth, not just another holiday."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white p-8 rounded-2xl shadow-sm"
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
              <p className="text-xl text-gray-600">
                Passionate travelers and technology experts working to revolutionize how you discover your next adventure.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Co-Founder & CEO",
                  image: "https://images.unsplash.com/photo-1494790108755-2616b612b123?w=300&h=300&fit=crop&crop=face",
                  bio: "Former travel writer with 15+ years exploring emotional connections to places."
                },
                {
                  name: "James Mitchell",
                  role: "Co-Founder & CTO",
                  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
                  bio: "Tech entrepreneur passionate about using technology to enhance human experiences."
                },
                {
                  name: "Emma Watson",
                  role: "Head of Experience Design",
                  image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
                  bio: "Psychologist and travel curator specializing in emotional travel planning."
                }
              ].map((person, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{person.name}</h3>
                  <p className="text-gray-500 mb-4">{person.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{person.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}