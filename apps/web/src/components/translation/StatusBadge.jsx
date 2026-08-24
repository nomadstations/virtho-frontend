import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function StatusBadge({ status }) {
  const getStatusStyles = (statusStr) => {
    switch (statusStr?.toLowerCase()) {
      case 'paid':
      case 'completed':
        return 'bg-success-subtle text-success border-success/20';
      case 'in progress':
      case 'pending':
        return 'bg-warning-subtle text-warning border-warning/20';
      case 'overdue':
      case 'cancelled':
        return 'bg-danger-subtle text-danger border-danger/20';
      default:
        return 'bg-muted text-muted-foreground border-muted-foreground/20';
    }
  };

  return (
    <Badge variant="outline" className={cn('font-medium capitalize', getStatusStyles(status))}>
      {status}
    </Badge>
  );
}