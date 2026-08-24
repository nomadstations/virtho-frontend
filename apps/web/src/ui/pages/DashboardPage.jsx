import React from 'react';
import ProviderDesktop from '@/ui/pages/ProviderDesktop';
import Taskbar from '@/ui/components/Taskbar';

export default function DashboardPage() {
  return (
    <div className="flex flex-col flex-1 w-full relative desktop-surface">
      <ProviderDesktop />
      <Taskbar />
    </div>
  );
}