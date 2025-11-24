"use client";

import React from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { SortField, SortDirection } from '@/types/token';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SortableHeaderProps {
  label: string;
  field: SortField;
  currentField: SortField;
  currentDirection: SortDirection;
  onSort: (field: SortField) => void;
  className?: string;
}

/**
 * Sortable table header component
 */
export const SortableHeader = React.memo(({
  label,
  field,
  currentField,
  currentDirection,
  onSort,
  className,
}: SortableHeaderProps) => {
  const isActive = currentField === field;

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => onSort(field)}
      className={cn(
        "h-auto p-0 font-medium hover:bg-transparent",
        isActive && "text-primary",
        className
      )}
    >
      {label}
      {isActive ? (
        currentDirection === 'asc' ? (
          <ArrowUp className="ml-1 h-3 w-3" />
        ) : (
          <ArrowDown className="ml-1 h-3 w-3" />
        )
      ) : (
        <ArrowUpDown className="ml-1 h-3 w-3 opacity-50" />
      )}
    </Button>
  );
});

SortableHeader.displayName = 'SortableHeader';
