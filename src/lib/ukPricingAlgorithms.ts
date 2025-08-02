import { PriceRange, UKDestination, TransportOption, UKAccommodation, UKTripPlan } from '@/types'

// UK-specific pricing algorithms and cost calculations

export interface TripCostBreakdown {
  transport: PriceRange
  accommodation: PriceRange
  activities: PriceRange
  meals: PriceRange
  total: PriceRange
  dailyAverage: PriceRange
}

// Base daily cost estimates for different regions and budgets
export const regionalBaseCosts = {
  london: {
    budget: { daily: 80, meals: 25, activities: 15 },
    moderate: { daily: 150, meals: 45, activities: 30 },
    premium: { daily: 280, meals: 80, activities: 60 },
    luxury: { daily: 500, meals: 150, activities: 120 }
  },
  'south-east': {
    budget: { daily: 65, meals: 20, activities: 12 },
    moderate: { daily: 120, meals: 35, activities: 25 },
    premium: { daily: 220, meals: 65, activities: 45 },
    luxury: { daily: 400, meals: 120, activities: 90 }
  },
  'south-west': {
    budget: { daily: 60, meals: 18, activities: 10 },
    moderate: { daily: 110, meals: 32, activities: 22 },
    premium: { daily: 200, meals: 60, activities: 40 },
    luxury: { daily: 380, meals: 110, activities: 80 }
  },
  scotland: {
    budget: { daily: 55, meals: 16, activities: 8 },
    moderate: { daily: 100, meals: 28, activities: 18 },
    premium: { daily: 180, meals: 55, activities: 35 },
    luxury: { daily: 350, meals: 100, activities: 70 }
  },
  wales: {
    budget: { daily: 50, meals: 15, activities: 8 },
    moderate: { daily: 90, meals: 25, activities: 15 },
    premium: { daily: 160, meals: 50, activities: 30 },
    luxury: { daily: 320, meals: 90, activities: 60 }
  },
  'northern-england': {
    budget: { daily: 55, meals: 16, activities: 10 },
    moderate: { daily: 95, meals: 28, activities: 18 },
    premium: { daily: 170, meals: 52, activities: 32 },
    luxury: { daily: 330, meals: 95, activities: 65 }
  }
}

// Seasonal pricing multipliers
export const seasonalMultipliers = {
  spring: {
    accommodation: 1.1,
    transport: 1.0,
    activities: 1.0,
    meals: 1.0
  },
  summer: {
    accommodation: 1.4,
    transport: 1.2,
    activities: 1.1,
    meals: 1.1
  },
  autumn: {
    accommodation: 1.0,
    transport: 0.9,
    activities: 0.9,
    meals: 1.0
  },
  winter: {
    accommodation: 0.8,
    transport: 0.9,
    activities: 0.8,
    meals: 1.0
  }
}

// Mood-specific activity cost adjustments
export const moodCostAdjustments = {
  calm: { activities: 0.8, accommodation: 1.1 }, // Spa treatments cost more
  adventurous: { activities: 1.2, accommodation: 0.9 }, // Adventure activities cost more
  romantic: { accommodation: 1.3, meals: 1.2 }, // Romantic venues premium
  creative: { activities: 1.1, accommodation: 1.0 },
  social: { meals: 1.1, activities: 1.1 },
  celebratory: { meals: 1.3, activities: 1.2, accommodation: 1.1 },
  reflective: { activities: 0.7, accommodation: 1.0 },
  luxury: { accommodation: 1.5, meals: 1.4, activities: 1.3 }
}

