import { useState, useCallback } from 'react';

/**
 * Custom hook for managing view mode state (grid/list toggle)
 * @param {string} initialMode - Initial view mode ('grid' or 'list')
 * @returns {Object} View mode state and setter function
 */
export function useViewMode(initialMode = 'grid') {
  // Validate initial mode
  const validatedInitialMode = initialMode === 'list' ? 'list' : 'grid';
  
  const [viewMode, setViewModeState] = useState(validatedInitialMode);

  /**
   * Set view mode with validation
   * Only accepts 'grid' or 'list' as valid values
   */
  const setViewMode = useCallback((mode) => {
    if (mode === 'grid' || mode === 'list') {
      setViewModeState(mode);
    } else {
      console.warn(`Invalid view mode: ${mode}. Must be 'grid' or 'list'.`);
    }
  }, []);

  /**
   * Toggle between grid and list views
   */
  const toggleViewMode = useCallback(() => {
    setViewModeState(current => current === 'grid' ? 'list' : 'grid');
  }, []);

  return {
    viewMode,
    setViewMode,
    toggleViewMode,
    isGridView: viewMode === 'grid',
    isListView: viewMode === 'list'
  };
}