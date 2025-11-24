"use client";

import React from 'react';
import { formatCompactNumber } from '@/lib/utils';

interface StatCellProps {
  value: number;
  label?: string;
  prefix?: string;
  suffix?: string;
  loading?: boolean;
}

/**
 * Generic stat cell component for displaying metrics
 */
export const StatCell = React.memo(({ value, label, prefix = '', suffix = '', loading = false }: StatCellProps) => {
  if (loading) {
    return (
      <div className="flex flex-col gap-1">
        <div className="h-4 w-20 rounded bg-muted animate-pulse" />
        {label && <div className="h-3 w-12 rounded bg-muted animate-pulse" />}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-0.5">
      <div className="font-mono text-sm font-medium">
        {prefix}{formatCompactNumber(value)}{suffix}
      </div>
      {label && (
        <div className="text-xs text-muted-foreground">{label}</div>
      )}
    </div>
  );
});

StatCell.displayName = 'StatCell';
