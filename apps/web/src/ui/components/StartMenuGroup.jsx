import React from 'react';
import StartMenuItem from './StartMenuItem';

export default function StartMenuGroup({ zone, apps, onAppClick }) {
  if (!apps || apps.length === 0) return null;

  return (
    <div className="mb-2 rounded-lg overflow-hidden border border-border bg-card/50">
      <div 
        className="flex items-center px-4 py-3 text-xs font-bold uppercase tracking-wider"
        style={{ 
          backgroundColor: `hsl(var(--zone-${zone}-soft))`,
          color: `hsl(var(--zone-${zone}-ink))`
        }}
      >
        {zone}
      </div>
      <div className="flex flex-col py-1">
        {apps.map((app) => (
          <StartMenuItem key={app.key} item={app} onClick={onAppClick} />
        ))}
      </div>
    </div>
  );
}