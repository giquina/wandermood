import { UKDestination, UKActivity, PriceRange } from '@/types'

// UK Regions Definition
export const ukRegions = [
  {
    id: 'lake-district',
    name: 'Lake District',
    description: 'England\'s largest national park, renowned for its lakes, forests, and mountains',
    counties: ['Cumbria'],
    majorCities: ['Windermere', 'Keswick', 'Ambleside'],
    characteristicMoods: ['calm', 'reflective', 'adventurous', 'romantic']
  },
  {
    id: 'scottish-highlands',
    name: 'Scottish Highlands',
    description: 'Rugged mountain landscapes, lochs, and ancient castles',
    counties: ['Highland', 'Argyll and Bute'],
    majorCities: ['Inverness', 'Fort William', 'Oban'],
    characteristicMoods: ['adventurous', 'romantic', 'reflective', 'calm']
  },
  {
    id: 'cotswolds',
    name: 'Cotswolds',
    description: 'Picturesque villages with honey-colored stone buildings',
    counties: ['Gloucestershire', 'Oxfordshire', 'Warwickshire'],
    majorCities: ['Chipping Campden', 'Stow-on-the-Wold', 'Bourton-on-the-Water'],
    characteristicMoods: ['romantic', 'calm', 'luxury', 'reflective']
  },
  {
    id: 'cornwall',
    name: 'Cornwall',
    description: 'Dramatic coastlines, beaches, and fishing villages',
    counties: ['Cornwall'],
    majorCities: ['St Ives', 'Padstow', 'Falmouth'],
    characteristicMoods: ['social', 'adventurous', 'celebratory', 'creative']
  }
]

