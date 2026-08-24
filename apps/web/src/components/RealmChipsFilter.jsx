import React from 'react';
import { ZONES, CATEGORY_LABELS } from '@/config/zoneConfig';

export default function RealmChipsFilter({ currentRealm, onRealmChange }) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-8">
      <button
        onClick={() => onRealmChange(null)}
        className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-200 border ${
          !currentRealm
            ? 'bg-foreground text-background border-foreground shadow-md scale-105'
            : 'bg-card text-muted-foreground border-border hover:bg-muted hover:text-foreground'
        }`}
        aria-pressed={!currentRealm}
      >
        All
      </button>
      
      {ZONES.filter(z => z !== 'settings').map(realm => {
        const isActive = currentRealm === realm;
        
        return (
          <button
            key={realm}
            onClick={() => onRealmChange(realm)}
            className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-200 border ${
              isActive ? 'shadow-md scale-105' : 'hover:scale-105'
            }`}
            style={{
              backgroundColor: isActive ? `hsl(var(--zone-${realm}))` : `hsl(var(--zone-${realm}-soft))`,
              color: isActive ? 'white' : `hsl(var(--zone-${realm}-ink))`,
              borderColor: isActive ? `hsl(var(--zone-${realm}))` : `hsla(var(--zone-${realm}), 0.2)`
            }}
            aria-pressed={isActive}
          >
            {CATEGORY_LABELS[realm] || realm}
          </button>
        );
      })}
    </div>
  );
}