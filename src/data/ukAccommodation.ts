import { UKAccommodation, PriceRange } from '@/types'

// Comprehensive UK Accommodation Database
export const ukAccommodations: UKAccommodation[] = [
  
  // LAKE DISTRICT ACCOMMODATIONS
  {
    id: 'langdale-spa-retreat',
    name: 'The Langdale Hotel & Spa',
    type: 'spa',
    location: 'Great Langdale, Lake District',
    moodMapping: ['calm', 'luxury', 'romantic'],
    priceRange: {
      min: 180,
      max: 350,
      currency: 'GBP',
      period: 'per_night',
      includes: ['Luxury room', 'Spa access', 'Breakfast', 'WiFi'],
      excludes: ['Spa treatments', 'Dinner', 'Activities']
    },
    amenities: [
      'Award-winning spa and wellness center',
      'Indoor heated pool with mountain views',
      'Fine dining restaurant',
      'Traditional fell-top bar',
      'Outdoor hot tubs',
      'Fitness center',
      'Free WiFi throughout'
    ],
    accessibility: {
      wheelchairAccessible: true,
      hearingLoop: true,
      visualAids: false,
      mobilitySupport: true,
      additionalInfo: ['Accessible rooms available', 'Lift access to all floors', 'Spa facilities accessible']
    },
    uniqueFeatures: [
      'Panoramic views of Langdale Pikes',
      'Thermal spa experiences inspired by local landscape',
      'Bespoke wellness retreats and meditation sessions',
      'Locally sourced Lake District cuisine',
      'Private hiking guides available'
    ],
    bookingPartners: ['Direct hotel booking', 'Booking.com', 'Expedia', 'Hotels.com'],
    seasonalPricing: [
      {
        season: 'spring',
        multiplier: 0.9,
        specialOffers: ['Spa package deals', 'Easter wellness retreats']
      },
      {
        season: 'summer',
        multiplier: 1.3,
        specialOffers: ['Summer hiking packages']
      },
      {
        season: 'autumn',
        multiplier: 1.1,
        specialOffers: ['Autumn wellness breaks', 'Photography packages']
      },
      {
        season: 'winter',
        multiplier: 0.8,
        specialOffers: ['Winter spa retreats', 'Cozy cabin packages']
      }
    ],
    localAttractions: [
      'Langdale Pikes hiking trails',
      'Elterwater village walk',
      'Great Langdale Beck',
      'Dungeon Ghyll Force waterfall'
    ],
    starRating: 4,
    guestRating: 4.6
  },

  {
    id: 'windermere-boutique-hotel',
    name: 'Gilpin Hotel & Lake House',
    type: 'hotel',
    location: 'Windermere, Lake District', 
    moodMapping: ['luxury', 'romantic', 'calm'],
    priceRange: {
      min: 280,
      max: 650,
      currency: 'GBP',
      period: 'per_night',
      includes: ['Luxury suite', 'Breakfast', 'Lake access', 'Spa facilities'],
      excludes: ['Spa treatments', 'Fine dining', 'Private chef']
    },
    amenities: [
      'Private lake house with jetty',
      'Michelin-starred restaurant',
      'Luxury spa and wellness center',
      'Indoor and outdoor pools',
      'Private gardens and grounds',
      'Helicopter landing pad',
      'Personal concierge service'
    ],
    accessibility: {
      wheelchairAccessible: true,
      hearingLoop: true,
      visualAids: true,
      mobilitySupport: true,
      additionalInfo: ['Full accessibility throughout property', 'Accessible lake access', 'Adapted spa facilities']
    },
    uniqueFeatures: [
      'Private 6-acre lake with exclusive boat access',
      'Award-winning fine dining with local ingredients',
      'Bespoke luxury experiences and activities',
      'Private chef and butler service available',
      'Exclusive access to hidden Lake District locations'
    ],
    bookingPartners: ['Direct hotel booking', 'Luxury travel agents', 'Relais & Châteaux'],
    seasonalPricing: [
      {
        season: 'spring',
        multiplier: 1.0,
        specialOffers: ['Spring romance packages']
      },
      {
        season: 'summer',
        multiplier: 1.4,
        specialOffers: ['Lake house exclusive packages']
      },
      {
        season: 'autumn',
        multiplier: 1.2,
        specialOffers: ['Autumn gourmet experiences']
      },
      {
        season: 'winter',
        multiplier: 0.9,
        specialOffers: ['Winter luxury retreats', 'Christmas packages']
      }
    ],
    localAttractions: [
      'Lake Windermere cruises',
      'Blackwell Arts & Crafts House',
      'The World of Beatrix Potter',
      'Grizedale Forest'
    ],
    starRating: 5,
    guestRating: 4.8
  },

  // SCOTTISH HIGHLANDS ACCOMMODATIONS
  {
    id: 'eilean-donan-castle-hotel',
    name: 'The Dornie Hotel',
    type: 'hotel',
    location: 'Dornie, Scottish Highlands',
    moodMapping: ['adventurous', 'romantic', 'reflective'],
    priceRange: {
      min: 120,
      max: 280,
      currency: 'GBP',
      period: 'per_night',
      includes: ['Highland room', 'Breakfast', 'Castle views', 'WiFi'],
      excludes: ['Castle tours', 'Whisky tastings', 'Highland activities']
    },
    amenities: [
      'Traditional Highland hospitality',
      'Restaurant with local cuisine',
      'Bar with extensive whisky selection',
      'Castle and loch views',
      'Highland walking guides',
      'Fishing equipment rental',
      'Traditional Scottish entertainment'
    ],
    accessibility: {
      wheelchairAccessible: true,
      hearingLoop: false,
      mobilitySupport: true,
      visualAids: false,
      additionalInfo: ['Ground floor accessible rooms', 'Assistance with Highland activities']
    },
    uniqueFeatures: [
      'Direct views of iconic Eilean Donan Castle',
      'Traditional Highland decor and atmosphere',
      'Access to private loch fishing',
      'Highland clan history experiences',
      'Traditional ceilidh evenings'
    ],
    bookingPartners: ['Direct hotel booking', 'VisitScotland', 'Booking.com'],
    seasonalPricing: [
      {
        season: 'spring',
        multiplier: 0.9,
        specialOffers: ['Highland spring adventures']
      },
      {
        season: 'summer',
        multiplier: 1.3,
        specialOffers: ['Clan heritage tours', 'Midsummer celebrations']
      },
      {
        season: 'autumn',
        multiplier: 1.0,
        specialOffers: ['Autumn photography packages', 'Whisky harvest tours']
      },
      {
        season: 'winter',
        multiplier: 0.8,
        specialOffers: ['Cozy Highland winter packages', 'Hogmanay celebrations']
      }
    ],
    localAttractions: [
      'Eilean Donan Castle',
      'Skye Bridge',
      'Plockton village',
      'Five Sisters of Kintail mountains'
    ],
    starRating: 3,
    guestRating: 4.3
  },

  {
    id: 'torridon-luxury-lodge',
    name: 'The Torridon Resort',
    type: 'hotel',
    location: 'Torridon, Scottish Highlands',
    moodMapping: ['adventurous', 'luxury', 'calm'],
    priceRange: {
      min: 250,
      max: 500,
      currency: 'GBP',
      period: 'per_night',
      includes: ['Luxury Highland suite', 'Gourmet breakfast', 'Spa access', 'Activities'],
      excludes: ['Premium spa treatments', 'Fine dining', 'Helicopter tours']
    },
    amenities: [
      'Award-winning luxury Highland resort',
      'Michelin-recommended restaurant',
      'World-class spa and wellness center',
      'Adventure activity center',
      'Private loch access',
      'Helicopter landing pad',
      'Personal Highland guides'
    ],
    accessibility: {
      wheelchairAccessible: true,
      hearingLoop: true,
      visualAids: true,
      mobilitySupport: true,
      additionalInfo: ['Fully accessible luxury facilities', 'Adapted adventure activities available']
    },
    uniqueFeatures: [
      'Dramatic mountain and loch setting',
      'Luxury Highland experiences with personal guides',
      'Award-winning cuisine featuring Highland ingredients',
      'World-class adventure activities',
      'Exclusive access to remote Highland locations'
    ],
    bookingPartners: ['Direct resort booking', 'Luxury Highland', 'Small Luxury Hotels'],
    seasonalPricing: [
      {
        season: 'spring',
        multiplier: 1.0,
        specialOffers: ['Spring adventure packages']
      },
      {
        season: 'summer',
        multiplier: 1.4,
        specialOffers: ['Highland summer adventures', 'Midnight sun experiences']
      },
      {
        season: 'autumn',
        multiplier: 1.2,
        specialOffers: ['Autumn highland colors', 'Stag watching tours']
      },
      {
        season: 'winter',
        multiplier: 0.9,
        specialOffers: ['Winter highland luxury', 'Aurora watching packages']
      }
    ],
    localAttractions: [
      'Torridon Mountains',
      'Beinn Eighe National Nature Reserve',
      'Applecross Peninsula',
      'Loch Torridon'
    ],
    starRating: 5,
    guestRating: 4.7
  },

  // COTSWOLDS ACCOMMODATIONS
  {
    id: 'chipping-campden-manor',
    name: 'Dormy House Hotel & Spa',
    type: 'hotel',
    location: 'Chipping Campden, Cotswolds',
    moodMapping: ['romantic', 'luxury', 'calm'],
    priceRange: {
      min: 200,
      max: 400,
      currency: 'GBP',
      period: 'per_night',
      includes: ['Cotswold stone room', 'Spa access', 'Breakfast', 'Gardens'],
      excludes: ['Spa treatments', 'Fine dining', 'Golf']
    },
    amenities: [
      'Traditional Cotswold manor house',
      'Award-winning spa and wellness center',
      'Championship golf course',
      'Fine dining restaurant',
      'Traditional afternoon tea',
      'Beautiful gardens and grounds',
      'Luxury shopping nearby'
    ],
    accessibility: {
      wheelchairAccessible: true,
      hearingLoop: true,
      visualAids: false,
      mobilitySupport: true,
      additionalInfo: ['Accessible rooms in modern wing', 'Lift access', 'Spa facilities accessible']
    },
    uniqueFeatures: [
      'Historic 17th-century farmhouse setting',
      'Award-winning spa in converted farm buildings',
      'Traditional Cotswold honey-stone architecture',
      'Golf course with panoramic Cotswold views',
      'Romantic candlelit dining experiences'
    ],
    bookingPartners: ['Direct hotel booking', 'Booking.com', 'Mr & Mrs Smith'],
    seasonalPricing: [
      {
        season: 'spring',
        multiplier: 1.1,
        specialOffers: ['Spring romance packages', 'Garden tours']
      },
      {
        season: 'summer',
        multiplier: 1.3,
        specialOffers: ['Summer garden parties', 'Golf packages']
      },
      {
        season: 'autumn',
        multiplier: 1.0,
        specialOffers: ['Autumn spa breaks', 'Harvest experiences']
      },
      {
        season: 'winter',
        multiplier: 0.9,
        specialOffers: ['Winter luxury retreats', 'Christmas packages']
      }
    ],
    localAttractions: [
      'Chipping Campden Market Hall',
      'Cotswold Way walking trail',
      'Broadway Tower',
      'Hidcote Manor Garden'
    ],
    starRating: 4,
    guestRating: 4.5
  },

  {
    id: 'cotswold-romantic-cottage',
    name: 'Honey Cottage',
    type: 'cottage',
    location: 'Bourton-on-the-Water, Cotswolds',
    moodMapping: ['romantic', 'calm', 'reflective'],
    priceRange: {
      min: 150,
      max: 280,
      currency: 'GBP',
      period: 'per_night',
      includes: ['Private cottage', 'Garden', 'Parking', 'WiFi'],
      excludes: ['Meals', 'Cleaning service', 'Activities']
    },
    amenities: [
      'Traditional Cotswold stone cottage',
      'Private garden with seating area',
      'Wood-burning fireplace',
      'Fully equipped kitchen',
      'Four-poster bed',
      'Private parking',
      'Local area information and maps'
    ],
    accessibility: {
      wheelchairAccessible: false,
      hearingLoop: false,
      visualAids: false,
      mobilitySupport: false,
      additionalInfo: ['Historic cottage with limited accessibility', 'Steps to entrance', 'Narrow doorways']
    },
    uniqueFeatures: [
      '16th-century honey-stone cottage',
      'Romantic four-poster bed with countryside views',
      'Authentic period features with modern comfort',
      'Private garden perfect for morning coffee',
      'Walking distance to village attractions'
    ],
    bookingPartners: ['Airbnb', 'Vrbo', 'Cotswold Cottages', 'Hoseasons'],
    seasonalPricing: [
      {
        season: 'spring',
        multiplier: 1.0,
        specialOffers: ['Spring garden bloom packages']
      },
      {
        season: 'summer',
        multiplier: 1.4,
        specialOffers: ['Summer cottage garden experiences']
      },
      {
        season: 'autumn',
        multiplier: 1.1,
        specialOffers: ['Autumn cozy cottage breaks']
      },
      {
        season: 'winter',
        multiplier: 0.8,
        specialOffers: ['Winter fireside retreats', 'Christmas cottage packages']
      }
    ],
    localAttractions: [
      'Bourton-on-the-Water Model Village',
      'Cotswold Motoring Museum',
      'River Windrush walks',
      'Stow-on-the-Wold market'
    ],
    guestRating: 4.7
  },

  // CORNWALL ACCOMMODATIONS
  {
    id: 'st-ives-artists-retreat',
    name: 'The Garrack Hotel',
    type: 'hotel',
    location: 'St Ives, Cornwall',
    moodMapping: ['creative', 'calm', 'romantic'],
    priceRange: {
      min: 120,
      max: 250,
      currency: 'GBP',
      period: 'per_night',
      includes: ['Sea view room', 'Breakfast', 'Art gallery access', 'WiFi'],
      excludes: ['Art workshops', 'Spa treatments', 'Fine dining']
    },
    amenities: [
      'Panoramic sea and bay views',
      'Indoor and outdoor pools',
      'Contemporary restaurant',
      'Art gallery and exhibition space',
      'Gardens overlooking St Ives Bay',
      'Close to Tate St Ives',
      'Artist workshop spaces'
    ],
    accessibility: {
      wheelchairAccessible: true,
      hearingLoop: true,
      visualAids: false,
      mobilitySupport: true,
      additionalInfo: ['Accessible rooms available', 'Lift access', 'Pool accessibility equipment']
    },
    uniqueFeatures: [
      'Spectacular panoramic views of St Ives Bay',
      'On-site art gallery featuring local artists',
      'Artist workshop and studio spaces',
      'Coastal path access for inspiration walks',
      'Partnership with local art schools'
    ],
    bookingPartners: ['Direct hotel booking', 'Visit Cornwall', 'Booking.com'],
    seasonalPricing: [
      {
        season: 'spring',
        multiplier: 0.9,
        specialOffers: ['Spring art workshops', 'Creative retreats']
      },
      {
        season: 'summer',
        multiplier: 1.4,
        specialOffers: ['Summer art festivals', 'Plein air painting packages']
      },
      {
        season: 'autumn',
        multiplier: 1.0,
        specialOffers: ['Autumn light photography workshops']
      },
      {
        season: 'winter',
        multiplier: 0.7,
        specialOffers: ['Winter creative retreats', 'Storm watching packages']
      }
    ],
    localAttractions: [
      'Tate St Ives',
      'Barbara Hepworth Museum',
      'St Ives harbor and beaches',
      'Coastal path walks'
    ],
    starRating: 3,
    guestRating: 4.2
  },

  {
    id: 'cornwall-luxury-cliff-hotel',
    name: 'The Scarlet Hotel',
    type: 'hotel',
    location: 'Mawgan Porth, Cornwall',
    moodMapping: ['luxury', 'calm', 'romantic'],
    priceRange: {
      min: 280,
      max: 500,
      currency: 'GBP',
      period: 'per_night',
      includes: ['Luxury eco room', 'Spa access', 'Breakfast', 'Beach access'],
      excludes: ['Spa treatments', 'Fine dining', 'Surf lessons']
    },
    amenities: [
      'Award-winning eco-luxury design',
      'Clifftop spa with ocean views',
      'Direct beach access',
      'Restaurant with sea-to-plate cuisine',
      'Outdoor hot tubs and saunas',
      'Surf school partnerships',
      'Sustainability programs'
    ],
    accessibility: {
      wheelchairAccessible: true,
      hearingLoop: true,
      visualAids: true,
      mobilitySupport: true,
      additionalInfo: ['Eco-accessible design throughout', 'Beach wheelchair available', 'Accessible spa facilities']
    },
    uniqueFeatures: [
      'Adults-only eco-luxury clifftop location',
      'Award-winning sustainable design and practices',
      'Spectacular Atlantic Ocean views',
      'Direct access to sandy beach',
      'Cutting-edge spa treatments with ocean views'
    ],
    bookingPartners: ['Direct hotel booking', 'Mr & Mrs Smith', 'Design Hotels'],
    seasonalPricing: [
      {
        season: 'spring',
        multiplier: 1.0,
        specialOffers: ['Spring wellness retreats']
      },
      {
        season: 'summer',
        multiplier: 1.5,
        specialOffers: ['Summer surf and spa packages']
      },
      {
        season: 'autumn',
        multiplier: 1.2,
        specialOffers: ['Autumn storm watching', 'Spa and relaxation']
      },
      {
        season: 'winter',
        multiplier: 0.8,
        specialOffers: ['Winter wellness retreats', 'Dramatic sea packages']
      }
    ],
    localAttractions: [
      'Mawgan Porth Beach',
      'Bedruthan Steps',
      'Cornwall coastal path',
      'Padstow food scene'
    ],
    starRating: 5,
    guestRating: 4.8
  },

  // BRIGHTON ACCOMMODATIONS
  {
    id: 'brighton-boutique-social',
    name: 'Hotel du Vin Brighton',
    type: 'hotel',
    location: 'Brighton, East Sussex',
    moodMapping: ['social', 'celebratory', 'creative'],
    priceRange: {
      min: 140,
      max: 280,
      currency: 'GBP',
      period: 'per_night',
      includes: ['Boutique room', 'Wine bar access', 'Breakfast', 'WiFi'],
      excludes: ['Wine tastings', 'Fine dining', 'Spa treatments']
    },
    amenities: [
      'Boutique hotel in historic building',
      'Award-winning wine bar and restaurant',
      'Central Brighton seafront location',
      'Modern rooms with period features',
      'Close to nightlife and attractions',
      'Conference and event facilities',
      'Valet parking service'
    ],
    accessibility: {
      wheelchairAccessible: true,
      hearingLoop: true,
      visualAids: false,
      mobilitySupport: true,
      additionalInfo: ['Accessible rooms available', 'Lift access to all floors', 'Accessible restaurant']
    },
    uniqueFeatures: [
      'Historic seafront location near Brighton Pier',
      'Renowned wine collection and tastings',
      'Art Deco and contemporary design blend',
      'Central to Brighton\'s vibrant social scene',
      'Walking distance to all major attractions'
    ],
    bookingPartners: ['Direct hotel booking', 'Booking.com', 'Hotels.com'],
    seasonalPricing: [
      {
        season: 'spring',
        multiplier: 1.0,
        specialOffers: ['Spring city break packages']
      },
      {
        season: 'summer',
        multiplier: 1.4,
        specialOffers: ['Summer festival packages', 'Brighton Pride deals']
      },
      {
        season: 'autumn',
        multiplier: 0.9,
        specialOffers: ['Autumn wine tasting packages']
      },
      {
        season: 'winter',
        multiplier: 0.8,
        specialOffers: ['Winter city escape packages']
      }
    ],
    localAttractions: [
      'Brighton Pier',
      'The Lanes shopping district',
      'Royal Pavilion',
      'Brighton Beach'
    ],
    starRating: 4,
    guestRating: 4.4
  },

  // BATH ACCOMMODATIONS
  {
    id: 'bath-luxury-spa-hotel',
    name: 'The Royal Crescent Hotel & Spa',
    type: 'spa',
    location: 'Bath, Somerset',
    moodMapping: ['luxury', 'calm', 'romantic'],
    priceRange: {
      min: 350,
      max: 800,
      currency: 'GBP',
      period: 'per_night',
      includes: ['Luxury Georgian suite', 'Spa access', 'Breakfast', 'Garden access'],
      excludes: ['Premium spa treatments', 'Fine dining', 'Butler service']
    },
    amenities: [
      'Historic Georgian townhouse hotel',
      'Award-winning spa and wellness center',
      'Michelin-starred restaurant',
      'Private walled garden',
      '24-hour room service',
      'Personal butler service',
      'Luxury shopping concierge'
    ],
    accessibility: {
      wheelchairAccessible: true,
      hearingLoop: true,
      visualAids: true,
      mobilitySupport: true,
      additionalInfo: ['Historic building with modern accessibility', 'Lift access', 'Accessible spa facilities']
    },
    uniqueFeatures: [
      'Part of iconic Royal Crescent Georgian architecture',
      'Award-winning luxury spa in secret garden',
      'Michelin-starred dining with Bath views',
      'Private walled garden sanctuary',
      'Historic elegance with modern luxury'
    ],
    bookingPartners: ['Direct hotel booking', 'Relais & Châteaux', 'Leading Hotels of the World'],
    seasonalPricing: [
      {
        season: 'spring',
        multiplier: 1.1,
        specialOffers: ['Spring luxury spa packages']
      },
      {
        season: 'summer',
        multiplier: 1.3,
        specialOffers: ['Summer garden party packages']
      },
      {
        season: 'autumn',
        multiplier: 1.0,
        specialOffers: ['Autumn wellness retreats']
      },
      {
        season: 'winter',
        multiplier: 1.2,
        specialOffers: ['Winter luxury spa retreats', 'Christmas packages']
      }
    ],
    localAttractions: [
      'Roman Baths',
      'Bath Abbey',
      'Thermae Bath Spa',
      'Jane Austen Centre'
    ],
    starRating: 5,
    guestRating: 4.9
  }
]

