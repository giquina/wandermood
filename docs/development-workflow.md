# WanderMood Development Workflow

## 🎯 **One Unified Codebase**

WanderMood now uses **Next.js 14 with TypeScript** as the single source of truth. Whether you're working with **Claude Desktop locally** or **Claude Code in Codespaces**, you'll always be working on the same unified application.

## 🏗️ **Project Structure**

```
/workspaces/wandermood/
├── src/                          # Next.js source code
│   ├── app/                     # App Router pages
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Homepage with mood selection
│   │   └── globals.css          # Global styles
│   ├── components/              # React components
│   │   ├── MoodPicker.tsx       # Enhanced mood selection with slider
│   │   └── TripRecommendations.tsx # Trip results display
│   ├── lib/                     # Utilities and configurations
│   └── types/                   # TypeScript type definitions
├── docs/                        # Documentation
├── claude/                      # Claude AI workflow files
├── tasks/                       # Task management
├── scripts/                     # Automation scripts
├── package.json                 # Dependencies and scripts
└── README.md                    # Project overview
```

## 🔄 **Development Environment Setup**

### For Claude Desktop (Local Development)
1. **Clone the repository**:
   ```bash
   git clone https://github.com/giquina/wandermood.git
   cd wandermood
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**: http://localhost:3000

### For Claude Code (Codespaces)
1. **Open Codespaces**: Already configured and ready
2. **Development server** (if needed):
   ```bash
   npm run dev
   ```
3. **Live site**: https://wandermood.vercel.app (auto-deploys from GitHub)

## 🚀 **Deployment Process**

### Automatic Deployment
- **Push to GitHub** → **Vercel auto-deploys** → **Live at wandermood.vercel.app**
- No manual deployment needed!

### Manual Deployment (if needed)
```bash
# Using the deployment script
./scripts/deploy-vercel.sh

# Or directly with Vercel CLI
npx vercel --prod
```

## 🧩 **Key Features Implemented**

### ✅ Completed Features
- **Mood Selection**: 6 core moods with visual feedback
- **Intensity Slider**: 1-10 scale for mood intensity
- **Keyboard Shortcuts**: 'M' for mood, 'F' for find trips
- **Easter Eggs**: Hidden interactions for user delight
- **Trip Recommendations**: Filtered by mood and intensity
- **Smooth Transitions**: Page transitions with Framer Motion
- **Mobile Responsive**: Optimized for all devices
- **TypeScript**: Full type safety throughout

### 🔄 Core User Flow
1. **Mood Selection** → User picks emotional state
2. **Intensity Adjustment** → Fine-tune with slider (1-10)
3. **Trip Discovery** → AI-filtered recommendations
4. **Trip Planning** → Detailed experience cards
5. **Back Navigation** → Smooth return to mood selection

## 📝 **Working on Features**

### Adding New Components
```bash
# Create new component
touch src/components/NewComponent.tsx

# Add to main page
# Import in src/app/page.tsx
```

### Modifying Moods
```typescript
// Edit mood list in src/components/MoodPicker.tsx
const moods: Mood[] = [
  {
    id: 'new-mood',
    name: 'New Mood',
    emoji: '🔥',
    description: 'Description here',
    color: 'from-red-400 to-orange-500',
    gradient: 'bg-gradient-to-br from-red-100 to-orange-200'
  }
]
```

### Adding Travel Experiences
```typescript
// Edit experiences in src/components/TripRecommendations.tsx
const sampleExperiences: TripExperience[] = [
  {
    id: 'new-experience',
    title: 'Amazing Adventure',
    location: 'Somewhere Cool',
    description: 'Epic description',
    imageUrl: 'https://...',
    estimatedCost: '$1,500',
    duration: '5 days',
    moodTags: ['adventurous'],
    rating: 4.8
  }
]
```

## 🔧 **Development Commands**

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run start           # Start production build
npm run lint            # Run ESLint
npm run typecheck       # TypeScript type checking

# Git workflow
git add -A
git commit -m "Feature: Description"
git push origin main     # Auto-deploys to Vercel

# Deployment
./scripts/deploy-vercel.sh    # Automated deployment
npx vercel --prod            # Direct Vercel deployment

# GitHub management
source scripts/github-helpers.sh
gh_status                    # Repository dashboard
```

## 🔀 **Sync Workflow Between Environments**

### Working Locally (Claude Desktop)
1. Make changes to files
2. Test with `npm run dev`
3. Commit: `git commit -m "Feature: Description"`
4. Push: `git push origin main`
5. **Auto-deploys to Vercel** ✅

### Working in Codespaces (Claude Code)
1. Pull latest: `git pull origin main`
2. Make changes
3. Test changes (Vercel deployment is live)
4. Commit and push
5. **Syncs with local environment** ✅

### Key Rule: **Always work on the main branch**
- No more confusion between HTML and Next.js
- Single codebase = single source of truth
- All changes auto-deploy immediately

## 🚨 **Important Notes**

### ❌ Don't Create These Files
- `index.html` (conflicts with Next.js)
- `app.html` or other static HTML files
- Separate React apps

### ✅ Always Use These Patterns
- Components in `src/components/`
- Pages in `src/app/`
- Types in `src/types/`
- Styles in `src/app/globals.css` or component-level
- Test changes by visiting https://wandermood.vercel.app

## 🎯 **Future Development**

### Next Features to Build
1. **User Authentication** (NextAuth.js)
2. **Database Integration** (MongoDB)
3. **AI Trip Generation** (OpenAI API)
4. **User Profiles** & saved trips
5. **Admin Panel** for managing experiences
6. **Payment Integration** for bookings

### Architecture Decisions
- **Frontend**: Next.js 14 + TypeScript
- **Styling**: Tailwind CSS + Framer Motion
- **Database**: MongoDB + Mongoose
- **Authentication**: NextAuth.js
- **Deployment**: Vercel
- **AI**: OpenAI/Claude APIs

---

## 🎉 **You're All Set!**

Whether you're using **Claude Desktop locally** or **Claude Code in Codespaces**, you're now working on the same unified WanderMood application. 

**Live site**: https://wandermood.vercel.app  
**Repository**: https://github.com/giquina/wandermood

Happy coding! 🌟