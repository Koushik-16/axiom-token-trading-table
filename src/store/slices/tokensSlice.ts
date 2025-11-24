import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Token, TableSort, TableFilters, WSStatus } from '@/types/token';

interface TokensState {
  newPairs: Token[];
  finalStretch: Token[];
  migrated: Token[];
  loading: boolean;
  error: string | null;
  wsStatus: WSStatus;
  sort: TableSort;
  filters: TableFilters;
}

const initialState: TokensState = {
  newPairs: [],
  finalStretch: [],
  migrated: [],
  loading: false,
  error: null,
  wsStatus: 'disconnected',
  sort: {
    field: 'marketCap',
    direction: 'desc',
  },
  filters: {},
};

const tokensSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<{ category: keyof Pick<TokensState, 'newPairs' | 'finalStretch' | 'migrated'>; tokens: Token[] }>) => {
      const { category, tokens } = action.payload;
      state[category] = tokens;
    },
    updateToken: (state, action: PayloadAction<Token>) => {
      const token = action.payload;
      const categories: Array<keyof Pick<TokensState, 'newPairs' | 'finalStretch' | 'migrated'>> = ['newPairs', 'finalStretch', 'migrated'];
      
      categories.forEach(category => {
        const index = state[category].findIndex(t => t.id === token.id);
        if (index !== -1) {
          state[category][index] = token;
        }
      });
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setWSStatus: (state, action: PayloadAction<WSStatus>) => {
      state.wsStatus = action.payload;
    },
    setSort: (state, action: PayloadAction<TableSort>) => {
      state.sort = action.payload;
    },
    setFilters: (state, action: PayloadAction<TableFilters>) => {
      state.filters = action.payload;
    },
  },
});

export const {
  setTokens,
  updateToken,
  setLoading,
  setError,
  setWSStatus,
  setSort,
  setFilters,
} = tokensSlice.actions;

export default tokensSlice.reducer;
