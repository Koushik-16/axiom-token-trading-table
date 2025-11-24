import { Token, PriceUpdate } from '@/types/token';
import { generatePriceUpdate } from './mock-data';

type WSCallback = (update: Token) => void;

/**
 * Mock WebSocket service for simulating real-time price updates
 */
export class MockWebSocketService {
  private callbacks: Set<WSCallback> = new Set();
  private tokens: Map<string, Token> = new Map();
  private intervalId: NodeJS.Timeout | null = null;
  private isConnected = false;

  /**
   * Connect to mock WebSocket
   */
  connect(tokens: Token[]): void {
    if (this.isConnected) return;

    tokens.forEach(token => this.tokens.set(token.id, token));
    this.isConnected = true;

    // Simulate price updates every 2-5 seconds
    this.intervalId = setInterval(() => {
      this.broadcastRandomUpdate();
    }, randomInRange(2000, 5000));
  }

  /**
   * Disconnect from mock WebSocket
   */
  disconnect(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isConnected = false;
    this.callbacks.clear();
  }

  /**
   * Subscribe to price updates
   */
  subscribe(callback: WSCallback): () => void {
    this.callbacks.add(callback);
    
    // Return unsubscribe function
    return () => {
      this.callbacks.delete(callback);
    };
  }

  /**
   * Broadcast random token update
   */
  private broadcastRandomUpdate(): void {
    const tokens = Array.from(this.tokens.values());
    if (tokens.length === 0) return;

    const randomToken = tokens[Math.floor(Math.random() * tokens.length)];
    const updatedToken = generatePriceUpdate(randomToken);
    
    this.tokens.set(updatedToken.id, updatedToken);
    this.callbacks.forEach(callback => callback(updatedToken));
  }

  /**
   * Update tokens list
   */
  updateTokens(tokens: Token[]): void {
    this.tokens.clear();
    tokens.forEach(token => this.tokens.set(token.id, token));
  }

  /**
   * Check connection status
   */
  get connected(): boolean {
    return this.isConnected;
  }
}

function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

// Singleton instance
export const mockWebSocket = new MockWebSocketService();
