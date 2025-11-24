"use client";

import React, { useState } from 'react';
import { TokenTable } from '@/components/tokens/TokenTable';
import { useTokens } from '@/hooks/useTokens';
import { useRealtimeUpdates } from '@/hooks/useTokens';
import { useAppSelector } from '@/store/hooks';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Activity } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

/**
 * Token dashboard component managing all token categories
 */
export function TokenDashboard() {
  const [activeTab, setActiveTab] = useState('new');

  // Fetch tokens for each category
  useTokens('new', 20);
  useTokens('final-stretch', 20);
  useTokens('migrated', 20);

  // Get tokens from Redux store
  const newPairs = useAppSelector((state) => state.tokens.newPairs);
  const finalStretch = useAppSelector((state) => state.tokens.finalStretch);
  const migrated = useAppSelector((state) => state.tokens.migrated);
  const loading = useAppSelector((state) => state.tokens.loading);
  const wsStatus = useAppSelector((state) => state.tokens.wsStatus);

  // Enable real-time updates for the active category
  const activeTokens = 
    activeTab === 'new' ? newPairs :
    activeTab === 'final-stretch' ? finalStretch :
    migrated;
  
  useRealtimeUpdates(activeTokens);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Token Discovery</h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Track new token launches, final stretch tokens, and migrated pairs
          </p>
        </div>
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2">
            <Activity
              className={`h-4 w-4 ${
                wsStatus === 'connected'
                  ? 'text-green-500 animate-pulse'
                  : 'text-muted-foreground'
              }`}
            />
            <span className="text-sm text-muted-foreground">
              {wsStatus === 'connected' ? 'Live' : 'Offline'}
            </span>
          </div>
          <ThemeToggle />
        </div>
      </div>

      {/* Tabs */}
      <ErrorBoundary>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 sm:w-auto sm:inline-flex">
            <TabsTrigger value="new" className="relative text-xs sm:text-sm">
              <span className="hidden sm:inline">New Pairs</span>
              <span className="sm:hidden">New</span>
              {newPairs.length > 0 && (
                <Badge variant="secondary" className="ml-1 h-4 min-w-4 px-1 text-xs sm:ml-2 sm:h-5 sm:min-w-5">
                  {newPairs.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="final-stretch" className="relative text-xs sm:text-sm">
              <span className="hidden sm:inline">Final Stretch</span>
              <span className="sm:hidden">Final</span>
              {finalStretch.length > 0 && (
                <Badge variant="secondary" className="ml-1 h-4 min-w-4 px-1 text-xs sm:ml-2 sm:h-5 sm:min-w-5">
                  {finalStretch.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="migrated" className="relative text-xs sm:text-sm">
              Migrated
              {migrated.length > 0 && (
                <Badge variant="secondary" className="ml-1 h-4 min-w-4 px-1 text-xs sm:ml-2 sm:h-5 sm:min-w-5">
                  {migrated.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="new" className="mt-6">
            <TokenTable tokens={newPairs} loading={loading} status="new" />
          </TabsContent>

          <TabsContent value="final-stretch" className="mt-6">
            <TokenTable tokens={finalStretch} loading={loading} status="final-stretch" />
          </TabsContent>

          <TabsContent value="migrated" className="mt-6">
            <TokenTable tokens={migrated} loading={loading} status="migrated" />
          </TabsContent>
        </Tabs>
      </ErrorBoundary>
    </div>
  );
}
