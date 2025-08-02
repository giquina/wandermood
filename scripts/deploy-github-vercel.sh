#!/bin/bash

# WanderMood GitHub + Vercel Deployment Script
# Deploys changes to GitHub and then to Vercel production

set -e

VERCEL_TOKEN="8WaapxGq5zAwvdEqM8Pf1xjw"

echo "🚀 Starting WanderMood GitHub + Vercel deployment..."
echo ""

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ Error: Not in a git repository"
    exit 1
fi

# Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo "📋 Uncommitted changes detected. Let's commit them first..."
    
    # Show status
    echo "📊 Git status:"
    git status --short
    echo ""
    
    # Stage all changes
    echo "📦 Staging all changes..."
    git add .
    
    # Get commit message from user or auto-generate
    if [ -z "$1" ]; then
        COMMIT_MSG="🚀 Auto-deployment: Latest changes for production

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"
    else
        COMMIT_MSG="$1

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"
    fi
    
    # Commit changes
    echo "💾 Committing changes..."
    git commit -m "$COMMIT_MSG"
    echo "✅ Changes committed successfully"
    echo ""
else
    echo "✅ Working directory clean - no uncommitted changes"
    echo ""
fi

# Run pre-deployment checks
echo "🔍 Running pre-deployment checks..."

# TypeScript check
echo "📝 Checking TypeScript..."
if npm run typecheck; then
    echo "✅ TypeScript check passed"
else
    echo "❌ TypeScript check failed"
    exit 1
fi

# Linting check
echo "🧹 Running linter..."
if npm run lint; then
    echo "✅ Linting passed"
else
    echo "❌ Linting failed"
    exit 1
fi

echo ""

# Push to GitHub
echo "📤 Pushing to GitHub..."
CURRENT_BRANCH=$(git branch --show-current)
if git push origin "$CURRENT_BRANCH"; then
    echo "✅ Successfully pushed to GitHub ($CURRENT_BRANCH)"
    
    # Get the latest commit hash and message
    COMMIT_HASH=$(git rev-parse --short HEAD)
    COMMIT_MESSAGE=$(git log -1 --pretty=%B | head -1)
    echo "📋 Latest commit: $COMMIT_HASH - $COMMIT_MESSAGE"
else
    echo "❌ Failed to push to GitHub"
    exit 1
fi

echo ""

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
if vercel --token "$VERCEL_TOKEN" deploy --prod --yes; then
    echo ""
    echo "🎉 Deployment completed successfully!"
    echo ""
    echo "📍 Your app is now live at:"
    echo "🔗 Production: https://wandermood.vercel.app"
    echo ""
    echo "📊 Deployment summary:"
    echo "   • GitHub: ✅ Pushed to $CURRENT_BRANCH"
    echo "   • Vercel: ✅ Deployed to production"
    echo "   • Commit: $COMMIT_HASH"
    echo ""
else
    echo "❌ Vercel deployment failed"
    echo "🔍 Check logs with: vercel --token $VERCEL_TOKEN inspect --logs"
    exit 1
fi

echo "✨ All done! Your changes are now live."