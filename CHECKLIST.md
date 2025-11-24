# Pre-Deployment Checklist

## Code Quality

- [x] TypeScript strict mode enabled
- [x] No TypeScript errors
- [x] No ESLint warnings
- [x] Code formatted with Prettier
- [x] All imports organized
- [x] No console.log statements (except intentional)
- [x] Dead code removed

## Functionality

- [x] All three tabs working (New Pairs, Final Stretch, Migrated)
- [x] Sorting works on all columns
- [x] Real-time price updates animating
- [x] Modal opens on row click
- [x] Copy address functionality works
- [x] Loading states display correctly
- [x] Error boundaries catch errors
- [x] WebSocket connects and updates

## UI/UX

- [x] Responsive on all screen sizes (320px - desktop)
- [x] Hover effects working
- [x] Click interactions smooth (<100ms)
- [x] No layout shifts (CLS = 0)
- [x] Animations smooth (60fps)
- [x] Tooltips positioned correctly
- [x] Popovers work on mobile
- [x] Accessible (ARIA labels, keyboard nav)

## Performance

- [x] Build completes successfully
- [x] Bundle size optimized
- [x] Images optimized
- [x] Components memoized
- [x] Code split appropriately
- [ ] Lighthouse score ≥90 (mobile)
- [ ] Lighthouse score ≥90 (desktop)
- [x] No memory leaks
- [x] Fast initial load (<3s)

## Documentation

- [x] README.md complete
- [x] ARCHITECTURE.md written
- [x] DEPLOYMENT.md added
- [x] CONTRIBUTING.md added
- [x] Code comments for complex logic
- [x] TypeScript types documented
- [ ] Screenshots added
- [ ] Video demo recorded

## Deployment

- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] Production deployment successful
- [ ] Production URL working
- [ ] Environment variables set (if needed)
- [ ] Custom domain configured (optional)

## Post-Deployment

- [ ] Lighthouse audit run on production
- [ ] All features tested on production
- [ ] Mobile tested on real devices
- [ ] Different browsers tested
- [ ] Screenshots captured
- [ ] Video demo recorded and uploaded
- [ ] README updated with links
- [ ] Social sharing tested

## Video Demo Requirements

- [ ] 1-2 minutes length
- [ ] Show all three tabs
- [ ] Demonstrate sorting
- [ ] Show real-time updates
- [ ] Click on token to show modal
- [ ] Demonstrate responsive design
- [ ] Show loading states
- [ ] Highlight key features
- [ ] Upload to YouTube as public/unlisted
- [ ] Add link to README

## Final Checks

- [ ] All deliverables ready:
  - [ ] GitHub repository with clean commits
  - [ ] Vercel deployment live
  - [ ] YouTube video uploaded
  - [ ] README has all links
  - [ ] Responsive screenshots in README
- [ ] Code follows all requirements:
  - [ ] Next.js 14+ App Router ✓
  - [ ] TypeScript strict ✓
  - [ ] Tailwind CSS ✓
  - [ ] Redux Toolkit ✓
  - [ ] React Query ✓
  - [ ] Radix UI/shadcn ✓
  - [ ] Atomic architecture ✓
  - [ ] Pixel-perfect (≤2px) ✓
  - [ ] Performance optimized ✓
  - [ ] Lighthouse ≥90 (pending)

## Notes

Remember to:
1. Test thoroughly before marking complete
2. Document any issues or limitations
3. Prepare for questions during review
4. Keep the demo video concise and clear
