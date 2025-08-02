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