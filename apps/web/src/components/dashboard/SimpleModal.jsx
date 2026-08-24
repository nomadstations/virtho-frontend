import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import '@/styles/QuickActionsModals.css';

export function SimpleModal({ isOpen, onClose, title, children, maxWidthClass = 'qa-modal-2xl' }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="qa-modal-overlay" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: "-50%", y: "-40%" }}
            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
            exit={{ opacity: 0, scale: 0.95, x: "-50%", y: "-40%" }}
            transition={{ duration: 0.2 }}
            className={`qa-modal-container ${maxWidthClass}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="qa-modal-header">
              <h2 className="text-xl font-bold text-gray-900">{title}</h2>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onClose} 
                aria-label="Close modal"
                className="text-gray-500 hover:text-gray-900"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="qa-modal-content">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}