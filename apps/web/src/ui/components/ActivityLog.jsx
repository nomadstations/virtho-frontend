import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { ChevronLeft, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { usePeople } from '@/hooks/usePeople';

import ActivityFilters from './ActivityFilters';
import ActivityTable from './ActivityTable';
import ActivityExportButton from './ActivityExportButton';
import UserProfile from './UserProfile';

const ActivityLog = () => {
  const navigate = useNavigate();
  const { activityLog, users } = usePeople();

  const [filters, setFilters] = useState({
    user: '',
    action: '',
    dateFrom: '',
    dateTo: ''
  });

  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Extract unique action types from the log for the dropdown
  const uniqueActionTypes = useMemo(() => {
    const types = new Set(activityLog.map(entry => entry.action));
    return Array.from(types).sort();
  }, [activityLog]);

  // Filter entries
  const filteredEntries = useMemo(() => {
    return activityLog.filter(entry => {
      // User filter
      if (filters.user && entry.userId !== filters.user) return false;
      
      // Action filter
      if (filters.action && entry.action !== filters.action) return false;
      
      // Date From filter (compare YYYY-MM-DD)
      if (filters.dateFrom) {
        const entryDate = entry.timestamp.substring(0, 10);
        if (entryDate < filters.dateFrom) return false;
      }
      
      // Date To filter (compare YYYY-MM-DD)
      if (filters.dateTo) {
        const entryDate = entry.timestamp.substring(0, 10);
        if (entryDate > filters.dateTo) return false;
      }
      
      return true;
    }).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // Newest first
  }, [activityLog, filters]);

  const handleClearFilters = () => {
    setFilters({ user: '', action: '', dateFrom: '', dateTo: '' });
  };

  const handleViewProfile = (userId) => {
    setSelectedUserId(userId);
    setIsProfileOpen(true);
  };

  return (
    <div className="w-full bg-gray-50 min-h-[calc(100vh-5rem)] pb-12 relative overflow-hidden">
      <Helmet>
        <title>Activity Log - Virtho Foundation</title>
        <meta name="description" content="View system activity and audit logs." />
      </Helmet>

      {/* Header */}
      <div className="bg-white border-b border-gray-200 pt-6 pb-6 px-4 md:px-8 shrink-0">
        <div className="max-w-[1600px] mx-auto">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mb-4 -ml-2 text-gray-500 hover:text-gray-900"
            onClick={() => navigate('/users')}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to People
          </Button>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                <div className="w-10 h-10 rounded-lg bg-primary-lighter/40 text-primary flex items-center justify-center border border-primary-light/30">
                  <Activity className="w-6 h-6" />
                </div>
                Activity Log
              </h1>
              <p className="text-gray-500 mt-2">View complete history of user and system events</p>
            </div>

            <div>
              <ActivityExportButton entries={filteredEntries} users={users} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 md:p-8 max-w-[1600px] mx-auto space-y-6">
        <ActivityFilters 
          users={users}
          actionTypes={uniqueActionTypes}
          filters={filters}
          setFilters={setFilters}
          onClear={handleClearFilters}
          totalActiveCount={filteredEntries.length}
        />

        <ActivityTable 
          entries={filteredEntries}
          users={users}
          onUserClick={handleViewProfile}
        />
      </div>

      {/* User Profile Overlay */}
      <UserProfile 
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        userId={selectedUserId}
      />
    </div>
  );
};

export default ActivityLog;