import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export default function MetricCard({ title, value, icon: Icon, trend, trendLabel, statusColor }) {
  return (
    <Card className="overflow-hidden border-border/50 shadow-sm transition-all hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className={cn('p-2 rounded-lg', statusColor || 'bg-primary/10 text-primary')}>
            {Icon && <Icon className="w-5 h-5" />}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-2xl font-bold tracking-tight text-foreground">{value}</h3>
          {trend && (
            <p className="text-xs flex items-center gap-1 font-medium">
              <span className={cn(
                trend.startsWith('+') ? 'text-success' : 'text-danger'
              )}>
                {trend}
              </span>
              <span className="text-muted-foreground">{trendLabel}</span>
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}