import React from 'react';
import { Filter } from 'lucide-react';

const InvitationFilters = ({ currentFilter, onFilterChange, counts }) => {
  const filters = [
    { id: 'all', label: 'All', count: counts.all },
    { id: 'pending', label: 'Pending', count: counts.pending },
    { id: 'accepted', label: 'Accepted', count: counts.accepted },
    { id: 'expired', label: 'Expired', count: counts.expired },
    { id: 'revoked', label: 'Revoked', count: counts.revoked },
  ];

  return (
    <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
      <div className="flex items-center text-sm font-medium text-gray-500 mr-2 shrink-0">
        <Filter className="w-4 h-4 mr-1.5" />
        Filter by Status:
      </div>
      
      <div className="flex gap-2 shrink-0">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              currentFilter === filter.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {filter.label}
            <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
              currentFilter === filter.id
                ? 'bg-white/20 text-primary-foreground'
                : 'bg-gray-100 text-gray-500'
            }`}>
              {filter.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default InvitationFilters;