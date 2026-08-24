import React, { createContext, useContext, useState, useCallback } from 'react';

const OpenAppsContext = createContext(null);

export function OpenAppsProvider({ children }) {
  const [openApps, setOpenApps] = useState([]);

  const addOpenApp = useCallback((app) => {
    setOpenApps((prev) => {
      if (prev.some((a) => a.key === app.key)) {
        return prev;
      }
      return [...prev, app];
    });
  }, []);

  const removeOpenApp = useCallback((key) => {
    setOpenApps((prev) => prev.filter((app) => app.key !== key));
  }, []);

  const isAppOpen = useCallback((key) => {
    return openApps.some((app) => app.key === key);
  }, [openApps]);

  const getActiveApp = useCallback((location) => {
    return openApps.find(app => location.pathname.startsWith(app.targetRoute));
  }, [openApps]);

  return (
    <OpenAppsContext.Provider value={{ openApps, addOpenApp, removeOpenApp, isAppOpen, getActiveApp }}>
      {children}
    </OpenAppsContext.Provider>
  );
}

export function useOpenApps() {
  const context = useContext(OpenAppsContext);
  if (!context) {
    throw new Error('useOpenApps must be used within an OpenAppsProvider');
  }
  return context;
}