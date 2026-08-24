import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GroupCard from './GroupCard';

const GroupsList = ({ groups, onCreateGroup, onSelectGroup, onEditGroup, onDeleteGroup }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">All Groups</h2>
          <p className="text-sm text-gray-500">Manage user groups and their specific access overrides.</p>
        </div>
        <Button onClick={onCreateGroup} className="bg-primary text-primary-foreground hover:bg-primary-dark w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Create Group
        </Button>
      </div>

      {groups.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-900">No groups found</h3>
          <p className="text-sm text-gray-500 mt-1 mb-4">Create your first group to start managing members and permissions.</p>
          <Button onClick={onCreateGroup} variant="outline">
            Create Group
          </Button>
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {groups.map(group => (
            <GroupCard 
              key={group.id} 
              group={group} 
              onClick={() => onSelectGroup(group.id)}
              onEdit={onEditGroup}
              onDelete={onDeleteGroup}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default GroupsList;