# AI & Mood Intelligence Engine - WanderMood 🧠

## Overview

The Mood Intelligence Engine is the core differentiator of WanderMood - it's what transforms simple emotion input into personalized travel recommendations. Think of it as a sophisticated translator that converts feelings into travel experiences, learning and improving with each interaction.

## Mood Capture & Processing

### Input Methods Hierarchy

**Primary: Visual Emoji + Intensity**
```
User sees: 😌 Calm [Slider: ████████░░] 8/10
System stores: { "calm": 0.8, "timestamp": "2025-08-02T14:30:00Z" }
```

**Secondary: Quick Text Responses**
```
"How are you feeling about travel right now?"
- "I need to unwind" → calm: 0.9, restore: 0.8
- "I'm so bored" → adventurous: 0.7, explore: 0.8
- "Stressed from work" → calm: 0.9, restore: 0.9, professional: -0.3
```

**Advanced: Natural Language Processing**
```
User voice/text: "I've been working crazy hours and just want somewhere peaceful"
NLP extraction: {
  "stressed": 0.8,
  "calm_seeking": 0.9,
  "work_pressure": 0.7,
  "peace_priority": 0.9,
  "duration_hint": "short_escape"
}
```

### Mood Vector Creation

Each user mood input creates a multi-dimensional vector:

```javascript
MoodVector = {
  // Primary emotional states (0-1 scale)
  calm: 0.8,
  adventurous: 0.2,
  romantic: 0.1,
  creative: 0.3,
  social: 0.1,
  celebratory: 0.0,
  
  // Context modifiers
  stress_level: 0.9,
  energy_level: 0.3,
  novelty_seeking: 0.4,
  comfort_seeking: 0.8,
  
  // Temporal factors
  timestamp: "2025-08-02T14:30:00Z",
  recency_weight: 1.0,
  seasonal_factor: 0.7, // winter = more restore-seeking
  
  // User context
  user_id: "user_123",
  location: "NYC",
  typical_budget: "mid_range"
}
```

### Mood Pattern Recognition

**Individual Patterns**:
- Weekly mood cycles (Sunday evening stress, Friday excitement)
- Seasonal patterns (winter restoration, summer adventure)
- Life event correlations (work deadlines → calm seeking)
- Travel recovery patterns (post-trip mood improvements)

**Collective Intelligence**:
- Similar demographic mood patterns
- Geographic mood trends
- Seasonal mood migration patterns
- Cultural event impact on travel moods

## Experience Scoring & Matching

### Experience Mood Profiles

Each travel experience has a pre-computed mood compatibility score:

```javascript
ExperienceProfile = {
  experience_id: "zen_spa_retreat_sedona",
  name: "Desert Zen Spa Retreat - Sedona",
  
  // Mood compatibility scores (0-1)
  mood_scores: {
    calm: 0.95,          // Perfect for calm-seeking
    restore: 0.98,       // Exceptional for restoration
    romantic: 0.7,       // Moderately romantic (couples spa)
    adventurous: 0.1,    // Low adventure factor
    creative: 0.6,       // Inspiring desert setting
    social: 0.2          // Quiet, introspective experience
  },
  
  // Experience characteristics
  intensity_level: 0.2,  // Very low intensity
  novelty_factor: 0.4,   // Somewhat unique experience
  comfort_level: 0.9,    // High comfort and luxury
  
  // Practical factors
  budget_range: [200, 500], // Price per night
  duration_optimal: [2, 4], // Days
  season_scores: {
    spring: 0.9,
    summer: 0.7,  // Hot but manageable
    fall: 0.95,   // Perfect weather
    winter: 0.8   // Mild, fewer crowds
  }
}
```

### Matching Algorithm

**Step 1: Mood Vector Similarity**
```javascript
function calculateMoodMatch(userMood, experienceMood) {
  // Weighted cosine similarity with mood priorities
  let similarity = 0;
  let totalWeight = 0;
  
  for (let mood in userMood) {
    if (experienceMood[mood] !== undefined) {
      let weight = userMood[mood]; // User's mood intensity as weight
      similarity += weight * userMood[mood] * experienceMood[mood];
      totalWeight += weight;
    }
  }
  
  return similarity / totalWeight;
}
```

**Step 2: Context Adjustment**
```javascript
function adjustForContext(baseScore, userContext, experienceContext) {
  let adjustedScore = baseScore;
  
  // Budget compatibility
  if (experienceContext.price > userContext.budget_max) {
    adjustedScore *= 0.3; // Heavy penalty for over-budget
  }
  
  // Seasonal optimization
  let currentSeason = getCurrentSeason();
  adjustedScore *= experienceContext.season_scores[currentSeason];
  
  // Distance preference
  let distance = calculateDistance(userContext.location, experienceContext.location);
  if (distance > userContext.max_distance) {
    adjustedScore *= Math.exp(-distance / userContext.distance_tolerance);
  }
  
  return adjustedScore;
}
```

