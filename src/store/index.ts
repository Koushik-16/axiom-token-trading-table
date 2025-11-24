import { configureStore } from '@reduxjs/toolkit';
import tokensReducer from './slices/tokensSlice';

export const store = configureStore({
  reducer: {
    tokens: tokensReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['tokens/setTokens', 'tokens/updateToken'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.createdAt', 'payload.lastUpdated', 'payload.tokens'],
        // Ignore these paths in the state
        ignoredPaths: ['tokens.newPairs', 'tokens.finalStretch', 'tokens.migrated'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
