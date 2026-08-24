import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { Building2, Plus, Search, Edit2, Trash2, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import AddOrganizationWizard from '@/components/dashboard/AddOrganizationWizard.jsx';
import DashboardSidebar from '@/components/DashboardSidebar.jsx';
import DashboardBreadcrumb from '@/components/dashboard/DashboardBreadcrumb.jsx';
import DashboardPageHeader from '@/components/dashboard/DashboardPageHeader.jsx';
import { EmptyState, LoadingSpinner } from '@/components/SharedUI.jsx';
import { motion, AnimatePresence } from 'framer-motion';

function OrganizationsPage() {
  const [organizations, setOrganizations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrg, setEditingOrg] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadData = () => {
      try {
        const storedOrgs = localStorage.getItem('virtho_organizations');
        if (storedOrgs) {
          setOrganizations(JSON.parse(storedOrgs));
        } else {
          const sampleData = [
            { id: '1', name: 'Acme Corp', description: 'A technology company.', category: 'Tech', createdAt: new Date().toISOString() },
            { id: '2', name: 'Global Health', description: 'Providing health services worldwide.', category: 'Healthcare', createdAt: new Date(Date.now() - 86400000).toISOString() },
          ];
          setOrganizations(sampleData);
          localStorage.setItem('virtho_organizations', JSON.stringify(sampleData));
        }
      } catch (error) {
        console.error('Error loading organizations:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    const timer = setTimeout(loadData, 500);
    return () => clearTimeout(timer);
  }, []);

  const saveOrganizations = (newOrgs) => {
    setOrganizations(newOrgs);
    localStorage.setItem('virtho_organizations', JSON.stringify(newOrgs));
  };

  const handleSaveOrganization = (orgData) => {
    if (editingOrg) {
      const updatedOrgs = organizations.map(org => org.id === orgData.id ? orgData : org);
      saveOrganizations(updatedOrgs);
      toast({ title: 'Success', description: 'Organization updated successfully.' });
    } else {
      const updatedOrgs = [orgData, ...organizations];
      saveOrganizations(updatedOrgs);
      toast({ title: 'Success', description: 'Organization added successfully.' });
    }
    setEditingOrg(null);
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this organization?')) {
      const updatedOrgs = organizations.filter(org => org.id !== id);
      saveOrganizations(updatedOrgs);
      toast({ title: 'Success', description: 'Organization deleted successfully.', variant: 'destructive' });
    }
  };

  const openAddModal = () => {
    setEditingOrg(null);
    setIsModalOpen(true);
  };

  const openEditModal = (org) => {
    setEditingOrg(org);
    setIsModalOpen(true);
  };

  const filteredOrganizations = useMemo(() => {
    return organizations.filter(org => {
      if (!searchTerm) return true;
      const lowerSearch = searchTerm.toLowerCase();
      return (
        org.name.toLowerCase().includes(lowerSearch) || 
        (org.description && org.description.toLowerCase().includes(lowerSearch))
      );
    });
  }, [organizations, searchTerm]);

  return (
    <>
      <Helmet><title>Organizations - Virtho Dashboard</title></Helmet>
      
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
                  <DashboardBreadcrumb pageName="Organizations" />
                </div>
              </div>
              
              <DashboardPageHeader
                title="Organizations"
                description="Manage your organizations effectively."
                buttonLabel="Add Organization"
                buttonAction={openAddModal}
                icon={Building2}
              />
            </div>
          </div>

          <div className="p-4 md:p-8 max-w-7xl mx-auto">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8">
              <div className="relative max-w-md w-full mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input 
                  placeholder="Search organizations..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 text-gray-900 border-gray-300 bg-gray-50 focus:bg-white"
                />
              </div>

              {isLoading ? (
                <div className="py-12 flex justify-center">
                  <LoadingSpinner message="Loading organizations..." />
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  {filteredOrganizations.length === 0 ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <EmptyState 
                        icon={Building2}
                        title="No organizations found"
                        description={searchTerm ? "Try adjusting your search terms." : "You haven't added any organizations yet."}
                        actionText={searchTerm ? "Clear Search" : "Add Organization"}
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
                          {filteredOrganizations.map((org) => (
                            <tr key={org.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                              <td className="py-4 px-4 font-bold text-gray-900">{org.name}</td>
                              <td className="py-4 px-4 font-medium text-purple-700">
                                {org.category ? (
                                  <span className="bg-purple-50 px-2.5 py-1 rounded-md text-xs">{org.category}</span>
                                ) : '-'}
                              </td>
                              <td className="py-4 px-4 text-gray-600 max-w-xs truncate">{org.description || '-'}</td>
                              <td className="py-4 px-4 text-gray-500 text-sm">
                                {new Date(org.createdAt).toLocaleDateString()}
                              </td>
                              <td className="py-4 px-4 text-right">
                                <div className="flex justify-end gap-2">
                                  <Button variant="ghost" size="sm" onClick={() => openEditModal(org)} className="text-blue-600 hover:text-blue-700 hover:bg-blue-50" aria-label={`Edit ${org.name}`}>
                                    <Edit2 className="w-4 h-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm" onClick={() => handleDelete(org.id)} className="text-red-600 hover:text-red-700 hover:bg-red-50" aria-label={`Delete ${org.name}`}>
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

      <AddOrganizationWizard 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={editingOrg}
        onSave={handleSaveOrganization}
      />
    </>
  );
}

export default OrganizationsPage;