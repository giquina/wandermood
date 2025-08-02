import { APIIntegration, TransportOption, UKAccommodation, UKDestination } from '@/types'

// API Integration Framework for UK Travel Data
export const ukTravelAPIs: APIIntegration[] = [
  {
    name: 'VisitBritain API',
    endpoint: 'https://api.visitbritain.com/v1/',
    rateLimit: 1000, // requests per hour
    documentation: 'https://developer.visitbritain.com/',
    status: 'active'
  },
  {
    name: 'National Rail Enquiries API',
    endpoint: 'https://api.nationalrail.co.uk/journey/',
    rateLimit: 5000, // requests per day
    documentation: 'https://www.nationalrail.co.uk/developers/',
    status: 'active'
  },
  {
    name: 'TransportAPI',
    endpoint: 'https://transportapi.com/v3/',
    rateLimit: 1000, // requests per day for free tier
    documentation: 'https://developer.transportapi.com/',
    status: 'active'
  },
  {
    name: 'TfL Unified API',
    endpoint: 'https://api.tfl.gov.uk/',
    rateLimit: 500, // requests per minute
    documentation: 'https://api.tfl.gov.uk/',
    status: 'active'
  },
  {
    name: 'Booking.com API',
    endpoint: 'https://distribution-xml.booking.com/',
    rateLimit: 100, // requests per minute
    documentation: 'https://developers.booking.com/',
    status: 'active'
  },
  {
    name: 'Met Office Weather API',
    endpoint: 'https://api-metoffice.apiconnect.ibmcloud.com/',
    rateLimit: 360, // requests per hour
    documentation: 'https://metoffice.apiconnect.ibmcloud.com/',
    status: 'active'
  }
]

// Rate limiting and request management
class APIRateLimiter {
  private requestCounts: Map<string, { count: number; resetTime: number }> = new Map()

  canMakeRequest(apiName: string, rateLimit: number): boolean {
    const now = Date.now()
    const oneHour = 60 * 60 * 1000
    
    const apiData = this.requestCounts.get(apiName)
    
    if (!apiData || now > apiData.resetTime) {
      this.requestCounts.set(apiName, { count: 0, resetTime: now + oneHour })
      return true
    }
    
    return apiData.count < rateLimit
  }

  recordRequest(apiName: string): void {
    const apiData = this.requestCounts.get(apiName)
    if (apiData) {
      apiData.count++
    }
  }
}

const rateLimiter = new APIRateLimiter()

// Generic API client with error handling and retries
class UKTravelAPIClient {
  private baseHeaders = {
    'Content-Type': 'application/json',
    'User-Agent': 'WanderMood/1.0 (UK Travel App)'
  }

  async makeRequest<T>(
    apiName: string,
    endpoint: string,
    options: RequestInit = {},
    apiKey?: string
  ): Promise<T> {
    const api = ukTravelAPIs.find(a => a.name === apiName)
    if (!api) throw new Error(`API ${apiName} not found`)

    if (!rateLimiter.canMakeRequest(apiName, api.rateLimit)) {
      throw new Error(`Rate limit exceeded for ${apiName}`)
    }

    const headers = {
      ...this.baseHeaders,
      ...(apiKey && { 'Authorization': `Bearer ${apiKey}` }),
      ...options.headers
    }

    try {
      const response = await fetch(endpoint, { ...options, headers })
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      rateLimiter.recordRequest(apiName)
      return await response.json()
    } catch (error) {
      console.error(`API request failed for ${apiName}:`, error)
      throw error
    }
  }
}

const apiClient = new UKTravelAPIClient()

// VisitBritain API Integration
export class VisitBritainAPI {
  private apiKey: string | undefined

  constructor(apiKey?: string) {
    this.apiKey = apiKey
  }

  async getDestinations(region?: string): Promise<Partial<UKDestination>[]> {
    try {
      const endpoint = `https://api.visitbritain.com/v1/destinations${region ? `?region=${region}` : ''}`
      const response = await apiClient.makeRequest<any>(
        'VisitBritain API',
        endpoint,
        { method: 'GET' },
        this.apiKey
      )

      return this.mapVisitBritainDestinations(response.data || [])
    } catch (error) {
      console.error('VisitBritain API error:', error)
      return []
    }
  }

