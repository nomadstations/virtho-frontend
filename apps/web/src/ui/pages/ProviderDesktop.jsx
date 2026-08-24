import React from 'react';
import { ZONES } from '@/config/zoneConfig.js';
import { PROVIDER_APPS } from '@/config/providerApps.js';
import ZoneCluster from '@/ui/components/ZoneCluster';

export default function ProviderDesktop() {
  return (
    <main 
      className="flex-1 w-full flex flex-col relative p-4 md:p-6 pb-[calc(var(--nav-height-mobile)+2rem)] md:pb-[calc(var(--nav-height-desktop)+2rem)]"
      role="main"
      aria-label="Provider Desktop"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-6 mt-2">
        {/* Render zones dynamically to support N-zone extensibility */}
        {ZONES.map(zone => {
          const apps = PROVIDER_APPS.filter(app => app.zone === zone);
          
          return <ZoneCluster key={zone} zone={zone} apps={apps} />;
        })}
      </div>
    </main>
  );
}