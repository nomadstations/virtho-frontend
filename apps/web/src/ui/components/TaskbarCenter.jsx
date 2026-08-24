import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useOpenApps } from '../context/OpenAppsContext';
import OpenAppButton from './OpenAppButton';

export default function TaskbarCenter() {
  const { openApps, removeOpenApp } = useOpenApps();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex items-center justify-center px-4 h-full">
      <div className="flex items-center gap-2 overflow-x-auto overflow-y-hidden custom-scrollbar px-2 py-1 max-w-full">
        {openApps.map((app) => {
          const isActive = location.pathname.startsWith(app.targetRoute);
          return (
            <OpenAppButton
              key={app.key}
              app={app}
              isActive={isActive}
              onClick={() => navigate(app.targetRoute)}
              onClose={() => {
                removeOpenApp(app.key);
                if (isActive) {
                  navigate('/dashboard');
                }
              }}
            />
          );
        })}
      </div>
    </div>
  );
}