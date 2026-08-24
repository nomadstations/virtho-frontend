import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Grid, List, SlidersHorizontal, Rocket, X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ProjectCard from '@/components/ProjectCard';
import ProjectListView from '@/components/ProjectListView';
import ProjectFilters from '@/components/ProjectFilters';
import PublicBreadcrumb from '@/components/PublicBreadcrumb';
import SearchComponent from '@/components/SearchComponent';
import RealmChipsFilter from '@/components/RealmChipsFilter';
import { LoadingSpinner, EmptyState } from '@/components/SharedUI';
import { useFilters } from '@/hooks/useFilters';
import { useSearch } from '@/hooks/useSearch';
import { useViewMode } from '@/hooks/useViewMode';
import { usePagination } from '@/hooks/usePagination';
import { MOCK_PROJECTS } from '@/constants/mockDataConfig';
import { getRealmsLabel, getRealmsColor } from '@/utils/realmLabels';

function ProjectsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const realmFilter = searchParams.get('realm');

  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const { filters, handleFilterChange, resetFilters } = useFilters({
    category: '',
    status: '',
  });

  const { searchTerm, handleSearchChange } = useSearch();
  const { viewMode, setViewMode } = useViewMode('grid');
  const { currentPage, itemsPerPage, handlePageChange } = usePagination(9);

  useEffect(() => {
    const loadProjects = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 600));
        
        const storedProjects = localStorage.getItem('virtho_projects');
        if (storedProjects) {
          try {
            const parsed = JSON.parse(storedProjects);
            setProjects(Array.isArray(parsed) ? parsed : []);
          } catch (error) {
            setProjects(MOCK_PROJECTS || []);
          }
        } else {
          setProjects(Array.isArray(MOCK_PROJECTS) ? MOCK_PROJECTS : []);
        }
      } catch (error) {
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    };
    loadProjects();
  }, []);

  const filteredProjects = React.useMemo(() => {
    const projectsArray = Array.isArray(projects) ? projects : [];
    
    return projectsArray.filter(project => {
      if (!project || typeof project !== 'object') return false;

      if (realmFilter) {
        const lowerRealm = realmFilter.toLowerCase();
        if (!project.realms?.includes(lowerRealm)) {
           return false;
        }
      }

      if (searchTerm) {
        const lowerSearch = searchTerm.toLowerCase();
        const matchesSearch = 
          (project.title && project.title.toLowerCase().includes(lowerSearch)) ||
          (project.description && project.description.toLowerCase().includes(lowerSearch)) ||
          (project.author && project.author.toLowerCase().includes(lowerSearch));
        if (!matchesSearch) return false;
      }

      if (filters.category && project.category !== filters.category) return false;
      if (filters.status && project.status !== filters.status) return false;

      return true;
    });
  }, [projects, searchTerm, filters, realmFilter]);

  const safeFilteredProjects = Array.isArray(filteredProjects) ? filteredProjects : [];
  const totalPages = Math.max(1, Math.ceil(safeFilteredProjects.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProjects = safeFilteredProjects.slice(startIndex, endIndex);

  useEffect(() => {
    handlePageChange(1);
  }, [filters, searchTerm, realmFilter, handlePageChange]);

  const handleRealmChange = (newRealm) => {
    if (newRealm) {
      searchParams.set('realm', newRealm);
    } else {
      searchParams.delete('realm');
    }
    setSearchParams(searchParams);
  };

  const hasNoResults = !isLoading && safeFilteredProjects.length === 0;
  const hasActiveFilters = searchTerm || filters.category || filters.status || realmFilter;

  const getRealmColorValue = () => {
    if (!realmFilter) return 'var(--primary)';
    return `var(--${getRealmsColor(realmFilter)})`;
  };

  return (
    <>
      <Helmet>
        <title>Projects {realmFilter ? `- ${getRealmsLabel(realmFilter)}` : ''} - Virtho Foundation</title>
      </Helmet>

      <div className="min-h-screen bg-white">
        <div className="border-b border-gray-100 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <PublicBreadcrumb />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-white border-b border-gray-100 public-hero-section">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-1.5">
                <div className="bg-purple-100 p-1.5 rounded-lg" style={{ backgroundColor: `hsla(${getRealmColorValue()}, 0.1)` }}>
                  <Rocket className="h-3 w-3" style={{ color: `hsl(${getRealmColorValue()})` }} />
                </div>
              </div>
              <h1 className="text-gray-900 mb-1 text-xl md:text-2xl font-extrabold capitalize">
                Discover {realmFilter ? `${getRealmsLabel(realmFilter)} ` : ''}Projects
              </h1>
              <p className="text-sm text-gray-600 leading-relaxed">
                Explore innovative projects from our community.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="bg-white border-b border-gray-100 sticky top-20 z-30 shadow-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="w-full md:w-96">
                <SearchComponent value={searchTerm} onChange={handleSearchChange} placeholder="Search projects..." />
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                  <Button variant={viewMode === 'grid' ? 'default' : 'ghost'} size="sm" onClick={() => setViewMode('grid')} className={viewMode === 'grid' ? 'bg-white shadow-sm text-purple-700' : 'text-gray-600 hover:text-gray-900'}><Grid className="w-4 h-4" /></Button>
                  <Button variant={viewMode === 'list' ? 'default' : 'ghost'} size="sm" onClick={() => setViewMode('list')} className={viewMode === 'list' ? 'bg-white shadow-sm text-purple-700' : 'text-gray-600 hover:text-gray-900'}><List className="w-4 h-4" /></Button>
                </div>
                <Button variant="outline" size="sm" onClick={() => setIsFiltersOpen(!isFiltersOpen)} className="border-gray-300 text-gray-700 hover:bg-gray-50"><SlidersHorizontal className="w-4 h-4 mr-2" /> Filters</Button>
              </div>
            </div>

            {hasActiveFilters && !realmFilter && (
              <div className="flex items-center gap-2 mt-4 flex-wrap">
                <span className="text-sm text-gray-600">Active filters:</span>
                {filters.category && <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">{filters.category}</span>}
                {filters.status && <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium capitalize">{filters.status}</span>}
                {searchTerm && <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">Search: "{searchTerm}"</span>}
                <button onClick={() => { resetFilters(); handleSearchChange(''); }} className="text-xs text-purple-600 hover:text-purple-700 font-medium underline">Clear searches</button>
              </div>
            )}
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <RealmChipsFilter currentRealm={realmFilter} onRealmChange={handleRealmChange} />

          <div className="flex flex-col lg:flex-row gap-8">
            <aside className={`${isFiltersOpen ? 'block' : 'hidden'} lg:block w-full lg:w-64 flex-shrink-0`}>
              <div className="sticky top-36">
                <ProjectFilters filters={filters} onFilterChange={handleFilterChange} onReset={resetFilters} />
              </div>
            </aside>

            <div className="flex-1 min-w-0">
              {isLoading ? (
                <LoadingSpinner message="Loading projects..." />
              ) : hasNoResults ? (
                <EmptyState
                  icon={SlidersHorizontal}
                  title="No projects found"
                  description={hasActiveFilters ? 'Try adjusting your search or filters to find what you\'re looking for.' : 'There are no projects available at the moment. Check back later!'}
                  actionText={hasActiveFilters ? 'Clear filters' : null}
                  onAction={hasActiveFilters ? () => { resetFilters(); handleSearchChange(''); handleRealmChange(null); } : null}
                />
              ) : (
                <>
                  <div className="mb-6">
                    <p className="text-gray-600">
                      Showing <span className="font-semibold text-gray-900">{startIndex + 1}-{Math.min(endIndex, safeFilteredProjects.length)}</span> of <span className="font-semibold text-gray-900">{safeFilteredProjects.length}</span> projects
                    </p>
                  </div>

                  {viewMode === 'grid' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                      {paginatedProjects.map((project, idx) => (
                        <motion.div key={project.id || `project-${idx}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05, duration: 0.3 }}>
                          <ProjectCard project={project} />
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {viewMode === 'list' && (
                    <div className="space-y-6">
                      {paginatedProjects.map((project, idx) => (
                        <motion.div key={project.id || `project-${idx}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05, duration: 0.3 }}>
                          <ProjectListView project={project} />
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {totalPages > 1 && (
                    <div className="mt-12 flex justify-center">
                      <nav className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</Button>
                        {[...Array(totalPages)].map((_, idx) => {
                          const pageNum = idx + 1;
                          if (pageNum === 1 || pageNum === totalPages || (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)) {
                            return <Button key={pageNum} variant={currentPage === pageNum ? 'default' : 'outline'} size="sm" onClick={() => handlePageChange(pageNum)} className={currentPage === pageNum ? 'bg-purple-600 text-white hover:bg-purple-700' : 'text-gray-700 border-gray-300 hover:bg-gray-50'} style={currentPage === pageNum ? { backgroundColor: `hsl(${getRealmColorValue()})` } : {}}>{pageNum}</Button>;
                          } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                            return <span key={pageNum} className="text-gray-400 px-2">...</span>;
                          }
                          return null;
                        })}
                        <Button variant="outline" size="sm" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</Button>
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

export default ProjectsPage;