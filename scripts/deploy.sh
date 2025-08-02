#!/bin/bash

# WanderMood Vercel-Only Deployment Script
# Deploys to Vercel without GitHub push

set -e

VERCEL_TOKEN="8WaapxGq5zAwvdEqM8Pf1xjw"

echo "🚀 Starting WanderMood Vercel deployment..."

# Run type checking
echo "🔍 Running TypeScript checks..."
if npm run typecheck; then
    echo "✅ TypeScript check passed"
else
    echo "❌ TypeScript check failed"
    exit 1
fi

# Run linting
echo "🧹 Running linting..."
if npm run lint; then
    echo "✅ Linting passed"
else
    echo "❌ Linting failed"
    exit 1
fi

# Deploy to Vercel
echo "📦 Deploying to Vercel..."
if vercel --token $VERCEL_TOKEN deploy --prod --yes; then
    echo ""
    echo "✅ Vercel deployment complete!"
    echo "🔗 https://wandermood.vercel.app"
else
    echo "❌ Vercel deployment failed"
    exit 1
fi