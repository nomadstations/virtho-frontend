import React from 'react';
import FilterPanel from './filters/FilterPanel';
import { MARKETPLACE_FILTERS } from '@/constants/filterConfig';

const MarketplaceFilters = (props) => {
  return <FilterPanel filterConfig={MARKETPLACE_FILTERS} {...props} />;
};

export default MarketplaceFilters;