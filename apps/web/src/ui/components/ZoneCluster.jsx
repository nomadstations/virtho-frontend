import React from 'react';
import AppTile from './AppTile';
import { CATEGORY_LABELS } from '@/config/zoneConfig';
import { Plus } from 'lucide-react';

export default function ZoneCluster({ zone, apps }) {
  const zoneLabel = CATEGORY_LABELS[zone] || zone;

  return (
    <section 
      className="w-full flex flex-col rounded-xl overflow-hidden shadow-sm border border-border mb-6"
      aria-labelledby={`zone-heading-${zone}`}
      style={{ backgroundColor: `hsl(var(--zone-${zone}-soft))` }}
    >
      <header 
        id={`zone-heading-${zone}`}
        className="w-full px-4 md:px-6 py-3 font-bold uppercase tracking-wider text-xs md:text-sm"
        style={{ color: `hsl(var(--zone-${zone}-ink))` }}
      >
        {zoneLabel}
      </header>
      
      <div className="w-full px-4 md:px-6 pt-4 pb-6 md:pt-6 md:pb-8">
        <div className="flex flex-wrap gap-4 md:gap-6 items-start justify-start">
          {apps && apps.length > 0 ? (
            apps.map((app) => (
              <AppTile key={app.key} app={app} />
            ))
          ) : (
            <div className="flex flex-col items-center w-[120px] md:w-[140px] text-center cursor-pointer group outline-none">
              <div 
                className="relative flex flex-shrink-0 items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full border border-dashed border-gray-400 dark:border-gray-600 transition-all group-hover:scale-[1.02] mb-2 md:mb-3 bg-background/50"
              >
                <Plus className="w-8 h-8 md:w-10 md:h-10 text-gray-500 dark:text-gray-400" />
              </div>
              <span className="text-[11px] md:text-xs font-medium text-foreground w-full px-1 whitespace-normal break-words leading-tight">
                Start creating - games and creative projects coming soon
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}