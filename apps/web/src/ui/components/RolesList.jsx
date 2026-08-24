import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RoleItem from './RoleItem';

const RolesList = ({ roles, users, selectedRoleId, onSelectRole, onCreateClick }) => {
  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      <div className="p-4 border-b border-gray-100 bg-gray-50/50">
        <h2 className="text-lg font-semibold text-gray-900">System Roles</h2>
        <p className="text-sm text-gray-500 mt-1">Manage access templates</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3 space-y-2 role-list-container">
        {roles.map(role => {
          const memberCount = users.filter(u => u.role === role.name).length;
          return (
            <RoleItem
              key={role.id}
              role={role}
              memberCount={memberCount}
              isSelected={selectedRoleId === role.id}
              onClick={() => onSelectRole(role.id)}
            />
          );
        })}
      </div>

      <div className="p-4 border-t border-gray-100 bg-gray-50/50">
        <Button onClick={onCreateClick} className="w-full bg-primary text-primary-foreground hover:bg-primary-dark">
          <Plus className="w-4 h-4 mr-2" />
          Create Role
        </Button>
      </div>
    </div>
  );
};

export default RolesList;