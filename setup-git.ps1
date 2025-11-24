# Token Trading Table - Git Setup Script (Windows)
# This script initializes the Git repository and prepares for deployment

Write-Host "🚀 Setting up Git repository for Token Trading Table..." -ForegroundColor Cyan

# Check if git is installed
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Git is not installed. Please install Git first." -ForegroundColor Red
    exit 1
}

# Initialize git if not already initialized
if (-not (Test-Path .git)) {
    Write-Host "📁 Initializing Git repository..." -ForegroundColor Yellow
    git init
    Write-Host "✅ Git repository initialized" -ForegroundColor Green
} else {
    Write-Host "✅ Git repository already initialized" -ForegroundColor Green
}

# Add all files
Write-Host "📦 Adding files to Git..." -ForegroundColor Yellow
git add .

# Create initial commit
Write-Host "💾 Creating initial commit..." -ForegroundColor Yellow
$commitMessage = @"
Initial commit: Production-ready token trading table

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
- <100ms interactions
"@

git commit -m $commitMessage

Write-Host "✅ Initial commit created" -ForegroundColor Green

# Instructions for adding remote
Write-Host ""
Write-Host "📝 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Create a new repository on GitHub" -ForegroundColor White
Write-Host "2. Run: git remote add origin <your-repo-url>" -ForegroundColor White
Write-Host "3. Run: git push -u origin main" -ForegroundColor White
Write-Host ""
Write-Host "For Vercel deployment:" -ForegroundColor Cyan
Write-Host "1. Visit https://vercel.com" -ForegroundColor White
Write-Host "2. Import your GitHub repository" -ForegroundColor White
Write-Host "3. Deploy with default settings" -ForegroundColor White
Write-Host ""
Write-Host "🎉 Setup complete! Ready for deployment." -ForegroundColor Green
