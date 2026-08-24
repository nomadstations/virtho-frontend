import React from 'react';
import { Users } from 'lucide-react';
import UserRoleItem from './UserRoleItem';

const UsersWithRole = ({ role, users, onUserClick }) => {
  if (!role) return null;

  const roleUsers = users.filter(u => u.role === role.name);

  return (
    <div className="mt-12 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Users with {role.name} Role</h2>
          <p className="text-sm text-gray-500 mt-1">Directory of members assigned to this access level.</p>
        </div>
        <div className="bg-primary-lighter/40 px-3 py-1 rounded-full flex items-center gap-2 text-primary-darkest text-sm font-medium">
          <Users className="w-4 h-4" />
          {roleUsers.length} Members
        </div>
      </div>

      {roleUsers.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-sm font-medium text-gray-900">No users with this role</h3>
          <p className="text-sm text-gray-500 mt-1">Assign this role to users from the User Directory.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {roleUsers.map(user => (
            <UserRoleItem 
              key={user.id} 
              user={user} 
              onClick={() => onUserClick(user.id)} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UsersWithRole;