import React, { useState } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar.jsx';
import DashboardSettings from '@/components/dashboard/DashboardSettings.jsx';

function DashboardLayout({ children }) {
  console.log('📋 [DashboardLayout] ████████████████████████████████████████████████');
  console.log('📋 [DashboardLayout] COMPONENT MOUNTED / RE-RENDERED');
  console.log('📋 [DashboardLayout] ████████████████████████████████████████████████');
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleOpenSettings = () => {
    console.log('📋 [DashboardLayout] Opening settings');
    setIsSettingsOpen(true);
  };

  const handleMenuUpdate = () => {
    console.log('📋 [DashboardLayout] Menu update triggered');
    if (window.dispatchEvent) {
      window.dispatchEvent(new Event('dashboardMenuUpdate'));
    }
  };

  console.log('📋 [DashboardLayout] About to render children');
  console.log('📋 [DashboardLayout] children type:', typeof children);
  console.log('📋 [DashboardLayout] ████████████████████████████████████████████████');

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen}
        onOpenSettings={handleOpenSettings}
      />
      
      <main className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-8">
          {console.log('📋 [DashboardLayout] Rendering children now...')}
          {children}
          {console.log('📋 [DashboardLayout] Children rendered')}
        </div>
      </main>

      <DashboardSettings 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)}
        onMenuUpdate={handleMenuUpdate}
      />
    </div>
  );
}

export default DashboardLayout;