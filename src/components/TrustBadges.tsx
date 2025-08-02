'use client'

import { motion } from 'framer-motion'

export default function TrustBadges() {
  const badges = [
    {
      icon: "🔒",
      title: "SSL Encrypted",
      description: "Your data is protected with bank-level security"
    },
    {
      icon: "💳",
      title: "Secure Payments",
      description: "Payment protection through trusted partners"
    },
    {
      icon: "📞",
      title: "24/7 Support",
      description: "Travel assistance whenever you need it"
    },
    {
      icon: "↩️",
      title: "Flexible Booking",
      description: "Free cancellation up to 24 hours before"
    },
    {
      icon: "⭐",
      title: "Satisfaction Guarantee",
      description: "Love your trip or we'll make it right"
    },
    {
      icon: "✅",
      title: "Verified Partners",
      description: "Only trusted accommodations and guides"
    }
  ]

  const certifications = [
    { name: "IATA", description: "International Air Transport Association" },
    { name: "WTTC", description: "World Travel & Tourism Council" },
    { name: "ISO 27001", description: "Information Security Management" }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Trust Badges Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 text-center hover:shadow-md transition-shadow duration-200"
            >
              <div className="text-3xl mb-3">{badge.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-2">{badge.title}</h3>
              <p className="text-sm text-gray-600">{badge.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-sm text-gray-500 mb-4">Certified and trusted by</p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {certifications.map((cert, index) => (
              <div key={index} className="text-center">
                <div className="font-semibold text-gray-900 text-sm">{cert.name}</div>
                <div className="text-xs text-gray-500">{cert.description}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}