  async getAttractions(destinationId: string): Promise<any[]> {
    try {
      const endpoint = `https://api.visitbritain.com/v1/attractions?destination=${destinationId}`
      const response = await apiClient.makeRequest<any>(
        'VisitBritain API',
        endpoint,
        { method: 'GET' },
        this.apiKey
      )

      return response.data || []
    } catch (error) {
      console.error('VisitBritain attractions API error:', error)
      return []
    }
  }

  private mapVisitBritainDestinations(apiData: any[]): Partial<UKDestination>[] {
    return apiData.map(item => ({
      id: item.id,
      name: item.name,
      region: item.region,
      county: item.county,
      coordinates: {
        lat: parseFloat(item.latitude),
        lng: parseFloat(item.longitude)
      },
      description: item.description,
      imageGallery: item.images?.map((img: any) => img.url) || [],
      highlights: item.highlights || []
    }))
  }
}

// National Rail API Integration
export class NationalRailAPI {
  private apiKey: string | undefined

  constructor(apiKey?: string) {
    this.apiKey = apiKey
  }

  async getJourneyPlan(origin: string, destination: string, date?: Date): Promise<Partial<TransportOption>[]> {
    try {
      const dateParam = date ? date.toISOString().split('T')[0] : ''
      const endpoint = `https://api.nationalrail.co.uk/journey/plan?origin=${origin}&destination=${destination}&date=${dateParam}`
      
      const response = await apiClient.makeRequest<any>(
        'National Rail Enquiries API',
        endpoint,
        { method: 'GET' },
        this.apiKey
      )

      return this.mapNationalRailJourneys(response.journeys || [])
    } catch (error) {
      console.error('National Rail API error:', error)
      return []
    }
  }

  async getLiveTrainTimes(station: string): Promise<any[]> {
    try {
      const endpoint = `https://api.nationalrail.co.uk/departures/${station}`
      const response = await apiClient.makeRequest<any>(
        'National Rail Enquiries API',
        endpoint,
        { method: 'GET' },
        this.apiKey
      )

      return response.departures || []
    } catch (error) {
      console.error('National Rail live times API error:', error)
      return []
    }
  }

  private mapNationalRailJourneys(apiData: any[]): Partial<TransportOption>[] {
    return apiData.map(journey => ({
      id: `rail-${journey.id}`,
      type: 'train' as const,
      provider: journey.operator,
      origin: journey.origin.name,
      destination: journey.destination.name,
      duration: journey.duration,
      cost: {
        min: parseFloat(journey.fares?.cheapest || '0'),
        max: parseFloat(journey.fares?.most_expensive || '0'),
        currency: 'GBP' as const,
        period: 'per_person' as const,
        includes: ['Standard seat'],
        excludes: ['Meals', 'Seat reservation']
      },
      frequency: journey.frequency || 'Variable',
      accessibility: {
        wheelchairAccessible: journey.accessible || false,
        hearingLoop: journey.hearingLoop || false,
        visualAids: false,
        mobilitySupport: journey.accessible || false,
        additionalInfo: []
      },
      carbonFootprint: this.calculateRailCarbonFootprint(journey.distance),
      comfortLevel: 'standard' as const
    }))
  }

  private calculateRailCarbonFootprint(distance: number): number {
    // UK rail average: 22g CO2 per passenger km
    return Math.round(distance * 0.022)
  }
}

// Transport API Integration (for buses, coaches, local transport)
export class TransportAPI {
  private apiKey: string | undefined

  constructor(apiKey?: string) {
    this.apiKey = apiKey
  }

  async getBusRoutes(origin: string, destination: string): Promise<Partial<TransportOption>[]> {
    try {
      const endpoint = `https://transportapi.com/v3/uk/public/journey/from/${origin}/to/${destination}.json`
      const response = await apiClient.makeRequest<any>(
        'TransportAPI',
        endpoint,
        { method: 'GET' },
        this.apiKey
      )

      return this.mapTransportAPIJourneys(response.routes || [])
    } catch (error) {
      console.error('TransportAPI error:', error)
      return []
    }
  }

