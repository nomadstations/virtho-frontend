import React, { useState } from 'react';
import { UserPlus, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import AddMembersModal from './AddMembersModal';

const GroupMembers = ({ group, users, onAddMembers, onRemoveMember }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const groupUsers = users.filter(u => (group.memberIds || []).includes(u.id));
  
  const filteredUsers = groupUsers.filter(u => 
    searchQuery === '' || 
    `${u.firstName} ${u.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddMembers = (userIds) => {
    onAddMembers(userIds);
    setIsAddModalOpen(false);
  };

  return (
    <div className="mt-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Members</h2>
          <p className="text-sm text-gray-500 mt-1">Users assigned to this group.</p>
        </div>
        
        <Button onClick={() => setIsAddModalOpen(true)} variant="outline" className="border-primary text-primary-dark hover:bg-primary-lighter w-full sm:w-auto">
          <UserPlus className="w-4 h-4 mr-2" />
          Add Members
        </Button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {groupUsers.length > 0 && (
          <div className="p-4 border-b border-gray-100 bg-gray-50/50">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 bg-white"
              />
            </div>
          </div>
        )}

        {groupUsers.length === 0 ? (
          <div className="text-center py-12 px-4">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
              <UserPlus className="w-5 h-5 text-gray-400" />
            </div>
            <h3 className="text-sm font-medium text-gray-900">No members yet</h3>
            <p className="text-sm text-gray-500 mt-1 mb-4">Add users to this group to apply custom permissions.</p>
            <Button onClick={() => setIsAddModalOpen(true)} size="sm">Add Members</Button>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-8 px-4 text-sm text-gray-500">
            No members match your search.
          </div>
        ) : (
          <div className="divide-y divide-gray-100 max-h-[400px] overflow-y-auto">
            {filteredUsers.map(user => (
              <div key={user.id} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors group/row">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-lighter text-primary-darkest flex items-center justify-center text-sm font-bold shrink-0">
                    {user.avatarInitials}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <Badge variant="secondary" className="hidden sm:inline-flex bg-gray-100">
                    {user.role}
                  </Badge>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => onRemoveMember(user.id)}
                    className="h-8 w-8 text-gray-400 hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover/row:opacity-100 transition-opacity"
                    title="Remove from group"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <AddMembersModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        group={group}
        users={users}
        onAddMembers={handleAddMembers}
      />
    </div>
  );
};

export default GroupMembers;