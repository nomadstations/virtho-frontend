import React from 'react';
import { LogOut, Settings, User as UserIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import HeaderPanel from './HeaderPanel.jsx';

export default function ProfilePopover({ isOpen, onClose }) {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      if (onClose) onClose();
      navigate('/login');
    } catch (e) {
      console.error('Failed to log out', e);
    }
  };

  const userInitial = currentUser?.email ? currentUser.email.charAt(0).toUpperCase() : 'U';

  return (
    <HeaderPanel isOpen={isOpen} onClose={onClose} title="Account">
      <div className="flex items-center gap-3 p-3 mb-2 rounded-md persona-card border-none">
        <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shrink-0">
          {userInitial}
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-semibold truncate text-white/95">
            {currentUser?.email || 'Guest User'}
          </span>
          <span className="text-xs text-white/65">Standard Member</span>
        </div>
      </div>
      
      <button onClick={() => { if (onClose) onClose(); navigate('/profile'); }} className="flex items-center gap-3 p-3 w-full text-left text-sm font-medium rounded-md hover:bg-white/10 transition-colors">
        <UserIcon className="w-5 h-5 text-white" />
        <span className="text-white/95">View Profile</span>
      </button>
      <button onClick={() => { if (onClose) onClose(); navigate('/settings'); }} className="flex items-center gap-3 p-3 w-full text-left text-sm font-medium rounded-md hover:bg-white/10 transition-colors">
        <Settings className="w-5 h-5 text-white" /> 
        <span className="text-white/95">Preferences</span>
      </button>
      <div className="h-px bg-white/10 my-1 mx-2 shrink-0" />
      <button onClick={handleLogout} className="flex items-center gap-3 p-3 w-full text-left text-sm font-semibold text-red-400 hover:bg-white/10 rounded-md transition-colors header-panel-inner">
        <LogOut className="w-5 h-5 text-red-400" /> Log Out
      </button>
    </HeaderPanel>
  );
}