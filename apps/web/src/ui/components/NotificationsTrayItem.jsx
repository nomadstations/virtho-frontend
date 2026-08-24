import React from 'react';
import { Bell } from 'lucide-react';

export default function NotificationsTrayItem({ isOpen, onClick, badgeCount = 0 }) {
  return (
    <button
      onClick={onClick}
      className={`relative w-8 h-8 flex items-center justify-center rounded-md transition-colors ${
        isOpen ? 'bg-primary/20 text-primary-dark' : 'text-primary hover:bg-primary/10 hover:text-primary-light'
      }`}
      aria-label="Notifications"
    >
      <Bell size={20} />
      {badgeCount > 0 && (
        <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full border border-background"></span>
      )}
    </button>
  );
}