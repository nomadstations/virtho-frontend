// Proxy to new FilterPanel utilizing constants
import React from 'react';
import FilterPanel from './filters/FilterPanel';
import { PROJECT_FILTERS } from '@/constants/filterConfig';

const ProjectFilters = (props) => {
  return <FilterPanel filterConfig={PROJECT_FILTERS} {...props} />;
};

export default ProjectFilters;