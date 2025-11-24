# Deployment Guide

## Vercel Deployment (Recommended)

### Method 1: Via Vercel Dashboard

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Import to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Configure project:
     - Framework Preset: Next.js
     - Build Command: `npm run build`
     - Output Directory: `.next`
   - Click "Deploy"

3. **Environment Variables** (if needed)
   - No environment variables required for this project
   - All data is mock/simulated

### Method 2: Via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

## Performance Checklist Before Deployment

- [x] Build succeeds without errors (`npm run build`)
- [x] No TypeScript errors
- [x] No ESLint warnings
- [x] Images optimized
- [x] Components memoized
- [x] Code splitting implemented
- [x] Error boundaries in place
- [ ] Lighthouse score ≥90

## Post-Deployment Steps

1. **Test Production Build Locally**
   ```bash
   npm run build
   npm start
   # Visit http://localhost:3000
   ```

2. **Run Lighthouse Audit**
   - Open Chrome DevTools
   - Go to Lighthouse tab
   - Run audit for both mobile and desktop
   - Ensure scores ≥90

3. **Test Responsive Design**
   - Test on various screen sizes (320px - desktop)
   - Verify layout doesn't break
   - Check mobile interactions

4. **Update README**
   - Add live deployment URL
   - Add screenshots
   - Update demo video link

## Troubleshooting

### Build Fails
- Check Node version (should be ≥18)
- Clear `.next` folder: `rm -rf .next`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`

### Slow Performance
- Check bundle size: `npm run build`
- Analyze with `@next/bundle-analyzer`
- Ensure images are properly optimized

### Layout Issues
- Verify Tailwind CSS is configured correctly
- Check for conflicting CSS
- Ensure responsive classes are applied

## Alternative Deployment Platforms

### Netlify
```bash
# netlify.toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Railway
- Connect GitHub repository
- Set build command: `npm run build`
- Set start command: `npm start`

### AWS Amplify
- Connect repository
- Build settings: Auto-detect
- Deploy
