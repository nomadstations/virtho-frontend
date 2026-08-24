import React, { createContext, useState, useEffect, useContext } from 'react';
import { MODULE_ZONE_MAP as INITIAL_MAP } from '@/config/zoneConfig.js';

export const ZoneContext = createContext({ 
  zone: null, 
  setZone: () => {},
  moduleZoneMap: INITIAL_MAP,
  setModuleZoneMap: () => {}
});

export function ZoneProvider({ children }) {
  const [zone, setZone] = useState(null);
  const [moduleZoneMap, setModuleZoneMap] = useState(INITIAL_MAP);

  useEffect(() => {
    if (zone === null) {
      // Neutral fallback defaults to primary brand colors smoothly when null/home/settings
      document.documentElement.style.setProperty('--zone', 'var(--primary)');
      document.documentElement.style.setProperty('--zone-soft', 'var(--primary-lighter)');
      document.documentElement.style.setProperty('--zone-ink', 'var(--primary-dark)');
    } else {
      document.documentElement.style.setProperty('--zone', `var(--zone-${zone})`);
      document.documentElement.style.setProperty('--zone-soft', `var(--zone-${zone}-soft)`);
      document.documentElement.style.setProperty('--zone-ink', `var(--zone-${zone}-ink)`);
    }
  }, [zone]);

  return (
    <ZoneContext.Provider value={{ zone, setZone, moduleZoneMap, setModuleZoneMap }}>
      {children}
    </ZoneContext.Provider>
  );
}

export function useZone() {
  return useContext(ZoneContext);
}