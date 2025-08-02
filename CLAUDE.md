# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WanderMood is an AI-powered mood-based travel discovery platform built with Next.js 14 and TypeScript. Users select their emotional state (mood) and receive curated travel recommendations that match their feelings rather than traditional location-based search.

## Development Commands

### Essential Commands
```bash
# Development
npm run dev          # Start development server (localhost:3000)
npm run build        # Production build with optimization
npm run start        # Start production server
npm run lint         # ESLint code quality checks
npm run typecheck    # TypeScript compilation check without emit
```

### Deployment Scripts
```bash
# Production deployment options
./scripts/deploy-github-vercel.sh  # Full deployment: GitHub + Vercel (recommended)
./scripts/deploy.sh                # Vercel-only deployment
```

### Automation Scripts
```bash
# Claude workflow automation
./scripts/update-docs.sh      # Auto-update documentation
./scripts/project-health.sh   # Project status overview
./scripts/auto-commit-hook.sh # Smart git commits with validation
```

## Architecture & Code Structure

### Core Application Flow
The app follows a mood-to-recommendation pipeline:
1. **HomePage** (`src/app/page.tsx`) manages the main application state and view transitions
2. **MoodPicker** component handles mood selection with intensity slider
3. **TripRecommendations** displays filtered travel experiences based on selected mood
4. **AnimatePresence** provides smooth transitions between mood selection and recommendations

### Key Type System
Central types in `src/types/index.ts`:
- **Mood**: Core mood object with visual properties (emoji, color gradients) and metadata
- **TravelExperience**: Travel recommendation with mood matching arrays and cost estimation
- **UserPreferences**: Complete user state including mood, budget, flexibility preferences

### Component Architecture
Components use Framer Motion for animations and follow a mood-driven design system:
- Mood cards use dynamic color gradients defined in the Mood interface
- State management is lifted to HomePage for cross-component communication
- Each mood has associated visual theming (colors, gradients) for consistent UX

### Styling System
- **Tailwind CSS** with custom configuration extending default color palette
- **CSS Custom Properties** for dynamic theming (HSL color variables)
- **Framer Motion** for page transitions and micro-interactions
- **Mobile-first responsive design** with breakpoint-based layouts

## Mood-Based Recommendation Logic

The recommendation engine matches travel experiences to user moods through:
- **Mood matching arrays** in TravelExperience objects
- **Color-coded visual feedback** using mood.color and mood.gradient properties  
- **Intensity-based filtering** (planned feature using moodIntensity state)

## Database Schema (Planned)
- **Users**: Profile, mood history, saved trips
- **TravelExperiences**: Destinations with mood tags, activities, costs
- **Recommendations**: AI-generated suggestions based on mood + user history

## Development Patterns

### State Management
- React useState for local component state
- Lifted state pattern for cross-component communication
- No external state management library (Redux/Zustand) currently used

### Animation Patterns
- Use AnimatePresence for page-level transitions
- Consistent motion values for brand consistency
- Mood-specific animations based on emotional state

### Type Safety
- Strict TypeScript configuration with --noEmit checks
- Interface-driven development with central type definitions
- Props typing for all components with exported interfaces

## Testing Strategy (To Be Implemented)
- **Jest + React Testing Library**: Component unit tests
- **Playwright**: End-to-end mood selection flows
- **Storybook**: Component visual testing and documentation

## AI Integration Points
- Mood interpretation and enhancement
- Personalized recommendation algorithms  
- Natural language processing for trip descriptions

## Subagents Available
- **wandermood-architect**: Feature development and mood algorithm work
- **doc-writer**: Documentation maintenance and API docs
- **bug-finder**: Code quality and error detection
- **test-manager**: Test creation and coverage analysis  
- **deploy-helper**: Production deployment and environment management