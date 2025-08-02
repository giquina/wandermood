export interface Mood {
  id: string;
  name: string;
  emoji: string;
  description: string;
  color: string;
  gradient: string;
}

export interface TripIntent {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface UserPreferences {
  mood: Mood | null;
  intent: TripIntent | null;
  budget: 'low' | 'medium' | 'high' | 'luxury';
  flexibility: 'exact' | 'flexible';
  groupSize: number;
  climate: 'warm' | 'cold' | 'mild' | 'any';
}

export interface TravelExperience {
  id: string;
  title: string;
  destination: string;
  description: string;
  imageUrl: string;
  estimatedCost: number;
  duration: string;
  moodMatch: string[];
  activities: string[];
  tags: string[];
}

// UK-Specific Types and Interfaces

export interface UKRegion {
  id: string;
  name: string;
  description: string;
  counties: string[];
  majorCities: string[];
  characteristicMoods: string[];
}

export interface UKDestination {
  id: string;
  name: string;
  region: string;
  county: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  type: 'city' | 'town' | 'village' | 'nationalpark' | 'coastline' | 'countryside' | 'heritage';
  moodMapping: {
    primary: string[];
    secondary: string[];
    seasonal: SeasonalMoodMapping[];
  };
  description: string;
  highlights: string[];
  activities: UKActivity[];
  accessibility: AccessibilityInfo;
  whenToVisit: SeasonalRecommendation[];
  estimatedDuration: string[];
  imageGallery: string[];
  localCuisine: string[];
  culturalSignificance: string;
}

export interface SeasonalMoodMapping {
  season: 'spring' | 'summer' | 'autumn' | 'winter';
  moodBoosts: string[];
  moodReductions: string[];
  description: string;
}

export interface UKActivity {
  id: string;
  name: string;
  type: 'outdoor' | 'cultural' | 'adventure' | 'relaxation' | 'culinary' | 'heritage' | 'family';
  moodMatch: string[];
  duration: string;
  cost: PricingTier;
  accessibility: 'full' | 'partial' | 'limited';
  weatherDependent: boolean;
  bookingRequired: boolean;
  ageRestrictions?: string;
}

export interface TransportOption {
  id: string;
  type: 'train' | 'bus' | 'coach' | 'flight' | 'ferry' | 'car' | 'walking' | 'cycling';
  provider: string;
  origin: string;
  destination: string;
  duration: string;
  cost: PriceRange;
  frequency: string;
  bookingInfo: BookingDetails;
  accessibility: AccessibilityInfo;
  carbonFootprint: number; // kg CO2 equivalent
  comfortLevel: 'basic' | 'standard' | 'premium' | 'luxury';
}

export interface UKAccommodation {
  id: string;
  name: string;
  type: 'hotel' | 'bnb' | 'hostel' | 'cottage' | 'castle' | 'glamping' | 'pub' | 'spa' | 'unique';
  location: string;
  moodMapping: string[];
  priceRange: PriceRange;
  amenities: string[];
  accessibility: AccessibilityInfo;
  uniqueFeatures: string[];
  bookingPartners: string[];
  seasonalPricing: SeasonalPricing[];
  localAttractions: string[];
  starRating?: number;
  guestRating: number;
}

export interface PriceRange {
  min: number;
  max: number;
  currency: 'GBP';
  period: 'per_person' | 'per_night' | 'per_trip' | 'per_activity';
  includes: string[];
  excludes: string[];
}

export interface SeasonalPricing {
  season: 'spring' | 'summer' | 'autumn' | 'winter';
  multiplier: number;
  specialOffers?: string[];
}

export interface BookingDetails {
  advanceBooking: string;
  cancellationPolicy: string;
  website: string;
  phone?: string;
  mobileApp?: string;
}

export interface AccessibilityInfo {
  wheelchairAccessible: boolean;
  hearingLoop: boolean;
  visualAids: boolean;
  mobilitySupport: boolean;
  additionalInfo: string[];
}

export interface SeasonalRecommendation {
  season: 'spring' | 'summer' | 'autumn' | 'winter';
  rating: 1 | 2 | 3 | 4 | 5;
  why: string;
  specialEvents: string[];
  weatherExpectations: string;
}

export interface UKTripPlan {
  id: string;
  title: string;
  mood: Mood;
  moodIntensity: number;
  destination: UKDestination;
  duration: number; // days
  transport: TransportOption[];
  accommodation: UKAccommodation[];
  activities: UKActivity[];
  totalCost: PriceRange;
  timeline: DayItinerary[];
  weatherConsiderations: string[];
  packingList: string[];
  localTips: string[];
}

export interface DayItinerary {
  day: number;
  theme: string;
  activities: {
    time: string;
    activity: string;
    location: string;
    cost?: number;
    notes?: string;
  }[];
  meals: {
    time: string;
    type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
    recommendation: string;
    cost?: number;
  }[];
  transport: string[];
}

export interface WeatherMoodCorrelation {
  weatherType: 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'foggy' | 'windy';
  moodImpact: {
    enhances: string[];
    diminishes: string[];
    neutral: string[];
  };
  activityRecommendations: string[];
}

export interface UKTravelExperience extends TravelExperience {
  destination: UKDestination;
  transport: TransportOption[];
  accommodation: UKAccommodation[];
  ukActivities: UKActivity[];
  seasonalVariations: SeasonalMoodMapping[];
  regionalCharacteristics: string[];
  culturalExperiences: string[];
  localCuisine: string[];
  sustainabilityRating: number;
  accessibilityRating: number;
}

export type PricingTier = 'free' | 'budget' | 'moderate' | 'premium' | 'luxury';

export interface APIIntegration {
  name: string;
  endpoint: string;
  apiKey?: string;
  rateLimit: number;
  documentation: string;
  status: 'active' | 'maintenance' | 'deprecated';
}

// Subscription and Payment Types
export interface SubscriptionTier {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  stripePriceIdMonthly: string;
  stripePriceIdYearly: string;
  features: string[];
  maxRecommendations: number;
  priority: boolean;
  customization: boolean;
  aiInsights: boolean;
}

export interface UserSubscription {
  id: string;
  userId: string;
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  tier: SubscriptionTier['id'];
  status: 'active' | 'canceled' | 'past_due' | 'unpaid' | 'incomplete';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  billingCycle: 'monthly' | 'yearly';
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
  clientSecret: string;
}

export interface StripeCheckoutSession {
  id: string;
  url: string;
  tier: SubscriptionTier['id'];
  billingCycle: 'monthly' | 'yearly';
}