import React from 'react';
import { Grid, List } from 'lucide-react';
import SearchComponent from '@/components/SearchComponent';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MarketplaceSortBar = ({ 
  searchQuery, 
  setSearchQuery, 
  sortBy, 
  setSortBy, 
  totalResults,
  viewMode,
  setViewMode
}) => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6">
      <div className="flex items-center gap-4 w-full lg:w-auto flex-1">
        <div className="w-full max-w-md">
          <SearchComponent
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search marketplace..."
          />
        </div>
        <span className="text-sm text-gray-500 font-medium whitespace-nowrap hidden md:block">
          {totalResults} Results
        </span>
      </div>

      <div className="flex items-center gap-4 w-full lg:w-auto bg-gray-50/50 p-1.5 rounded-xl border border-gray-100">
        <div className="flex items-center gap-3 w-full lg:w-auto px-2">
          <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Sort by:</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full lg:w-[180px] bg-white border-gray-200 focus:ring-purple-500">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest Arrivals</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Vertical Divider */}
        <div className="hidden lg:block w-px h-8 bg-gray-200 mx-1"></div>

        {/* View Toggle (Desktop) */}
        <div className="hidden lg:flex items-center bg-white p-1 rounded-lg border border-gray-200 shadow-sm">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md transition-all flex items-center justify-center ${
              viewMode === 'grid' 
                ? 'bg-purple-100 text-purple-700 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
            aria-label="Grid View"
            title="Grid View"
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md transition-all flex items-center justify-center ${
              viewMode === 'list' 
                ? 'bg-purple-100 text-purple-700 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
            aria-label="List View"
            title="List View"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceSortBar;