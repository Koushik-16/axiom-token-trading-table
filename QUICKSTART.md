# Quick Start Guide

## For Reviewers

This guide helps you quickly set up and review the Token Trading Table application.

## Prerequisites

- Node.js 18 or higher
- npm or yarn
- Modern web browser (Chrome, Firefox, Safari, Edge)

## Installation (5 minutes)

```bash
# 1. Clone the repository
git clone <repository-url>
cd token-trading-table

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser
# Navigate to http://localhost:3000
```

## Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Key Features to Test

### 1. Tab Navigation
- Click on "New Pairs", "Final Stretch", "Migrated" tabs
- Observe badge counts
- Verify data loads in each tab

### 2. Real-time Updates
- Watch for price changes (green/red flash)
- Observe "Live" indicator in header
- Prices update every 2-5 seconds automatically

### 3. Sorting
- Click column headers to sort
- Observe arrow direction (↑/↓)
- Try sorting by: Price, Market Cap, Volume, Liquidity, Holders, Age

### 4. Token Details Modal
- Click any token row
- Modal opens with detailed information
- Click outside or X to close
- Test on mobile (should work smoothly)

### 5. Copy Address
- Hover over token address
- Click copy icon
- Verify address copied to clipboard

### 6. Responsive Design
- Resize browser from 320px to desktop
- Tables should adapt gracefully
- Test on actual mobile device if possible

### 7. Loading States
- Refresh page to see skeleton loaders
- Observe smooth transitions
- No layout shifts

### 8. Error Handling
- Check console for errors (should be none)
- Error boundary catches any React errors

## Performance Testing

### Lighthouse Audit

```bash
# 1. Build production version
npm run build

# 2. Start production server
npm start

# 3. Open Chrome DevTools (F12)
# 4. Go to "Lighthouse" tab
# 5. Select "Desktop" or "Mobile"
# 6. Click "Analyze page load"

# Expected scores: ≥90 for all metrics
```

### Manual Performance Check

- **Initial Load**: Should be < 3 seconds
- **Interactions**: Should feel instant (<100ms)
- **Animations**: Should be smooth (60fps)
- **No Layout Shifts**: Content shouldn't jump

## Code Review Points

### Architecture
```
src/
├── components/     # Atomic design pattern
│   ├── ui/        # Reusable primitives
│   └── tokens/    # Domain components
├── hooks/         # Custom React hooks
├── lib/          # Utilities
├── store/        # Redux state
└── types/        # TypeScript definitions
```

### Key Files
- `src/components/TokenDashboard.tsx` - Main component
- `src/components/tokens/TokenTable.tsx` - Table implementation
- `src/hooks/useTokens.ts` - Data fetching + WebSocket
- `src/store/slices/tokensSlice.ts` - Redux state
- `src/lib/websocket.ts` - Mock WebSocket service

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS 4.0
- **State**: Redux Toolkit + React Query
- **UI**: Radix UI / shadcn/ui
- **Animations**: Framer Motion

## Common Issues

### Port Already in Use
```bash
# Kill process on port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux:
lsof -ti:3000 | xargs kill -9
```

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Styling Issues
```bash
# Ensure Tailwind is working
npm run dev
# Check browser console for CSS errors
```

## Questions?

- Check `ARCHITECTURE.md` for design decisions
- See `README.md` for full documentation
- Review `CONTRIBUTING.md` for code guidelines

## Evaluation Criteria

This project will be evaluated on:
1. **Performance (35%)**: Fast, optimized, <100ms interactions
2. **Code Structure (30%)**: Clean, reusable, well-organized
3. **Pixel-Perfect UI (25%)**: Matches Axiom Trade design
4. **Feature Completeness (10%)**: All requirements met

## Support

For issues or questions, please:
1. Check existing documentation
2. Review the code comments
3. Open an issue on GitHub

---

**Estimated Review Time**: 30-45 minutes
**Live Demo**: [URL will be added after deployment]
**Video Demo**: [URL will be added after recording]
