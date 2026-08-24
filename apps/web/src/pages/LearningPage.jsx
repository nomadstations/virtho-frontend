import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Grid, List, SlidersHorizontal, GraduationCap, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CourseCard from '@/components/CourseCard';
import CourseListView from '@/components/CourseListView';
import LearningFilters from '@/components/LearningFilters';
import PublicBreadcrumb from '@/components/PublicBreadcrumb';
import SearchComponent from '@/components/SearchComponent';
import { LoadingSpinner, EmptyState } from '@/components/SharedUI';
import { useSearch } from '@/hooks/useSearch';
import { useViewMode } from '@/hooks/useViewMode';
import { usePagination } from '@/hooks/usePagination';
import { mockCourses } from '@/data/mockCourses';

function LearningPage() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Manage filters state directly
  const [filters, setFilters] = useState({
    categories: [],
    difficulties: [],
    price: [],
    minRating: null,
  });

  const { searchTerm, handleSearchChange } = useSearch();
  const { viewMode, setViewMode } = useViewMode('grid');
  const { currentPage, itemsPerPage, handlePageChange } = usePagination(9);

  // Load courses
  useEffect(() => {
    const loadCourses = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 600));
        setCourses(mockCourses);
      } catch (error) {
        console.error('Error loading courses:', error);
        setCourses([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadCourses();
  }, []);

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      categories: [],
      difficulties: [],
      price: [],
      minRating: null,
    });
  };

  // Filter and search courses
  const filteredCourses = React.useMemo(() => {
    const coursesArray = Array.isArray(courses) ? courses : [];
    
    return coursesArray.filter(course => {
      if (!course || typeof course !== 'object') return false;

      // Search filter
      if (searchTerm) {
        const lowerSearch = searchTerm.toLowerCase();
        const matchesSearch = 
          (course.title && course.title.toLowerCase().includes(lowerSearch)) ||
          (course.description && course.description.toLowerCase().includes(lowerSearch)) ||
          (course.category && course.category.toLowerCase().includes(lowerSearch)) ||
          (course.instructor?.name && course.instructor.name.toLowerCase().includes(lowerSearch));
        
        if (!matchesSearch) return false;
      }

      // Categories filter (array)
      if (filters.categories && filters.categories.length > 0) {
        if (!filters.categories.includes(course.category)) {
          return false;
        }
      }

      // Difficulties filter (array)
      if (filters.difficulties && filters.difficulties.length > 0) {
        if (!filters.difficulties.includes(course.difficulty)) {
          return false;
        }
      }

      // Price filter (array)
      if (filters.price && filters.price.length > 0) {
        const isPaid = course.price > 0;
        const priceType = isPaid ? 'Paid' : 'Free';
        if (!filters.price.includes(priceType)) {
          return false;
        }
      }

      // Minimum rating filter
      if (filters.minRating !== null && filters.minRating !== undefined) {
        if (course.rating < filters.minRating) {
          return false;
        }
      }

      return true;
    });
  }, [courses, searchTerm, filters]);

  const safeFilteredCourses = Array.isArray(filteredCourses) ? filteredCourses : [];

  // Pagination
  const totalPages = Math.max(1, Math.ceil(safeFilteredCourses.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCourses = safeFilteredCourses.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    handlePageChange(1);
  }, [filters, searchTerm, handlePageChange]);

  const hasNoResults = !isLoading && safeFilteredCourses.length === 0;
  const hasActiveFilters = 
    searchTerm || 
    (filters.categories && filters.categories.length > 0) || 
    (filters.difficulties && filters.difficulties.length > 0) || 
    (filters.price && filters.price.length > 0) || 
    filters.minRating !== null;

  return (
    <>
      <Helmet>
        <title>Learning - Virtho Foundation</title>
        <meta name="description" content="Explore courses and educational resources to enhance your skills and knowledge." />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <div className="border-b border-gray-100 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <PublicBreadcrumb />
          </div>
        </div>

        {/* Header Section - Reduced Height (50% reduction) */}
        <div className="bg-gradient-to-r from-teal-50 to-white border-b border-gray-100 public-hero-section">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="flex items-center justify-center gap-2 mb-1.5">
                <div className="bg-teal-100 p-1.5 rounded-lg">
                  <GraduationCap className="h-3 w-3 text-teal-600" />
                </div>
              </div>
              <h1 className="text-gray-900 mb-1 text-xl md:text-2xl font-extrabold">
                Learning Hub
              </h1>
              <p className="text-sm text-gray-600 leading-relaxed">
                Discover courses and educational resources to enhance your skills.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Search and Filters Section */}
        <div className="bg-white border-b border-gray-100 sticky top-20 z-30 shadow-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search Bar */}
              <div className="w-full md:w-96">
                <SearchComponent
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search courses..."
                />
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3 w-full md:w-auto">
                {/* View Mode Toggle */}
                <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className={`${
                      viewMode === 'grid'
                        ? 'bg-white shadow-sm text-teal-700'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    aria-label="Grid view"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className={`${
                      viewMode === 'list'
                        ? 'bg-white shadow-sm text-teal-700'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    aria-label="List view"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>

                {/* Filter Toggle */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
              <div className="flex items-center gap-2 mt-4 flex-wrap">
                <span className="text-sm text-gray-600">Active filters:</span>
                {filters.categories && filters.categories.map(cat => (
                  <span key={cat} className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-medium">
                    {cat}
                  </span>
                ))}
                {filters.difficulties && filters.difficulties.map(diff => (
                  <span key={diff} className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-medium capitalize">
                    {diff}
                  </span>
                ))}
                {filters.price && filters.price.map(price => (
                  <span key={price} className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-medium capitalize">
                    {price}
                  </span>
                ))}
                {filters.minRating && (
                  <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-medium">
                    {filters.minRating}★ & Up
                  </span>
                )}
                {searchTerm && (
                  <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-medium">
                    Search: "{searchTerm}"
                  </span>
                )}
                <button
                  onClick={() => {
                    resetFilters();
                    handleSearchChange('');
                  }}
                  className="text-xs text-teal-600 hover:text-teal-700 font-medium underline"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside
              className={`${
                isFiltersOpen ? 'block' : 'hidden'
              } lg:block w-full lg:w-64 flex-shrink-0`}
            >
              <div className="sticky top-36">
                <LearningFilters
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onReset={resetFilters}
                />
              </div>
            </aside>

            {/* Courses Grid/List */}
            <div className="flex-1 min-w-0">
              {isLoading ? (
                <LoadingSpinner message="Loading courses..." />
              ) : hasNoResults ? (
                <EmptyState
                  icon={BookOpen}
                  title="No courses found"
                  description={
                    hasActiveFilters
                      ? 'Try adjusting your search or filters to find what you\'re looking for.'
                      : 'There are no courses available at the moment. Check back later!'
                  }
                  actionText={hasActiveFilters ? 'Clear filters' : null}
                  onAction={hasActiveFilters ? () => {
                    resetFilters();
                    handleSearchChange('');
                  } : null}
                />
              ) : (
                <>
                  {/* Results Count */}
                  <div className="mb-6">
                    <p className="text-gray-600">
                      Showing <span className="font-semibold text-gray-900">{startIndex + 1}-{Math.min(endIndex, safeFilteredCourses.length)}</span> of{' '}
                      <span className="font-semibold text-gray-900">{safeFilteredCourses.length}</span> courses
                    </p>
                  </div>

                  {/* Grid View */}
                  {viewMode === 'grid' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                      {paginatedCourses.map((course, idx) => (
                        <motion.div
                          key={course.id || `course-${idx}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05, duration: 0.3 }}
                        >
                          <CourseCard course={course} />
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* List View */}
                  {viewMode === 'list' && (
                    <div className="space-y-6">
                      {paginatedCourses.map((course, idx) => (
                        <motion.div
                          key={course.id || `course-${idx}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05, duration: 0.3 }}
                        >
                          <CourseListView course={course} />
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-12 flex justify-center">
                      <nav className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="text-gray-700 border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Previous
                        </Button>
                        
                        {[...Array(totalPages)].map((_, idx) => {
                          const pageNum = idx + 1;
                          if (
                            pageNum === 1 ||
                            pageNum === totalPages ||
                            (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                          ) {
                            return (
                              <Button
                                key={pageNum}
                                variant={currentPage === pageNum ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => handlePageChange(pageNum)}
                                className={
                                  currentPage === pageNum
                                    ? 'bg-teal-600 text-white hover:bg-teal-700'
                                    : 'text-gray-700 border-gray-300 hover:bg-gray-50'
                                }
                              >
                                {pageNum}
                              </Button>
                            );
                          } else if (
                            pageNum === currentPage - 2 ||
                            pageNum === currentPage + 2
                          ) {
                            return (
                              <span key={pageNum} className="text-gray-400 px-2">
                                ...
                              </span>
                            );
                          }
                          return null;
                        })}

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="text-gray-700 border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Next
                        </Button>
                      </nav>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LearningPage;