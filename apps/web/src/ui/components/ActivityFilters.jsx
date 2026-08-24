import React from 'react';
import { Search, FilterX } from 'lucide-react';
import { Button } from '@/components/ui/button';

const formatActionLabel = (action) => {
  if (!action) return 'All Actions';
  return action.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const ActivityFilters = ({ users, actionTypes, filters, setFilters, onClear, totalActiveCount }) => {
  
  const handleUserChange = (e) => setFilters(prev => ({ ...prev, user: e.target.value }));
  const handleActionChange = (e) => setFilters(prev => ({ ...prev, action: e.target.value }));
  const handleDateFromChange = (e) => setFilters(prev => ({ ...prev, dateFrom: e.target.value }));
  const handleDateToChange = (e) => setFilters(prev => ({ ...prev, dateTo: e.target.value }));

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row flex-wrap items-end gap-4">
      
      <div className="flex-1 min-w-[200px] w-full">
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">User</label>
        <div className="relative">
          <select 
            className="w-full appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-light h-10"
            value={filters.user}
            onChange={handleUserChange}
          >
            <option value="">All Users</option>
            {users.map(u => (
              <option key={u.id} value={u.id}>{u.firstName} {u.lastName} ({u.email})</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex-1 min-w-[200px] w-full">
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Action Type</label>
        <select 
          className="w-full appearance-none bg-white border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-light h-10"
          value={filters.action}
          onChange={handleActionChange}
        >
          <option value="">All Actions</option>
          {actionTypes.map(act => (
            <option key={act} value={act}>{formatActionLabel(act)}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-1 min-w-[280px] w-full gap-2">
        <div className="flex-1">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">From Date</label>
          <input 
            type="date" 
            className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-light h-10"
            value={filters.dateFrom}
            onChange={handleDateFromChange}
          />
        </div>
        <div className="flex-1">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">To Date</label>
          <input 
            type="date" 
            className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-light h-10"
            value={filters.dateTo}
            onChange={handleDateToChange}
          />
        </div>
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto">
        <Button 
          variant="outline" 
          className="h-10 text-gray-600 border-gray-300 hover:bg-gray-50"
          onClick={onClear}
        >
          <FilterX className="w-4 h-4 mr-2" />
          Clear
        </Button>
      </div>

      <div className="w-full text-xs text-gray-500 mt-1">
        Showing {totalActiveCount} activities
      </div>
    </div>
  );
};

export default ActivityFilters;