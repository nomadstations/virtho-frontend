import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Settings2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import PermissionOverrideItem from './PermissionOverrideItem';

const OverrideDomainSection = ({ domain, permissions, group, onToggle }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  
  const overrideCount = permissions.filter(p => group.permissionOverrides?.[p.key]).length;

  return (
    <div className="border border-secondary/30 rounded-xl overflow-hidden bg-white shadow-sm mb-4">
      <div 
        className="flex items-center justify-between p-4 bg-secondary/10 cursor-pointer hover:bg-secondary/20 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="bg-secondary/20 p-2 rounded-lg text-secondary-darkest">
            <Settings2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-secondary-darkest">{domain} Overrides</h3>
            <p className="text-xs text-secondary-dark">
              {overrideCount} active override{overrideCount !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="w-5 h-5 text-secondary-darkest" />
          </motion.div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 border-t border-secondary/20 bg-secondary/5">
              {permissions.map(permission => (
                <PermissionOverrideItem 
                  key={permission.id}
                  permission={permission}
                  isGranted={!!group.permissionOverrides?.[permission.key]}
                  onToggle={onToggle}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const GroupPermissionOverrides = ({ group, permissions, onTogglePermission }) => {
  const permissionsByDomain = permissions.reduce((acc, perm) => {
    if (!acc[perm.domain]) acc[perm.domain] = [];
    acc[perm.domain].push(perm);
    return acc;
  }, {});

  return (
    <div className="mt-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Permission Overrides</h2>
        <p className="text-sm text-gray-500 mt-1">Grant specific permissions to members of this group, bypassing their standard role limits.</p>
      </div>

      <div className="space-y-4">
        {Object.entries(permissionsByDomain).map(([domain, domainPerms]) => (
          <OverrideDomainSection 
            key={domain}
            domain={domain}
            permissions={domainPerms}
            group={group}
            onToggle={onTogglePermission}
          />
        ))}
      </div>
    </div>
  );
};

export default GroupPermissionOverrides;