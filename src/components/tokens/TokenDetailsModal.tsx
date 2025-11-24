"use client";

import React, { useState } from 'react';
import { Token } from '@/types/token';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { formatPrice, formatCompactNumber, formatPercentage } from '@/lib/utils';
import { ExternalLink, Globe, Twitter, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface TokenDetailsModalProps {
  token: Token;
  open: boolean;
  onClose: () => void;
  loading?: boolean;
}

/**
 * Modal component for displaying detailed token information
 */
export const TokenDetailsModal = React.memo(({ token, open, onClose, loading = false }: TokenDetailsModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-[95vw] overflow-y-auto sm:max-w-2xl bg-white dark:bg-gray-900">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-white">
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted sm:h-12 sm:w-12">
              {token.logoUrl && (
                <Image
                  src={token.logoUrl}
                  alt={token.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 40px, 48px"
                />
              )}
            </div>
            <div>
              <div className="text-lg font-bold sm:text-xl">{token.name}</div>
              <div className="text-sm text-white/70">{token.symbol}</div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-4 sm:space-y-6">
          {/* Price Info */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 sm:p-4 shadow-sm">
              <div className="mb-1 text-xs text-white/70">Price</div>
              {loading ? (
                <div className="space-y-2">
                  <div className="h-6 w-28 rounded bg-muted animate-pulse" />
                  <div className="h-4 w-20 rounded bg-muted animate-pulse" />
                </div>
              ) : (
                <>
                  <div className="text-base font-bold sm:text-lg text-white">${formatPrice(token.price)}</div>
                  <div className={`text-sm ${token.priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {formatPercentage(token.priceChange24h)}
                  </div>
                </>
              )}
            </div>

            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 sm:p-4 shadow-sm">
              <div className="mb-1 text-xs text-white/70">Market Cap</div>
              {loading ? (
                <div className="h-6 w-28 rounded bg-muted animate-pulse" />
              ) : (
                <div className="text-base font-bold sm:text-lg text-white">${formatCompactNumber(token.marketCap)}</div>
              )}
            </div>

            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 sm:p-4 shadow-sm">
              <div className="mb-1 text-xs text-white/70">24h Volume</div>
              {loading ? (
                <div className="h-6 w-28 rounded bg-muted animate-pulse" />
              ) : (
                <div className="text-base font-bold sm:text-lg text-white">${formatCompactNumber(token.volume24h)}</div>
              )}
            </div>

            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 sm:p-4 shadow-sm">
              <div className="mb-1 text-xs text-white/70">Liquidity</div>
              {loading ? (
                <div className="h-6 w-28 rounded bg-muted animate-pulse" />
              ) : (
                <div className="text-base font-bold sm:text-lg text-white">${formatCompactNumber(token.liquidity)}</div>
              )}
            </div>

            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 sm:p-4 shadow-sm">
              <div className="mb-1 text-xs text-white/70">Holders</div>
              {loading ? (
                <div className="h-6 w-28 rounded bg-muted animate-pulse" />
              ) : (
                <div className="text-base font-bold sm:text-lg text-white">{formatCompactNumber(token.holders)}</div>
              )}
            </div>

            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 sm:p-4 shadow-sm">
              <div className="mb-1 text-xs text-white/70">Age</div>
              {loading ? (
                <div className="h-6 w-20 rounded bg-muted animate-pulse" />
              ) : (
                <div className="text-base font-bold sm:text-lg text-white">
                  {token.age < 60 ? `${token.age}m` : `${Math.floor(token.age / 60)}h`}
                </div>
              )}
            </div>
          </div>

          {/* Contract Address */}
          <div className="space-y-2">
            <div className="text-sm font-semibold text-white">Contract Address</div>
            <div className="flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-2 sm:p-3">
              <code className="flex-1 truncate text-xs sm:text-sm text-white">{token.address}</code>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => navigator.clipboard.writeText(token.address)}
              >
                Copy
              </Button>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-2">
            <div className="text-sm font-semibold text-white">Links</div>
            <div className="flex flex-wrap gap-2">
              {token.website && (
                <Button variant="outline" size="sm" asChild>
                  <a href={token.website} target="_blank" rel="noopener noreferrer">
                    <Globe className="mr-2 h-4 w-4" />
                    Website
                  </a>
                </Button>
              )}
              {token.twitter && (
                <Button variant="outline" size="sm" asChild>
                  <a href={token.twitter} target="_blank" rel="noopener noreferrer">
                    <Twitter className="mr-2 h-4 w-4" />
                    Twitter
                  </a>
                </Button>
              )}
              {token.telegram && (
                <Button variant="outline" size="sm" asChild>
                  <a href={token.telegram} target="_blank" rel="noopener noreferrer">
                    <Send className="mr-2 h-4 w-4" />
                    Telegram
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
});

TokenDetailsModal.displayName = 'TokenDetailsModal';
