#!/bin/bash

# WanderMood Vercel Deployment Script
# This script handles automated deployment to Vercel

echo "🚀 Starting WanderMood deployment to Vercel..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Check if Vercel CLI is available
if ! command -v npx &> /dev/null; then
    echo "❌ Error: npx is not available. Please install Node.js"
    exit 1
fi

# Build the application first
echo "📦 Building Next.js application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix build errors before deploying."
    exit 1
fi

# Type check
echo "🔍 Running type check..."
npm run typecheck

if [ $? -ne 0 ]; then
    echo "⚠️ Type check failed, but continuing deployment..."
fi

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
npx vercel --prod --yes

if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
    echo "🌍 Your WanderMood app is live at: https://wandermood.vercel.app"
else
    echo "❌ Deployment failed. Please check the logs above."
    exit 1
fi

echo "🎉 WanderMood deployment complete!"