// Comprehensive UK Destinations Database
export const ukDestinations: UKDestination[] = [
  // CALM & PEACEFUL DESTINATIONS
  {
    id: 'lake-windermere',
    name: 'Lake Windermere',
    region: 'Lake District',
    county: 'Cumbria',
    coordinates: { lat: 54.3799, lng: -2.9488 },
    type: 'nationalpark',
    moodMapping: {
      primary: ['calm', 'reflective'],
      secondary: ['romantic', 'luxury'],
      seasonal: [
        {
          season: 'spring',
          moodBoosts: ['calm', 'reflective'],
          moodReductions: [],
          description: 'Perfect tranquil atmosphere with blooming gardens and gentle spring light'
        },
        {
          season: 'summer',
          moodBoosts: ['social', 'adventurous'],
          moodReductions: ['calm'],
          description: 'Busier with tourists but excellent for water activities and outdoor adventures'
        },
        {
          season: 'autumn',
          moodBoosts: ['reflective', 'romantic'],
          moodReductions: [],
          description: 'Stunning autumn colors create perfect contemplative atmosphere'
        },
        {
          season: 'winter',
          moodBoosts: ['calm', 'luxury'],
          moodReductions: ['social', 'adventurous'],
          description: 'Peaceful and serene with cozy spa retreats and fireside relaxation'
        }
      ]
    },
    description: 'England\'s largest natural lake, offering serene boat trips, lakeside walks, and tranquil spa retreats. Perfect for meditation, gentle outdoor activities, and emotional restoration.',
    highlights: [
      'Lake cruises with peaceful mountain views',
      'Blackwell Arts & Crafts House with inspiring gardens',
      'The World of Beatrix Potter for gentle nostalgia',
      'Luxury spa hotels with lake views',
      'Peaceful lakeside walking trails'
    ],
    activities: [
      {
        id: 'windermere-cruise',
        name: 'Lake Windermere Steamboat Cruise',
        type: 'relaxation',
        moodMatch: ['calm', 'reflective', 'romantic'],
        duration: '1-3 hours',
        cost: 'budget',
        accessibility: 'full',
        weatherDependent: false,
        bookingRequired: false
      },
      {
        id: 'spa-treatment',
        name: 'Luxury Spa Day',
        type: 'relaxation',
        moodMatch: ['calm', 'luxury'],
        duration: '4-8 hours',
        cost: 'luxury',
        accessibility: 'full',
        weatherDependent: false,
        bookingRequired: true
      }
    ],
    accessibility: {
      wheelchairAccessible: true,
      hearingLoop: true,
      visualAids: false,
      mobilitySupport: true,
      additionalInfo: ['Accessible lake cruises available', 'Level lakeside paths', 'Accessible accommodation options']
    },
    whenToVisit: [
      {
        season: 'spring',
        rating: 5,
        why: 'Perfect for calm experiences with fewer crowds and blooming nature',
        specialEvents: ['Easter celebrations', 'Spring garden openings'],
        weatherExpectations: 'Mild temperatures, occasional rain, beautiful light'
      },
      {
        season: 'summer',
        rating: 3,
        why: 'Beautiful but crowded, best for social activities rather than calm experiences',
        specialEvents: ['Lake festivals', 'Outdoor concerts'],
        weatherExpectations: 'Warm temperatures, busy tourist season'
      },
      {
        season: 'autumn',
        rating: 5,
        why: 'Ideal for reflective moods with stunning autumn colors and peaceful atmosphere',
        specialEvents: ['Harvest festivals', 'Art exhibitions'],
        weatherExpectations: 'Cool temperatures, changing leaves, crisp air'
      },
      {
        season: 'winter',
        rating: 4,
        why: 'Perfect for luxury spa retreats and cozy calm experiences',
        specialEvents: ['Christmas markets', 'Winter spa packages'],
        weatherExpectations: 'Cold temperatures, possible snow, dramatic skies'
      }
    ],
    estimatedDuration: ['2-3 days', '4-5 days for luxury spa retreat'],
    imageGallery: [
      'https://images.unsplash.com/photo-1551616523-8ad0b4b1c6c5', // Lake Windermere
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', // Lake District landscape
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5'  // Peaceful lake scene
    ],
    localCuisine: ['Cumberland sausage', 'Kendal mint cake', 'Local fell-bred lamb', 'Grasmere gingerbread'],
    culturalSignificance: 'Inspiration for William Wordsworth and the Romantic poets, representing the spiritual connection between nature and human emotion'
  },

  // ADVENTUROUS DESTINATIONS
  {
    id: 'ben-nevis',
    name: 'Ben Nevis',
    region: 'Scottish Highlands',
    county: 'Highland',
    coordinates: { lat: 56.7969, lng: -5.0036 },
    type: 'nationalpark',
    moodMapping: {
      primary: ['adventurous'],
      secondary: ['reflective', 'celebratory'],
      seasonal: [
        {
          season: 'spring',
          moodBoosts: ['adventurous', 'reflective'],
          moodReductions: [],
          description: 'Challenging conditions create intense adventure experiences with rewarding views'
        },
        {
          season: 'summer',
          moodBoosts: ['adventurous', 'social', 'celebratory'],
          moodReductions: [],
          description: 'Peak climbing season with best weather and celebratory summit achievements'
        },
        {
          season: 'autumn',
          moodBoosts: ['adventurous', 'reflective'],
          moodReductions: ['social'],
          description: 'Dramatic weather creates intense adventure with stunning autumn highland colors'
        },
        {
          season: 'winter',
          moodBoosts: ['adventurous'],
          moodReductions: ['social', 'celebratory'],
          description: 'Extreme adventure for experienced climbers, technical winter climbing conditions'
        }
      ]
    },
    description: 'The UK\'s highest mountain offering challenging hikes, technical climbing, and breathtaking highland views. Perfect for adrenaline seekers and achievement-focused adventures.',
    highlights: [
      'Summit climb of UK\'s highest peak (1,345m)',
      'Technical winter mountaineering routes',
      'Stunning highland and loch views',
      'Mountain rescue and safety training opportunities',
      'Historic Glen Nevis with dramatic waterfalls'
    ],
    activities: [
      {
        id: 'ben-nevis-summit',
        name: 'Ben Nevis Summit Hike',
        type: 'adventure',
        moodMatch: ['adventurous', 'celebratory'],
        duration: '6-10 hours',
        cost: 'budget',
        accessibility: 'limited',
        weatherDependent: true,
        bookingRequired: false,
        ageRestrictions: 'Suitable for experienced hikers aged 16+'
      },
      {
        id: 'winter-climbing',
        name: 'Winter Mountaineering Course',
        type: 'adventure',
        moodMatch: ['adventurous'],
        duration: '2-3 days',
        cost: 'premium',
        accessibility: 'limited',
        weatherDependent: true,
        bookingRequired: true,
        ageRestrictions: 'Experienced climbers aged 18+'
      }
    ],
    accessibility: {
      wheelchairAccessible: false,
      hearingLoop: false,
      visualAids: false,
      mobilitySupport: false,
      additionalInfo: ['Extremely challenging terrain', 'Alternative lower-level walks in Glen Nevis', 'Visitor center with accessible facilities']
    },
    whenToVisit: [
      {
        season: 'spring',
        rating: 3,
        why: 'Challenging conditions, suitable for experienced adventurers only',
        specialEvents: ['Mountain safety courses', 'Spring climbing festivals'],
        weatherExpectations: 'Unpredictable weather, snow possible, strong winds'
      },
      {
        season: 'summer',
        rating: 5,
        why: 'Best conditions for summit attempts and adventure activities',
        specialEvents: ['Highland games', 'Mountain festivals'],
        weatherExpectations: 'Best weather window, still challenging conditions'
      },
      {
        season: 'autumn',
        rating: 4,
        why: 'Good conditions with fewer crowds, dramatic weather adds adventure',
        specialEvents: ['Autumn climbing courses', 'Photography workshops'],
        weatherExpectations: 'Variable weather, stunning autumn colors in glens'
      },
      {
        season: 'winter',
        rating: 2,
        why: 'Extreme conditions for expert climbers only',
        specialEvents: ['Winter mountaineering courses', 'Ice climbing festivals'],
        weatherExpectations: 'Harsh winter conditions, technical climbing required'
      }
    ],
    estimatedDuration: ['1 day for summit attempt', '2-3 days for mountaineering course'],
    imageGallery: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', // Mountain landscape
      'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa', // Highland adventure
      'https://images.unsplash.com/photo-1464822759844-d150df1fe4ba'  // Mountain climbing
    ],
    localCuisine: ['Highland beef', 'Fresh venison', 'Local whisky', 'Traditional haggis', 'Wild salmon'],
    culturalSignificance: 'Sacred to Scottish Highland culture, representing the ultimate physical and spiritual challenge in the Scottish landscape'
  },

  // ROMANTIC DESTINATIONS
  {
    id: 'chipping-campden',
    name: 'Chipping Campden',
    region: 'Cotswolds',
    county: 'Gloucestershire',
    coordinates: { lat: 52.0414, lng: -1.7803 },
    type: 'village',
    moodMapping: {
      primary: ['romantic', 'calm'],
      secondary: ['luxury', 'reflective'],
      seasonal: [
        {
          season: 'spring',
          moodBoosts: ['romantic', 'calm'],
          moodReductions: [],
          description: 'Perfect romantic atmosphere with blooming cottage gardens and gentle spring warmth'
        },
        {
          season: 'summer',
          moodBoosts: ['romantic', 'celebratory'],
          moodReductions: [],
          description: 'Peak romantic season with long evenings and outdoor dining opportunities'
        },
        {
          season: 'autumn',
          moodBoosts: ['romantic', 'reflective'],
          moodReductions: [],
          description: 'Intimate autumn atmosphere with cozy pubs and golden countryside light'
        },
        {
          season: 'winter',
          moodBoosts: ['romantic', 'luxury'],
          moodReductions: [],
          description: 'Magical winter romance with snow-covered honey stone and fireside dining'
        }
      ]
    },
    description: 'Quintessential Cotswolds village with honey-colored limestone buildings, romantic boutique hotels, and intimate countryside walks. Perfect for couples seeking English countryside romance.',
    highlights: [
      'Historic Market Hall and medieval high street',
      'Romantic countryside walks along Cotswold Way',
      'Luxury boutique hotels with four-poster beds',
      'Intimate gastropubs with candlelit dining',
      'Traditional English gardens and cottage flowers'
    ],
    activities: [
      {
        id: 'cotswold-way-walk',
        name: 'Romantic Cotswold Way Walk',
        type: 'outdoor',
        moodMatch: ['romantic', 'calm'],
        duration: '2-4 hours',
        cost: 'free',
        accessibility: 'partial',
        weatherDependent: true,
        bookingRequired: false
      },
      {
        id: 'couples-spa',
        name: 'Couples Spa Treatment',
        type: 'relaxation',
        moodMatch: ['romantic', 'luxury'],
        duration: '2-3 hours',
        cost: 'luxury',
        accessibility: 'full',
        weatherDependent: false,
        bookingRequired: true
      }
    ],
    accessibility: {
      wheelchairAccessible: true,
      hearingLoop: true,
      visualAids: false,
      mobilitySupport: true,
      additionalInfo: ['Level village center streets', 'Accessible accommodation available', 'Some countryside walks have accessibility challenges']
    },
    whenToVisit: [
      {
        season: 'spring',
        rating: 5,
        why: 'Perfect romantic atmosphere with blooming gardens and comfortable temperatures',
        specialEvents: ['May Day celebrations', 'Garden open days'],
        weatherExpectations: 'Mild temperatures, occasional spring showers, beautiful light'
      },
      {
        season: 'summer',
        rating: 4,
        why: 'Beautiful but can be crowded with tourists',
        specialEvents: ['Summer festivals', 'Outdoor theater'],
        weatherExpectations: 'Warm temperatures, long daylight hours'
      },
      {
        season: 'autumn',
        rating: 5,
        why: 'Intimate atmosphere with stunning autumn colors and fewer crowds',
        specialEvents: ['Harvest festivals', 'Autumn walks'],
        weatherExpectations: 'Cool temperatures, beautiful autumn colors'
      },
      {
        season: 'winter',
        rating: 5,
        why: 'Magical romantic atmosphere with cozy interiors and possible snow',
        specialEvents: ['Christmas markets', 'Winter festivities'],
        weatherExpectations: 'Cold temperatures, possible snow, cozy atmosphere'
      }
    ],
    estimatedDuration: ['2-3 days for romantic getaway', '4-5 days for luxury retreat'],
    imageGallery: [
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19', // Cotswolds village
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad', // English countryside
      'https://images.unsplash.com/photo-1505142468610-359e7d316be0'  // Romantic cottage
    ],
    localCuisine: ['Traditional afternoon tea', 'Local Cotswold cheese', 'Farm-to-table cuisine', 'Real ales', 'Seasonal British cuisine'],
    culturalSignificance: 'Historic wool trade town representing the pinnacle of English countryside romance and traditional craftsmanship'
  },

  // CREATIVE & INSPIRED DESTINATIONS
  {
    id: 'st-ives',
    name: 'St Ives',
    region: 'Cornwall',
    county: 'Cornwall',
    coordinates: { lat: 50.2141, lng: -5.4889 },
    type: 'town',
    moodMapping: {
      primary: ['creative', 'social'],
      secondary: ['adventurous', 'celebratory'],
      seasonal: [
        {
          season: 'spring',
          moodBoosts: ['creative', 'calm'],
          moodReductions: [],
          description: 'Perfect light for artists and creative pursuits with fewer crowds'
        },
        {
          season: 'summer',
          moodBoosts: ['social', 'celebratory', 'creative'],
          moodReductions: [],
          description: 'Peak artistic season with festivals, galleries, and social beach culture'
        },
        {
          season: 'autumn',
          moodBoosts: ['creative', 'reflective'],
          moodReductions: ['social'],
          description: 'Dramatic light and storms inspire creative work with fewer tourists'
        },
        {
          season: 'winter',
          moodBoosts: ['creative', 'reflective'],
          moodReductions: ['social', 'celebratory'],
          description: 'Intense creative atmosphere with dramatic winter seascapes'
        }
      ]
    },
    description: 'Historic fishing town turned artists\' colony with exceptional light, world-class galleries, and vibrant creative community. Perfect for artistic inspiration and cultural immersion.',
    highlights: [
      'Tate St Ives with rotating contemporary exhibitions',
      'Barbara Hepworth Museum and Sculpture Garden',
      'Active artists\' studios and workshops',
      'Spectacular coastal light and seascapes',
      'Vibrant harbor with working fishing boats'
    ],
    activities: [
      {
        id: 'art-workshop',
        name: 'Painting Workshop with Local Artist',
        type: 'cultural',
        moodMatch: ['creative', 'reflective'],
        duration: '3-4 hours',
        cost: 'moderate',
        accessibility: 'full',
        weatherDependent: false,
        bookingRequired: true
      },
      {
        id: 'gallery-tour',
        name: 'Private Gallery and Studio Tour',
        type: 'cultural',
        moodMatch: ['creative', 'reflective'],
        duration: '2-3 hours',
        cost: 'moderate',
        accessibility: 'partial',
        weatherDependent: false,
        bookingRequired: true
      }
    ],
    accessibility: {
      wheelchairAccessible: true,
      hearingLoop: true,
      visualAids: true,
      mobilitySupport: true,
      additionalInfo: ['Main galleries fully accessible', 'Some historic artist studios have limited access', 'Accessible beach access available']
    },
    whenToVisit: [
      {
        season: 'spring',
        rating: 5,
        why: 'Perfect creative atmosphere with excellent light and fewer crowds',
        specialEvents: ['Spring art exhibitions', 'Artists open studios'],
        weatherExpectations: 'Mild temperatures, clear light, occasional spring storms'
      },
      {
        season: 'summer',
        rating: 4,
        why: 'Peak artistic season but very crowded',
        specialEvents: ['St Ives Festival', 'Summer art markets'],
        weatherExpectations: 'Warm temperatures, busy tourist season'
      },
      {
        season: 'autumn',
        rating: 5,
        why: 'Excellent for creative work with dramatic light and fewer tourists',
        specialEvents: ['Autumn exhibitions', 'Photography workshops'],
        weatherExpectations: 'Variable weather, dramatic seascapes, intense light'
      },
      {
        season: 'winter',
        rating: 3,
        why: 'Intense creative atmosphere but limited tourist services',
        specialEvents: ['Winter art courses', 'Artist residencies'],
        weatherExpectations: 'Stormy weather, dramatic seas, inspiring winter light'
      }
    ],
    estimatedDuration: ['2-3 days for gallery visits', '4-7 days for art workshop retreat'],
    imageGallery: [
      'https://images.unsplash.com/photo-1539037116277-4db20889f2d4', // St Ives harbor
      'https://images.unsplash.com/photo-1472214103451-9374bd1c798e', // Cornish coast
      'https://images.unsplash.com/photo-1571115764595-644a1f56a55c'  // Art gallery
    ],
    localCuisine: ['Fresh Cornish seafood', 'Traditional Cornish pasties', 'Local craft beers', 'Artisanal ice cream', 'Farm-to-table restaurants'],
    culturalSignificance: 'International artists\' colony since the early 20th century, representing the intersection of natural beauty and creative expression'
  },

  // SOCIAL & FUN DESTINATIONS  
  {
    id: 'brighton',
    name: 'Brighton',
    region: 'South East England',
    county: 'East Sussex',
    coordinates: { lat: 50.8225, lng: -0.1372 },
    type: 'city',
    moodMapping: {
      primary: ['social', 'celebratory'],
      secondary: ['creative', 'adventurous'],
      seasonal: [
        {
          season: 'spring',
          moodBoosts: ['social', 'creative'],
          moodReductions: [],
          description: 'Perfect for social beach activities and cultural events with warming weather'
        },
        {
          season: 'summer',
          moodBoosts: ['social', 'celebratory', 'adventurous'],
          moodReductions: [],
          description: 'Peak party season with festivals, beach parties, and vibrant nightlife'
        },
        {
          season: 'autumn',
          moodBoosts: ['creative', 'social'],
          moodReductions: ['celebratory'],
          description: 'Cultural season with fewer crowds but active social scene'
        },
        {
          season: 'winter',
          moodBoosts: ['social', 'creative'],
          moodReductions: ['celebratory'],
          description: 'Indoor social scene with theaters, clubs, and cultural venues'
        }
      ]
    },
    description: 'Vibrant seaside city famous for its pier, pebble beach, diverse nightlife, and inclusive social culture. Perfect for festival-goers, party enthusiasts, and social butterflies.',
    highlights: [
      'Historic Brighton Pier with amusements and arcades',
      'Vibrant nightlife scene with diverse clubs and bars',
      'Annual Brighton Festival and Fringe events',
      'Eclectic shops in The Lanes and North Laine',
      'Diverse food scene and beachfront dining'
    ],
    activities: [
      {
        id: 'pier-activities',
        name: 'Brighton Pier Fun Fair',
        type: 'family',
        moodMatch: ['social', 'celebratory'],
        duration: '2-4 hours',
        cost: 'budget',
        accessibility: 'partial',
        weatherDependent: false,
        bookingRequired: false
      },
      {
        id: 'nightlife-tour',
        name: 'Brighton Nightlife and Club Tour',
        type: 'outdoor',
        moodMatch: ['social', 'celebratory'],
        duration: '4-6 hours',
        cost: 'moderate',
        accessibility: 'partial',
        weatherDependent: false,
        bookingRequired: false,
        ageRestrictions: '18+ for clubs'
      }
    ],
    accessibility: {
      wheelchairAccessible: true,
      hearingLoop: true,
      visualAids: true,
      mobilitySupport: true,
      additionalInfo: ['Most venues wheelchair accessible', 'Accessible beach access', 'Public transport fully accessible']
    },
    whenToVisit: [
      {
        season: 'spring',
        rating: 4,
        why: 'Great social atmosphere with warming weather and cultural events',
        specialEvents: ['Brighton Comedy Festival', 'Spring art exhibitions'],
        weatherExpectations: 'Mild temperatures, ideal for beach and city activities'
      },
      {
        season: 'summer',
        rating: 5,
        why: 'Peak social season with festivals, beach parties, and perfect weather',
        specialEvents: ['Brighton Festival', 'Pride Brighton', 'Beach festivals'],
        weatherExpectations: 'Warm temperatures, perfect for outdoor social activities'
      },
      {
        season: 'autumn',
        rating: 3,
        why: 'Good for cultural activities but reduced beach/outdoor social scenes',
        specialEvents: ['Autumn theater season', 'Literary festivals'],
        weatherExpectations: 'Cool temperatures, more indoor activities'
      },
      {
        season: 'winter',
        rating: 2,
        why: 'Limited outdoor social activities, focus on indoor venues',
        specialEvents: ['Winter theater productions', 'New Year celebrations'],
        weatherExpectations: 'Cold temperatures, primarily indoor social activities'
      }
    ],
    estimatedDuration: ['2-3 days for social weekend', '4-5 days for festival participation'],
    imageGallery: [
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad', // Brighton pier
      'https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f', // Beach social scene
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e'  // Festival crowd
    ],
    localCuisine: ['Fresh fish and chips', 'International street food', 'Craft cocktails', 'Artisanal coffee', 'Diverse ethnic cuisines'],
    culturalSignificance: 'Historic seaside resort representing British leisure culture and contemporary social diversity and inclusion'
  },

  // CELEBRATORY DESTINATIONS
  {
    id: 'edinburgh',
    name: 'Edinburgh',
    region: 'Scotland',
    county: 'Edinburgh',
    coordinates: { lat: 55.9533, lng: -3.1883 },
    type: 'city',
    moodMapping: {
      primary: ['celebratory', 'creative'],
      secondary: ['reflective', 'luxury'],
      seasonal: [
        {
          season: 'spring',
          moodBoosts: ['creative', 'celebratory'],
          moodReductions: [],
          description: 'Perfect for cultural celebrations and creative festivals with beautiful spring light'
        },
        {
          season: 'summer',
          moodBoosts: ['celebratory', 'social', 'creative'],
          moodReductions: [],
          description: 'Peak festival season with world-famous Edinburgh Festival Fringe'
        },
        {
          season: 'autumn',
          moodBoosts: ['reflective', 'luxury'],
          moodReductions: ['celebratory'],
          description: 'Cultural season with fewer crowds, perfect for whisky tours and historic exploration'
        },
        {
          season: 'winter',
          moodBoosts: ['celebratory', 'luxury'],
          moodReductions: [],
          description: 'Magical winter celebrations with Hogmanay (New Year) and Christmas markets'
        }
      ]
    },
    description: 'Scotland\'s capital city famous for its festivals, historic castle, and celebratory atmosphere. Perfect for cultural celebrations, creative inspiration, and luxury experiences.',
    highlights: [
      'Edinburgh Castle overlooking the city',
      'World-famous Edinburgh Festival Fringe',
      'Historic Royal Mile with traditional shops',
      'Premium whisky tastings and distillery tours',
      'Luxury shopping on Princes Street'
    ],
    activities: [
      {
        id: 'castle-tour',
        name: 'Edinburgh Castle Royal Experience',
        type: 'heritage',
        moodMatch: ['celebratory', 'reflective'],
        duration: '2-3 hours',
        cost: 'moderate',
        accessibility: 'partial',
        weatherDependent: false,
        bookingRequired: true
      },
      {
        id: 'whisky-tasting',
        name: 'Premium Scotch Whisky Tasting',
        type: 'culinary',
        moodMatch: ['celebratory', 'luxury'],
        duration: '2-3 hours',
        cost: 'premium',
        accessibility: 'full',
        weatherDependent: false,
        bookingRequired: true,
        ageRestrictions: '18+ only'
      }
    ],
    accessibility: {
      wheelchairAccessible: true,
      hearingLoop: true,
      visualAids: true,
      mobilitySupport: true,
      additionalInfo: ['Historic sites have limited accessibility', 'Modern venues fully accessible', 'Accessible transport throughout city']
    },
    whenToVisit: [
      {
        season: 'spring',
        rating: 4,
        why: 'Good for cultural activities and celebrations without crowds',
        specialEvents: ['Science Festival', 'Film Festival'],
        weatherExpectations: 'Variable weather, beautiful spring light on historic buildings'
      },
      {
        season: 'summer',
        rating: 5,
        why: 'Peak celebratory season with world-famous festivals',
        specialEvents: ['Edinburgh Festival Fringe', 'Edinburgh International Festival', 'Military Tattoo'],
        weatherExpectations: 'Mild temperatures, extended daylight, festival atmosphere'
      },
      {
        season: 'autumn',
        rating: 3,
        why: 'Good for luxury experiences and cultural exploration',
        specialEvents: ['Autumn cultural season', 'Whisky festivals'],
        weatherExpectations: 'Cool temperatures, beautiful autumn light'
      },
      {
        season: 'winter',
        rating: 5,
        why: 'Magical winter celebrations, especially Hogmanay',
        specialEvents: ['Hogmanay (New Year)', 'Christmas markets', 'Winter festivals'],
        weatherExpectations: 'Cold temperatures, possible snow, dramatic winter atmosphere'
      }
    ],
    estimatedDuration: ['3-4 days for festivals', '2-3 days for cultural tour'],
    imageGallery: [
      'https://images.unsplash.com/photo-1539650116574-75c0c6d73a0e', // Edinburgh Castle
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad', // Royal Mile
      'https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f'  // Festival scene
    ],
    localCuisine: ['Traditional haggis', 'Fresh Scottish seafood', 'Premium Scotch whisky', 'Shortbread and tablet', 'Modern Scottish cuisine'],
    culturalSignificance: 'Scotland\'s cultural capital representing the pinnacle of Celtic celebration, arts, and traditional Scottish hospitality'
  },

  // REFLECTIVE & LEARNING DESTINATIONS
  {
    id: 'canterbury',
    name: 'Canterbury',
    region: 'South East England',
    county: 'Kent',
    coordinates: { lat: 51.2802, lng: 1.0789 },
    type: 'city',
    moodMapping: {
      primary: ['reflective', 'calm'],
      secondary: ['creative', 'romantic'],
      seasonal: [
        {
          season: 'spring',
          moodBoosts: ['reflective', 'calm'],
          moodReductions: [],
          description: 'Perfect for contemplative cathedral visits and peaceful garden walks'
        },
        {
          season: 'summer',
          moodBoosts: ['creative', 'social'],
          moodReductions: [],
          description: 'Cultural festivals and outdoor events enhance creative and social experiences'
        },
        {
          season: 'autumn',
          moodBoosts: ['reflective', 'romantic'],
          moodReductions: [],
          description: 'Ideal for deep reflection with fewer crowds and beautiful autumn atmosphere'
        },
        {
          season: 'winter',
          moodBoosts: ['reflective', 'calm'],
          moodReductions: ['social'],
          description: 'Perfect for quiet contemplation and spiritual reflection'
        }
      ]
    },
    description: 'Historic cathedral city steeped in spiritual significance and literary heritage. Perfect for contemplative experiences, historical learning, and peaceful reflection.',
    highlights: [
      'Canterbury Cathedral - UNESCO World Heritage Site',
      'Canterbury Tales visitor experience',
      'Historic city walls and medieval streets',
      'Peaceful cathedral precincts and gardens',
      'University of Kent campus and libraries'
    ],
    activities: [
      {
        id: 'cathedral-tour',
        name: 'Canterbury Cathedral Spiritual Tour',
        type: 'heritage',
        moodMatch: ['reflective', 'calm'],
        duration: '2-3 hours',
        cost: 'budget',
        accessibility: 'partial',
        weatherDependent: false,
        bookingRequired: false
      },
      {
        id: 'literary-walk',
        name: 'Chaucer and Literary Heritage Walk',
        type: 'cultural',
        moodMatch: ['reflective', 'creative'],
        duration: '1-2 hours',
        cost: 'budget',
        accessibility: 'full',
        weatherDependent: true,
        bookingRequired: false
      }
    ],
    accessibility: {
      wheelchairAccessible: true,
      hearingLoop: true,
      visualAids: true,
      mobilitySupport: true,
      additionalInfo: ['Cathedral has good accessibility', 'Historic city center mostly accessible', 'Audio guides available']
    },
    whenToVisit: [
      {
        season: 'spring',
        rating: 5,
        why: 'Perfect for reflective experiences with blooming cathedral gardens',
        specialEvents: ['Easter celebrations', 'Spring concerts'],
        weatherExpectations: 'Mild temperatures, beautiful light in cathedral'
      },
      {
        season: 'summer',
        rating: 3,
        why: 'Good for cultural activities but can be crowded with tourists',
        specialEvents: ['Canterbury Festival', 'Summer concerts'],
        weatherExpectations: 'Warm temperatures, busy tourist season'
      },
      {
        season: 'autumn',
        rating: 5,
        why: 'Ideal for deep reflection with fewer crowds and contemplative atmosphere',
        specialEvents: ['Autumn lecture series', 'Literary festivals'],
        weatherExpectations: 'Cool temperatures, peaceful atmosphere'
      },
      {
        season: 'winter',
        rating: 4,
        why: 'Perfect for quiet contemplation and spiritual reflection',
        specialEvents: ['Christmas services', 'Winter concerts'],
        weatherExpectations: 'Cold temperatures, dramatic cathedral atmosphere'
      }
    ],
    estimatedDuration: ['1-2 days for spiritual retreat', '3-4 days for literary tour'],
    imageGallery: [
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19', // Canterbury Cathedral
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad', // Historic streets
      'https://images.unsplash.com/photo-1505142468610-359e7d316be0'  // Cathedral interior
    ],
    localCuisine: ['Traditional English fare', 'Local Kentish ales', 'Cathedral refectory meals', 'Historic pub food', 'Afternoon tea'],
    culturalSignificance: 'Spiritual heart of English Christianity and birthplace of English literature through Chaucer\'s Canterbury Tales'
  },

  // LUXURY & PAMPERED DESTINATIONS
  {
    id: 'bath',
    name: 'Bath',
    region: 'South West England',
    county: 'Somerset',
    coordinates: { lat: 51.3751, lng: -2.3669 },
    type: 'city',
    moodMapping: {
      primary: ['luxury', 'calm'],
      secondary: ['romantic', 'reflective'],
      seasonal: [
        {
          season: 'spring',
          moodBoosts: ['luxury', 'romantic'],
          moodReductions: [],
          description: 'Perfect for luxury spa treatments and romantic Georgian architecture exploration'
        },
        {
          season: 'summer',
          moodBoosts: ['luxury', 'celebratory'],
          moodReductions: [],
          description: 'Peak luxury season with outdoor spa experiences and cultural festivals'
        },
        {
          season: 'autumn',
          moodBoosts: ['luxury', 'reflective'],
          moodReductions: [],
          description: 'Ideal for contemplative luxury with fewer crowds and beautiful autumn light'
        },
        {
          season: 'winter',
          moodBoosts: ['luxury', 'calm'],
          moodReductions: [],
          description: 'Perfect for cozy luxury experiences with thermal spas and festive atmosphere'
        }
      ]
    },
    description: 'Georgian city famous for Roman baths, luxury spas, and elegant architecture. Perfect for wellness retreats, luxury pampering, and sophisticated cultural experiences.',
    highlights: [
      'Thermae Bath Spa with rooftop thermal pool',
      'Roman Baths and ancient thermal springs',
      'Georgian architecture and Royal Crescent',
      'Luxury shopping and fine dining',
      'World-class spa hotels and treatments'
    ],
    activities: [
      {
        id: 'thermae-spa',
        name: 'Thermae Bath Spa Full Day Experience',
        type: 'relaxation',
        moodMatch: ['luxury', 'calm'],
        duration: '4-8 hours',
        cost: 'luxury',
        accessibility: 'full',
        weatherDependent: false,
        bookingRequired: true
      },
      {
        id: 'roman-baths',
        name: 'Roman Baths and Audio Tour',
        type: 'heritage',
        moodMatch: ['reflective', 'luxury'],
        duration: '2-3 hours',
        cost: 'moderate',
        accessibility: 'partial',
        weatherDependent: false,
        bookingRequired: false
      }
    ],
    accessibility: {
      wheelchairAccessible: true,
      hearingLoop: true,
      visualAids: true,
      mobilitySupport: true,
      additionalInfo: ['Most attractions wheelchair accessible', 'Spa facilities fully accessible', 'Audio guides available']
    },
    whenToVisit: [
      {
        season: 'spring',
        rating: 5,
        why: 'Perfect for luxury spa experiences with beautiful Georgian architecture',
        specialEvents: ['Bath Festival', 'Spring garden tours'],
        weatherExpectations: 'Mild temperatures, ideal for spa and outdoor exploration'
      },
      {
        season: 'summer',
        rating: 4,
        why: 'Peak luxury season but can be crowded',
        specialEvents: ['Bath International Music Festival', 'Jane Austen Festival'],
        weatherExpectations: 'Warm temperatures, busy tourist season'
      },
      {
        season: 'autumn',
        rating: 5,
        why: 'Ideal luxury experience with fewer crowds and beautiful autumn atmosphere',
        specialEvents: ['Autumn cultural season', 'Literature festivals'],
        weatherExpectations: 'Cool temperatures, perfect for spa experiences'
      },
      {
        season: 'winter',
        rating: 5,
        why: 'Perfect for cozy luxury with thermal spas and festive atmosphere',
        specialEvents: ['Christmas markets', 'Winter spa packages'],
        weatherExpectations: 'Cold temperatures, perfect for thermal spa experiences'
      }
    ],
    estimatedDuration: ['2-3 days for spa retreat', '4-5 days for luxury cultural tour'],
    imageGallery: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5', // Bath architecture
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b', // Spa experience
      'https://images.unsplash.com/photo-1590736969955-71cc94901144'  // Luxury hotel
    ],
    localCuisine: ['Michelin-starred restaurants', 'Traditional afternoon tea', 'Local Somerset cheeses', 'Bath buns (traditional pastry)', 'Fine wines and champagne'],
    culturalSignificance: 'Historic center of wellness and luxury in Britain, representing 2,000 years of spa culture from Roman times to modern luxury'
  }
]

