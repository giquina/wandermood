#!/bin/bash

# WanderMood Project Bootstrap Script
# This script sets up the development environment and dependencies

echo "🌟 Bootstrapping WanderMood Project..."

# Check if we're in the right directory
if [ ! -f "CLAUDE.md" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Create necessary directories if they don't exist
echo "📁 Creating directory structure..."
mkdir -p src/{components,pages,styles,utils,types,lib}
mkdir -p src/components/{ui,mood,travel,auth,admin}
mkdir -p tests/{unit,integration,e2e}
mkdir -p docs/{api,user-guide,development}
mkdir -p claude/subagents

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ and try again."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm and try again."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"

# Initialize package.json if it doesn't exist
if [ ! -f "package.json" ]; then
    echo "📦 Initializing package.json..."
    npm init -y
fi

# Check if this is a git repository
if [ ! -d ".git" ]; then
    echo "🔧 Initializing git repository..."
    git init
else
    echo "✅ Git repository already initialized"
fi

# Create .gitignore if it doesn't exist
if [ ! -f ".gitignore" ]; then
    echo "📝 Creating .gitignore..."
    cat > .gitignore << EOF
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/
.nyc_output

# Next.js
.next/
out/

# Production
build/
dist/

# Environment variables
.env*
!.env.example

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# Claude Code temp files
.claude-temp/
EOF
fi

echo "🎯 Bootstrap complete! Next steps:"
echo "1. Review the project structure in CLAUDE.md"
echo "2. Check tasks/todo.md for development roadmap"
echo "3. Install dependencies: npm install"
echo "4. Start development when ready"

echo "🌟 WanderMood is ready for development!"