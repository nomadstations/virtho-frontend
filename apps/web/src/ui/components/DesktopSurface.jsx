import React from 'react';

export default function DesktopSurface({ children }) {
  return (
    <div className="flex-1 w-full desktop-surface flex flex-col overflow-y-auto relative p-6">
      {children}
    </div>
  );
}