// Price range utilities for UK destinations
export const ukPriceRanges: Record<string, PriceRange> = {
  budgetAccommodation: {
    min: 25,
    max: 60,
    currency: 'GBP',
    period: 'per_night',
    includes: ['Basic room', 'Shared facilities'],
    excludes: ['Meals', 'Activities']
  },
  moderateAccommodation: {
    min: 80,
    max: 150,
    currency: 'GBP', 
    period: 'per_night',
    includes: ['Private room', 'En-suite bathroom', 'Breakfast'],
    excludes: ['Lunch', 'Dinner', 'Activities']
  },
  luxuryAccommodation: {
    min: 200,
    max: 500,
    currency: 'GBP',
    period: 'per_night', 
    includes: ['Luxury room', 'Premium amenities', 'Breakfast', 'Spa access'],
    excludes: ['Meals', 'Premium treatments']
  },
  budgetDining: {
    min: 8,
    max: 20,
    currency: 'GBP',
    period: 'per_person',
    includes: ['Main course', 'Basic drink'],
    excludes: ['Starter', 'Dessert', 'Alcohol']
  },
  premiumDining: {
    min: 35,
    max: 80,
    currency: 'GBP',
    period: 'per_person',
    includes: ['Three-course meal', 'Wine pairing'],
    excludes: ['Premium wine', 'Service charge']
  }
}