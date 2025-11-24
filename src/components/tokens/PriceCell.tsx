"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { formatPrice, formatPercentage, getChangeColor } from '@/lib/utils';
import { usePriceAnimation } from '@/hooks/useAnimations';

interface PriceCellProps {
  price: number;
  change24h: number;
  loading?: boolean;
}

/**
 * Animated price cell component with color transitions
 */
export const PriceCell = React.memo(({ price, change24h, loading = false }: PriceCellProps) => {
  const { isAnimating, direction } = usePriceAnimation(price);

  if (loading) {
    return (
      <div className="flex flex-col gap-1">
        <div className="h-4 w-20 rounded bg-muted animate-pulse" />
        <div className="h-3 w-12 rounded bg-muted animate-pulse" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-0.5">
      <motion.div
        className={`font-mono text-sm font-semibold transition-colors duration-300 ${
          isAnimating
            ? direction === 'up'
              ? 'text-green-500'
              : 'text-red-500'
            : 'text-foreground'
        }`}
        animate={isAnimating ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        ${formatPrice(price)}
      </motion.div>
      <div className={`text-xs ${getChangeColor(change24h)}`}>
        {formatPercentage(change24h)}
      </div>
    </div>
  );
});

PriceCell.displayName = 'PriceCell';
