import React from 'react';
import { User } from 'lucide-react';

export default function ProfileTrayItem({ isOpen, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-8 h-8 flex items-center justify-center rounded-md transition-colors ${
        isOpen ? 'bg-primary/20 text-primary-dark' : 'text-primary hover:bg-primary/10 hover:text-primary-light'
      }`}
      aria-label="Profile"
    >
      <User size={20} />
    </button>
  );
}