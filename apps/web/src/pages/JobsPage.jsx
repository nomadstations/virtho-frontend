import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Grid, List, SlidersHorizontal, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import JobCard from '@/components/JobCard';
import JobListView from '@/components/JobListView';
import JobFilters from '@/components/JobFilters';
import PublicBreadcrumb from '@/components/PublicBreadcrumb';
import SearchComponent from '@/components/SearchComponent';
import { LoadingSpinner, EmptyState } from '@/components/SharedUI';
import { useFilters } from '@/hooks/useFilters';
import { useSearch } from '@/hooks/useSearch';
import { useViewMode } from '@/hooks/useViewMode';
import { usePagination } from '@/hooks/usePagination';
import { mockJobs } from '@/data/mockJobs';

function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const { filters, setFilters, resetFilters } = useFilters({
    location: '',
    types: [],
    experience: [],
    minSalary: 0,
    industries: [],
  });

  const { searchTerm, handleSearchChange } = useSearch();
  const { viewMode, setViewMode } = useViewMode('grid');
  const { currentPage, itemsPerPage, handlePageChange } = usePagination(9);

  // Load jobs
  useEffect(() => {
    const loadJobs = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 600));
        setJobs(mockJobs);
      } catch (error) {
        console.error('Error loading jobs:', error);
        setJobs([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadJobs();
  }, []);

  // Filter and search jobs
  const filteredJobs = React.useMemo(() => {
    const jobsArray = Array.isArray(jobs) ? jobs : [];
    
    return jobsArray.filter(job => {
      if (!job || typeof job !== 'object') return false;

      // Search filter
      if (searchTerm) {
        const lowerSearch = searchTerm.toLowerCase();
        const matchesSearch = 
          (job.title && job.title.toLowerCase().includes(lowerSearch)) ||
          (job.description && job.description.toLowerCase().includes(lowerSearch)) ||
          (job.company && job.company.toLowerCase().includes(lowerSearch)) ||
          (job.location && job.location.toLowerCase().includes(lowerSearch));
        
        if (!matchesSearch) return false;
      }

      // Location filter
      if (filters.location && job.location) {
        const lowerLocation = filters.location.toLowerCase();
        const jobLocation = job.location.toLowerCase();
        if (!jobLocation.includes(lowerLocation)) {
          return false;
        }
      }

      // Job types filter
      if (filters.types && filters.types.length > 0) {
        if (!filters.types.includes(job.type)) {
          return false;
        }
      }

      // Experience level filter
      if (filters.experience && filters.experience.length > 0) {
        if (!filters.experience.includes(job.experienceLevel)) {
          return false;
        }
      }

      // Salary filter
      if (filters.minSalary > 0) {
        const jobSalary = job.salaryMin || 0;
        if (jobSalary < filters.minSalary) {
          return false;
        }
      }

      // Industry filter
      if (filters.industries && filters.industries.length > 0) {
        if (!filters.industries.includes(job.industry)) {
          return false;
        }
      }

      return true;
    });
  }, [jobs, searchTerm, filters]);

  const safeFilteredJobs = Array.isArray(filteredJobs) ? filteredJobs : [];

  // Pagination
  const totalPages = Math.max(1, Math.ceil(safeFilteredJobs.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedJobs = safeFilteredJobs.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    handlePageChange(1);
  }, [filters, searchTerm, handlePageChange]);

  const hasNoResults = !isLoading && safeFilteredJobs.length === 0;
  const hasActiveFilters = searchTerm || filters.location || 
    (filters.types && filters.types.length > 0) || 
    (filters.experience && filters.experience.length > 0) || 
    filters.minSalary > 0 || 
    (filters.industries && filters.industries.length > 0);

  const clearAllFilters = () => {
    resetFilters();
    handleSearchChange('');
  };

  return (
    <>
      <Helmet>
        <title>Jobs & Opportunities - Virtho Foundation</title>
        <meta name="description" content="Discover job opportunities and career positions. Find your next role and advance your career." />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <div className="border-b border-gray-100 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <PublicBreadcrumb />
          </div>
        </div>

        {/* Header Section - Refactored to dynamically respect zone styling */}
        <div className="bg-zone-soft border-b border-gray-100 public-hero-section">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="flex items-center justify-center gap-2 mb-1.5">
                <div className="bg-white/50 p-1.5 rounded-lg">
                  <Briefcase className="h-3 w-3 text-zone" />
                </div>
              </div>
              <h1 className="text-gray-900 mb-1 text-xl md:text-2xl font-extrabold">
                Job Opportunities
              </h1>
              <p className="text-sm text-gray-600 leading-relaxed">
                Discover exciting career opportunities and find your next role.
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
                  placeholder="Search jobs..."
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
                        ? 'bg-white shadow-sm text-zone'
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
                        ? 'bg-white shadow-sm text-zone'
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
                {searchTerm && (
                  <span className="px-3 py-1 bg-zone-soft text-zone rounded-full text-xs font-medium">
                    Search: "{searchTerm}"
                  </span>
                )}
                {filters.location && (
                  <span className="px-3 py-1 bg-zone-soft text-zone rounded-full text-xs font-medium">
                    Location: {filters.location}
                  </span>
                )}
                {filters.types && filters.types.map(type => (
                  <span key={type} className="px-3 py-1 bg-zone-soft text-zone rounded-full text-xs font-medium">
                    {type}
                  </span>
                ))}
                {filters.experience && filters.experience.map(exp => (
                  <span key={exp} className="px-3 py-1 bg-zone-soft text-zone rounded-full text-xs font-medium">
                    {exp}
                  </span>
                ))}
                {filters.minSalary > 0 && (
                  <span className="px-3 py-1 bg-zone-soft text-zone rounded-full text-xs font-medium">
                    Min: ${(filters.minSalary / 1000).toFixed(0)}k
                  </span>
                )}
                {filters.industries && filters.industries.map(ind => (
                  <span key={ind} className="px-3 py-1 bg-zone-soft text-zone rounded-full text-xs font-medium">
                    {ind}
                  </span>
                ))}
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-zone hover:opacity-80 font-medium underline"
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
                <JobFilters
                  filters={filters}
                  setFilters={setFilters}
                  clearFilters={clearAllFilters}
                />
              </div>
            </aside>

            {/* Jobs Grid/List */}
            <div className="flex-1 min-w-0">
              {isLoading ? (
                <LoadingSpinner message="Loading jobs..." />
              ) : hasNoResults ? (
                <EmptyState
                  icon={Briefcase}
                  title="No jobs found"
                  description={
                    hasActiveFilters
                      ? 'Try adjusting your search or filters to find what you\'re looking for.'
                      : 'There are no jobs available at the moment. Check back later!'
                  }
                  actionText={hasActiveFilters ? 'Clear filters' : null}
                  onAction={hasActiveFilters ? clearAllFilters : null}
                />
              ) : (
                <>
                  {/* Results Count */}
                  <div className="mb-6">
                    <p className="text-gray-600">
                      Showing <span className="font-semibold text-gray-900">{startIndex + 1}-{Math.min(endIndex, safeFilteredJobs.length)}</span> of{' '}
                      <span className="font-semibold text-gray-900">{safeFilteredJobs.length}</span> jobs
                    </p>
                  </div>

                  {/* Grid View */}
                  {viewMode === 'grid' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                      {paginatedJobs.map((job, idx) => (
                        <motion.div
                          key={job.id || `job-${idx}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05, duration: 0.3 }}
                        >
                          <JobCard job={job} />
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* List View */}
                  {viewMode === 'list' && (
                    <div className="space-y-6">
                      {paginatedJobs.map((job, idx) => (
                        <motion.div
                          key={job.id || `job-${idx}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05, duration: 0.3 }}
                        >
                          <JobListView job={job} />
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
                                    ? 'bg-zone text-white hover:opacity-90'
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

export default JobsPage;