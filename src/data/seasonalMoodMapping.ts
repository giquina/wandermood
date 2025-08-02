import { WeatherMoodCorrelation, UKDestination } from '@/types'

// UK Weather-Mood Correlation Data
export const ukWeatherMoodCorrelations: WeatherMoodCorrelation[] = [
  {
    weatherType: 'sunny',
    moodImpact: {
      enhances: ['social', 'celebratory', 'adventurous', 'creative'],
      diminishes: [],
      neutral: ['calm', 'reflective', 'romantic', 'luxury']
    },
    activityRecommendations: [
      'Outdoor festivals and events',
      'Beach activities and coastal walks',
      'Garden visits and outdoor dining',
      'Photography and art creation',
      'Adventure sports and hiking'
    ]
  },
  {
    weatherType: 'cloudy',
    moodImpact: {
      enhances: ['reflective', 'romantic', 'calm'],
      diminishes: ['social'],
      neutral: ['creative', 'adventurous', 'celebratory', 'luxury']
    },
    activityRecommendations: [
      'Museum and gallery visits',
      'Historic site exploration',
      'Atmospheric walks and photography',
      'Cozy pub experiences',
      'Literary and cultural tours'
    ]
  },
  {
    weatherType: 'rainy',
    moodImpact: {
      enhances: ['reflective', 'calm', 'creative', 'luxury'],
      diminishes: ['social', 'adventurous'],
      neutral: ['romantic', 'celebratory']
    },
    activityRecommendations: [
      'Spa treatments and wellness experiences',
      'Indoor cultural activities',
      'Cozy accommodation experiences',
      'Art workshops and creative pursuits',
      'Traditional afternoon tea experiences'
    ]
  },
  {
    weatherType: 'snowy',
    moodImpact: {
      enhances: ['romantic', 'celebratory', 'calm', 'luxury'],
      diminishes: ['adventurous'],
      neutral: ['social', 'creative', 'reflective']
    },
    activityRecommendations: [
      'Luxury spa retreats',
      'Romantic fireside experiences',
      'Christmas markets and festivals',
      'Cozy pub and restaurant dining',
      'Winter photography and art'
    ]
  },
  {
    weatherType: 'foggy',
    moodImpact: {
      enhances: ['reflective', 'romantic', 'creative'],
      diminishes: ['social', 'adventurous'],
      neutral: ['calm', 'celebratory', 'luxury']
    },
    activityRecommendations: [
      'Atmospheric photography',
      'Literary walks and tours',
      'Mysterious historic site visits',
      'Art creation and inspiration',
      'Contemplative experiences'
    ]
  },
  {
    weatherType: 'windy',
    moodImpact: {
      enhances: ['adventurous', 'creative'],
      diminishes: ['calm', 'luxury'],
      neutral: ['social', 'celebratory', 'romantic', 'reflective']
    },
    activityRecommendations: [
      'Dramatic coastal walks',
      'Kite flying and wind sports',
      'Storm watching experiences',
      'Indoor shelter activities',
      'Wild landscape photography'
    ]
  }
]

