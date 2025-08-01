# WanderMood Web Platform Technical Specification

## Technology Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS + custom CSS variables for theme
- **Animations**: Framer Motion for smooth interactions
- **Icons**: Lucide React or Heroicons
- **Forms**: React Hook Form with Zod validation

### Backend
- **API**: Next.js API routes (serverless functions)
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: NextAuth.js (Google, email/password)
- **File Storage**: Vercel Blob or Cloudinary for images
- **Email**: Resend or SendGrid for transactional emails

### Deployment & Infrastructure
- **Hosting**: Vercel (seamless Next.js integration)
- **Database**: MongoDB Atlas (cloud-hosted)
- **CDN**: Vercel's built-in CDN for static assets
- **Analytics**: Vercel Analytics + custom mood tracking

## Database Schema Design

### User Model
```typescript
interface User {
  _id: ObjectId;
  email: string;
  name: string;
  avatar?: string;
  preferences: {
    budget_range: [number, number];
    typical_duration: number; // days
    max_distance: number; // miles
    travel_style: 'solo' | 'couple' | 'group' | 'family';
  };
  mood_history: MoodEntry[];
  saved_experiences: ObjectId[];
  created_at: Date;
  updated_at: Date;
}
```

### Experience Model
```typescript
interface Experience {
  _id: ObjectId;
  title: string;
  description: string;
  location: {
    city: string;
    country: string;
    coordinates: [number, number]; // [lng, lat]
  };
  images: string[];
  mood_scores: {
    calm: number;      // 0-1
    adventurous: number;
    romantic: number;
    creative: number;
    social: number;
    celebratory: number;
  };
  characteristics: {
    intensity_level: number;  // 0-1
    comfort_level: number;
    novelty_factor: number;
  };
  price_range: [number, number];
  duration_days: [number, number];
  season_scores: {
    spring: number;
    summer: number;
    fall: number;
    winter: number;
  };
  booking_links: {
    platform: string;
    url: string;
    affiliate_id?: string;
  }[];
  tags: string[];
  created_at: Date;
  updated_at: Date;
}
```

### Mood Entry Model
```typescript
interface MoodEntry {
  _id: ObjectId;
  user_id: ObjectId;
  mood_vector: {
    calm: number;
    adventurous: number;
    romantic: number;
    creative: number;
    social: number;
    celebratory: number;
  };
  context?: {
    trigger: string;
    location: string;
    notes: string;
  };
  recommendations_shown: ObjectId[];
  actions_taken: {
    saved: ObjectId[];
    clicked: ObjectId[];
    booked?: ObjectId[];
  };
  timestamp: Date;
}
```

## Component Architecture

### Core Components
```
src/components/
├── mood/
│   ├── MoodSelector.tsx       # Main mood input interface
│   ├── MoodEmoji.tsx         # Individual emoji buttons
│   ├── MoodSlider.tsx        # Intensity sliders
│   └── MoodHistory.tsx       # Past mood patterns
├── experiences/
│   ├── ExperienceCard.tsx    # Individual experience display
│   ├── ExperienceFeed.tsx    # Infinite scroll feed
│   ├── ExperienceFilters.tsx # Budget, location, duration filters
│   └── ExperienceModal.tsx   # Detailed view with booking
├── ui/
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Card.tsx
│   ├── Modal.tsx
│   └── Loading.tsx
└── layout/
    ├── Header.tsx
    ├── Navigation.tsx
    └── Footer.tsx
```

## API Routes Structure

```
src/app/api/
├── auth/
│   └── [...nextauth]/route.ts
├── mood/
│   ├── analyze/route.ts       # Process mood input
│   └── history/route.ts       # Get user mood history
├── experiences/
│   ├── recommend/route.ts     # Get mood-based recommendations
│   ├── search/route.ts        # Filter and search experiences
│   └── [id]/route.ts         # Get single experience details
├── user/
│   ├── profile/route.ts       # Get/update user profile
│   └── saved/route.ts         # Manage saved experiences
└── admin/
    └── experiences/route.ts   # CRUD for experiences (admin only)
```

## Mood Recommendation Algorithm

### Basic Implementation
```typescript
function calculateMoodMatch(
  userMood: MoodVector, 
  experience: Experience
): number {
  // Weighted cosine similarity
  let similarity = 0;
  let userMagnitude = 0;
  let expMagnitude = 0;
  
  const moods = ['calm', 'adventurous', 'romantic', 'creative', 'social', 'celebratory'];
  
  moods.forEach(mood => {
    const userValue = userMood[mood] || 0;
    const expValue = experience.mood_scores[mood] || 0;
    
    similarity += userValue * expValue;
    userMagnitude += userValue * userValue;
    expMagnitude += expValue * expValue;
  });
  
  const magnitude = Math.sqrt(userMagnitude * expMagnitude);
  return magnitude > 0 ? similarity / magnitude : 0;
}
```

## Design System (Tailwind Classes)

### Color Palette
```css
/* Primary mood colors */
--calm: #8BB5C7;      /* Soft blue */
--adventurous: #E67E22; /* Warm orange */
--romantic: #E91E63;   /* Gentle pink */
--creative: #9B59B6;   /* Inspiring purple */
--social: #F39C12;     /* Friendly yellow */
--celebratory: #E74C3C; /* Joyful red */

/* Neutral palette */
--cream: #FDF8F0;      /* Background */
--warm-gray: #8E8E93;  /* Text secondary */
--soft-white: #FFFFFF; /* Cards */
--accent-orange: #FF8A50; /* CTAs */
```

### Typography Scale
```css
/* Font families */
font-display: 'Inter', sans-serif;     /* Headings */
font-body: 'Inter', sans-serif;        /* Body text */

/* Size scale */
text-xs     /* 12px - Labels */
text-sm     /* 14px - Body small */
text-base   /* 16px - Body */
text-lg     /* 18px - Subheadings */
text-xl     /* 20px - Card titles */
text-2xl    /* 24px - Section headings */
text-3xl    /* 30px - Page titles */
```

## Key Features Implementation Priority

### Week 1: Foundation
1. Next.js project setup with TypeScript
2. Tailwind configuration with custom theme
3. Basic routing structure
4. MongoDB connection setup

### Week 2: Mood Interface
1. Mood selector component matching UI mockups
2. Basic recommendation algorithm
3. Experience card component
4. Simple experience database seed

### Week 3: User Features
1. NextAuth.js authentication setup
2. User profile creation and management
3. Save/wishlist functionality
4. Mood history tracking

### Week 4: Enhancement
1. Advanced filtering and search
2. Booking integration (deep links)
3. Performance optimization
4. Mobile responsiveness refinement

## Development Commands

```bash
# Project setup
npx create-next-app@latest wandermood --typescript --tailwind --eslint --app
cd wandermood

# Install additional dependencies
npm install mongoose next-auth framer-motion lucide-react react-hook-form @hookform/resolvers zod

# Development
npm run dev

# Database operations
npm run db:seed    # Seed initial experiences
npm run db:reset   # Reset database

# Deployment
npm run build
npm run deploy
```

---

*This technical specification provides the detailed implementation guidance for building WanderMood's web platform with modern, scalable technologies.*