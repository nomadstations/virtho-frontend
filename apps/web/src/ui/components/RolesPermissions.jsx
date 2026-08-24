import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePeople } from '@/hooks/usePeople';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

import RolesList from './RolesList';
import PermissionsMatrix from './PermissionsMatrix';
import UsersWithRole from './UsersWithRole';
import CreateRoleModal from './CreateRoleModal';
import UserProfile from './UserProfile';

const RolesPermissions = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { roles, permissions, users, updateRolePermissions, addRole, logActivity } = usePeople();

  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showUserProfile, setShowUserProfile] = useState(false);

  // Auto-select first role on load
  useEffect(() => {
    if (!selectedRoleId && roles.length > 0) {
      setSelectedRoleId(roles[0].id);
    }
  }, [roles, selectedRoleId]);

  const activeRole = roles.find(r => r.id === selectedRoleId) || roles[0];

  const handleTogglePermission = (permissionKey, isGranted) => {
    if (!activeRole) return;
    
    // Guard rail: Don't allow removing Platform permissions from Admin
    if (activeRole.name === 'Admin' && isGranted === false) {
      const permObj = permissions.find(p => p.key === permissionKey);
      if (permObj?.domain === 'Platform') {
        toast({
          title: "Permission Locked",
          description: "Cannot remove core platform permissions from Admin role.",
          variant: "destructive"
        });
        return;
      }
    }

    updateRolePermissions(activeRole.id, { [permissionKey]: isGranted });
    logActivity('system', isGranted ? 'permission_granted' : 'permission_revoked', 'permission', activeRole.id);
  };

  const handleCreateRole = (roleData) => {
    const newRole = addRole(roleData);
    toast({
      title: "Role Created",
      description: `${newRole.name} has been created successfully.`,
      variant: "success"
    });
    setSelectedRoleId(newRole.id);
    setIsCreateModalOpen(false);
  };

  const handleUserClick = (userId) => {
    setSelectedUserId(userId);
    setShowUserProfile(true);
  };

  return (
    <div className="w-full min-h-[calc(100vh-5rem)] bg-gray-50 flex flex-col roles-layout">
      <Helmet>
        <title>Roles & Permissions - Virtho Foundation</title>
        <meta name="description" content="Manage system roles, permissions, and user access levels." />
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
          
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Roles & Permissions</h1>
            <p className="text-gray-500 mt-1">Configure access levels and manage role assignments</p>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="flex-1 max-w-[1600px] w-full mx-auto flex flex-col md:flex-row overflow-hidden relative">
        
        {/* Left Sidebar: Roles List */}
        <div className="w-full md:w-72 lg:w-80 border-b md:border-b-0 md:border-r border-gray-200 bg-white shrink-0 overflow-y-auto">
          <RolesList 
            roles={roles}
            users={users}
            selectedRoleId={selectedRoleId}
            onSelectRole={setSelectedRoleId}
            onCreateClick={() => setIsCreateModalOpen(true)}
          />
        </div>

        {/* Right Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50">
          <div className="max-w-4xl mx-auto pb-12">
            <PermissionsMatrix 
              role={activeRole}
              permissions={permissions}
              onToggle={handleTogglePermission}
            />
            
            <div className="h-px bg-gray-200 w-full my-8" />
            
            <UsersWithRole 
              role={activeRole}
              users={users}
              onUserClick={handleUserClick}
            />
          </div>
        </div>

      </div>

      {/* Modals & Overlays */}
      <CreateRoleModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onAddRole={handleCreateRole}
        existingRoles={roles}
      />

      <UserProfile 
        isOpen={showUserProfile}
        onClose={() => setShowUserProfile(false)}
        userId={selectedUserId}
      />
    </div>
  );
};

export default RolesPermissions;