import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import PermissionItem from './PermissionItem';

const PermissionSection = ({ domain, permissions, role, onToggle }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  
  const grantedCount = permissions.filter(p => {
    if (role.name === 'Admin' && p.domain === 'Platform') return true;
    return role.permissions[p.key];
  }).length;

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm mb-4">
      <div 
        className="flex items-center justify-between p-4 bg-gray-50/80 cursor-pointer hover:bg-gray-100/80 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="bg-primary-lighter/50 p-2 rounded-lg text-primary-dark">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{domain}</h3>
            <p className="text-xs text-gray-500">
              {grantedCount} of {permissions.length} permissions granted
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="bg-white border border-gray-200 text-gray-600 hidden sm:flex">
            {grantedCount === permissions.length ? 'Full Access' : grantedCount === 0 ? 'No Access' : 'Custom'}
          </Badge>
          <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="w-5 h-5 text-gray-400" />
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
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 border-t border-gray-100">
              {permissions.map(permission => {
                const isLockedAdmin = role.name === 'Admin' && permission.domain === 'Platform';
                const isGranted = isLockedAdmin ? true : !!role.permissions[permission.key];
                
                return (
                  <PermissionItem 
                    key={permission.id}
                    permission={permission}
                    role={role}
                    isGranted={isGranted}
                    onToggle={onToggle}
                  />
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PermissionSection;