  private mapTransportAPIJourneys(apiData: any[]): Partial<TransportOption>[] {
    return apiData.map(route => ({
      id: `bus-${route.id}`,
      type: route.mode as 'bus' | 'coach',
      provider: route.operator,
      origin: route.origin.name,
      destination: route.destination.name,
      duration: route.duration,
      cost: {
        min: parseFloat(route.fares?.adult?.min || '5'),
        max: parseFloat(route.fares?.adult?.max || '25'),
        currency: 'GBP' as const,
        period: 'per_person' as const,
        includes: ['Standard seat'],
        excludes: ['Premium seats']
      },
      frequency: route.frequency || 'Variable'
    }))
  }
}

// Booking.com API Integration
export class BookingAPI {
  private apiKey: string | undefined

  constructor(apiKey?: string) {
    this.apiKey = apiKey
  }

  async searchAccommodation(
    destination: string,
    checkIn: Date,
    checkOut: Date,
    guests: number = 2
  ): Promise<Partial<UKAccommodation>[]> {
    try {
      const endpoint = `https://distribution-xml.booking.com/json/bookings.searchResults`
      const params = new URLSearchParams({
        dest_type: 'city',
        dest_id: destination,
        checkin: checkIn.toISOString().split('T')[0],
        checkout: checkOut.toISOString().split('T')[0],
        adults: guests.toString()
      })

      const response = await apiClient.makeRequest<any>(
        'Booking.com API',
        `${endpoint}?${params}`,
        { method: 'GET' },
        this.apiKey
      )

      return this.mapBookingResults(response.results || [])
    } catch (error) {
      console.error('Booking.com API error:', error)
      return []
    }
  }

  private mapBookingResults(apiData: any[]): Partial<UKAccommodation>[] {
    return apiData.map(hotel => ({
      id: `booking-${hotel.hotel_id}`,
      name: hotel.hotel_name,
      type: this.mapHotelType(hotel.hotel_type),
      location: hotel.address,
      priceRange: {
        min: parseFloat(hotel.min_total_price || '0'),
        max: parseFloat(hotel.max_total_price || '0'),
        currency: 'GBP' as const,
        period: 'per_night' as const,
        includes: hotel.price_includes || [],
        excludes: ['Tourist tax', 'City tax']
      },
      amenities: hotel.facilities || [],
      starRating: parseInt(hotel.star_rating || '0'),
      guestRating: parseFloat(hotel.review_score || '0') / 2, // Convert from 10-point to 5-point scale
      accessibility: {
        wheelchairAccessible: hotel.facilities?.includes('wheelchair_accessible') || false,
        hearingLoop: false,
        visualAids: false,
        mobilitySupport: hotel.facilities?.includes('wheelchair_accessible') || false,
        additionalInfo: []
      }
    }))
  }

  private mapHotelType(bookingType: string): UKAccommodation['type'] {
    const typeMap: Record<string, UKAccommodation['type']> = {
      'hotel': 'hotel',
      'bed_and_breakfast': 'bnb',
      'hostel': 'hostel',
      'apartment': 'cottage',
      'guest_house': 'bnb',
      'resort': 'hotel',
      'spa': 'spa'
    }
    return typeMap[bookingType] || 'hotel'
  }
}

// Met Office Weather API Integration
export class MetOfficeAPI {
  private apiKey: string | undefined

  constructor(apiKey?: string) {
    this.apiKey = apiKey
  }

  async getCurrentWeather(location: string): Promise<any> {
    try {
      const endpoint = `https://api-metoffice.apiconnect.ibmcloud.com/metoffice/production/v0/forecasts/point/hourly`
      const params = new URLSearchParams({
        latitude: '51.5074', // This would be dynamic based on location
        longitude: '-0.1278'
      })

      const response = await apiClient.makeRequest<any>(
        'Met Office Weather API',
        `${endpoint}?${params}`,
        { method: 'GET' },
        this.apiKey
      )

      return response
    } catch (error) {
      console.error('Met Office API error:', error)
      return null
    }
  }