**Step 3: Personalization Layer**
```javascript
function personalizeScore(baseScore, userHistory, experience) {
  let personalizedScore = baseScore;
  
  // Past booking behavior
  let similarBookings = findSimilarBookings(userHistory, experience);
  if (similarBookings.length > 0) {
    let avgRating = calculateAverageRating(similarBookings);
    personalizedScore *= (0.7 + 0.3 * avgRating); // Boost if similar experiences rated well
  }
  
  // Collaborative filtering
  let similarUsers = findSimilarUsers(userHistory);
  let similarUserRatings = getSimilarUserRatings(similarUsers, experience);
  if (similarUserRatings.length > 0) {
    let collaborativeScore = calculateAverageRating(similarUserRatings);
    personalizedScore = 0.8 * personalizedScore + 0.2 * collaborativeScore;
  }
  
  // Diversity boost (prevent echo chamber)
  if (isDiverseFromRecentRecommendations(experience, userHistory.recent_recommendations)) {
    personalizedScore *= 1.1; // 10% boost for diversity
  }
  
  return personalizedScore;
}
```

## Learning & Adaptation

### Feedback Integration

**Implicit Feedback**:
- Save rate per recommendation type
- Time spent viewing different experiences
- Click-through rates to booking partners
- Return app usage after recommendations

**Explicit Feedback**:
- Star ratings on recommended experiences
- "This matched my mood" thumbs up/down
- Post-trip mood check-ins
- "Why did you choose this?" optional surveys

**Feedback Processing**:
```javascript
function updateMoodModel(userId, experience, feedback) {
  // Update user's mood-experience preference matrix
  let userProfile = getUserProfile(userId);
  let experienceMoods = getExperienceMoodProfile(experience);
  
  // Strengthen or weaken mood-experience associations
  for (let mood in experienceMoods) {
    if (feedback.rating >= 4) {
      userProfile.mood_preferences[mood] += 0.1 * feedback.confidence;
    } else if (feedback.rating <= 2) {
      userProfile.mood_preferences[mood] -= 0.1 * feedback.confidence;
    }
  }
  
  // Update global mood-experience correlation data
  updateGlobalMoodModel(experienceMoods, feedback);
}
```

### Continuous Improvement

**A/B Testing Framework**:
- Test different mood input interfaces
- Compare recommendation algorithms
- Optimize mood-to-experience mapping
- Experiment with personalization weights

**Model Retraining**:
- Weekly batch updates of mood-experience correlations
- Monthly retraining of personalization models
- Seasonal adjustment of mood patterns
- Real-time adjustment for trending experiences

## Technical Implementation

### Data Architecture

**User Mood Storage**:
```javascript
// Time-series mood data
MoodHistory = {
  user_id: "user_123",
  mood_entries: [
    {
      timestamp: "2025-08-02T14:30:00Z",
      mood_vector: { calm: 0.8, adventurous: 0.2, ... },
      context: { trigger: "work_stress", location: "office" },
      resulting_recommendations: ["spa_retreat_1", "beach_cabin_2"],
      actions_taken: ["saved_spa_retreat_1", "viewed_beach_cabin_2"]
    }
  ]
}
```

**Experience Database**:
```javascript
// Pre-computed experience profiles
ExperienceDB = {
  experiences: [
    {
      id: "sedona_spa_retreat",
      mood_profile: { calm: 0.95, restore: 0.98, ... },
      characteristics: { intensity: 0.2, comfort: 0.9, ... },
      metadata: { location: [34.8697, -111.7610], price_range: [200, 500] },
      user_ratings: { average: 4.7, count: 234 },
      seasonal_availability: { spring: true, summer: true, ... }
    }
  ]
}
```

### API Design

**Recommendation Endpoint**:
```javascript
POST /api/v1/recommendations
{
  "mood_input": {
    "calm": 0.8,
    "adventurous": 0.2,
    "context": "work_stress"
  },
  "constraints": {
    "budget_max": 1000,
    "duration_days": [2, 4],
    "max_distance_miles": 500
  },
  "personalization": {
    "use_history": true,
    "diversity_factor": 0.2
  }
}

Response:
{
  "recommendations": [
    {
      "experience_id": "sedona_spa_retreat",
      "mood_match_score": 0.94,
      "personalization_boost": 0.12,
      "reasoning": "Perfect for your calm-seeking mood, similar to your highly-rated Napa spa trip",
      "confidence": 0.87
    }
  ],
  "mood_insights": {
    "primary_mood": "calm_seeking",
    "recommended_duration": "weekend_escape",
    "optimal_timing": "next_2_weeks"
  }
}
```

### Performance Optimization

**Caching Strategy**:
- User mood patterns cached for 24 hours
- Popular experience profiles cached globally
- Recommendation results cached for 1 hour per mood state
- Seasonal mood adjustments pre-computed monthly

**Database Optimization**:
- Mood vector similarity using approximate nearest neighbor search
- Experience geospatial indexing for location filtering
- User preference matrices stored as sparse vectors
- Real-time recommendation pipeline with < 2 second SLA

## Privacy & Ethics

### Data Minimization
- Mood data stored locally by default
- Cloud sync only with explicit user consent
- Aggregated mood patterns anonymized for global insights
- User can export or delete all mood data

### Algorithmic Fairness
- Regular bias testing for demographic groups
- Diverse experience representation across all mood categories
- Price range diversity to avoid excluding budget-conscious users
- Cultural sensitivity in mood interpretation and experience curation

### Transparency
- "Why this recommendation?" explanations for all suggestions
- User control over recommendation factors and weights
- Clear disclosure of data usage for personalization
- Option to reset/retrain personal recommendation model

---

*The Mood Intelligence Engine transforms WanderMood from a simple travel app into an emotionally aware companion that learns and grows with each user interaction.*