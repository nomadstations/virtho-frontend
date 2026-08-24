import { useState, useCallback } from 'react';

export function useSearch(initialQuery = '') {
  const [searchTerm, setSearchTerm] = useState(initialQuery);

  const clearSearch = useCallback(() => {
    setSearchTerm('');
  }, []);

  return { searchTerm, setSearchTerm, clearSearch };
}