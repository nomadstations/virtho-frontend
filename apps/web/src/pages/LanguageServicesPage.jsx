import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Search, Filter, Grid3x3, List, X, Globe, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import PublicBreadcrumb from '@/components/PublicBreadcrumb';
import LanguageServiceCard from '@/components/LanguageServiceCard';
import { useLanguageServices } from '@/hooks/useLanguageServices';
import { LANGUAGE_PAIRS, SERVICE_TYPES, SPECIALIZATIONS, getLanguagePairLabel, getServiceTypeLabel } from '@/constants/languageServiceConfig';

function LanguageServicesPage() {
  const { services, loading } = useLanguageServices();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Filter states
  const [selectedLanguagePairs, setSelectedLanguagePairs] = useState([]);
  const [selectedServiceTypes, setSelectedServiceTypes] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [minRating, setMinRating] = useState(0);
  const [selectedSpecializations, setSelectedSpecializations] = useState([]);

  // Filter and search logic
  const filteredServices = useMemo(() => {
    let filtered = [...services];

    // Search filter
    if (searchTerm.trim()) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(service =>
        service.name.toLowerCase().includes(lowerSearch) ||
        service.description.toLowerCase().includes(lowerSearch) ||
        service.providerName.toLowerCase().includes(lowerSearch)
      );
    }

    // Language pair filter
    if (selectedLanguagePairs.length > 0) {
      filtered = filtered.filter(service =>
        service.languagePairs.some(pair => selectedLanguagePairs.includes(pair))
      );
    }

    // Service type filter
    if (selectedServiceTypes.length > 0) {
      filtered = filtered.filter(service =>
        selectedServiceTypes.includes(service.serviceType)
      );
    }

    // Price range filter
    filtered = filtered.filter(service =>
      service.price >= priceRange[0] && service.price <= priceRange[1]
    );

    // Rating filter
    if (minRating > 0) {
      filtered = filtered.filter(service => service.rating >= minRating);
    }

    // Specialization filter
    if (selectedSpecializations.length > 0) {
      filtered = filtered.filter(service =>
        service.specializations.some(spec => selectedSpecializations.includes(spec))
      );
    }

    return filtered;
  }, [services, searchTerm, selectedLanguagePairs, selectedServiceTypes, priceRange, minRating, selectedSpecializations]);

  // Pagination
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const paginatedServices = filteredServices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const clearFilters = () => {
    setSelectedLanguagePairs([]);
    setSelectedServiceTypes([]);
    setPriceRange([0, 1000]);
    setMinRating(0);
    setSelectedSpecializations([]);
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handleLanguagePairToggle = (pair) => {
    setSelectedLanguagePairs(prev =>
      prev.includes(pair) ? prev.filter(p => p !== pair) : [...prev, pair]
    );
    setCurrentPage(1);
  };

  const handleServiceTypeToggle = (type) => {
    setSelectedServiceTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
    setCurrentPage(1);
  };

  const handleSpecializationToggle = (spec) => {
    setSelectedSpecializations(prev =>
      prev.includes(spec) ? prev.filter(s => s !== spec) : [...prev, spec]
    );
    setCurrentPage(1);
  };

  return (
    <>
      <Helmet>
        <title>Language Services | Virtho Foundation</title>
        <meta name="description" content="Discover professional language translation and localization services from expert providers around the world." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <PublicBreadcrumb />

          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Globe className="w-12 h-12 text-blue-600" />
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                Language Services
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover professional language translation and localization services
            </p>
          </motion.div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search language services by name or provider..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-12 pr-4 py-6 text-lg bg-white shadow-md border-gray-200"
              />
            </div>
          </div>

          <div className="flex gap-8">
            {/* Filter Sidebar */}
            <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-80 flex-shrink-0`}>
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Filters</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Clear All
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Language Pair Filter */}
                  <div>
                    <Label className="text-sm font-semibold text-gray-700 mb-3 block">
                      Language Pairs
                    </Label>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {LANGUAGE_PAIRS.slice(0, 10).map(pair => (
                        <div key={pair.value} className="flex items-center gap-2">
                          <Checkbox
                            id={`lang-${pair.value}`}
                            checked={selectedLanguagePairs.includes(pair.value)}
                            onCheckedChange={() => handleLanguagePairToggle(pair.value)}
                          />
                          <Label htmlFor={`lang-${pair.value}`} className="text-sm cursor-pointer">
                            {pair.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Service Type Filter */}
                  <div>
                    <Label className="text-sm font-semibold text-gray-700 mb-3 block">
                      Service Type
                    </Label>
                    <div className="space-y-2">
                      {SERVICE_TYPES.map(type => (
                        <div key={type.value} className="flex items-center gap-2">
                          <Checkbox
                            id={`type-${type.value}`}
                            checked={selectedServiceTypes.includes(type.value)}
                            onCheckedChange={() => handleServiceTypeToggle(type.value)}
                          />
                          <Label htmlFor={`type-${type.value}`} className="text-sm cursor-pointer">
                            {type.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price Range Filter */}
                  <div>
                    <Label className="text-sm font-semibold text-gray-700 mb-3 block">
                      Price Range
                    </Label>
                    <div className="space-y-3">
                      <Slider
                        min={0}
                        max={1000}
                        step={10}
                        value={priceRange}
                        onValueChange={(value) => {
                          setPriceRange(value);
                          setCurrentPage(1);
                        }}
                        className="w-full"
                      />
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Rating Filter */}
                  <div>
                    <Label className="text-sm font-semibold text-gray-700 mb-3 block">
                      Minimum Rating
                    </Label>
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map(rating => (
                        <div key={rating} className="flex items-center gap-2">
                          <Checkbox
                            id={`rating-${rating}`}
                            checked={minRating === rating}
                            onCheckedChange={() => {
                              setMinRating(minRating === rating ? 0 : rating);
                              setCurrentPage(1);
                            }}
                          />
                          <Label htmlFor={`rating-${rating}`} className="text-sm cursor-pointer flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>{rating}+ stars</span>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Specialization Filter */}
                  <div>
                    <Label className="text-sm font-semibold text-gray-700 mb-3 block">
                      Specializations
                    </Label>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {SPECIALIZATIONS.slice(0, 10).map(spec => (
                        <div key={spec.value} className="flex items-center gap-2">
                          <Checkbox
                            id={`spec-${spec.value}`}
                            checked={selectedSpecializations.includes(spec.value)}
                            onCheckedChange={() => handleSpecializationToggle(spec.value)}
                          />
                          <Label htmlFor={`spec-${spec.value}`} className="text-sm cursor-pointer">
                            {spec.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Mobile Apply Filters Button */}
                <div className="lg:hidden mt-6">
                  <Button
                    onClick={() => setShowFilters(false)}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                  <p className="text-sm text-gray-600">
                    Showing <span className="font-semibold">{paginatedServices.length}</span> of{' '}
                    <span className="font-semibold">{filteredServices.length}</span> services
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid3x3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Services Grid/List */}
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Loading services...</p>
                  </div>
                </div>
              ) : filteredServices.length === 0 ? (
                <div className="bg-white rounded-xl shadow-md border border-gray-100 p-12 text-center">
                  <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    No language services found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your filters or search terms
                  </p>
                  <Button onClick={clearFilters} variant="outline">
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <>
                  <div className={viewMode === 'grid' 
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
                    : 'space-y-6'
                  }>
                    {paginatedServices.map((service, index) => (
                      <motion.div
                        key={service.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <LanguageServiceCard service={service} />
                      </motion.div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-12">
                      <Button
                        variant="outline"
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>
                      <div className="flex items-center gap-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                          <Button
                            key={page}
                            variant={currentPage === page ? 'default' : 'outline'}
                            onClick={() => setCurrentPage(page)}
                            className="min-w-10"
                          >
                            {page}
                          </Button>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </Button>
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

export default LanguageServicesPage;