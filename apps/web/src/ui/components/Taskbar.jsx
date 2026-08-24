/* 
 * DIAGNOSIS SUMMARY:
 * 1. Root Cause Ancestor: <motion.div> wrapping the <DashboardPage /> component inside App.jsx's <AnimatedRoutes>.
 * 2. Offending Property: transform: translateY(...) (applied via Framer Motion's "y" animation property).
 * 3. Why it failed: Any transform property strictly establishes a new "containing block" and "stacking context" for all descendants. 
 *    As a result, position:fixed is trapped inside the transformed motion.div and rendered relative to it instead of the browser viewport.
 * 4. Fix Applied: Option B. Using React.createPortal() to mount the Taskbar directly into document.body.
 *    This completely removes the Taskbar from the motion.div's DOM hierarchy, ensuring position:fixed works flawlessly against the viewport window.
 */

import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { LayoutGrid, Settings, User, Bell } from 'lucide-react';
import TaskbarLeft from './TaskbarLeft';
import TaskbarCenter from './TaskbarCenter';
import TaskbarRight from './TaskbarRight';
import StartButton from './StartButton';
import StartMenu from './StartMenu';
import OpenAppsSheet from './OpenAppsSheet';
import { useOpenApps } from '../context/OpenAppsContext';
import ProfilePopover from './ProfilePopover';
import SettingsPopover from './SettingsPopover';

export default function Taskbar() {
  const { openApps } = useOpenApps();
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [isOpenAppsSheetOpen, setIsOpenAppsSheetOpen] = useState(false);
  const [activeMobilePopover, setActiveMobilePopover] = useState(null);

  const toggleMobilePopover = (name) => {
    setActiveMobilePopover(prev => (prev === name ? null : name));
  };

  // Ensure SSR safety by checking if document is defined
  if (typeof document === 'undefined') return null;

  return createPortal(
    <div style={{ zIndex: 'var(--z-header)', position: 'relative' }}>
      <div 
        className="fixed bottom-0 left-0 right-0 w-full taskbar-glass border-t border-border/20 shrink-0 flex flex-row items-center h-[var(--nav-height-mobile)] md:h-[var(--nav-height-desktop)]"
      >
        {/* Desktop View (md and up) */}
        <div className="hidden md:flex w-full h-full">
          <TaskbarLeft />
          <TaskbarCenter />
          <TaskbarRight />
        </div>

        {/* Mobile View (below md) */}
        <div className="flex md:hidden w-full h-full items-center justify-between px-2">
          {/* Left: Start Menu Toggle */}
          <div className="flex-1 flex justify-start">
            <StartButton 
              isOpen={isStartMenuOpen} 
              onClick={() => setIsStartMenuOpen(!isStartMenuOpen)} 
            />
          </div>

          {/* Center: Open Apps Sheet Toggle */}
          <div className="flex-1 flex justify-center">
            <button
              aria-label="Open Apps"
              aria-expanded={isOpenAppsSheetOpen}
              onClick={() => setIsOpenAppsSheetOpen(true)}
              className="relative p-2 rounded-xl text-white hover:bg-white/10 transition-colors focus-ring"
            >
              <LayoutGrid className="w-6 h-6" />
              {openApps.length > 0 && (
                <span className="absolute top-1 right-1 flex items-center justify-center min-w-[16px] h-4 px-1 rounded-full bg-primary-dark text-white text-[10px] font-bold shadow-sm ring-2 ring-white/10">
                  {openApps.length}
                </span>
              )}
            </button>
          </div>

          {/* Right: Compact System Tray */}
          <div className="flex-1 flex justify-end gap-1">
            <button
              aria-label="Notifications"
              className="p-2 rounded-xl text-white/80 hover:bg-white/10 hover:text-white transition-colors focus-ring"
            >
              <Bell className="w-5 h-5" />
            </button>
            <button
              aria-label="Settings"
              aria-expanded={activeMobilePopover === 'settings'}
              onClick={() => toggleMobilePopover('settings')}
              className="p-2 rounded-xl text-white/80 hover:bg-white/10 hover:text-white transition-colors focus-ring"
            >
              <Settings className="w-5 h-5" />
            </button>
            <button
              aria-label="Profile"
              aria-expanded={activeMobilePopover === 'profile'}
              onClick={() => toggleMobilePopover('profile')}
              className="p-2 rounded-xl text-white/80 hover:bg-white/10 hover:text-white transition-colors focus-ring"
            >
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Start Menu Overlay */}
      <div className="md:hidden">
        <StartMenu isOpen={isStartMenuOpen} onClose={() => setIsStartMenuOpen(false)} />
      </div>

      {/* Mobile Open Apps Sheet */}
      <OpenAppsSheet 
        isOpen={isOpenAppsSheetOpen} 
        onClose={() => setIsOpenAppsSheetOpen(false)} 
      />

      {/* Mobile Popovers */}
      <div className="md:hidden fixed bottom-[var(--nav-height-mobile)] right-0" style={{ zIndex: 'var(--z-dropdown)' }}>
        <SettingsPopover isOpen={activeMobilePopover === 'settings'} />
        <ProfilePopover isOpen={activeMobilePopover === 'profile'} />
      </div>
    </div>,
    document.body
  );
}