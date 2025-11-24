"use client";

import { useState, useMemo, useCallback } from 'react';
import { Token, SortField, SortDirection, TableFilters } from '@/types/token';

/**
 * Custom hook for table sorting and filtering
 */
export function useTableSort(tokens: Token[]) {
  const [sortField, setSortField] = useState<SortField>('marketCap');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [filters, setFilters] = useState<TableFilters>({});

  const handleSort = useCallback((field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  }, [sortField]);

  const filteredAndSortedTokens = useMemo(() => {
    let result = [...tokens];

    // Apply filters
    if (filters.minMarketCap) {
      result = result.filter(t => t.marketCap >= filters.minMarketCap!);
    }
    if (filters.maxMarketCap) {
      result = result.filter(t => t.marketCap <= filters.maxMarketCap!);
    }
    if (filters.minVolume) {
      result = result.filter(t => t.volume24h >= filters.minVolume!);
    }
    if (filters.minLiquidity) {
      result = result.filter(t => t.liquidity >= filters.minLiquidity!);
    }
    if (filters.minHolders) {
      result = result.filter(t => t.holders >= filters.minHolders!);
    }

    // Apply sorting
    result.sort((a, b) => {
      const aValue = a[sortField] as number;
      const bValue = b[sortField] as number;
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [tokens, sortField, sortDirection, filters]);

  return {
    sortField,
    sortDirection,
    filters,
    handleSort,
    setFilters,
    filteredAndSortedTokens,
  };
}
