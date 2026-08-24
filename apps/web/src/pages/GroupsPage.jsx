import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { Users, Plus, Search, Edit2, Trash2, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import AddGroupWizard from '@/components/dashboard/AddGroupWizard.jsx';
import DashboardSidebar from '@/components/DashboardSidebar.jsx';
import DashboardBreadcrumb from '@/components/dashboard/DashboardBreadcrumb.jsx';
import DashboardPageHeader from '@/components/dashboard/DashboardPageHeader.jsx';
import { EmptyState, LoadingSpinner } from '@/components/SharedUI.jsx';
import { motion, AnimatePresence } from 'framer-motion';

function GroupsPage() {
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadData = () => {
      try {
        const storedGroups = localStorage.getItem('virtho_groups');
        if (storedGroups) {
          setGroups(JSON.parse(storedGroups));
        } else {
          const sampleData = [
            { id: '1', name: 'Design Team', description: 'Core design team for UI/UX.', category: 'Design', createdAt: new Date().toISOString() },
            { id: '2', name: 'Frontend Devs', description: 'Developers working on React applications.', category: 'Engineering', createdAt: new Date(Date.now() - 86400000).toISOString() },
          ];
          setGroups(sampleData);
          localStorage.setItem('virtho_groups', JSON.stringify(sampleData));
        }
      } catch (error) {
        console.error('Error loading groups:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    const timer = setTimeout(loadData, 500);
    return () => clearTimeout(timer);
  }, []);

  const saveGroups = (newGroups) => {
    setGroups(newGroups);
    localStorage.setItem('virtho_groups', JSON.stringify(newGroups));
  };

  const handleSaveGroup = (groupData) => {
    if (editingGroup) {
      const updatedGroups = groups.map(group => group.id === groupData.id ? groupData : group);
      saveGroups(updatedGroups);
      toast({ title: 'Success', description: 'Group updated successfully.' });
    } else {
      const updatedGroups = [groupData, ...groups];
      saveGroups(updatedGroups);
      toast({ title: 'Success', description: 'Group added successfully.' });
    }
    setEditingGroup(null);
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this group?')) {
      const updatedGroups = groups.filter(group => group.id !== id);
      saveGroups(updatedGroups);
      toast({ title: 'Success', description: 'Group deleted successfully.', variant: 'destructive' });
    }
  };

  const openAddModal = () => {
    setEditingGroup(null);
    setIsModalOpen(true);
  };

  const openEditModal = (group) => {
    setEditingGroup(group);
    setIsModalOpen(true);
  };

  const filteredGroups = useMemo(() => {
    return groups.filter(group => {
      if (!searchTerm) return true;
      const lowerSearch = searchTerm.toLowerCase();
      return (
        group.name.toLowerCase().includes(lowerSearch) || 
        (group.description && group.description.toLowerCase().includes(lowerSearch))
      );
    });
  }, [groups, searchTerm]);

  return (
    <>
      <Helmet><title>Groups - Virtho Dashboard</title></Helmet>
      
      <div className="flex w-full bg-gray-50 min-h-[calc(100vh-5rem)]">
        <DashboardSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        <main className="flex-1 w-full overflow-x-hidden overflow-y-auto">
          <div className="bg-white border-b border-gray-200 pt-6 pb-8 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-4 mb-6">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="md:hidden" 
                  onClick={() => setIsSidebarOpen(true)}
                  aria-label="Toggle Sidebar"
                >
                  <Menu className="w-5 h-5" />
                </Button>
                <div className="flex-1">
                  <DashboardBreadcrumb pageName="Groups" />
                </div>
              </div>
              
              <DashboardPageHeader
                title="Groups"
                description="Manage your team groups and cohorts."
                buttonLabel="Add Group"
                buttonAction={openAddModal}
                icon={Users}
                buttonClassName="bg-teal-600 hover:bg-teal-700 text-white"
              />
            </div>
          </div>

          <div className="p-4 md:p-8 max-w-7xl mx-auto">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8">
              <div className="relative max-w-md w-full mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input 
                  placeholder="Search groups..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 text-gray-900 border-gray-300 bg-gray-50 focus:bg-white"
                />
              </div>

              {isLoading ? (
                <div className="py-12 flex justify-center">
                  <LoadingSpinner message="Loading groups..." />
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  {filteredGroups.length === 0 ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <EmptyState 
                        icon={Users}
                        title="No groups found"
                        description={searchTerm ? "Try adjusting your search terms." : "You haven't added any groups yet."}
                        actionText={searchTerm ? "Clear Search" : "Add Group"}
                        onAction={searchTerm ? () => setSearchTerm('') : openAddModal}
                      />
                    </motion.div>
                  ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="overflow-x-auto rounded-lg border border-gray-100">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-gray-200 bg-gray-50/50">
                            <th className="py-4 px-4 font-semibold text-gray-700">Name</th>
                            <th className="py-4 px-4 font-semibold text-gray-700">Category</th>
                            <th className="py-4 px-4 font-semibold text-gray-700">Description</th>
                            <th className="py-4 px-4 font-semibold text-gray-700">Created Date</th>
                            <th className="py-4 px-4 font-semibold text-gray-700 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredGroups.map((group) => (
                            <tr key={group.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                              <td className="py-4 px-4 font-bold text-gray-900">{group.name}</td>
                              <td className="py-4 px-4 font-medium text-teal-700">
                                {group.category ? (
                                  <span className="bg-teal-50 px-2.5 py-1 rounded-md text-xs">{group.category}</span>
                                ) : '-'}
                              </td>
                              <td className="py-4 px-4 text-gray-600 max-w-xs truncate">{group.description || '-'}</td>
                              <td className="py-4 px-4 text-gray-500 text-sm">
                                {new Date(group.createdAt).toLocaleDateString()}
                              </td>
                              <td className="py-4 px-4 text-right">
                                <div className="flex justify-end gap-2">
                                  <Button variant="ghost" size="sm" onClick={() => openEditModal(group)} className="text-blue-600 hover:text-blue-700 hover:bg-blue-50" aria-label={`Edit ${group.name}`}>
                                    <Edit2 className="w-4 h-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm" onClick={() => handleDelete(group.id)} className="text-red-600 hover:text-red-700 hover:bg-red-50" aria-label={`Delete ${group.name}`}>
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          </div>
        </main>
      </div>

      <AddGroupWizard 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={editingGroup}
        onSave={handleSaveGroup}
      />
    </>
  );
}

export default GroupsPage;