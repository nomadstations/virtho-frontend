import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useOpenApps } from '../context/OpenAppsContext';
import { PROVIDER_APPS } from '@/config/providerApps.js';

export default function useWorkspaceNavigation() {
  const location = useLocation();
  const { addOpenApp } = useOpenApps();

  useEffect(() => {
    if (location.pathname.startsWith('/workspace/')) {
      const matchedApp = PROVIDER_APPS.find(
        (app) => location.pathname === app.targetRoute || location.pathname.startsWith(app.targetRoute + '/')
      );

      if (matchedApp) {
        addOpenApp(matchedApp);
      }
    }
  }, [location.pathname, addOpenApp]);
}