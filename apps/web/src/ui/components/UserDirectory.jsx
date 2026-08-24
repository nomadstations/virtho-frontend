import React, { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { ChevronLeft, ArrowUpDown, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePeople } from '@/hooks/usePeople';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

import UserSearchBar from './UserSearchBar';
import UserFilters from './UserFilters';
import UserDirectoryTable from './UserDirectoryTable';
import UserDirectoryCards from './UserDirectoryCards';
import UserPagination from './UserPagination';
import UserProfile from './UserProfile';
import OnboardingInProgressWidget from './OnboardingInProgressWidget';
import BulkImportExportButtons from './BulkImportExportButtons';

const UserDirectory = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { 
    users, 
    groups, 
    roles, 
    verifyUser, 
    deactivateUser, 
    updateUser,
    addUser,
    logActivity
  } = usePeople();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    role: [],
    status: [],
    group: [],
    verified: []
  });
  const [sortBy, setSortBy] = useState('name-asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Profile panel state
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Reset pagination when filters or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedFilters, sortBy]);

  const handleFilterChange = (category, values) => {
    setSelectedFilters(prev => ({ ...prev, [category]: values }));
  };

  const handleVerify = (id) => {
    verifyUser(id);
    toast({
      title: "User verified",
      description: "The user has been successfully verified.",
      variant: "success",
    });
  };

  const handleDeactivate = (id) => {
    deactivateUser(id);
    toast({
      title: "User deactivated",
      description: "The user account is now inactive.",
      variant: "destructive",
    });
  };

  const handleReactivate = (id) => {
    updateUser(id, { status: 'active' });
    toast({
      title: "User reactivated",
      description: "The user account is now active.",
    });
  };
  
  const handleViewProfile = (id) => {
    setSelectedUserId(id);
    setIsProfileOpen(true);
  };

  const filteredAndSortedUsers = useMemo(() => {
    let result = [...users];

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(u => 
        (u.firstName + ' ' + u.lastName).toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q)
      );
    }

    // Filters
    if (selectedFilters.role.length > 0) {
      result = result.filter(u => selectedFilters.role.includes(u.role));
    }
    if (selectedFilters.status.length > 0) {
      result = result.filter(u => selectedFilters.status.includes(u.status));
    }
    if (selectedFilters.group.length > 0) {
      result = result.filter(u => u.groups.some(g => selectedFilters.group.includes(g)));
    }
    if (selectedFilters.verified.length > 0) {
      result = result.filter(u => {
        const status = u.verified ? 'verified' : 'unverified';
        return selectedFilters.verified.includes(status);
      });
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return (a.firstName + a.lastName).localeCompare(b.firstName + b.lastName);
        case 'name-desc':
          return (b.firstName + b.lastName).localeCompare(a.firstName + a.lastName);
        case 'created-desc':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'created-asc':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'login-desc':
          const tB = b.lastLoginAt ? new Date(b.lastLoginAt).getTime() : 0;
          const tA = a.lastLoginAt ? new Date(a.lastLoginAt).getTime() : 0;
          return tB - tA;
        case 'login-asc':
          const tB2 = b.lastLoginAt ? new Date(b.lastLoginAt).getTime() : 0;
          const tA2 = a.lastLoginAt ? new Date(a.lastLoginAt).getTime() : 0;
          return tA2 - tB2;
        default:
          return 0;
      }
    });

    return result;
  }, [users, searchQuery, selectedFilters, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedUsers.length / itemsPerPage);
  const paginatedUsers = filteredAndSortedUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full bg-gray-50 min-h-[calc(100vh-5rem)] pb-12 relative overflow-hidden">
      <Helmet>
        <title>User Directory - Virtho Foundation</title>
        <meta name="description" content="Browse and manage all users in the system." />
      </Helmet>

      <div className="bg-white border-b border-gray-200 pt-6 pb-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mb-4 -ml-2 text-gray-500 hover:text-gray-900"
            onClick={() => navigate('/users')}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to People
          </Button>
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">User Directory</h1>
              <p className="text-gray-500 mt-1">Manage and view all registered members</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <BulkImportExportButtons 
                filteredUsers={filteredAndSortedUsers}
                users={users}
                addUser={addUser}
                logActivity={logActivity}
                onImportSuccess={() => {}}
              />
              <Button 
                onClick={() => navigate('/users/permissions')}
                className="bg-primary text-primary-foreground hover:bg-primary-dark"
              >
                <Shield className="w-4 h-4 mr-2" />
                Manage Permissions
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
        
        {/* Top Widgets Layer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-2">
          <div className="md:col-span-2">
             <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm h-full">
              <div className="w-full">
                <UserSearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
              </div>
              
              <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                <UserFilters 
                  selectedFilters={selectedFilters} 
                  onFilterChange={handleFilterChange}
                  roles={roles}
                  groups={groups}
                />
                
                <div className="relative">
                  <select
                    className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-light h-10"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    aria-label="Sort users"
                  >
                    <option value="name-asc">Name (A-Z)</option>
                    <option value="name-desc">Name (Z-A)</option>
                    <option value="created-desc">Newest First</option>
                    <option value="created-asc">Oldest First</option>
                    <option value="login-desc">Recent Login</option>
                    <option value="login-asc">Oldest Login</option>
                  </select>
                  <ArrowUpDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-1">
             <OnboardingInProgressWidget onViewProfile={handleViewProfile} />
          </div>
        </div>

        <UserDirectoryTable 
          users={paginatedUsers} 
          groups={groups}
          onVerify={handleVerify}
          onDeactivate={handleDeactivate}
          onReactivate={handleReactivate}
          onViewProfile={handleViewProfile}
        />
        
        <UserDirectoryCards 
          users={paginatedUsers} 
          groups={groups}
          onVerify={handleVerify}
          onDeactivate={handleDeactivate}
          onReactivate={handleReactivate}
          onViewProfile={handleViewProfile}
        />

        {filteredAndSortedUsers.length > 0 && (
          <UserPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalUsers={filteredAndSortedUsers.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        )}
      </div>

      <UserProfile 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
        userId={selectedUserId} 
      />
    </div>
  );
};

export default UserDirectory;