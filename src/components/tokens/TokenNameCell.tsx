"use client";

import React from 'react';
import Image from 'next/image';
import { Copy } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface TokenNameCellProps {
  name: string;
  symbol: string;
  address: string;
  logoUrl?: string;
  loading?: boolean;
}

/**
 * Token name cell with logo and copy address functionality
 */
export const TokenNameCell = React.memo(({ name, symbol, address, logoUrl, loading = false }: TokenNameCellProps) => {
  const handleCopyAddress = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(address);
  };

  const truncatedAddress = `${address.slice(0, 4)}...${address.slice(-4)}`;

  if (loading) {
    return (
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
        <div className="flex min-w-0 flex-col">
          <div className="h-4 w-24 rounded bg-muted animate-pulse mb-2" />
          <div className="h-3 w-16 rounded bg-muted animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-muted sm:h-10 sm:w-10">
        {logoUrl && (
          <Image
            src={logoUrl}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 32px, 40px"
            loading="lazy"
          />
        )}
      </div>
      <div className="flex min-w-0 flex-col">
        <div className="flex items-center gap-1 sm:gap-2">
          <span className="truncate text-sm font-semibold sm:text-base">{name}</span>
          <span className="text-xs text-muted-foreground">{symbol}</span>
        </div>
        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleCopyAddress}
                className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                {truncatedAddress}
                <Copy className="h-3 w-3" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy address</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
});
