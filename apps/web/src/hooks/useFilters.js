import { useState, useCallback } from 'react';

export function useFilters(initialFilters) {
  const [filters, setFilters] = useState(initialFilters);

  const clearFilters = useCallback(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const updateFilter = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  return { filters, setFilters, updateFilter, clearFilters };
}