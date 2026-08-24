import { useState, useCallback } from 'react';

/**
 * Custom hook for pagination logic
 * @param {number} defaultItemsPerPage - Number of items to display per page (default: 12)
 * @returns {Object} Pagination state and control functions
 */
export function usePagination(defaultItemsPerPage = 12) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(defaultItemsPerPage);

  /**
   * Handle page change with bounds checking
   * @param {number} page - Target page number
   */
  const handlePageChange = useCallback((page) => {
    if (typeof page === 'number' && page >= 1) {
      setCurrentPage(page);
    }
  }, []);

  /**
   * Reset to first page (useful when filters change)
   */
  const resetPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  return {
    currentPage,
    itemsPerPage,
    handlePageChange,
    resetPage,
    setCurrentPage
  };
}

/**
 * Legacy hook signature for backward compatibility
 * Validates data and returns paginated results
 * @param {Array} data - Array of items to paginate
 * @param {number} itemsPerPageCount - Items per page
 * @returns {Object} Pagination data and controls
 */
export function usePaginationWithData(data, itemsPerPageCount = 12) {
  // Validate that data is an array - critical for preventing errors
  // If data is null, undefined, or not an array, use empty array as fallback
  const validatedData = Array.isArray(data) ? data : [];
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = itemsPerPageCount;

  // Calculate total pages based on validated data length
  // Math.ceil ensures we have enough pages for all items
  const totalPages = Math.max(1, Math.ceil(validatedData.length / itemsPerPage));

  // Calculate start and end indices for current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the validated data array to get current page items
  // Safe to call .slice() because validatedData is guaranteed to be an array
  const paginatedData = validatedData.slice(startIndex, endIndex);

  /**
   * Navigate to next page (with bounds checking)
   */
  const nextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  /**
   * Navigate to previous page (with bounds checking)
   */
  const prevPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []);

  /**
   * Jump to specific page number
   * @param {number} page - Target page number
   */
  const goToPage = useCallback((page) => {
    if (typeof page === 'number' && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }, [totalPages]);

  /**
   * Reset pagination to first page
   */
  const resetPagination = useCallback(() => {
    setCurrentPage(1);
  }, []);

  return {
    currentPage,
    totalPages,
    paginatedData,
    currentData: paginatedData, // Alias for backward compatibility
    nextPage,
    prevPage,
    goToPage,
    jumpToPage: goToPage, // Alias for backward compatibility
    resetPagination,
    startIndex,
    endIndex: Math.min(endIndex, validatedData.length),
    totalItems: validatedData.length
  };
}