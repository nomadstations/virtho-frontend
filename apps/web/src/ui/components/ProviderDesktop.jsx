import React from 'react';
import DesktopSurface from './DesktopSurface';
import Taskbar from './Taskbar';
import ZoneCluster from './ZoneCluster';
import { ZONES } from '@/config/zoneConfig.js';
import { PROVIDER_APPS } from '@/config/providerApps.js';

export default function ProviderDesktop() {
  return (
    <div className="flex flex-col w-full h-full relative overflow-hidden rounded-xl border border-border shadow-sm">
      <DesktopSurface>
        <div className="w-full max-w-5xl mx-auto pb-28">
          {ZONES.map((zoneKey) => {
            const filteredApps = PROVIDER_APPS.filter(app => app.zone === zoneKey);
            return (
              <ZoneCluster 
                key={zoneKey} 
                zone={zoneKey} 
                apps={filteredApps} 
              />
            );
          })}
        </div>
      </DesktopSurface>
      <Taskbar />
    </div>
  );
}