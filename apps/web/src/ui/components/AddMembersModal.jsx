import React, { useState, useMemo } from 'react';
import { Search, Check } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

const AddMembersModal = ({ isOpen, onClose, group, users, onAddMembers }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUserIds, setSelectedUserIds] = useState(new Set());

  // Reset state when opened
  React.useEffect(() => {
    if (isOpen) {
      setSearchQuery('');
      setSelectedUserIds(new Set());
    }
  }, [isOpen]);

  const availableUsers = useMemo(() => {
    if (!group) return [];
    
    // Filter out users already in the group
    let filtered = users.filter(u => !(group.memberIds || []).includes(u.id));
    
    // Apply search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(u => 
        `${u.firstName} ${u.lastName}`.toLowerCase().includes(q) || 
        u.email.toLowerCase().includes(q)
      );
    }
    
    return filtered;
  }, [users, group, searchQuery]);

  const toggleUser = (userId) => {
    const newSet = new Set(selectedUserIds);
    if (newSet.has(userId)) {
      newSet.delete(userId);
    } else {
      newSet.add(userId);
    }
    setSelectedUserIds(newSet);
  };

  const handleAdd = () => {
    onAddMembers(Array.from(selectedUserIds));
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Members to {group?.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search users by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-white"
            />
          </div>

          <div className="border border-gray-200 rounded-md overflow-hidden">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 text-sm font-medium text-gray-500">
              {availableUsers.length} users available
            </div>
            
            <ScrollArea className="h-[300px]">
              {availableUsers.length === 0 ? (
                <div className="p-8 text-center text-gray-500 text-sm">
                  No users found matching your search.
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {availableUsers.map(user => (
                    <div 
                      key={user.id}
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => toggleUser(user.id)}
                    >
                      <Checkbox 
                        checked={selectedUserIds.has(user.id)}
                        onCheckedChange={() => toggleUser(user.id)}
                        className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                      
                      <div className="w-8 h-8 rounded-full bg-primary-lighter text-primary-darkest flex items-center justify-center text-xs font-bold shrink-0">
                        {user.avatarInitials}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                      
                      <Badge variant="outline" className="text-xs font-normal">
                        {user.role}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleAdd} 
            disabled={selectedUserIds.size === 0}
            className="bg-primary text-primary-foreground hover:bg-primary-dark"
          >
            Add {selectedUserIds.size > 0 ? selectedUserIds.size : ''} Members
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddMembersModal;