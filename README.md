# WanderMood 🌟

**AI-Powered Mood-Based Travel Discovery Platform**

WanderMood helps users discover and book travel experiences based on their emotional state, not just location or price. The platform provides warm, emotionally intelligent recommendations that match how users are feeling.

## ✨ Core Concept

Users select their current mood (adventurous, calm, romantic, creative, etc.) and WanderMood shows curated travel ideas, destinations, and experiences that match their emotional needs. Powered by AI for intelligent mood interpretation and personalized recommendations.

## 🎯 Features

- **Mood-Based Discovery**: Search travel experiences by emotional state
- **AI Recommendations**: Intelligent matching based on mood and preferences  
- **Visual Experience Feed**: Pinterest-like discovery interface
- **User Profiles**: Save trips, track mood history, personal preferences
- **Admin Panel**: Manage travel experiences and curated content
- **Mobile-First Design**: Optimized for all devices

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 + TypeScript + App Router
- **Styling**: Tailwind CSS + Framer Motion
- **Database**: MongoDB + Mongoose
- **Authentication**: NextAuth.js
- **AI Integration**: OpenAI/Claude APIs
- **Deployment**: Vercel
- **Development**: Claude Code + GitHub Codespaces

## 🚀 Quick Start

1. **Clone and Setup**:
   ```bash
   git clone <repo-url>
   cd wandermood
   ./scripts/bootstrap.sh
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   ```bash
   cp .env.example .env.local
   # Add your API keys and database URLs
   ```

4. **Run Development Server**:
   ```bash
   npm run dev
   ```

## 📁 Project Structure

```
├── src/                    # Main source code
│   ├── components/        # React components
│   ├── pages/            # Next.js pages
│   ├── lib/              # Utilities and configurations
│   └── types/            # TypeScript types
├── tests/                 # Test files
├── docs/                  # Documentation
├── claude/               # Claude AI workflow files
├── tasks/                # Task management
└── scripts/              # Automation scripts
```

## 🎨 Design Principles

- **Calm Aesthetic**: Inspired by Calm, Airbnb, and Notion
- **Emotional Intelligence**: UI that responds to user mood
- **Accessibility First**: WCAG compliant, inclusive design
- **Performance**: Fast loading, smooth animations
- **Mobile-First**: Responsive across all devices

## 🔮 Roadmap

### Phase 1 (Current)
- [x] Project bootstrap and structure
- [x] Next.js application setup
- [x] Basic mood selection interface
- [ ] Travel experience database

### Phase 2
- [ ] AI mood interpretation engine
- [ ] User authentication system
- [ ] Responsive design implementation
- [ ] Admin panel for content management

### Phase 3
- [ ] Advanced recommendation algorithms
- [ ] User preference learning
- [ ] Booking integration partnerships
- [ ] Mobile app development

## 🤝 Contributing

This project follows the Claude Code workflow. See `CLAUDE.md` for development guidelines and `tasks/todo.md` for current tasks.

## 📄 License

MIT License - see LICENSE file for details.

---

*Built with ❤️ using Claude Code and Next.js*
