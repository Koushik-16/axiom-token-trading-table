/**
 * Token pair status types
 */
export type TokenStatus = 'new' | 'final-stretch' | 'migrated';

/**
 * Sort direction
 */
export type SortDirection = 'asc' | 'desc';

/**
 * Sort field options
 */
export type SortField = 'marketCap' | 'price' | 'volume24h' | 'priceChange24h' | 'liquidity' | 'holders' | 'age';

/**
 * Token interface representing a trading pair
 */
export interface Token {
  id: string;
  name: string;
  symbol: string;
  address: string;
  price: number;
  priceChange24h: number;
  marketCap: number;
  volume24h: number;
  liquidity: number;
  holders: number;
  age: number; // in minutes
  status: TokenStatus;
  logoUrl?: string;
  description?: string;
  website?: string;
  twitter?: string;
  telegram?: string;
  createdAt: Date;
  lastUpdated: Date;
}

/**
 * Price update event from WebSocket
 */
export interface PriceUpdate {
  tokenId: string;
  price: number;
  priceChange24h: number;
  volume24h: number;
  marketCap: number;
  timestamp: number;
}

/**
 * Table filter state
 */
export interface TableFilters {
  minMarketCap?: number;
  maxMarketCap?: number;
  minVolume?: number;
  minLiquidity?: number;
  minHolders?: number;
}

/**
 * Table sort state
 */
export interface TableSort {
  field: SortField;
  direction: SortDirection;
}

/**
 * WebSocket connection status
 */
export type WSStatus = 'connecting' | 'connected' | 'disconnected' | 'error';