// Main pricing calculation function
export const calculateTripCost = (
  destination: UKDestination,
  transport: TransportOption[],
  accommodation: UKAccommodation[],
  duration: number, // days
  groupSize: number,
  budget: 'budget' | 'moderate' | 'premium' | 'luxury',
  mood: string,
  season: 'spring' | 'summer' | 'autumn' | 'winter'
): TripCostBreakdown => {
  
  const region = getRegionFromDestination(destination)
  const baseCosts = regionalBaseCosts[region] || regionalBaseCosts['south-east']
  const budgetCosts = baseCosts[budget]
  const seasonMultiplier = seasonalMultipliers[season]
  const moodAdjustment = moodCostAdjustments[mood as keyof typeof moodCostAdjustments] || { activities: 1.0, accommodation: 1.0, meals: 1.0 }

  // Transport costs
  const transportCost = calculateTransportCosts(transport, groupSize)

  // Accommodation costs
  const accommodationCost = calculateAccommodationCosts(
    accommodation,
    duration,
    groupSize,
    seasonMultiplier.accommodation,
    moodAdjustment.accommodation || 1.0
  )

  // Activity costs
  const activitiesCost = calculateActivityCosts(
    budgetCosts.activities,
    duration,
    groupSize,
    seasonMultiplier.activities,
    moodAdjustment.activities || 1.0
  )

  // Meal costs
  const mealsCost = calculateMealCosts(
    budgetCosts.meals,
    duration,
    groupSize,
    seasonMultiplier.meals,
    moodAdjustment.meals || 1.0
  )

  // Total costs
  const totalMin = transportCost.min + accommodationCost.min + activitiesCost.min + mealsCost.min
  const totalMax = transportCost.max + accommodationCost.max + activitiesCost.max + mealsCost.max

  return {
    transport: transportCost,
    accommodation: accommodationCost,
    activities: activitiesCost,
    meals: mealsCost,
    total: {
      min: totalMin,
      max: totalMax,
      currency: 'GBP',
      period: 'per_trip',
      includes: ['All trip components'],
      excludes: ['Personal shopping', 'Travel insurance', 'Tips']
    },
    dailyAverage: {
      min: Math.round(totalMin / duration),
      max: Math.round(totalMax / duration),
      currency: 'GBP',
      period: 'per_person',
      includes: ['All daily expenses'],
      excludes: ['Personal items']
    }
  }
}

// Helper functions for specific cost calculations
const calculateTransportCosts = (transport: TransportOption[], groupSize: number): PriceRange => {
  if (transport.length === 0) {
    return { min: 0, max: 0, currency: 'GBP', period: 'per_trip', includes: [], excludes: [] }
  }

  const totalMin = transport.reduce((sum, option) => sum + option.cost.min, 0) * groupSize
  const totalMax = transport.reduce((sum, option) => sum + option.cost.max, 0) * groupSize

  return {
    min: totalMin,
    max: totalMax,
    currency: 'GBP',
    period: 'per_trip',
    includes: ['Return transport', 'Basic seat'],
    excludes: ['Meals', 'Seat upgrades', 'Extra luggage']
  }
}

const calculateAccommodationCosts = (
  accommodation: UKAccommodation[],
  duration: number,
  groupSize: number,
  seasonMultiplier: number,
  moodMultiplier: number
): PriceRange => {
  if (accommodation.length === 0) {
    // Default accommodation estimates if none specified
    return {
      min: Math.round(60 * duration * seasonMultiplier * moodMultiplier),
      max: Math.round(150 * duration * seasonMultiplier * moodMultiplier),
      currency: 'GBP',
      period: 'per_trip',
      includes: ['Basic accommodation'],
      excludes: ['Premium services']
    }
  }

  // Calculate rooms needed (assuming 2 people per room)
  const roomsNeeded = Math.ceil(groupSize / 2)
  const avgAccommodation = accommodation[0] // Use first accommodation as base

  const costPerNight = {
    min: avgAccommodation.priceRange.min * seasonMultiplier * moodMultiplier,
    max: avgAccommodation.priceRange.max * seasonMultiplier * moodMultiplier
  }

  return {
    min: Math.round(costPerNight.min * duration * roomsNeeded),
    max: Math.round(costPerNight.max * duration * roomsNeeded),
    currency: 'GBP',
    period: 'per_trip',
    includes: avgAccommodation.priceRange.includes,
    excludes: avgAccommodation.priceRange.excludes
  }
}

const calculateActivityCosts = (
  baseActivityCost: number,
  duration: number,
  groupSize: number,
  seasonMultiplier: number,
  moodMultiplier: number
): PriceRange => {
  const adjustedBase = baseActivityCost * seasonMultiplier * moodMultiplier
  
  return {
    min: Math.round(adjustedBase * 0.7 * duration * groupSize),
    max: Math.round(adjustedBase * 1.5 * duration * groupSize),
    currency: 'GBP',
    period: 'per_trip',
    includes: ['Entry fees', 'Basic activities'],
    excludes: ['Premium experiences', 'Equipment rental', 'Private guides']
  }
}

const calculateMealCosts = (
  baseMealCost: number,
  duration: number,
  groupSize: number,
  seasonMultiplier: number,
  moodMultiplier: number
): PriceRange => {
  const adjustedBase = baseMealCost * seasonMultiplier * moodMultiplier
  const mealsPerDay = 3 // Breakfast, lunch, dinner
  
  return {
    min: Math.round(adjustedBase * 0.8 * mealsPerDay * duration * groupSize),
    max: Math.round(adjustedBase * 1.3 * mealsPerDay * duration * groupSize),
    currency: 'GBP',
    period: 'per_trip',
    includes: ['Three meals per day', 'Basic drinks'],
    excludes: ['Alcohol', 'Premium restaurants', 'Room service']
  }
}

