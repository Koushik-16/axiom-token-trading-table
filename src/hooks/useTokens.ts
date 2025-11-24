"use client";

import { useEffect, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAppDispatch } from '@/store/hooks';
import { setTokens, updateToken, setWSStatus, setLoading, setError } from '@/store/slices/tokensSlice';
import { Token, TokenStatus } from '@/types/token';
import { generateMockTokens } from '@/lib/mock-data';
import { mockWebSocket } from '@/lib/websocket';

/**
 * Custom hook for fetching and managing tokens
 */
export function useTokens(status: TokenStatus, count: number = 20) {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['tokens', status],
    queryFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return generateMockTokens(count, status);
    },
    staleTime: 30000, // 30 seconds
    refetchInterval: 60000, // 1 minute
  });

  useEffect(() => {
    if (data) {
      const categoryMap: Record<TokenStatus, 'newPairs' | 'finalStretch' | 'migrated'> = {
        'new': 'newPairs',
        'final-stretch': 'finalStretch',
        'migrated': 'migrated',
      };
      dispatch(setTokens({ category: categoryMap[status], tokens: data }));
    }
  }, [data, dispatch, status]);

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  useEffect(() => {
    if (error) {
      dispatch(setError(error.message));
    }
  }, [error, dispatch]);

  return { data, isLoading, error, refetch };
}

/**
 * Custom hook for WebSocket real-time updates
 */
export function useRealtimeUpdates(tokens: Token[]) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (tokens.length === 0) return;

    dispatch(setWSStatus('connecting'));
    mockWebSocket.connect(tokens);
    dispatch(setWSStatus('connected'));

    const unsubscribe = mockWebSocket.subscribe((updatedToken) => {
      dispatch(updateToken(updatedToken));
    });

    return () => {
      unsubscribe();
      mockWebSocket.disconnect();
      dispatch(setWSStatus('disconnected'));
    };
  }, [tokens, dispatch]);

  return mockWebSocket.connected;
}
