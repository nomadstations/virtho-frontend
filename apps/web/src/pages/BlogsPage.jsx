import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Grid, List, ArrowUpDown, AlertCircle, X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SearchComponent from '@/components/SearchComponent';
import Breadcrumb from '@/components/Breadcrumb';
import { getBreadcrumbPaths } from '@/utils/breadcrumbConfig';
import BlogCard from '@/components/BlogCard';
import BlogListView from '@/components/BlogListView';
import ItemGrid from '@/components/sections/ItemGrid';
import RealmChipsFilter from '@/components/RealmChipsFilter';
import { useSearch } from '@/hooks/useSearch';
import { useViewMode } from '@/hooks/useViewMode';
import { getBlogs, getBlogCategories } from '@/data/mockBlogs';
import { ROUTES } from '@/constants';
import { getRealmsLabel, getRealmsColor } from '@/utils/realmLabels';

function BlogsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const realmFilter = searchParams.get('realm');

  const { viewMode, setViewMode } = useViewMode('grid');
  const { searchTerm, setSearchTerm } = useSearch('');
  
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  
  const [allBlogs, setAllBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    let isMounted = true;
    
    const fetchBlogsData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await new Promise(r => setTimeout(r, 600)); 
        
        const data = getBlogs();
        const cats = getBlogCategories();
        
        if (!data || !Array.isArray(data)) {
          throw new Error("Invalid data format received.");
        }
        
        if (isMounted) {
          setAllBlogs(data);
          setCategories(['All', ...cats]);
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
        if (isMounted) setError("Failed to load blog articles. Please try again later.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchBlogsData();
    return () => { isMounted = false; };
  }, []);

  const filteredAndSortedBlogs = useMemo(() => {
    if (!allBlogs || !allBlogs.length) return [];
    
    let result = [...allBlogs];

    result = result.filter(blog => blog && blog.slug);

    if (realmFilter) {
      const lowerRealm = realmFilter.toLowerCase();
      result = result.filter(blog => blog.realms?.includes(lowerRealm));
    }

    if (searchTerm) {
      const lowerQuery = searchTerm.toLowerCase();
      result = result.filter(blog => 
        blog.title?.toLowerCase().includes(lowerQuery) || 
        blog.excerpt?.toLowerCase().includes(lowerQuery) ||
        (blog.tags && blog.tags.some(t => t.toLowerCase().includes(lowerQuery)))
      );
    }

    if (selectedCategory && selectedCategory !== 'All') {
      result = result.filter(blog => blog.category === selectedCategory);
    }

    result.sort((a, b) => {
      const dateA = new Date(a.publishedDate || 0).getTime();
      const dateB = new Date(b.publishedDate || 0).getTime();
      
      switch(sortBy) {
        case 'newest': return dateB - dateA;
        case 'oldest': return dateA - dateB;
        case 'popular': return (b.views || 0) - (a.views || 0);
        case 'shortest': return (a.readTime || 0) - (b.readTime || 0);
        default: return dateB - dateA;
      }
    });

    return result;
  }, [allBlogs, searchTerm, selectedCategory, sortBy, realmFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, sortBy, realmFilter]);

  const handleRealmChange = (newRealm) => {
    if (newRealm) {
      searchParams.set('realm', newRealm);
    } else {
      searchParams.delete('realm');
    }
    setSearchParams(searchParams);
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSortBy('newest');
    if (realmFilter) {
      searchParams.delete('realm');
      setSearchParams(searchParams);
    }
  };

  const totalPages = Math.ceil(filteredAndSortedBlogs.length / itemsPerPage) || 1;
  const currentBlogs = filteredAndSortedBlogs.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  const getRealmColorValue = () => {
    if (!realmFilter) return 'var(--primary)';
    return `var(--${getRealmsColor(realmFilter)})`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/30 overflow-x-hidden">
      <Helmet>
        <title>Blogs {realmFilter ? `- ${getRealmsLabel(realmFilter)}` : ''} - Virtho Foundation</title>
      </Helmet>
      
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb paths={getBreadcrumbPaths(ROUTES.BLOGS)} />
          <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
                {realmFilter ? <span style={{ color: `hsl(${getRealmColorValue()})` }} className="capitalize">{getRealmsLabel(realmFilter)}</span> : 'Our'} Blog
              </h1>
              <p className="text-lg text-gray-600">Insights, updates, and stories from the tech and community frontiers.</p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl flex-grow flex flex-col">
        <RealmChipsFilter currentRealm={realmFilter} onRealmChange={handleRealmChange} />

        {!isLoading && !error && categories.length > 1 && (
          <div className="mb-8 flex overflow-x-auto pb-2 no-scrollbar gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat 
                    ? 'bg-purple-600 text-white shadow-md' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-purple-300 hover:text-purple-600 hover:bg-purple-50'
                }`}
                style={selectedCategory === cat ? { backgroundColor: `hsl(${getRealmColorValue()})` } : {}}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 z-10 relative">
          <div className="flex-1 max-w-md w-full">
            <SearchComponent value={searchTerm} onChange={setSearchTerm} placeholder="Search articles..." />
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center bg-gray-100 rounded-lg p-1 border border-gray-200 relative">
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none text-sm font-medium text-gray-700 py-1.5 pl-3 pr-8 focus:ring-0 cursor-pointer appearance-none outline-none disabled:opacity-50 min-w-[140px]"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="popular">Most Popular</option>
                <option value="shortest">Shortest Read</option>
              </select>
              <ArrowUpDown className="w-4 h-4 text-gray-500 absolute right-2.5 pointer-events-none" />
            </div>

            <div className="flex items-center bg-gray-100 rounded-lg p-1 border border-gray-200 hidden sm:flex">
              <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                <Grid className="w-4 h-4" />
              </button>
              <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {!isLoading && !error && (
          <div className="mb-6 flex flex-wrap justify-between items-center text-sm text-gray-600 gap-4">
            <p>Showing <span className="font-bold text-gray-900">{filteredAndSortedBlogs.length}</span> blogs</p>
            {(searchTerm || selectedCategory !== 'All' || sortBy !== 'newest') && (
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-xs">Active searches:</span>
                <Button variant="ghost" size="sm" onClick={clearAllFilters} className="h-7 text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2">
                  <X className="w-3 h-3 mr-1" /> Clear Search
                </Button>
              </div>
            )}
          </div>
        )}

        <div className="relative min-h-[400px] flex flex-col flex-grow">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full flex flex-col items-center justify-center text-gray-500 py-20 bg-gray-50 rounded-xl">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4" style={{ borderColor: `hsl(${getRealmColorValue()})` }}></div>
                <p className="font-medium text-lg">Loading amazing content...</p>
              </motion.div>
            ) : error ? (
              <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full text-center py-20 bg-red-50 rounded-xl border border-red-200 shadow-sm flex flex-col items-center justify-center">
                <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <p className="text-red-700 font-medium mb-4 text-lg">{error}</p>
                <Button onClick={() => window.location.reload()} variant="outline" className="border-red-200 text-red-700 hover:bg-red-100">Try Again</Button>
              </motion.div>
            ) : currentBlogs.length === 0 ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full text-center py-20 bg-white rounded-xl border border-dashed border-gray-300 shadow-sm flex flex-col items-center justify-center px-4">
                <div className="bg-gray-100 p-4 rounded-full mb-4"><SearchComponent className="w-8 h-8 text-gray-400" /></div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-500 mb-6 max-w-md">We couldn't find any articles matching your current criteria.</p>
                <Button onClick={clearAllFilters} className="bg-purple-600 text-white hover:bg-purple-700 shadow-sm" style={{ backgroundColor: `hsl(${getRealmColorValue()})` }}>
                  Clear Search & Filters
                </Button>
              </motion.div>
            ) : (
              <motion.div key={`view-${viewMode}-${currentPage}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="w-full flex-grow flex flex-col">
                {viewMode === 'grid' ? (
                  <ItemGrid items={currentBlogs} renderItem={(blog) => <BlogCard blog={blog} />} />
                ) : (
                  <div className="flex flex-col space-y-4 w-full">
                    {currentBlogs.map((blog, index) => (
                      <motion.div key={blog?.slug || `list-item-${index}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                        <BlogListView blog={blog} />
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {!isLoading && !error && totalPages > 1 && (
          <div className="mt-12 mb-8 flex justify-center items-center gap-2">
            <Button variant="outline" onClick={() => { setCurrentPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }} disabled={currentPage === 1}>Previous</Button>
            <div className="flex gap-1 overflow-x-auto max-w-[200px] sm:max-w-none no-scrollbar py-1">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setCurrentPage(i + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className={`w-10 h-10 shrink-0 rounded-lg flex items-center justify-center font-medium transition-colors ${
                    currentPage === i + 1 
                      ? 'bg-purple-600 text-white shadow-md' 
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                  }`}
                  style={currentPage === i + 1 ? { backgroundColor: `hsl(${getRealmColorValue()})` } : {}}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <Button variant="outline" onClick={() => { setCurrentPage(p => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }} disabled={currentPage === totalPages}>Next</Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogsPage;