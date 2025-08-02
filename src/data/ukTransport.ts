import { TransportOption, PriceRange } from '@/types'

// UK Transport Networks and Realistic Pricing Data
export const ukTransportOptions: TransportOption[] = [
  
  // NATIONAL RAIL SERVICES
  {
    id: 'london-edinburgh-rail',
    type: 'train',
    provider: 'LNER (London North Eastern Railway)',
    origin: 'London Kings Cross',
    destination: 'Edinburgh Waverley',
    duration: '4h 30m',
    cost: {
      min: 35,
      max: 180,
      currency: 'GBP',
      period: 'per_person',
      includes: ['Standard seat', 'WiFi'],
      excludes: ['Meals', 'Seat reservation']
    },
    frequency: 'Every 30 minutes',
    bookingInfo: {
      advanceBooking: 'Up to 12 weeks in advance for best prices',
      cancellationPolicy: 'Advance tickets non-refundable, Anytime tickets fully flexible',
      website: 'https://www.lner.co.uk',
      phone: '03457 225 225',
      mobileApp: 'LNER App'
    },
    accessibility: {
      wheelchairAccessible: true,
      hearingLoop: true,
      visualAids: true,
      mobilitySupport: true,
      additionalInfo: ['Wheelchair spaces bookable', 'Assistance available', 'Audio announcements']
    },
    carbonFootprint: 22, // kg CO2 equivalent per person
    comfortLevel: 'standard'
  },

  {
    id: 'london-cornwall-rail',
    type: 'train', 
    provider: 'GWR (Great Western Railway)',
    origin: 'London Paddington',
    destination: 'St Ives',
    duration: '5h 45m (including connection)',
    cost: {
      min: 45,
      max: 220,
      currency: 'GBP',
      period: 'per_person',
      includes: ['Standard seat', 'WiFi', 'Connection at St Erth'],
      excludes: ['Meals', 'First class upgrade']
    },
    frequency: 'Every 2 hours',
    bookingInfo: {
      advanceBooking: 'Up to 12 weeks in advance',
      cancellationPolicy: 'Advance tickets restricted, Off-Peak flexible',
      website: 'https://www.gwr.com',
      phone: '03457 000 125'
    },
    accessibility: {
      wheelchairAccessible: true,
      hearingLoop: true,
      visualAids: false,
      mobilitySupport: true,
      additionalInfo: ['Connection assistance available', 'Step-free access at major stations']
    },
    carbonFootprint: 28,
    comfortLevel: 'standard'
  },

  {
    id: 'london-lake-district-rail',
    type: 'train',
    provider: 'Avanti West Coast',
    origin: 'London Euston', 
    destination: 'Windermere',
    duration: '3h 45m (via Preston)',
    cost: {
      min: 40,
      max: 195,
      currency: 'GBP',
      period: 'per_person',
      includes: ['Standard seat', 'WiFi', 'Connection at Oxenholme'],
      excludes: ['Meals', 'Seat reservation']
    },
    frequency: 'Every hour',
    bookingInfo: {
      advanceBooking: 'Up to 12 weeks in advance',
      cancellationPolicy: 'Advance tickets non-refundable',
      website: 'https://www.avantiwestcoast.co.uk',
      phone: '0345 528 0253'
    },
    accessibility: {
      wheelchairAccessible: true,
      hearingLoop: true,
      visualAids: true,
      mobilitySupport: true,
      additionalInfo: ['Modern accessible trains', 'Assistance team available']
    },
    carbonFootprint: 25,
    comfortLevel: 'standard'
  },

  // COACH SERVICES
  {
    id: 'london-edinburgh-coach',
    type: 'coach',
    provider: 'National Express',
    origin: 'London Victoria Coach Station',
    destination: 'Edinburgh Bus Station',
    duration: '9h 30m',
    cost: {
      min: 15,
      max: 45,
      currency: 'GBP',
      period: 'per_person',
      includes: ['Standard seat', 'WiFi', 'Toilet facilities'],
      excludes: ['Meals', 'Extra legroom']
    },
    frequency: '4 times daily',
    bookingInfo: {
      advanceBooking: 'Up to 3 months in advance',
      cancellationPolicy: 'Free cancellation up to 24 hours before travel',
      website: 'https://www.nationalexpress.com',
      phone: '08717 818178'
    },
    accessibility: {
      wheelchairAccessible: true,
      hearingLoop: false,
      visualAids: false,
      mobilitySupport: true,
      additionalInfo: ['Wheelchair accessible coaches available', 'Assistance dogs welcome']
    },
    carbonFootprint: 35,
    comfortLevel: 'basic'
  },

  {
    id: 'london-cornwall-coach',
    type: 'coach',
    provider: 'National Express',
    origin: 'London Victoria Coach Station',
    destination: 'St Ives',
    duration: '8h 15m',
    cost: {
      min: 20,
      max: 55,
      currency: 'GBP',
      period: 'per_person',
      includes: ['Standard seat', 'WiFi', 'Rest stops'],
      excludes: ['Meals', 'Priority boarding']
    },
    frequency: '3 times daily',
    bookingInfo: {
      advanceBooking: 'Up to 3 months in advance',
      cancellationPolicy: 'Flexible tickets available',
      website: 'https://www.nationalexpress.com',
      phone: '08717 818178'
    },
    accessibility: {
      wheelchairAccessible: true,
      hearingLoop: false,
      visualAids: false,
      mobilitySupport: true,
      additionalInfo: ['Limited wheelchair spaces - book in advance']
    },
    carbonFootprint: 32,
    comfortLevel: 'basic'
  },

  // DOMESTIC FLIGHTS
  {
    id: 'london-edinburgh-flight',
    type: 'flight',
    provider: 'British Airways',
    origin: 'London Heathrow (LHR)',
    destination: 'Edinburgh Airport (EDI)',
    duration: '1h 25m',
    cost: {
      min: 80,
      max: 250,
      currency: 'GBP',
      period: 'per_person',
      includes: ['Standard seat', 'Small cabin bag'],
      excludes: ['Checked luggage', 'Meals', 'Seat selection']
    },
    frequency: 'Every 2 hours',
    bookingInfo: {
      advanceBooking: 'Up to 355 days in advance',
      cancellationPolicy: 'Basic tickets non-refundable, Flex tickets changeable',
      website: 'https://www.britishairways.com',
      phone: '0344 493 0787'
    },
    accessibility: {
      wheelchairAccessible: true,
      hearingLoop: true,
      visualAids: true,
      mobilitySupport: true,
      additionalInfo: ['Special assistance available', 'Wheelchair accessible aircraft']
    },
    carbonFootprint: 85,
    comfortLevel: 'standard'
  },

  {
    id: 'london-newquay-flight',
    type: 'flight',
    provider: 'Loganair',
    origin: 'London Gatwick (LGW)',
    destination: 'Newquay Airport (NQY)',
    duration: '1h 15m',
    cost: {
      min: 60,
      max: 180,
      currency: 'GBP',
      period: 'per_person',
      includes: ['Standard seat', 'Cabin bag'],
      excludes: ['Checked luggage', 'Refreshments']
    },
    frequency: 'Daily',
    bookingInfo: {
      advanceBooking: 'Up to 11 months in advance',
      cancellationPolicy: 'Standard tickets non-refundable',
      website: 'https://www.loganair.co.uk',
      phone: '0344 800 2855'
    },
    accessibility: {
      wheelchairAccessible: true,
      hearingLoop: false,
      visualAids: false,
      mobilitySupport: true,
      additionalInfo: ['Small aircraft with limited accessibility features']
    },
    carbonFootprint: 78,
    comfortLevel: 'basic'
  },

  // FERRY SERVICES
  {
    id: 'oban-mull-ferry',
    type: 'ferry',
    provider: 'CalMac Ferries',
    origin: 'Oban',
    destination: 'Craignure, Isle of Mull',
    duration: '45 minutes',
    cost: {
      min: 12,
      max: 35,
      currency: 'GBP',
      period: 'per_person',
      includes: ['Passenger fare', 'Vehicle deck access'],
      excludes: ['Car transport', 'Cabin booking']
    },
    frequency: '6-8 sailings daily',
    bookingInfo: {
      advanceBooking: 'Essential in summer, recommended year-round',
      cancellationPolicy: 'Free cancellation up to departure',
      website: 'https://www.calmac.co.uk',
      phone: '0800 066 5000'
    },
    accessibility: {
      wheelchairAccessible: true,
      hearingLoop: true,
      visualAids: false,
      mobilitySupport: true,
      additionalInfo: ['Lift access to all decks', 'Accessible toilets', 'Assistance available']
    },
    carbonFootprint: 15,
    comfortLevel: 'basic'
  },

  // LONDON TRANSPORT
  {
    id: 'london-underground',
    type: 'train',
    provider: 'Transport for London (TfL)',
    origin: 'Central London',
    destination: 'Outer London',
    duration: '30-60 minutes',
    cost: {
      min: 2.80,
      max: 5.60,
      currency: 'GBP',
      period: 'per_person',
      includes: ['Single journey', 'Contactless payment'],
      excludes: ['Paper tickets (more expensive)']
    },
    frequency: 'Every 2-5 minutes',
    bookingInfo: {
      advanceBooking: 'Not required - contactless payment',
      cancellationPolicy: 'No cancellations - pay per journey',
      website: 'https://tfl.gov.uk',
      phone: '0343 222 1234'
    },
    accessibility: {
      wheelchairAccessible: true,
      hearingLoop: true,
      visualAids: true,
      mobilitySupport: true,
      additionalInfo: ['Step-free access at many stations', 'Audio and visual announcements']
    },
    carbonFootprint: 3,
    comfortLevel: 'standard'
  },

  // RURAL TRANSPORT OPTIONS
  {
    id: 'lake-district-bus',
    type: 'bus',
    provider: 'Stagecoach Cumbria',
    origin: 'Windermere Station',
    destination: 'Grasmere Village',
    duration: '25 minutes',
    cost: {
      min: 3.50,
      max: 8.00,
      currency: 'GBP',
      period: 'per_person',
      includes: ['Single journey', 'Day ticket available'],
      excludes: ['Multi-day passes']
    },
    frequency: 'Every 30 minutes',
    bookingInfo: {
      advanceBooking: 'Not required',
      cancellationPolicy: 'No advance booking required',
      website: 'https://www.stagecoachbus.com',
      phone: '01946 63222'
    },
    accessibility: {
      wheelchairAccessible: true,
      hearingLoop: false,
      visualAids: false,
      mobilitySupport: true,
      additionalInfo: ['Low-floor buses', 'Space for wheelchair users']
    },
    carbonFootprint: 8,
    comfortLevel: 'basic'
  }
]

// Transport Route Planning Utilities
export const getTransportOptions = (origin: string, destination: string): TransportOption[] => {
  return ukTransportOptions.filter(option => 
    option.origin.toLowerCase().includes(origin.toLowerCase()) ||
    option.destination.toLowerCase().includes(destination.toLowerCase())
  )
}

export const getTransportByType = (type: TransportOption['type']): TransportOption[] => {
  return ukTransportOptions.filter(option => option.type === type)
}

export const calculateJourneyTime = (options: TransportOption[]): string => {
  if (options.length === 0) return 'No options available'
  
  const shortest = options.reduce((prev, current) => {
    const prevMinutes = parseJourneyTime(prev.duration)
    const currentMinutes = parseJourneyTime(current.duration)
    return prevMinutes < currentMinutes ? prev : current
  })
  
  return shortest.duration
}

export const calculateJourneyCost = (options: TransportOption[], passengers: number = 1): PriceRange => {
  if (options.length === 0) {
    return {
      min: 0,
      max: 0,
      currency: 'GBP',
      period: 'per_person',
      includes: [],
      excludes: []
    }
  }
  
  const minCost = Math.min(...options.map(option => option.cost.min)) * passengers
  const maxCost = Math.max(...options.map(option => option.cost.max)) * passengers
  
  return {
    min: minCost,
    max: maxCost,
    currency: 'GBP',
    period: 'per_trip',
    includes: ['Transport fare'],
    excludes: ['Meals', 'Accommodation']
  }
}