// Accommodation Filtering and Search Functions
export const getAccommodationsByMood = (mood: string): UKAccommodation[] => {
  return ukAccommodations.filter(accommodation => 
    accommodation.moodMapping.includes(mood)
  )
}

export const getAccommodationsByLocation = (location: string): UKAccommodation[] => {
  return ukAccommodations.filter(accommodation =>
    accommodation.location.toLowerCase().includes(location.toLowerCase())
  )
}

export const getAccommodationsByType = (type: UKAccommodation['type']): UKAccommodation[] => {
  return ukAccommodations.filter(accommodation => accommodation.type === type)
}

export const getAccommodationsByPriceRange = (minPrice: number, maxPrice: number): UKAccommodation[] => {
  return ukAccommodations.filter(accommodation =>
    accommodation.priceRange.min >= minPrice && accommodation.priceRange.max <= maxPrice
  )
}

export const getAccessibleAccommodations = (): UKAccommodation[] => {
  return ukAccommodations.filter(accommodation =>
    accommodation.accessibility.wheelchairAccessible && 
    accommodation.accessibility.mobilitySupport
  )
}

// Seasonal Pricing Calculator
export const calculateSeasonalPrice = (
  accommodation: UKAccommodation, 
  season: 'spring' | 'summer' | 'autumn' | 'winter',
  nights: number = 1
): PriceRange => {
  const seasonalPricing = accommodation.seasonalPricing.find(p => p.season === season)
  const multiplier = seasonalPricing?.multiplier || 1.0
  
  return {
    min: Math.round(accommodation.priceRange.min * multiplier * nights),
    max: Math.round(accommodation.priceRange.max * multiplier * nights),
    currency: 'GBP',
    period: 'per_trip',
    includes: accommodation.priceRange.includes,
    excludes: accommodation.priceRange.excludes
  }
}

// Accommodation Rating and Quality Metrics
export const getTopRatedAccommodations = (minRating: number = 4.5): UKAccommodation[] => {
  return ukAccommodations
    .filter(accommodation => accommodation.guestRating >= minRating)
    .sort((a, b) => b.guestRating - a.guestRating)
}

export const getLuxuryAccommodations = (): UKAccommodation[] => {
  return ukAccommodations.filter(accommodation =>
    accommodation.priceRange.min >= 200 && 
    (accommodation.starRating === 5 || accommodation.guestRating >= 4.5)
  )
}

// Mood-Specific Accommodation Recommendations
export const getMoodSpecificRecommendations = (mood: string, budget: 'low' | 'medium' | 'high' | 'luxury') => {
  const budgetRanges = {
    low: { min: 0, max: 100 },
    medium: { min: 100, max: 200 },
    high: { min: 200, max: 350 },
    luxury: { min: 350, max: 1000 }
  }
  
  const range = budgetRanges[budget]
  
  return ukAccommodations
    .filter(accommodation => 
      accommodation.moodMapping.includes(mood) &&
      accommodation.priceRange.min >= range.min &&
      accommodation.priceRange.max <= range.max
    )
    .sort((a, b) => b.guestRating - a.guestRating)
}