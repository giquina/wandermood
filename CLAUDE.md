# CLAUDE.md - Operating Rules & Workflow

## Core Operating Rules

1. First think through the problem, read the codebase for relevant files, and write a plan to `tasks/todo.md`.
2. The plan should have a list of todo items that you can check off as you complete them.
3. Before you begin working, check in with me and I will verify the plan.
4. Then, begin working on the todo items, marking them as complete as you go.
5. Every step of the way, give me a high-level summary of the changes you made.
6. Make every code/task change as simple as humanly possible. Avoid broad refactors.
7. Finally, add a review section to the `todo.md` file summarizing what you did.
8. DO NOT BE LAZY. NO HALF FIXES. Find the root cause and fix it properly.
9. Minimise the code impact of every change. Simplicity always wins.

## WanderMood Project Context

This is **WanderMood** - an AI-powered mood-based travel discovery platform that helps users discover and book travel experiences based on their emotional state, not just location or price.

### Core Features:
- Mood-based travel recommendations
- AI-powered experience matching
- Visual, Pinterest-like discovery feed  
- User authentication and saved preferences
- Admin panel for experience management
- Mobile-first responsive design

### Tech Stack:
- **Frontend**: Next.js 14 + TypeScript + App Router
- **Styling**: Tailwind CSS + Framer Motion
- **Database**: MongoDB + Mongoose
- **Auth**: NextAuth.js
- **Deployment**: Vercel
- **AI**: OpenAI/Claude for mood interpretation

### Design Principles:
- Clean, minimalist aesthetic (inspired by Calm, Airbnb, Notion)
- Soft color palette with pastel/neutral tones
- Smooth animations and emotional interactions
- Mobile-first, accessible design

## File Structure

```
/workspaces/wandermood/
├── src/                    # Main source code
├── tests/                  # Test files
├── docs/                   # Documentation
├── claude/                 # Claude-specific files
│   ├── subagents/         # Claude subagents
│   └── context.json       # Project context memory
├── tasks/                  # Task management
│   └── todo.md            # Current todo tracker
├── errors/                 # Error tracking
│   └── debug.log          # Debug log file
├── scripts/               # Automation scripts
│   └── bootstrap.sh       # Bootstrap script
├── CLAUDE.md              # This file
└── README.md              # Project documentation
```

## Slash Commands

### `/update-docs`
Auto-updates all documentation files by scanning latest codebase changes:
- Updates all README.md files
- Updates CLAUDE.md with current file structure and tech stack
- Updates anything inside /docs/
- Synchronizes subagent registry information
- Keeps documentation synced with code changes
- **Usage**: Type `/update-docs` to trigger automated documentation refresh
- **Script**: `scripts/update-docs.sh`

### `/project-health`
Outputs project status:
- Count of remaining tasks in todo.md
- Number of commits made
- Files changed today
- Unresolved bugs in errors/debug.log
- Claude summary of current repo state
- **Usage**: Type `/project-health` for complete project status overview
- **Script**: `scripts/project-health.sh` (to be implemented)

## Hooks

### GitHub Auto-Commit Hook
Automatically commits code to GitHub **only when**:
- Code executes without syntax or build errors
- No validation issues are detected
- Smart commit messages included
- **Does not trigger dev servers or processes**

## Context Memory

The `claude/context.json` file stores:
- File structure
- Key functions/modules  
- Programming language used
- Project state and progress

This helps Claude retain repo-wide context during longer sessions.

## Subagents

Specialized Claude agents for specific tasks:
- **doc-writer**: Documentation generation and updates
- **bug-finder**: Error detection and debugging
- **refactor-helper**: Code optimization and restructuring
- **wandermood-architect**: WanderMood-specific feature development
- **test-manager**: Test creation and validation

---

*Last updated: 2025-08-01*