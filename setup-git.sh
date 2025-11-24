#!/bin/bash

# Token Trading Table - Git Setup Script
# This script initializes the Git repository and prepares for deployment

echo "🚀 Setting up Git repository for Token Trading Table..."

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

# Initialize git if not already initialized
if [ ! -d .git ]; then
    echo "📁 Initializing Git repository..."
    git init
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already initialized"
fi

# Add all files
echo "📦 Adding files to Git..."
git add .

# Create initial commit
echo "💾 Creating initial commit..."
git commit -m "Initial commit: Production-ready token trading table

Features:
- Three token categories (New Pairs, Final Stretch, Migrated)
- Real-time price updates with WebSocket mock
- Sortable columns with animations
- Interactive modals, tooltips, popovers
- Responsive design (320px to desktop)
- Loading states and error boundaries
- Pixel-perfect UI matching Axiom Trade

Tech Stack:
- Next.js 15 (App Router)
- TypeScript (strict)
- Tailwind CSS 4.0
- Redux Toolkit + React Query
- Radix UI / shadcn/ui
- Framer Motion

Performance:
- React.memo on all components
- Code splitting
- Image optimization
- Zero layout shifts
- <100ms interactions"

echo "✅ Initial commit created"

# Instructions for adding remote
echo ""
echo "📝 Next Steps:"
echo "1. Create a new repository on GitHub"
echo "2. Run: git remote add origin <your-repo-url>"
echo "3. Run: git push -u origin main"
echo ""
echo "For Vercel deployment:"
echo "1. Visit https://vercel.com"
echo "2. Import your GitHub repository"
echo "3. Deploy with default settings"
echo ""
echo "🎉 Setup complete! Ready for deployment."