// Seasonal Destination Recommendations by Mood
export const seasonalMoodDestinations = {
  spring: {
    calm: [
      {
        destinationId: 'lake-windermere',
        reason: 'Perfect tranquil atmosphere with blooming gardens and gentle spring light',
        activities: ['Peaceful lake cruises', 'Garden walks', 'Spa treatments'],
        weatherBenefits: 'Mild temperatures ideal for relaxation without summer crowds'
      },
      {
        destinationId: 'chipping-campden',
        reason: 'Cotswold villages come alive with spring flowers and peaceful countryside',
        activities: ['Village walks', 'Garden visits', 'Countryside rambles'],
        weatherBenefits: 'Perfect walking weather and blooming cottage gardens'
      }
    ],
    adventurous: [
      {
        destinationId: 'ben-nevis',
        reason: 'Spring climbing conditions offer challenge with improving weather',
        activities: ['Mountain hiking', 'Rock climbing', 'Highland exploration'],
        weatherBenefits: 'Longer daylight hours and improving mountain conditions'
      }
    ],
    romantic: [
      {
        destinationId: 'chipping-campden',
        reason: 'Spring romance with blooming gardens and warming weather',
        activities: ['Romantic walks', 'Countryside dining', 'Garden tours'],
        weatherBenefits: 'Perfect temperature for outdoor romantic activities'
      },
      {
        destinationId: 'bath',
        reason: 'Georgian elegance enhanced by spring gardens and mild weather',
        activities: ['Spa treatments', 'Garden strolls', 'Romantic dining'],
        weatherBenefits: 'Ideal weather for exploring outdoor attractions'
      }
    ],
    creative: [
      {
        destinationId: 'st-ives',
        reason: 'Exceptional spring light perfect for artistic inspiration',
        activities: ['Art workshops', 'Photography', 'Gallery visits'],
        weatherBenefits: 'Clear spring light ideal for artistic pursuits'
      }
    ],
    social: [
      {
        destinationId: 'brighton',
        reason: 'Spring festivals and warming weather perfect for social activities',
        activities: ['Festival attendance', 'Beach walks', 'Social dining'],
        weatherBenefits: 'Pleasant weather for outdoor social gatherings'
      }
    ],
    celebratory: [
      {
        destinationId: 'edinburgh',
        reason: 'Spring cultural celebrations and festivals begin',
        activities: ['Cultural festivals', 'Historic celebrations', 'City exploration'],
        weatherBenefits: 'Improving weather perfect for celebration events'
      }
    ],
    reflective: [
      {
        destinationId: 'canterbury',
        reason: 'Perfect for spiritual reflection with Easter celebrations',
        activities: ['Cathedral visits', 'Contemplative walks', 'Literary tours'],
        weatherBenefits: 'Peaceful spring atmosphere ideal for reflection'
      }
    ],
    luxury: [
      {
        destinationId: 'bath',
        reason: 'Spring luxury with spa treatments and beautiful weather',
        activities: ['Luxury spa experiences', 'Fine dining', 'Shopping'],
        weatherBenefits: 'Perfect weather for outdoor luxury experiences'
      }
    ]
  },

  summer: {
    calm: [
      {
        destinationId: 'lake-windermere',
        reason: 'While busier, early mornings and evenings offer peaceful lake experiences',
        activities: ['Early morning lake cruises', 'Evening spa treatments', 'Quiet garden walks'],
        weatherBenefits: 'Long daylight hours for extended peaceful experiences'
      }
    ],
    adventurous: [
      {
        destinationId: 'ben-nevis',
        reason: 'Peak climbing season with best weather and longest days',
        activities: ['Summit attempts', 'Technical climbing', 'Highland adventures'],
        weatherBenefits: 'Best weather conditions and maximum daylight for safety'
      }
    ],
    romantic: [
      {
        destinationId: 'chipping-campden',
        reason: 'Peak romantic season with long summer evenings and perfect weather',
        activities: ['Romantic dinners', 'Evening countryside walks', 'Garden parties'],
        weatherBenefits: 'Long summer evenings perfect for romantic experiences'
      }
    ],
    creative: [
      {
        destinationId: 'st-ives',
        reason: 'Peak artistic season with festivals and exceptional light',
        activities: ['Art festivals', 'Outdoor workshops', 'Creative retreats'],
        weatherBenefits: 'Optimal light conditions and outdoor creative opportunities'
      }
    ],
    social: [
      {
        destinationId: 'brighton',
        reason: 'Peak social season with festivals, beach parties, and perfect weather',
        activities: ['Music festivals', 'Beach social events', 'Outdoor dining'],
        weatherBenefits: 'Perfect weather for all outdoor social activities'
      },
      {
        destinationId: 'edinburgh',
        reason: 'World-famous Edinburgh Festival Fringe - peak social cultural season',
        activities: ['Festival shows', 'Street performances', 'Cultural celebrations'],
        weatherBenefits: 'Extended daylight and mild weather for festival activities'
      }
    ],
    celebratory: [
      {
        destinationId: 'edinburgh',
        reason: 'World\'s largest arts festival - ultimate celebratory experience',
        activities: ['Festival celebrations', 'Cultural events', 'Street parties'],
        weatherBenefits: 'Best weather for outdoor celebrations and events'
      }
    ],
    reflective: [
      {
        destinationId: 'canterbury',
        reason: 'Summer contemplation with longer days for reflection',
        activities: ['Extended cathedral visits', 'Literary walks', 'Peaceful gardens'],
        weatherBenefits: 'Long days provide extended time for contemplative experiences'
      }
    ],
    luxury: [
      {
        destinationId: 'bath',
        reason: 'Peak luxury season with perfect weather for outdoor elegance',
        activities: ['Outdoor spa treatments', 'Garden parties', 'Luxury shopping'],
        weatherBenefits: 'Perfect weather for all luxury outdoor experiences'
      }
    ]
  },

  autumn: {
    calm: [
      {
        destinationId: 'lake-windermere',
        reason: 'Perfect calm atmosphere with stunning autumn colors and fewer crowds',
        activities: ['Peaceful lake walks', 'Autumn photography', 'Cozy spa treatments'],
        weatherBenefits: 'Crisp air and beautiful colors create perfect calm atmosphere'
      }
    ],
    adventurous: [
      {
        destinationId: 'ben-nevis',
        reason: 'Dramatic autumn weather adds intensity to highland adventures',
        activities: ['Autumn hiking', 'Photography expeditions', 'Weather watching'],
        weatherBenefits: 'Variable weather creates dramatic and challenging conditions'
      }
    ],
    romantic: [
      {
        destinationId: 'chipping-campden',
        reason: 'Intimate autumn atmosphere with golden colors and cozy pubs',
        activities: ['Romantic autumn walks', 'Fireside dining', 'Cozy pub experiences'],
        weatherBenefits: 'Golden autumn light and cozy weather perfect for romance'
      }
    ],
    creative: [
      {
        destinationId: 'st-ives',
        reason: 'Dramatic autumn light and fewer crowds perfect for creative work',
        activities: ['Autumn art workshops', 'Storm photography', 'Creative retreats'],
        weatherBenefits: 'Dramatic light and weather inspire creative expression'
      }
    ],
    social: [
      {
        destinationId: 'brighton',
        reason: 'Autumn cultural season with harvest festivals and cozy social venues',
        activities: ['Cultural events', 'Harvest celebrations', 'Indoor social activities'],
        weatherBenefits: 'Cool weather perfect for indoor social gatherings'
      }
    ],
    celebratory: [
      {
        destinationId: 'edinburgh',
        reason: 'Autumn cultural celebrations and whisky festivals',
        activities: ['Whisky festivals', 'Autumn celebrations', 'Cultural events'],
        weatherBenefits: 'Crisp autumn weather perfect for warming celebrations'
      }
    ],
    reflective: [
      {
        destinationId: 'canterbury',
        reason: 'Ideal for deep reflection with fewer crowds and contemplative atmosphere',
        activities: ['Contemplative cathedral visits', 'Autumn walks', 'Literary reflection'],
        weatherBenefits: 'Perfect atmosphere for introspection and contemplation'
      }
    ],
    luxury: [
      {
        destinationId: 'bath',
        reason: 'Autumn luxury with cozy spa experiences and beautiful colors',
        activities: ['Luxury spa treatments', 'Fine dining', 'Autumn shopping'],
        weatherBenefits: 'Perfect weather for cozy luxury experiences'
      }
    ]
  },

  winter: {
    calm: [
      {
        destinationId: 'lake-windermere',
        reason: 'Peaceful winter atmosphere with cozy spa retreats',
        activities: ['Luxury spa days', 'Fireside relaxation', 'Winter lake walks'],
        weatherBenefits: 'Dramatic winter landscapes perfect for peaceful contemplation'
      }
    ],
    adventurous: [
      {
        destinationId: 'ben-nevis',
        reason: 'Extreme winter adventure for experienced mountaineers',
        activities: ['Winter mountaineering', 'Ice climbing', 'Extreme hiking'],
        weatherBenefits: 'Challenging winter conditions for ultimate adventure'
      }
    ],
    romantic: [
      {
        destinationId: 'chipping-campden',
        reason: 'Magical winter romance with possible snow and cozy fireplaces',
        activities: ['Romantic fireside dining', 'Winter walks', 'Cozy pub experiences'],
        weatherBenefits: 'Magical winter atmosphere perfect for intimate romance'
      },
      {
        destinationId: 'bath',
        reason: 'Winter romance with thermal spas and festive atmosphere',
        activities: ['Thermal spa experiences', 'Winter markets', 'Festive dining'],
        weatherBenefits: 'Perfect weather for warming romantic experiences'
      }
    ],
    creative: [
      {
        destinationId: 'st-ives',
        reason: 'Intense winter creative atmosphere with dramatic seascapes',
        activities: ['Winter art courses', 'Storm photography', 'Creative retreats'],
        weatherBenefits: 'Dramatic winter weather inspires intense creative work'
      }
    ],
    social: [
      {
        destinationId: 'brighton',
        reason: 'Indoor social scene with theaters, clubs, and winter events',
        activities: ['Theater shows', 'Indoor social events', 'Winter festivals'],
        weatherBenefits: 'Perfect excuse for cozy indoor social activities'
      }
    ],
    celebratory: [
      {
        destinationId: 'edinburgh',
        reason: 'Magical winter celebrations including world-famous Hogmanay',
        activities: ['Hogmanay celebrations', 'Christmas markets', 'Winter festivals'],
        weatherBenefits: 'Perfect winter atmosphere for festive celebrations'
      }
    ],
    reflective: [
      {
        destinationId: 'canterbury',
        reason: 'Perfect for quiet winter contemplation and spiritual reflection',
        activities: ['Winter cathedral visits', 'Quiet reflection', 'Spiritual retreats'],
        weatherBenefits: 'Contemplative winter atmosphere ideal for deep reflection'
      }
    ],
    luxury: [
      {
        destinationId: 'bath',
        reason: 'Perfect winter luxury with thermal spas and festive elegance',
        activities: ['Thermal spa treatments', 'Luxury winter dining', 'Festive shopping'],
        weatherBenefits: 'Cold weather makes thermal spa experiences extra luxurious'
      }
    ]
  }
}

