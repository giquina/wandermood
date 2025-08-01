# GitHub Codespaces Setup Prompt for WanderMood

## Context & Project Overview

I'm building **WanderMood** - an AI-powered mood-based travel discovery platform. Users input their current emotional state (calm, adventurous, romantic, creative, etc.) and get personalized travel experience recommendations that match their vibe.

I have complete product documentation in the `/docs` folder including detailed product plan, user personas, features, AI architecture, and development roadmap. I also have UI mockups showing the core app flow.

## What I Need

Help me set up and build the **web platform version** of WanderMood using modern web technologies. This will serve as:
1. **MVP validation platform** before building mobile apps
2. **Marketing website** with interactive mood-based recommendations
3. **Admin dashboard** for managing experiences and analytics

## Technical Requirements

### Frontend Framework
- **Next.js 14** with App Router for modern React development
- **TypeScript** for type safety and better development experience  
- **Tailwind CSS** for styling (matches the soft, modern design aesthetic)
- **Framer Motion** for smooth animations and micro-interactions

### Backend & Database
- **Next.js API routes** for backend functionality
- **MongoDB** with Mongoose for flexible mood/experience data storage
- **NextAuth.js** for authentication (Google, email login)
- **Vercel** for deployment and hosting

### Key Features to Build
1. **Mood Input Interface** - Beautiful emoji grid + intensity sliders
2. **AI Recommendation Engine** - Mood-to-experience matching algorithm
3. **Experience Discovery Feed** - Pinterest-style browsable recommendations
4. **User Profiles** - Save trips, track mood patterns, preferences
5. **Booking Integration** - Deep links to partner platforms (Booking.com, etc.)

## Project Structure I Want

```
wandermood/
├── README.md
├── docs/                          # Existing product documentation
├── src/
│   ├── app/                       # Next.js 14 App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx               # Home/landing page
│   │   ├── discover/              # Main mood input + recommendations
│   │   ├── profile/               # User dashboard
│   │   └── api/                   # Backend API routes
│   ├── components/                # Reusable UI components
│   │   ├── mood/                  # Mood input components
│   │   ├── experiences/           # Experience cards, feed
│   │   └── ui/                    # Basic UI components
│   ├── lib/                       # Utilities and configurations
│   │   ├── ai/                    # Mood recommendation algorithms
│   │   ├── database/              # MongoDB connection and models
│   │   └── utils/                 # Helper functions
│   └── types/                     # TypeScript type definitions
├── public/                        # Static assets
└── package.json
```

## Design Requirements

Based on my UI mockups, the design should be:
- **Soft, calming color palette** - warm oranges, gentle grays, cream backgrounds
- **Rounded, friendly typography** - modern sans-serif fonts
- **Card-based layouts** with beautiful travel imagery
- **Smooth animations** - gentle hover effects, smooth transitions
- **Mobile-first responsive** design
- **Accessibility focused** - proper contrast, screen reader support

## AI/Mood Engine Requirements

Build a recommendation system that:
1. **Converts mood input** (emoji + intensity) into numerical vectors
2. **Matches experiences** based on pre-scored mood compatibility
3. **Applies filters** (budget, location, duration, etc.)
4. **Learns from user behavior** (saves, clicks, feedback)
5. **Provides explanations** ("Perfect for your calm-seeking mood")

## Initial Experience Database

Start with 50-100 curated travel experiences across mood categories:
- **RESTORE** (calm, peaceful): Spas, nature retreats, quiet beaches
- **EXPLORE** (adventurous): Hiking, cities, cultural experiences
- **CONNECT** (romantic, social): Couples retreats, group trips
- **CREATE** (inspired, artistic): Art workshops, museums, scenic spots
- **CELEBRATE** (joyful): Festivals, nightlife, luxury experiences

## Development Priorities

### Phase 1 (First 2 weeks):
1. Set up Next.js project with TypeScript and Tailwind
2. Create basic mood input interface matching UI mockups
3. Build simple recommendation algorithm with hardcoded experiences
4. Design experience card components and discovery feed

### Phase 2 (Weeks 3-4):
1. Add user authentication and profiles
2. Implement experience database with MongoDB
3. Build booking integration (deep links)
4. Add filters and search functionality

### Phase 3 (Month 2):
1. Enhance AI recommendation algorithm
2. Add mood tracking and analytics
3. Implement save/wishlist functionality
4. Performance optimization and deployment

## Specific Help Needed

1. **Set up the complete Next.js project** with all dependencies
2. **Create the mood input interface** that matches my UI mockups
3. **Build the recommendation algorithm** starting with rule-based matching
4. **Design the experience database schema** for MongoDB
5. **Implement the discovery feed** with infinite scroll and filtering
6. **Create responsive components** that work beautifully on mobile and desktop

## Success Criteria

- Mood input feels intuitive and emotionally resonant
- Recommendations are relevant and inspiring
- User interface matches the calm, sophisticated aesthetic of mockups
- Core user flow works: mood input → recommendations → save → book
- Performance is excellent (fast loading, smooth interactions)
- Code is clean, typed, and well-documented

---

**Please help me build this step by step, starting with project setup and the core mood input interface. I want to create something that truly feels like an emotionally intelligent travel companion.**