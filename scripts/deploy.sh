#!/bin/bash

# WanderMood Deployment Script
# Automatically deploys to Vercel using the configured token

set -e

VERCEL_TOKEN="8WaapxGq5zAwvdEqM8Pf1xjw"

echo "🚀 Starting WanderMood deployment..."

# Run type checking
echo "🔍 Running TypeScript checks..."
npm run typecheck

# Run linting
echo "🧹 Running linting..."
npm run lint

# Deploy to Vercel
echo "📦 Deploying to Vercel..."
vercel --token $VERCEL_TOKEN deploy --prod --yes

echo "✅ Deployment complete!"