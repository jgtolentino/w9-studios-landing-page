#!/bin/bash

# W9 Studios Landing Page - Quick Setup Script

echo "🎬 W9 Studios Landing Page Setup"
echo "================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo ""
echo "🎨 Setup complete!"
echo ""
echo "To start the development server:"
echo "  npm run dev"
echo ""
echo "Then open http://localhost:3000 in your browser"
echo ""
echo "For production build:"
echo "  npm run build"
echo "  npm run start"
echo ""
echo "🚀 Ready to create cinematic excellence!"
