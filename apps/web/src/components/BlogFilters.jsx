import React from 'react';
import FilterPanel from './filters/FilterPanel';
import { BLOG_FILTERS } from '@/constants/filterConfig';

const BlogFilters = ({ filters, onUpdateFilter }) => {
  return (
    <FilterPanel 
      filterConfig={BLOG_FILTERS} 
      filters={filters} 
      onUpdateFilter={onUpdateFilter} 
    />
  );
};

export default BlogFilters;