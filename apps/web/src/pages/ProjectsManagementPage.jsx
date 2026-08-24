import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { FolderKanban, Plus, Search, Edit2, Trash2, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import ProjectCreationModal from '@/components/ProjectCreationModal';
import { useProjectCreationModal } from '@/hooks/useProjectCreationModal';
import DashboardSidebar from '@/components/DashboardSidebar.jsx';
import DashboardBreadcrumb from '@/components/dashboard/DashboardBreadcrumb.jsx';
import DashboardPageHeader from '@/components/dashboard/DashboardPageHeader.jsx';
import { EmptyState, LoadingSpinner } from '@/components/SharedUI.jsx';
import { motion, AnimatePresence } from 'framer-motion';

function ProjectsManagementPage() {
  const { currentUser, getUserProjects, deleteProject } = useAuth();
  const { toast } = useToast();
  const projectModal = useProjectCreationModal();

  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const loadData = () => {
      try {
        const userProjects = getUserProjects();
        setProjects(userProjects);
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    const timer = setTimeout(loadData, 500);
    return () => clearTimeout(timer);
  }, [getUserProjects]);

  // Reload projects when a new one is created
  useEffect(() => {
    const handleProjectCreated = () => {
      const userProjects = getUserProjects();
      setProjects(userProjects);
    };
    
    window.addEventListener('projectCreated', handleProjectCreated);
    return () => {
      window.removeEventListener('projectCreated', handleProjectCreated);
    };
  }, [getUserProjects]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteProject(id);
      const userProjects = getUserProjects();
      setProjects(userProjects);
      toast({ title: 'Success', description: 'Project deleted successfully.', variant: 'destructive' });
    }
  };

  const handleEdit = (project) => {
    toast({ 
      title: '🚧 Edit Project', 
      description: 'Project editing functionality coming soon!' 
    });
  };

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      if (!searchTerm) return true;
      const lowerSearch = searchTerm.toLowerCase();
      return (
        (project.name && project.name.toLowerCase().includes(lowerSearch)) || 
        (project.title && project.title.toLowerCase().includes(lowerSearch)) ||
        (project.description && project.description.toLowerCase().includes(lowerSearch)) ||
        (project.category && project.category.toLowerCase().includes(lowerSearch))
      );
    });
  }, [projects, searchTerm]);

  return (
    <>
      <Helmet>
        <title>Projects Management - Dashboard</title>
        <meta name="description" content="Manage your projects, create new projects, and track project progress." />
      </Helmet>

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
                  <DashboardBreadcrumb pageName="Projects" />
                </div>
              </div>
              
              <DashboardPageHeader
                title="Projects"
                description="Manage your projects effectively."
                buttonLabel="Add Project"
                buttonAction={() => projectModal.openModal()}
                icon={FolderKanban}
              />
            </div>
          </div>

          <div className="p-4 md:p-8 max-w-7xl mx-auto">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8">
              <div className="relative max-w-md w-full mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input 
                  placeholder="Search projects..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 text-gray-900 border-gray-300 bg-gray-50 focus:bg-white"
                />
              </div>

              {isLoading ? (
                <div className="py-12 flex justify-center">
                  <LoadingSpinner message="Loading projects..." />
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  {filteredProjects.length === 0 ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <EmptyState 
                        icon={FolderKanban}
                        title="No projects found"
                        description={searchTerm ? "Try adjusting your search terms." : "You haven't created any projects yet."}
                        actionText={searchTerm ? "Clear Search" : "Add Project"}
                        onAction={searchTerm ? () => setSearchTerm('') : () => projectModal.openModal()}
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
                          {filteredProjects.map((project) => (
                            <tr key={project.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                              <td className="py-4 px-4 font-bold text-gray-900">{project.name || project.title}</td>
                              <td className="py-4 px-4 font-medium text-purple-700">
                                {project.category ? (
                                  <span className="bg-purple-50 px-2.5 py-1 rounded-md text-xs capitalize">
                                    {project.category.replace(/-/g, ' ')}
                                  </span>
                                ) : '-'}
                              </td>
                              <td className="py-4 px-4 text-gray-600 max-w-xs truncate">{project.description || '-'}</td>
                              <td className="py-4 px-4 text-gray-500 text-sm">
                                {project.createdDate ? new Date(project.createdDate).toLocaleDateString() : '-'}
                              </td>
                              <td className="py-4 px-4 text-right">
                                <div className="flex justify-end gap-2">
                                  <Button variant="ghost" size="sm" onClick={() => handleEdit(project)} className="text-blue-600 hover:text-blue-700 hover:bg-blue-50" aria-label={`Edit ${project.name || project.title}`}>
                                    <Edit2 className="w-4 h-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm" onClick={() => handleDelete(project.id)} className="text-red-600 hover:text-red-700 hover:bg-red-50" aria-label={`Delete ${project.name || project.title}`}>
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

      {/* Project Creation Modal */}
      <ProjectCreationModal
        isOpen={projectModal.isOpen}
        onClose={projectModal.closeModal}
        formData={projectModal.formData}
        errors={projectModal.errors}
        isSubmitting={projectModal.isSubmitting}
        onInputChange={projectModal.handleInputChange}
        onImageUpload={projectModal.handleImageUpload}
        onSubmit={projectModal.handleSubmit}
        constants={projectModal.constants}
      />
    </>
  );
}

export default ProjectsManagementPage;