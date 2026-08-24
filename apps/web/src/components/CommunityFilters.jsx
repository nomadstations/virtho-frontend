import React from 'react';
import FilterPanel from './filters/FilterPanel';
import { COMMUNITY_FILTERS } from '@/constants/filterConfig';

const CommunityFilters = (props) => {
  return <FilterPanel filterConfig={COMMUNITY_FILTERS} {...props} />;
};

export default CommunityFilters;