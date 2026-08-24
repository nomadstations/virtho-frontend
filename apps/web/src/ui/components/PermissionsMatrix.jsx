import React from 'react';
import PermissionSection from './PermissionSection';

const PermissionsMatrix = ({ role, permissions, onToggle }) => {
  if (!role) return null;

  // Group permissions by domain
  const permissionsByDomain = permissions.reduce((acc, perm) => {
    if (!acc[perm.domain]) {
      acc[perm.domain] = [];
    }
    acc[perm.domain].push(perm);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Role Permissions: {role.name}</h2>
        <p className="text-sm text-gray-500 mt-1">Configure what users with this role can access and perform.</p>
      </div>

      <div className="permissions-matrix-container">
        {Object.entries(permissionsByDomain).map(([domain, domainPerms]) => (
          <PermissionSection 
            key={domain}
            domain={domain}
            permissions={domainPerms}
            role={role}
            onToggle={onToggle}
          />
        ))}
      </div>
    </div>
  );
};

export default PermissionsMatrix;