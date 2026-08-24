import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronRight, X } from 'lucide-react';
import { ZONES } from '@/config/zoneConfig.js';
import { PROVIDER_APPS } from '@/config/providerApps.js';
import StartMenuGroup from './StartMenuGroup';
import StartMenuItem from './StartMenuItem';

const CREATE_MAPPING = {
  'my-shop': 'New listing',
  'my-job-posts': 'New job post',
  'my-projects': 'New project',
  'my-posts': 'New post',
  'my-courses': 'New course',
  'my-services': 'New service'
};

export default function StartMenu({ isOpen, onClose }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateExpanded, setIsCreateExpanded] = useState(false);
  const menuRef = useRef(null);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (isOpen && menuRef.current && !menuRef.current.contains(e.target)) {
        const isStartBtnClick = e.target.closest('button[aria-label="Start Menu"]');
        if (!isStartBtnClick) {
          onClose();
        }
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      }
      
      if (e.key === 'Tab' && menuRef.current) {
        const focusableElements = menuRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
      setIsCreateExpanded(false);
    } else {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setIsCreateExpanded(true);
    }
  }, [searchQuery]);

  const handleAppClick = (app) => {
    navigate(app.targetRoute);
    onClose();
  };

  const handleCreateClick = (app) => {
    navigate(`${app.targetRoute}?mode=create`);
    onClose();
  };

  const filteredApps = PROVIDER_APPS.filter(app => 
    app.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const createOptions = PROVIDER_APPS
    .filter(app => CREATE_MAPPING[app.key])
    .map(app => ({
      ...app,
      label: CREATE_MAPPING[app.key],
      isCreateOption: true
    }))
    .filter(opt => opt.label.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Start Menu"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="fixed z-[100] flex flex-col border-border shadow-2xl overflow-hidden
            bottom-[var(--nav-height-mobile)] left-0 right-0 w-full max-h-[85vh] rounded-t-2xl border-t border-x
            md:bottom-[var(--nav-height-desktop)] md:left-0 md:w-[320px] md:max-h-[calc(100vh-68px)] md:rounded-tr-xl md:rounded-tl-none md:border-t md:border-r md:border-l-0
          "
          style={{ 
            backgroundColor: 'rgba(42, 49, 53, 0.92)', 
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)'
          }}
        >
          <div className="flex md:hidden items-center justify-between p-3 border-b border-border/20 shrink-0">
            <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-2"></div>
            <h2 className="text-sm font-semibold text-white ml-2 mt-2 tracking-wider uppercase">Menu</h2>
            <button
              onClick={onClose}
              aria-label="Close Menu"
              className="mt-2 p-1.5 rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors focus-ring"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3 border-b border-border/40 shrink-0">
            <div className="relative flex items-center">
              <Search className="absolute left-3 w-4 h-4 text-muted-foreground" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search apps..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-background/50 border border-border/50 text-foreground placeholder-muted-foreground rounded-lg pl-9 pr-3 py-2 text-sm transition-all focus-ring focus-visible:ring-offset-0 focus:bg-background/80"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2 custom-scrollbar pb-6 md:pb-3">
            {ZONES.map(zoneKey => {
              const zoneApps = filteredApps.filter(app => app.zone === zoneKey);
              if (zoneApps.length === 0) return null;
              
              return (
                <StartMenuGroup 
                  key={zoneKey} 
                  zone={zoneKey} 
                  apps={zoneApps} 
                  onAppClick={handleAppClick} 
                />
              );
            })}

            {createOptions.length > 0 && (
              <div className="mt-2 pt-2 border-t border-border/40 shrink-0">
                <button
                  onClick={() => setIsCreateExpanded(!isCreateExpanded)}
                  aria-expanded={isCreateExpanded}
                  className="w-full flex items-center justify-between px-2 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:bg-muted/50 rounded-md transition-colors focus-ring"
                >
                  <span>Create new...</span>
                  <ChevronRight 
                    className={`w-4 h-4 transition-transform duration-200 ${isCreateExpanded ? 'rotate-90' : ''}`} 
                  />
                </button>
                
                <AnimatePresence initial={false}>
                  {isCreateExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-card/30 rounded-lg overflow-hidden border border-border/30 mt-2">
                        {createOptions.map(opt => (
                          <StartMenuItem 
                            key={`create-${opt.key}`} 
                            item={opt} 
                            onClick={handleCreateClick}
                            isCreate={true}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {filteredApps.length === 0 && createOptions.length === 0 && (
              <div className="py-8 text-center text-sm text-muted-foreground">
                No apps found for "{searchQuery}"
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}