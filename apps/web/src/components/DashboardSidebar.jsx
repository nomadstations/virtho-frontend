import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getMenuItems } from '@/constants/menuConfig.js';
import { useToast } from '@/hooks/use-toast';

/**
 * ========================================
 * DASHBOARD SIDEBAR NAVIGATION COMPONENT
 * ========================================
 * 
 * PURPOSE:
 * Provides consistent navigation across all dashboard pages.
 * Displays menu items loaded from menuConfig.js and handles routing.
 * 
 * ROUTING STRUCTURE:
 * All dashboard routes follow the /dashboard/* pattern:
 * - /dashboard - Main dashboard overview
 * - /dashboard/organizations - Organizations management
 * - /dashboard/groups - Groups management
 * - /dashboard/people - People management
 * - /dashboard/teams - Teams management
 * - /dashboard/projects - Projects management (DASHBOARD page, not public /projects)
 * - /dashboard/marketplace - Marketplace management
 * - /dashboard/learning - Learning management
 * - /dashboard/jobs - Jobs management
 * - /dashboard/community - Community management
 * 
 * NAVIGATION LOGIC:
 * 1. Menu items loaded from getMenuItems() (menuConfig.js)
 * 2. Each item has a `path` property defining its route
 * 3. handleItemClick() navigates to item.path using React Router
 * 4. Active state determined by matching current location.pathname
 * 5. Hidden items (visible: false) are filtered out
 * 
 * STATE MANAGEMENT:
 * - menuItems: Array of visible menu items
 * - isOpen: Mobile sidebar visibility (controlled by parent)
 * - Listens for 'dashboardMenuUpdate' events to reload menu when settings change
 * 
 * RESPONSIVE BEHAVIOR:
 * - Mobile: Slide-out overlay sidebar with backdrop
 * - Desktop: Fixed sidebar always visible
 * - Close button visible only on mobile
 * 
 * ACTIVE STATE:
 * - /dashboard: Exact match only
 * - Other routes: Prefix match (e.g., /dashboard/projects matches /dashboard/projects/*)
 * ========================================
 */
function DashboardSidebar({ isOpen, setIsOpen }) {
  const [menuItems, setMenuItems] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  /**
   * Load menu items on component mount
   * Gets items from localStorage or defaults from menuConfig.js
   */
  useEffect(() => {
    loadMenuItems();
  }, []);

  const loadMenuItems = () => {
    const items = getMenuItems();
    setMenuItems(items);
  };

  /**
   * Listen for menu configuration updates
   * Reloads menu items when user changes settings in DashboardSettings modal
   */
  useEffect(() => {
    if (window.dashboardMenuUpdateListener) {
      window.removeEventListener('dashboardMenuUpdate', window.dashboardMenuUpdateListener);
    }
    
    window.dashboardMenuUpdateListener = () => {
      loadMenuItems();
    };
    
    window.addEventListener('dashboardMenuUpdate', window.dashboardMenuUpdateListener);
    
    return () => {
      if (window.dashboardMenuUpdateListener) {
        window.removeEventListener('dashboardMenuUpdate', window.dashboardMenuUpdateListener);
      }
    };
  }, []);

  /**
   * Handle menu item click
   * 
   * ROUTING BEHAVIOR:
   * - If item.comingSoon: Show toast notification, don't navigate
   * - If item.path exists: Navigate to the path using React Router
   * - On mobile: Close sidebar after navigation
   * 
   * All paths in menuConfig.js follow /dashboard/* pattern
   */
  const handleItemClick = (item) => {
    if (item.comingSoon) {
      toast({
        title: 'Coming Soon',
        description: `${item.label} feature is under development and will be available soon.`,
      });
    } else if (item.path) {
      // Navigate to dashboard route (all paths are /dashboard/*)
      navigate(item.path);
    }
    
    // Close mobile sidebar after navigation
    if (setIsOpen) {
      setIsOpen(false);
    }
  };

  /**
   * Determine if menu item is active based on current route
   * 
   * ACTIVE STATE LOGIC:
   * - Dashboard (/dashboard): Exact match only
   * - Other pages: Prefix match to highlight parent routes
   *   Example: /dashboard/projects/123 will highlight "Projects" menu item
   */
  const isActive = (item) => {
    if (item.path === '/dashboard') {
      // Dashboard home: exact match only
      return location.pathname === '/dashboard';
    }
    // Other dashboard pages: prefix match
    // This ensures /dashboard/projects/123 highlights "Projects" menu item
    return location.pathname.startsWith(item.path);
  };

  /**
   * Filter menu items to show only visible ones in Main category
   * Hidden items (visible: false) are excluded
   * Settings category items are handled separately (future implementation)
   */
  const visibleMainItems = menuItems.filter(item => item.visible && item.category === 'Main');

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  const SidebarContent = () => (
    <div className="h-full flex flex-col py-6 px-4 dashboard-sidebar">
      {/* Mobile header with close button */}
      <div className="flex items-center justify-between mb-8 px-2 md:hidden">
        <h2 className="text-xl font-bold text-gray-800">Menu</h2>
        <button 
          onClick={() => setIsOpen && setIsOpen(false)}
          className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      {/* Menu items navigation */}
      <nav className="flex-1 space-y-2">
        {visibleMainItems.map((item, index) => (
          <motion.button
            key={item.id}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.05 }}
            onClick={() => handleItemClick(item)}
            className={`sidebar-menu-item w-full ${isActive(item) ? 'active' : ''} ${item.comingSoon ? 'coming-soon' : ''}`}
            aria-label={item.label}
          >
            <item.iconComponent className="w-5 h-5 flex-shrink-0" />
            <span className="truncate">{item.label}</span>
          </motion.button>
        ))}
      </nav>
    </div>
  );

  return (
    <>
      {/* Mobile backdrop overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm md:hidden"
            onClick={() => setIsOpen && setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile sidebar (slide-out) */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
            className="fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl md:hidden flex flex-col"
          >
            <SidebarContent />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop sidebar (always visible, sticky) */}
      <aside className="hidden md:flex w-64 lg:w-72 flex-shrink-0 bg-white border-r border-gray-200 h-[calc(100vh-5rem)] sticky top-20 flex-col z-10">
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <SidebarContent />
        </div>
      </aside>
    </>
  );
}

export default DashboardSidebar;