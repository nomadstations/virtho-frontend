import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Languages, Scale } from 'lucide-react';

export default function ServiceTypeBadge({ type }) {
  const isTranslation = type?.toLowerCase().includes('translation');
  const isLegalization = type?.toLowerCase().includes('legalization');

  return (
    <Badge 
      variant="secondary" 
      className={cn(
        'font-medium inline-flex items-center gap-1.5 px-2.5 py-0.5',
        isTranslation ? 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400' : '',
        isLegalization ? 'bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-400' : ''
      )}
    >
      {isTranslation && <Languages className="w-3.5 h-3.5" />}
      {isLegalization && <Scale className="w-3.5 h-3.5" />}
      {!isTranslation && !isLegalization && <span className="w-2 h-2 rounded-full bg-current" />}
      {type}
    </Badge>
  );
}