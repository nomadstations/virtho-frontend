import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePeople } from '@/hooks/usePeople';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

import GroupsList from './GroupsList';
import GroupDetail from './GroupDetail';
import CreateEditGroupModal from './CreateEditGroupModal';

const Groups = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { 
    groups, 
    users, 
    permissions, 
    addGroup, 
    updateGroup, 
    deleteGroup,
    updateGroupMembers,
    updateGroupPermissions,
    logActivity
  } = usePeople();

  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' or 'edit'
  const [groupToEdit, setGroupToEdit] = useState(null);

  const selectedGroup = groups.find(g => g.id === selectedGroupId);

  const handleCreateClick = () => {
    setModalMode('create');
    setGroupToEdit(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (group) => {
    setModalMode('edit');
    setGroupToEdit(group);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (group) => {
    if (window.confirm(`Are you sure you want to delete the group "${group.name}"? This action cannot be undone.`)) {
      deleteGroup(group.id);
      if (selectedGroupId === group.id) setSelectedGroupId(null);
      toast({
        title: "Group Deleted",
        description: `Group "${group.name}" was successfully removed.`
      });
    }
  };

  const handleSaveModal = (data) => {
    if (modalMode === 'create') {
      const newGroup = addGroup(data);
      toast({
        title: "Group Created",
        description: `Group "${newGroup.name}" has been created.`,
        variant: "success"
      });
    } else {
      updateGroup(groupToEdit.id, data);
      toast({
        title: "Group Updated",
        description: `Changes to "${data.name}" saved.`
      });
    }
    setIsModalOpen(false);
  };

  const handleAddMembers = (userIds) => {
    if (!selectedGroup) return;
    const newMemberIds = [...(selectedGroup.memberIds || []), ...userIds];
    updateGroupMembers(selectedGroup.id, newMemberIds);
    toast({
      title: "Members Added",
      description: `Added ${userIds.length} members to the group.`,
      variant: "success"
    });
  };

  const handleRemoveMember = (userId) => {
    if (!selectedGroup) return;
    const newMemberIds = (selectedGroup.memberIds || []).filter(id => id !== userId);
    updateGroupMembers(selectedGroup.id, newMemberIds);
    toast({
      title: "Member Removed",
      description: `User has been removed from the group.`
    });
  };

  const handleTogglePermission = (permissionKey, isGranted) => {
    if (!selectedGroup) return;
    updateGroupPermissions(selectedGroup.id, { [permissionKey]: isGranted });
    // Toast omitted here to prevent spamming on rapid clicks, activity is logged.
  };

  return (
    <div className="w-full bg-gray-50 min-h-[calc(100vh-5rem)] pb-12 relative overflow-hidden">
      <Helmet>
        <title>Groups - Virtho Foundation</title>
        <meta name="description" content="Manage user groups and permission overrides." />
      </Helmet>

      <div className="bg-white border-b border-gray-200 pt-6 pb-6 px-4 md:px-8">
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
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">User Groups</h1>
            <p className="text-gray-500 mt-1">Group users and manage customized permission overrides</p>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-8 max-w-[1600px] mx-auto">
        {!selectedGroupId ? (
          <GroupsList 
            groups={groups}
            onCreateGroup={handleCreateClick}
            onSelectGroup={setSelectedGroupId}
            onEditGroup={handleEditClick}
            onDeleteGroup={handleDeleteClick}
          />
        ) : (
          <GroupDetail 
            group={selectedGroup}
            users={users}
            permissions={permissions}
            onBack={() => setSelectedGroupId(null)}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
            onAddMembers={handleAddMembers}
            onRemoveMember={handleRemoveMember}
            onTogglePermission={handleTogglePermission}
          />
        )}
      </div>

      <CreateEditGroupModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveModal}
        mode={modalMode}
        initialData={groupToEdit}
        existingGroups={groups}
      />
    </div>
  );
};

export default Groups;