  async getWeatherForecast(location: string, days: number = 7): Promise<any> {
    try {
      const endpoint = `https://api-metoffice.apiconnect.ibmcloud.com/metoffice/production/v0/forecasts/point/daily`
      const response = await apiClient.makeRequest<any>(
        'Met Office Weather API',
        endpoint,
        { method: 'GET' },
        this.apiKey
      )

      return response
    } catch (error) {
      console.error('Met Office forecast API error:', error)
      return null
    }
  }
}

// Main API integration service
export class UKTravelDataService {
  private visitBritain: VisitBritainAPI
  private nationalRail: NationalRailAPI
  private transportAPI: TransportAPI
  private bookingAPI: BookingAPI
  private metOffice: MetOfficeAPI

  constructor(apiKeys: {
    visitBritain?: string
    nationalRail?: string
    transportAPI?: string
    bookingAPI?: string
    metOffice?: string
  } = {}) {
    this.visitBritain = new VisitBritainAPI(apiKeys.visitBritain)
    this.nationalRail = new NationalRailAPI(apiKeys.nationalRail)
    this.transportAPI = new TransportAPI(apiKeys.transportAPI)
    this.bookingAPI = new BookingAPI(apiKeys.bookingAPI)
    this.metOffice = new MetOfficeAPI(apiKeys.metOffice)
  }

  // Comprehensive trip planning with multiple API calls
  async planTrip(
    origin: string,
    destination: string,
    checkIn: Date,
    checkOut: Date,
    guests: number
  ): Promise<{
    destinations: Partial<UKDestination>[]
    transport: Partial<TransportOption>[]
    accommodation: Partial<UKAccommodation>[]
    weather: any
  }> {
    try {
      const [destinations, transport, accommodation, weather] = await Promise.all([
        this.visitBritain.getDestinations(),
        Promise.all([
          this.nationalRail.getJourneyPlan(origin, destination),
          this.transportAPI.getBusRoutes(origin, destination)
        ]).then(results => results.flat()),
        this.bookingAPI.searchAccommodation(destination, checkIn, checkOut, guests),
        this.metOffice.getCurrentWeather(destination)
      ])

      return {
        destinations,
        transport,
        accommodation,
        weather
      }
    } catch (error) {
      console.error('Trip planning API error:', error)
      throw error
    }
  }

  // Real-time updates for existing trip plans
  async getRealtimeUpdates(tripId: string): Promise<{
    transportDelays: any[]
    weatherUpdates: any
    accommodationAvailability: any[]
  }> {
    // This would fetch real-time updates for an existing trip
    return {
      transportDelays: [],
      weatherUpdates: null,
      accommodationAvailability: []
    }
  }
}

// Export singleton instance (optional API keys would be configured in environment)
export const ukTravelService = new UKTravelDataService({
  // API keys would be loaded from environment variables
  visitBritain: process.env.VISIT_BRITAIN_API_KEY,
  nationalRail: process.env.NATIONAL_RAIL_API_KEY,
  transportAPI: process.env.TRANSPORT_API_KEY,
  bookingAPI: process.env.BOOKING_API_KEY,
  metOffice: process.env.MET_OFFICE_API_KEY
})

// Error handling and fallback data
export const handleAPIError = (apiName: string, error: Error): void => {
  console.error(`${apiName} API Error:`, error.message)
  
  // Log to monitoring service (if available)
  // Fallback to static data if needed
  // Notify user of limited functionality
}

// API health check
export const checkAPIStatus = async (): Promise<Record<string, boolean>> => {
  const status: Record<string, boolean> = {}
  
  for (const api of ukTravelAPIs) {
    try {
      const response = await fetch(api.endpoint, { method: 'HEAD' })
      status[api.name] = response.ok
    } catch {
      status[api.name] = false
    }
  }
  
  return status
}