# Architecture Documentation

## Overview

This project follows **Atomic Design** principles combined with **Feature-Sliced Design** to create a scalable, maintainable architecture.

## Directory Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles + Tailwind
│
├── components/            # React components
│   ├── ui/               # Atomic UI components (atoms)
│   │   ├── button.tsx
│   │   ├── table.tsx
│   │   ├── tooltip.tsx
│   │   ├── popover.tsx
│   │   ├── dialog.tsx
│   │   ├── tabs.tsx
│   │   ├── badge.tsx
│   │   └── skeleton.tsx
│   │
│   ├── tokens/           # Domain components (molecules/organisms)
│   │   ├── TokenTable.tsx
│   │   ├── TokenNameCell.tsx
│   │   ├── PriceCell.tsx
│   │   ├── StatCell.tsx
│   │   ├── SortableHeader.tsx
│   │   ├── TokenDetailsModal.tsx
│   │   └── TableSkeleton.tsx
│   │
│   ├── TokenDashboard.tsx  # Page template
│   ├── Providers.tsx       # App-level providers
│   └── ErrorBoundary.tsx   # Error handling
│
├── hooks/                # Custom React hooks
│   ├── useTokens.ts      # Token data fetching + real-time
│   ├── useTableSort.ts   # Sorting and filtering logic
│   └── useAnimations.ts  # Animation utilities
│
├── lib/                  # Utilities and helpers
│   ├── utils.ts          # General utilities
│   ├── mock-data.ts      # Mock data generation
│   └── websocket.ts      # WebSocket simulation
│
├── store/                # Redux state management
│   ├── index.ts          # Store configuration
│   ├── hooks.ts          # Typed hooks
│   └── slices/
│       └── tokensSlice.ts
│
└── types/                # TypeScript definitions
    └── token.ts          # Token interfaces
```

## Design Patterns

### 1. Atomic Design

**Atoms** (UI primitives):
- `Button`, `Skeleton`, `Badge`
- Single responsibility
- Highly reusable
- No business logic

**Molecules** (Simple components):
- `TokenNameCell`, `PriceCell`, `StatCell`
- Combine atoms
- Domain-specific
- Minimal state

**Organisms** (Complex components):
- `TokenTable`, `SortableHeader`
- Combine molecules
- Manage local state
- Business logic

**Templates** (Page layouts):
- `TokenDashboard`
- Combine organisms
- Handle global state
- Define page structure

### 2. Component Memoization

All components use `React.memo` to prevent unnecessary re-renders:

```typescript
export const Component = React.memo(({ props }) => {
  // Implementation
});
```

### 3. Custom Hooks Pattern

Hooks extract reusable logic:

```typescript
// Data fetching
useTokens(status, count)

// Sorting/filtering
useTableSort(tokens)

// Animations
usePriceAnimation(value)
```

### 4. Container/Presenter Pattern

- **Containers**: Manage state and data (e.g., `TokenDashboard`)
- **Presenters**: Pure UI components (e.g., `PriceCell`)

## State Management

### Redux Toolkit

Global state for tokens:
- Current tokens by category
- Loading states
- WebSocket connection status
- Sorting and filtering preferences

```typescript
// Store structure
{
  tokens: {
    newPairs: Token[],
    finalStretch: Token[],
    migrated: Token[],
    loading: boolean,
    wsStatus: WSStatus,
    sort: TableSort,
    filters: TableFilters
  }
}
```

### React Query

Server state management:
- Data fetching
- Caching
- Refetching
- Optimistic updates

```typescript
useQuery({
  queryKey: ['tokens', status],
  queryFn: fetchTokens,
  staleTime: 30000,
  refetchInterval: 60000
})
```

### Local State

Component-level state with `useState`:
- UI state (modals, popovers)
- Form inputs
- Temporary selections

## Data Flow

```
┌─────────────────┐
│   User Action   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Event Handler  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Redux Action   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│     Reducer     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Store Update  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Component Re-  │
│     render      │
└─────────────────┘
```

## Real-time Updates

### WebSocket Simulation

```typescript
class MockWebSocketService {
  connect(tokens: Token[])
  disconnect()
  subscribe(callback)
  updateTokens(tokens)
}
```

### Update Flow

1. Component mounts → Connect WebSocket
2. WebSocket emits update → Callback triggered
3. Callback dispatches Redux action → State updated
4. Component re-renders with new data
5. Animation triggers on price change

## Performance Optimizations

### 1. Code Splitting

- Automatic route-based splitting by Next.js
- Dynamic imports for heavy components

### 2. Memoization

```typescript
// Components
React.memo(Component)

// Values
useMemo(() => computation, [deps])

// Callbacks
useCallback(() => handler, [deps])
```

### 3. Virtual Scrolling

For large token lists (future enhancement):
```typescript
import { useVirtualizer } from '@tanstack/react-virtual'
```

### 4. Image Optimization

```typescript
<Image
  src={url}
  alt={alt}
  fill
  sizes="40px"
  loading="lazy"
/>
```

### 5. Bundle Optimization

- Tree shaking
- Minification
- Compression
- Code splitting

## Styling Strategy

### Tailwind CSS v4

- Utility-first approach
- CSS variables for theming
- Responsive design utilities
- Dark mode support

### Component Styling

```typescript
// Utility function for class merging
cn(
  "base-classes",
  condition && "conditional-classes",
  className // Allow overrides
)
```

### Theme System

CSS variables in `globals.css`:
```css
--background: 0 0% 100%;
--foreground: 240 10% 3.9%;
--primary: 240 5.9% 10%;
// ...
```

## Error Handling

### Error Boundaries

Catch React errors:
```typescript
<ErrorBoundary fallback={<ErrorUI />}>
  <Component />
</ErrorBoundary>
```

### API Error Handling

```typescript
try {
  const data = await fetchData();
} catch (error) {
  dispatch(setError(error.message));
  // Show error UI
}
```

### Loading States

- Skeleton screens during fetch
- Shimmer effects
- Progressive loading

## Testing Strategy

### Unit Tests (Future)
- Component tests with React Testing Library
- Hook tests with `@testing-library/react-hooks`
- Utility function tests with Jest

### Integration Tests (Future)
- User flow tests
- API integration tests

### E2E Tests (Future)
- Playwright for full user journeys

## Accessibility

### ARIA Labels
```typescript
<button aria-label="Sort by price">
  Sort
</button>
```

### Keyboard Navigation
- Tab order
- Escape to close modals
- Enter to activate

### Screen Reader Support
- Semantic HTML
- Live regions for updates
- Descriptive labels

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

1. **Virtual Scrolling** for large datasets
2. **Infinite Scroll** for pagination
3. **Charts** for price history
4. **Filters** UI component
5. **User Preferences** persistence
6. **Real WebSocket** integration
7. **Unit/Integration Tests**
8. **Storybook** for component documentation
