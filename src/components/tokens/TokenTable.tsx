"use client";

import React, { useState, useMemo } from 'react';
import { Token, SortField, TokenStatus } from '@/types/token';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TokenNameCell } from './TokenNameCell';
import { PriceCell } from './PriceCell';
import { StatCell } from './StatCell';
import { SortableHeader } from './SortableHeader';
import { TokenDetailsModal } from './TokenDetailsModal';
import { TableSkeleton } from './TableSkeleton';
import { useTableSort } from '@/hooks/useTableSort';

interface TokenTableProps {
  tokens: Token[];
  loading?: boolean;
  status: TokenStatus;
}

/**
 * Main token table component with sorting, filtering, and interactions
 */
export const TokenTable = React.memo(({ tokens, loading, status }: TokenTableProps) => {
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const {
    sortField,
    sortDirection,
    handleSort,
    filteredAndSortedTokens,
  } = useTableSort(tokens);

  if (loading) {
    return <TableSkeleton />;
  }

  if (tokens.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-md border">
        <p className="text-muted-foreground">No tokens found</p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-36 sm:w-44 lg:w-52">Token</TableHead>
              <TableHead className="w-24">
                <SortableHeader
                  label="Price"
                  field="price"
                  currentField={sortField}
                  currentDirection={sortDirection}
                  onSort={handleSort}
                />
              </TableHead>
              <TableHead className="hidden w-28 sm:table-cell">
                <SortableHeader
                  label="Market Cap"
                  field="marketCap"
                  currentField={sortField}
                  currentDirection={sortDirection}
                  onSort={handleSort}
                />
              </TableHead>
              <TableHead className="hidden w-28 md:table-cell">
                <SortableHeader
                  label="Volume 24h"
                  field="volume24h"
                  currentField={sortField}
                  currentDirection={sortDirection}
                  onSort={handleSort}
                />
              </TableHead>
              <TableHead className="hidden w-28 lg:table-cell">
                <SortableHeader
                  label="Liquidity"
                  field="liquidity"
                  currentField={sortField}
                  currentDirection={sortDirection}
                  onSort={handleSort}
                />
              </TableHead>
              <TableHead className="hidden w-24 xl:table-cell">
                <SortableHeader
                  label="Holders"
                  field="holders"
                  currentField={sortField}
                  currentDirection={sortDirection}
                  onSort={handleSort}
                />
              </TableHead>
              <TableHead className="hidden w-20 xl:table-cell">
                <SortableHeader
                  label="Age"
                  field="age"
                  currentField={sortField}
                  currentDirection={sortDirection}
                  onSort={handleSort}
                />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedTokens.map((token) => (
              <TableRow
                key={token.id}
                className="cursor-pointer transition-colors"
                onClick={() => setSelectedToken(token)}
              >
                <TableCell>
                  <TokenNameCell
                    name={token.name}
                    symbol={token.symbol}
                    address={token.address}
                    logoUrl={token.logoUrl}
                    loading={loading}
                  />
                </TableCell>
                <TableCell>
                  <PriceCell price={token.price} change24h={token.priceChange24h} loading={loading} />
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <StatCell value={token.marketCap} prefix="$" loading={loading} />
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <StatCell value={token.volume24h} prefix="$" loading={loading} />
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <StatCell value={token.liquidity} prefix="$" loading={loading} />
                </TableCell>
                <TableCell className="hidden xl:table-cell">
                  <StatCell value={token.holders} loading={loading} />
                </TableCell>
                <TableCell className="hidden xl:table-cell">
                  <div className="font-mono text-sm">
                    {token.age < 60 ? `${token.age}m` : `${Math.floor(token.age / 60)}h`}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedToken && (
        <TokenDetailsModal
          token={selectedToken}
          open={!!selectedToken}
          onClose={() => setSelectedToken(null)}
        />
      )}
    </>
  );
});

TokenTable.displayName = 'TokenTable';