// Functions for seasonal recommendations
export const getSeasonalRecommendations = (
  mood: string, 
  season: 'spring' | 'summer' | 'autumn' | 'winter'
) => {
  return seasonalMoodDestinations[season][mood as keyof typeof seasonalMoodDestinations.spring] || []
}

export const getWeatherImpactForMood = (
  mood: string, 
  weatherType: WeatherMoodCorrelation['weatherType']
): 'enhances' | 'diminishes' | 'neutral' => {
  const correlation = ukWeatherMoodCorrelations.find(w => w.weatherType === weatherType)
  if (!correlation) return 'neutral'
  
  if (correlation.moodImpact.enhances.includes(mood)) return 'enhances'
  if (correlation.moodImpact.diminishes.includes(mood)) return 'diminishes'
  return 'neutral'
}

export const getWeatherAppropriateActivities = (
  weatherType: WeatherMoodCorrelation['weatherType']
): string[] => {
  const correlation = ukWeatherMoodCorrelations.find(w => w.weatherType === weatherType)
  return correlation?.activityRecommendations || []
}

// Monthly mood-destination strength matrix
export const monthlyMoodStrength = {
  january: {
    calm: 0.9, adventurous: 0.3, romantic: 0.7, creative: 0.8, 
    social: 0.4, celebratory: 0.6, reflective: 0.9, luxury: 0.9
  },
  february: {
    calm: 0.8, adventurous: 0.4, romantic: 0.8, creative: 0.8, 
    social: 0.5, celebratory: 0.7, reflective: 0.8, luxury: 0.8
  },
  march: {
    calm: 0.7, adventurous: 0.6, romantic: 0.7, creative: 0.8, 
    social: 0.6, celebratory: 0.6, reflective: 0.7, luxury: 0.7
  },
  april: {
    calm: 0.8, adventurous: 0.7, romantic: 0.9, creative: 0.9, 
    social: 0.7, celebratory: 0.7, reflective: 0.8, luxury: 0.8
  },
  may: {
    calm: 0.8, adventurous: 0.8, romantic: 0.9, creative: 0.9, 
    social: 0.8, celebratory: 0.8, reflective: 0.7, luxury: 0.8
  },
  june: {
    calm: 0.6, adventurous: 0.9, romantic: 0.9, creative: 0.9, 
    social: 0.9, celebratory: 0.9, reflective: 0.6, luxury: 0.8
  },
  july: {
    calm: 0.5, adventurous: 1.0, romantic: 0.8, creative: 1.0, 
    social: 1.0, celebratory: 1.0, reflective: 0.5, luxury: 0.8
  },
  august: {
    calm: 0.5, adventurous: 1.0, romantic: 0.8, creative: 1.0, 
    social: 1.0, celebratory: 1.0, reflective: 0.5, luxury: 0.8
  },
  september: {
    calm: 0.7, adventurous: 0.8, romantic: 0.8, creative: 0.9, 
    social: 0.7, celebratory: 0.7, reflective: 0.8, luxury: 0.8
  },
  october: {
    calm: 0.8, adventurous: 0.7, romantic: 0.9, creative: 0.9, 
    social: 0.6, celebratory: 0.6, reflective: 0.9, luxury: 0.8
  },
  november: {
    calm: 0.8, adventurous: 0.5, romantic: 0.7, creative: 0.8, 
    social: 0.5, celebratory: 0.5, reflective: 0.9, luxury: 0.8
  },
  december: {
    calm: 0.7, adventurous: 0.4, romantic: 0.8, creative: 0.7, 
    social: 0.6, celebratory: 0.9, reflective: 0.8, luxury: 0.9
  }
}

export const getCurrentSeasonalStrength = (mood: string): number => {
  const now = new Date()
  const month = now.toLocaleString('default', { month: 'long' }).toLowerCase()
  return monthlyMoodStrength[month as keyof typeof monthlyMoodStrength][mood as keyof typeof monthlyMoodStrength.january] || 0.7
}