// Utility functions
const getRegionFromDestination = (destination: UKDestination): keyof typeof regionalBaseCosts => {
  const regionMap: Record<string, keyof typeof regionalBaseCosts> = {
    'London': 'london',
    'South East England': 'south-east',
    'South West England': 'south-west',
    'Cornwall': 'south-west',
    'Cotswolds': 'south-east',
    'Lake District': 'northern-england',
    'Scottish Highlands': 'scotland',
    'Scotland': 'scotland',
    'Wales': 'wales',
    'Peak District': 'northern-england',
    'Yorkshire': 'northern-england'
  }

  return regionMap[destination.region] || 'south-east'
}

// Budget optimization functions
export const optimizeForBudget = (
  maxBudget: number,
  destination: UKDestination,
  duration: number,
  groupSize: number,
  mood: string,
  season: 'spring' | 'summer' | 'autumn' | 'winter'
): {
  recommendedBudget: 'budget' | 'moderate' | 'premium' | 'luxury',
  costBreakdown: TripCostBreakdown,
  savings: string[]
} => {
  const budgetOptions: ('budget' | 'moderate' | 'premium' | 'luxury')[] = ['budget', 'moderate', 'premium', 'luxury']
  
  for (const budget of budgetOptions) {
    const costs = calculateTripCost(destination, [], [], duration, groupSize, budget, mood, season)
    
    if (costs.total.max <= maxBudget) {
      const savings = generateSavingsTips(budget, costs, maxBudget)
      
      return {
        recommendedBudget: budget,
        costBreakdown: costs,
        savings
      }
    }
  }

  // If even budget option exceeds budget, provide budget option with extensive savings tips
  const budgetCosts = calculateTripCost(destination, [], [], duration, groupSize, 'budget', mood, season)
  const extensiveSavings = generateExtensiveSavingsTips(budgetCosts, maxBudget)

  return {
    recommendedBudget: 'budget',
    costBreakdown: budgetCosts,
    savings: extensiveSavings
  }
}

const generateSavingsTips = (budget: string, costs: TripCostBreakdown, maxBudget: number): string[] => {
  const savings: string[] = []
  const remainingBudget = maxBudget - costs.total.min

  if (budget === 'budget') {
    savings.push('Book transport well in advance for best prices')
    savings.push('Consider self-catering accommodation to save on meals')
    savings.push('Look for free activities like hiking and museum free days')
  }

  if (remainingBudget > 100) {
    savings.push(`You have £${remainingBudget} remaining for upgrades or extras`)
  }

  return savings
}

const generateExtensiveSavingsTips = (costs: TripCostBreakdown, maxBudget: number): string[] => {
  const overspend = costs.total.min - maxBudget
  
  return [
    `Current minimum cost (£${costs.total.min}) exceeds budget by £${overspend}`,
    'Consider shorter trip duration to reduce accommodation and meal costs',
    'Book advance train tickets instead of flights',
    'Choose hostels or B&Bs instead of hotels',
    'Focus on free activities like hiking, beaches, and free museums',
    'Cook some meals instead of dining out for every meal',
    'Travel during off-peak seasons for lower accommodation rates',
    'Consider group accommodations to split costs'
  ]
}

// Price comparison and alternatives
export const generatePriceAlternatives = (
  originalCost: TripCostBreakdown,
  destination: UKDestination
): {
  shorterTrip: TripCostBreakdown,
  offSeason: TripCostBreakdown,
  budgetOptions: TripCostBreakdown
} => {
  // This would generate alternative pricing scenarios
  // Implementation would recalculate costs with different parameters
  
  return {
    shorterTrip: originalCost, // Placeholder
    offSeason: originalCost,   // Placeholder  
    budgetOptions: originalCost // Placeholder
  }
}

// Real-time pricing updates (placeholder for API integration)
export const updateRealTimePricing = async (tripPlan: UKTripPlan): Promise<TripCostBreakdown> => {
  // This would integrate with real-time pricing APIs
  // For now, return calculated costs
  return calculateTripCost(
    tripPlan.destination,
    tripPlan.transport,
    tripPlan.accommodation,
    tripPlan.duration,
    1, // groupSize would come from user preferences
    'moderate', // budget would come from user preferences
    tripPlan.mood.id,
    'summer' // season would be calculated from dates
  )
}