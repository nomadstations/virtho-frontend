import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Filter, X, ChevronLeft, ChevronRight, Grid, List, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MarketplaceFilters from '@/components/MarketplaceFilters';
import MarketplaceSortBar from '@/components/MarketplaceSortBar';
import ProductsList from '@/components/ProductsList';
import Breadcrumb from '@/components/Breadcrumb';
import { getBreadcrumbPaths } from '@/utils/breadcrumbConfig';
import { useViewMode } from '@/hooks/useViewMode';

function MarketplacePage() {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [filters, setFilters] = useState({ categories: [], minRating: 0, maxPrice: 1000, inStockOnly: false });
  
  const { viewMode, setViewMode, toggleViewMode, isGridView, isListView } = useViewMode('grid');
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const pageSize = 12;

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, searchQuery, sortBy]);

  const clearFilters = () => {
    setFilters({ categories: [], minRating: 0, maxPrice: 1000, inStockOnly: false });
    setSearchQuery('');
    setSortBy('relevance');
  };

  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <>
      <Helmet>
        <title>Marketplace - Virtho Foundation</title>
        <meta name="description" content="Discover and purchase exclusive products, digital assets, and merchandise in the Virtho Marketplace." />
      </Helmet>
      
      {/* Header Section - Reduced Height (50% reduction) */}
      <div className="bg-gradient-to-r from-purple-50 to-white border-b border-gray-100 public-hero-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb paths={getBreadcrumbPaths('/marketplace')} />
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto mt-4">
            <div className="flex items-center justify-center gap-2 mb-1.5">
              <div className="bg-purple-100 p-1.5 rounded-lg">
                <ShoppingBag className="h-3 w-3 text-purple-600" />
              </div>
            </div>
            <h1 className="text-gray-900 mb-1 text-xl md:text-2xl font-extrabold">Virtho Marketplace</h1>
            <p className="text-sm text-gray-600 leading-relaxed">
              Support our mission with exclusive merchandise and sustainable goods.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm sticky top-24">
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-100">
                <Filter className="w-5 h-5 text-purple-600" />
                <h2 className="text-xl font-bold text-gray-900">Filters</h2>
              </div>
              <MarketplaceFilters filters={filters} setFilters={setFilters} clearFilters={clearFilters} />
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            <div className="mb-6">
              <div className="lg:hidden mb-4 flex gap-4">
                <Button onClick={() => setIsMobileFiltersOpen(true)} className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-800 hover:bg-gray-50 shadow-sm h-12 text-base font-medium">
                  <Filter className="w-5 h-5" /> Filter
                </Button>
                <div className="flex bg-white p-1 rounded-lg border border-gray-200 shadow-sm">
                  <button 
                    onClick={() => setViewMode('grid')} 
                    className={`p-2 rounded-md transition-all ${isGridView ? 'bg-purple-100 text-purple-700' : 'text-gray-500 hover:text-gray-700'}`}
                    aria-label="Grid view"
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')} 
                    className={`p-2 rounded-md transition-all ${isListView ? 'bg-purple-100 text-purple-700' : 'text-gray-500 hover:text-gray-700'}`}
                    aria-label="List view"
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <MarketplaceSortBar 
                searchQuery={searchQuery} setSearchQuery={setSearchQuery}
                sortBy={sortBy} setSortBy={setSortBy}
                totalResults={totalItems} viewMode={viewMode} setViewMode={setViewMode}
              />
              <div className="text-sm font-medium text-gray-600 mt-2 mb-4 lg:hidden">Showing {totalItems} products</div>
            </div>

            <ProductsList 
              searchTerm={searchQuery} filters={filters} sortBy={sortBy}
              viewMode={viewMode} currentPage={currentPage} pageSize={pageSize}
              onTotalItemsChange={setTotalItems}
            />

            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 mt-12">
                <Button variant="outline" size="icon" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <div className="flex space-x-1">
                  {[...Array(totalPages)].map((_, i) => (
                    <Button key={i} variant={currentPage === i + 1 ? "default" : "outline"} className={`w-10 h-10 ${currentPage === i + 1 ? "bg-purple-600 text-white" : ""}`} onClick={() => setCurrentPage(i + 1)}>
                      {i + 1}
                    </Button>
                  ))}
                </div>
                <Button variant="outline" size="icon" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setIsMobileFiltersOpen(false)} />
          <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} className="relative flex w-full max-w-[320px] flex-col overflow-y-auto bg-white pb-12 shadow-2xl h-full">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gray-50 sticky top-0 z-10">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-purple-600" />
                <h2 className="text-xl font-bold text-gray-900">Filters</h2>
              </div>
              <button onClick={() => setIsMobileFiltersOpen(false)} className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-200 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <MarketplaceFilters filters={filters} setFilters={setFilters} clearFilters={() => { clearFilters(); setIsMobileFiltersOpen(false); }} />
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}

export default MarketplacePage;