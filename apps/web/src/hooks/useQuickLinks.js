import { useState, useEffect, useCallback } from 'react';
import { 
  ALL_QUICK_LINKS, 
  DEFAULT_SELECTED_QUICK_LINKS,
  validateQuickLinksConfig 
} from '@/constants/quickLinksConfig';
import { getMenuItems } from '@/constants/menuConfig';

const STORAGE_KEY = 'dashboardQuickLinks';

/**
 * ROOT CAUSE & FIX SUMMARY:
 * Issue: Quick Links changes were not propagating immediately to the Dashboard without a hard refresh.
 * Fix: Added `dashboardQuickLinksUpdate` custom event dispatcher and listener.
 * Whenever `updateQuickLinks` is called, it updates local storage and broadcasts the event.
 * The hook listens for this event to rebuild its internal state immediately.
 */
export function useQuickLinks() {
  useEffect(() => {
    const errors = validateQuickLinksConfig();
    if (errors.length > 0) {
      console.error('[useQuickLinks] Configuration validation failed:', errors);
    }
  }, []);

  const navigationEntities = ALL_QUICK_LINKS.filter(link => link.type === 'navigation');

  const [menuVisibility, setMenuVisibility] = useState({});

  const refreshMenuVisibility = useCallback(() => {
    const menuItems = getMenuItems();
    const visibility = {};
    menuItems.forEach(item => {
      visibility[item.id] = item.visible;
    });
    setMenuVisibility(visibility);
  }, []);

  // Initialize quick links from localStorage or defaults
  const loadFromStorage = useCallback(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed
          .map(id => ALL_QUICK_LINKS.find(link => link.id === id))
          .filter(Boolean);
      } catch (error) {
        console.error('[useQuickLinks] ✗ Error parsing saved quick links:', error);
      }
    }
    return DEFAULT_SELECTED_QUICK_LINKS
      .map(id => ALL_QUICK_LINKS.find(link => link.id === id))
      .filter(Boolean);
  }, []);

  const [selectedQuickLinks, setSelectedQuickLinks] = useState(() => loadFromStorage());

  useEffect(() => {
    refreshMenuVisibility();

    const handleUpdate = () => {
      // Reload state from local storage immediately when event is caught
      setSelectedQuickLinks(loadFromStorage());
      refreshMenuVisibility();
    };

    window.addEventListener('storage', handleUpdate);
    window.addEventListener('dashboardQuickLinksUpdate', handleUpdate);
    window.addEventListener('dashboardMenuUpdate', handleUpdate); // Menu changes affect visibility

    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('dashboardQuickLinksUpdate', handleUpdate);
      window.removeEventListener('dashboardMenuUpdate', handleUpdate);
    };
  }, [loadFromStorage, refreshMenuVisibility]);

  // Filter based on menu visibility
  const quickLinks = selectedQuickLinks.filter(link => {
    const isVisible = menuVisibility[link.id];
    if (isVisible === false) {
      return false;
    }
    return true;
  });

  const updateQuickLinks = (newLinks) => {
    setSelectedQuickLinks(newLinks);
    const linkIds = newLinks.map(link => link.id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(linkIds));
    
    // Broadcast immediate update across the app
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('dashboardQuickLinksUpdate'));
    }
  };

  const resetToDefaults = () => {
    const defaults = DEFAULT_SELECTED_QUICK_LINKS
      .map(id => ALL_QUICK_LINKS.find(link => link.id === id))
      .filter(Boolean);
    updateQuickLinks(defaults);
  };

  const isSelected = (entityId) => {
    return selectedQuickLinks.some(link => link.id === entityId);
  };

  const toggleQuickLink = (entity) => {
    const currentlySelected = isSelected(entity.id);
    let newLinks;
    if (currentlySelected) {
      newLinks = selectedQuickLinks.filter(link => link.id !== entity.id);
    } else {
      newLinks = [...selectedQuickLinks, entity];
    }
    setSelectedQuickLinks(newLinks);
    return newLinks;
  };

  const saveQuickLinks = () => {
    const linkIds = selectedQuickLinks.map(link => link.id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(linkIds));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('dashboardQuickLinksUpdate'));
    }
  };

  return {
    quickLinks, 
    selectedQuickLinks, 
    updateQuickLinks,
    resetToDefaults,
    toggleQuickLink,
    saveQuickLinks,
    isSelected,
    availableEntities: ALL_QUICK_LINKS,
    navigationEntities,
    selectedCount: selectedQuickLinks.length, 
    visibleCount: quickLinks.length, 
    totalNavigationCount: navigationEntities.length,
    refreshMenuVisibility 
  };
}