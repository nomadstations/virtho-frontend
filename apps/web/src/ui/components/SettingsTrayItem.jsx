import React from 'react';
import { Settings } from 'lucide-react';

export default function SettingsTrayItem({ isOpen, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-8 h-8 flex items-center justify-center rounded-md transition-colors ${
        isOpen ? 'bg-primary/20 text-primary-dark' : 'text-primary hover:bg-primary/10 hover:text-primary-light'
      }`}
      aria-label="Settings"
    >
      <Settings size={20} />
    </button>
  );
}