import React from 'react';
import { DashboardSettings } from '@/components/dashboard/DashboardSettings';

export function SettingsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <DashboardSettings 
      isOpen={isOpen} 
      onClose={onClose}
      onMenuUpdate={() => {
        // Trigger menu update event
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('dashboardMenuUpdate'));
        }
      }}
    />
  );
}