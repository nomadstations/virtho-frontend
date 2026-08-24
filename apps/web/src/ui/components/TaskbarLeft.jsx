import React, { useState } from 'react';
import StartButton from './StartButton';
import StartMenu from './StartMenu';

export default function TaskbarLeft() {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);

  return (
    <div className="flex-1 flex items-center justify-start px-2 h-full relative">
      <StartButton 
        isOpen={isStartMenuOpen} 
        onClick={() => setIsStartMenuOpen(prev => !prev)} 
      />
      <StartMenu 
        isOpen={isStartMenuOpen} 
        onClose={() => setIsStartMenuOpen(false)} 
      />
    </div>
  );
}