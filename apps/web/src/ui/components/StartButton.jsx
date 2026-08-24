import React from 'react';
import { VirthoPortalLogo } from '@/ui/components/VirthoPortalLogo';

export default function StartButton({ isOpen, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`h-12 w-12 flex items-center justify-center rounded-md transition-colors cursor-pointer outline-none ${
        isOpen ? 'bg-accent' : 'hover:bg-muted bg-transparent'
      }`}
      aria-label="Start Menu"
      aria-expanded={isOpen}
    >
      <VirthoPortalLogo size={32} showText={false} showShadows={false} />
    </button>
  );
}