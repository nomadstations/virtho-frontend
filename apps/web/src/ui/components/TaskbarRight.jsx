import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import NotificationsTrayItem from './NotificationsTrayItem';
import SettingsTrayItem from './SettingsTrayItem';
import ProfileTrayItem from './ProfileTrayItem';
import NotificationsPopover from './NotificationsPopover';
import ProfilePopover from './ProfilePopover';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function TaskbarRight() {
  const [openPopover, setOpenPopover] = useState(null);
  const trayRef = useRef(null);
  const navigate = useNavigate();

  // Outside click detection
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (trayRef.current && !trayRef.current.contains(e.target)) {
        setOpenPopover(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Escape key handler
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && openPopover) {
        setOpenPopover(null);
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [openPopover]);

  const togglePopover = (name) => {
    setOpenPopover(prev => (prev === name ? null : name));
  };

  return (
    <TooltipProvider>
      <div ref={trayRef} className="flex-1 flex items-center justify-end px-4 h-full relative">
        <div className="flex items-center gap-1">
          <NotificationsTrayItem 
            isOpen={openPopover === 'notifications'} 
            onClick={() => togglePopover('notifications')} 
            badgeCount={0}
          />
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <SettingsTrayItem onClick={() => navigate('/settings')} />
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={10}>
              <p>Settings</p>
            </TooltipContent>
          </Tooltip>

          <ProfileTrayItem 
            isOpen={openPopover === 'profile'} 
            onClick={() => togglePopover('profile')} 
          />
        </div>

        <NotificationsPopover isOpen={openPopover === 'notifications'} />
        <ProfilePopover isOpen={openPopover === 'profile'} />
      </div>
    </TooltipProvider>
  );
}