// Helper function to parse journey time strings
const parseJourneyTime = (duration: string): number => {
  const hours = duration.match(/(\d+)h/)?.[1] || '0'
  const minutes = duration.match(/(\d+)m/)?.[1] || '0'
  return parseInt(hours) * 60 + parseInt(minutes)
}

// Carbon Footprint Comparison
export const getLowestCarbonOption = (options: TransportOption[]): TransportOption | null => {
  if (options.length === 0) return null
  
  return options.reduce((prev, current) => 
    prev.carbonFootprint < current.carbonFootprint ? prev : current
  )
}

// Accessibility Filtering
export const getAccessibleTransport = (options: TransportOption[]): TransportOption[] => {
  return options.filter(option => 
    option.accessibility.wheelchairAccessible &&
    option.accessibility.mobilitySupport
  )
}

// Pricing Tiers for Transport
export const transportPricingTiers = {
  budget: { min: 0, max: 50 },
  moderate: { min: 50, max: 120 },
  premium: { min: 120, max: 250 },
  luxury: { min: 250, max: 500 }
}

// Real-time Transport Status (placeholder for API integration)
export const getTransportStatus = async (transportId: string): Promise<{
  status: 'on-time' | 'delayed' | 'cancelled';
  delay?: number;
  reason?: string;
}> => {
  // This would integrate with real transport APIs
  return {
    status: 'on-time'
  }
}