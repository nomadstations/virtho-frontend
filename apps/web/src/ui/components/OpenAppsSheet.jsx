import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, Store, Briefcase, MessageSquare, BookOpen, Heart, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useOpenApps } from '../context/OpenAppsContext';

const ICON_MAP = {
  Users,
  Store,
  Briefcase,
  MessageSquare,
  BookOpen,
  Heart
};

export default function OpenAppsSheet({ isOpen, onClose }) {
  const { openApps, removeOpenApp } = useOpenApps();
  const navigate = useNavigate();
  const sheetRef = useRef(null);

  // Outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (isOpen && sheetRef.current && !sheetRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen, onClose]);

  // Escape key & focus trap
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();

      if (e.key === 'Tab' && sheetRef.current) {
        const focusableElements = sheetRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleAppClick = (app) => {
    navigate(app.targetRoute);
    onClose();
  };

  const handleRemoveApp = (e, appKey) => {
    e.stopPropagation(); // prevent app click
    removeOpenApp(appKey);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 z-[90] md:hidden"
            aria-hidden="true"
          />

          {/* Sheet */}
          <motion.div
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            aria-label="Open Apps"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-[var(--nav-height-mobile)] left-0 right-0 max-h-[70vh] bg-card rounded-t-2xl shadow-2xl z-[100] flex flex-col md:hidden overflow-hidden border-t border-border"
          >
            {/* Header & Handle */}
            <div className="flex flex-col items-center justify-between p-4 border-b border-border bg-muted/30">
              <div className="w-12 h-1.5 bg-border rounded-full mb-3" />
              <div className="flex items-center justify-between w-full">
                <h2 className="text-sm font-semibold text-foreground tracking-wide uppercase">Open Apps</h2>
                <button
                  onClick={onClose}
                  aria-label="Close Open Apps Sheet"
                  className="p-1.5 rounded-full bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground transition-colors focus-ring"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
              {openApps.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  No apps currently open.
                </div>
              ) : (
                <ul className="space-y-2">
                  {openApps.map(app => {
                    const IconComponent = ICON_MAP[app.icon] || Package;
                    return (
                      <li key={app.key}>
                        <button
                          onClick={() => handleAppClick(app)}
                          className="w-full flex items-center justify-between p-3 rounded-xl bg-background border border-border hover:border-primary/50 hover:shadow-sm transition-all text-left focus-ring"
                          aria-label={`Open ${app.label}`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted text-foreground">
                              <IconComponent className="w-5 h-5" />
                            </div>
                            <span className="font-medium text-foreground text-sm">{app.label}</span>
                          </div>
                          
                          <button
                            onClick={(e) => handleRemoveApp(e, app.key)}
                            aria-label={`Close ${app.label}`}
                            className="p-2 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors focus-ring"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}