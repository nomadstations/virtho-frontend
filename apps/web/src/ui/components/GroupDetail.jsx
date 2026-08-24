import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import GroupMembers from './GroupMembers';
import GroupPermissionOverrides from './GroupPermissionOverrides';

const GroupDetail = ({ 
  group, 
  users, 
  permissions,
  onBack, 
  onEdit, 
  onDelete, 
  onAddMembers, 
  onRemoveMember,
  onTogglePermission 
}) => {
  if (!group) return null;

  const memberCount = (group.memberIds || []).length;
  const overridesCount = Object.keys(group.permissionOverrides || {}).length;

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 md:p-6 rounded-xl border border-gray-200 shadow-sm relative">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary-lighter text-primary-darkest flex items-center justify-center shrink-0 mt-1">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Button variant="ghost" size="icon" className="h-6 w-6 -ml-2 text-gray-500" onClick={onBack}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{group.name}</h1>
            </div>
            <p className="text-sm text-gray-500 max-w-2xl">
              {group.description || 'No description provided.'}
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                {memberCount} Members
              </Badge>
              {overridesCount > 0 && (
                <Badge variant="outline" className="bg-secondary/10 text-secondary-darkest border-secondary/30">
                  {overridesCount} Permission Override{overridesCount !== 1 && 's'}
                </Badge>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-gray-100">
          <Button variant="outline" onClick={() => onEdit(group)} className="flex-1 sm:flex-auto">
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button variant="outline" onClick={() => onDelete(group)} className="text-destructive hover:bg-destructive/10 hover:text-destructive-foreground flex-1 sm:flex-auto">
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <GroupMembers 
            group={group} 
            users={users} 
            onAddMembers={onAddMembers}
            onRemoveMember={onRemoveMember}
          />
        </div>
        <div>
          <GroupPermissionOverrides 
            group={group}
            permissions={permissions}
            onTogglePermission={onTogglePermission}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default GroupDetail;