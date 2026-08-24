import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell } from 'lucide-react';

export default function NotificationsPopover({ isOpen }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-[calc(100%+12px)] right-0 w-72 rounded-xl border border-border shadow-2xl overflow-hidden z-[100]"
          style={{ 
            backgroundColor: 'rgba(42, 49, 53, 0.40)', 
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)'
          }}
        >
          <div className="p-4 bg-background/50 border-b border-border/50">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Bell size={16} /> Notifications
            </h3>
          </div>
          <div className="p-8 text-center text-sm text-foreground/80 flex flex-col items-center justify-center min-h-[150px]">
            <Bell size={24} className="text-muted-foreground mb-2 opacity-50" />
            <p>No new notifications</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}