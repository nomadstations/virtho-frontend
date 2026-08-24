import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function HeaderPanel({ 
  isOpen, 
  onClose, 
  title, 
  children,
  className = ''
}) {
  const panelRef = useRef(null);

  // Handle Outside Click and Escape Key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Updated animation (Slide-in from right with exact values preserved)
  const animationProps = {
    initial: { x: 360, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 360, opacity: 0 },
    transition: { duration: 0.26, ease: "easeOut" }
  };

  // Removed old absolute, top, right, w, max-h classes to use precise inline styles
  const panelClasses = 'z-[100] flex flex-col header-panel-glass';

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        <React.Fragment key="header-panel-fragment">
          {/* Overlay to catch outside clicks - wrapped in motion to prevent instant unmount blocking exit animation */}
          <motion.div 
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.26 }}
            className="fixed inset-0 z-[90]" 
            onClick={onClose} 
            aria-label="Close popup overlay" 
          />
          
          <motion.div
            key="panel"
            ref={panelRef}
            {...animationProps}
            className={`${panelClasses} ${className}`}
            style={{ 
              position: 'fixed',
              right: 0,
              top: 'calc(64px + 1rem)',
              width: '360px',
              height: '66vh',
              overflowY: 'auto',
              borderRadius: '12px 0 0 12px',
              backgroundColor: 'rgba(44,39,35,0.62)', 
              color: '#FFFFFF',
              backdropFilter: 'blur(20px) saturate(1.1)',
              WebkitBackdropFilter: 'blur(20px) saturate(1.1)'
            }}
            role="dialog"
            aria-modal="true"
          >
            {title && (
              <div className="flex items-center gap-3 p-4 border-b border-white/10 shrink-0 header-panel-inner">
                <button 
                  onClick={onClose} 
                  className="text-white/70 hover:text-white outline-none p-1 rounded-md transition-colors header-panel-inner"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
                <h2 className="text-base font-semibold text-white m-0">{title}</h2>
              </div>
            )}
            
            {/* Content Area */}
            <div className="p-2 flex-1 flex flex-col gap-1 header-panel-inner">
              {children}
            </div>
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>,
    document.body
  );
}