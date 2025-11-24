# Contributing to Token Trading Table

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

## Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/Koushik-16/token-trading-table.git
   cd token-trading-table
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

## Code Style

- **TypeScript**: All code must be fully typed
- **Formatting**: Run `npm run format` before committing
- **Linting**: Ensure no ESLint errors (`npm run lint`)
- **Naming**: Use descriptive variable and function names

## Component Guidelines

### Creating New Components

1. **Location**: Place in appropriate directory
   - UI primitives → `src/components/ui/`
   - Domain-specific → `src/components/[domain]/`

2. **Structure**:
   ```typescript
   "use client"; // If needed

   import React from 'react';
   
   interface ComponentProps {
     // Props
   }

   export const Component = React.memo(({ prop }: ComponentProps) => {
     // Implementation
   });

   Component.displayName = 'Component';
   ```

3. **Memoization**: Use `React.memo` for performance
4. **Accessibility**: Include ARIA labels where needed
5. **Responsive**: Ensure works on all screen sizes

## Custom Hooks

- Prefix with `use`
- Document parameters and return values
- Add JSDoc comments for complex logic

## Pull Request Process

1. **Create Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Write clear, concise commit messages
   - Test your changes thoroughly
   - Add/update tests if applicable

3. **Format and Lint**
   ```bash
   npm run format
   npm run lint
   ```

4. **Build**
   ```bash
   npm run build
   ```

5. **Submit PR**
   - Describe changes clearly
   - Reference any related issues
   - Include screenshots for UI changes

## Testing Guidelines

- Test on multiple screen sizes
- Verify accessibility
- Check browser compatibility
- Test real-time update functionality

## Questions?

Feel free to open an issue for any questions or concerns.
