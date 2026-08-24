import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit, Trash2, Eye, FolderKanban, Filter, Calendar, Tag, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import ProjectCreationModal from '@/components/ProjectCreationModal';
import { useProjectCreationModal } from '@/hooks/useProjectCreationModal';

/**
 * ✅ UPDATED: Now filters projects to show only user's own projects
 * 
 * CRITICAL CHANGES:
 * - Uses getUserProjects() from AuthContext to get user-specific projects
 * - Only displays projects where ownerId matches currentUser.id
 * - Shows "My Projects" instead of "All Projects" to clarify scope
 * - Empty state encourages user to create their first project
 */
export default function ProjectManagementSection() {
  const { currentUser, getUserProjects, deleteProject } = useAuth();
  const { toast } = useToast();
  const projectModal = useProjectCreationModal();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [projects, setProjects] = useState([]);

  /**
   * ✅ CRITICAL: Load only user's projects
   * Uses getUserProjects() which filters by ownerId
   */
  useEffect(() => {
    loadUserProjects();
    
    // Listen for project creation events
    const handleProjectCreated = () => {
      loadUserProjects();
    };
    
    window.addEventListener('projectCreated', handleProjectCreated);
    
    return () => {
      window.removeEventListener('projectCreated', handleProjectCreated);
    };
  }, []);

  const loadUserProjects = () => {
    const userProjects = getUserProjects(); // ✅ Only gets projects owned by current user
    console.log('[ProjectManagementSection] Loaded user projects:', userProjects.length);
    setProjects(userProjects);
  };

  // Filter projects based on search and status
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || project.status?.toLowerCase() === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleDeleteProject = (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteProject(projectId);
      loadUserProjects();
      toast({
        title: 'Project Deleted',
        description: 'The project has been successfully deleted.',
      });
    }
  };

  const getStatusBadgeColor = (status) => {
    const statusLower = status?.toLowerCase();
    switch (statusLower) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'archived':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center">
                <FolderKanban className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">My Projects</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Manage your personal projects ({filteredProjects.length} {filterStatus !== 'all' ? filterStatus : 'total'})
                </p>
              </div>
            </div>
            <Button
              onClick={() => projectModal.openModal()}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Project
            </Button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="p-6 border-b border-gray-100 bg-gray-50">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('all')}
                size="sm"
              >
                All
              </Button>
              <Button
                variant={filterStatus === 'active' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('active')}
                size="sm"
              >
                Active
              </Button>
              <Button
                variant={filterStatus === 'draft' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('draft')}
                size="sm"
              >
                Draft
              </Button>
              <Button
                variant={filterStatus === 'archived' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('archived')}
                size="sm"
              >
                Archived
              </Button>
            </div>
          </div>
        </div>

        {/* Projects List */}
        <div className="p-6">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <FolderKanban className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {searchQuery || filterStatus !== 'all' ? 'No projects found' : 'No projects yet'}
              </h3>
              <p className="text-gray-600 mb-6">
                {searchQuery || filterStatus !== 'all' 
                  ? 'Try adjusting your search or filters'
                  : 'Create your first project to get started'}
              </p>
              <Button
                onClick={() => projectModal.openModal()}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Project
              </Button>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        {project.image && (
                          <img
                            src={project.image}
                            alt={project.name || project.title}
                            className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                          />
                        )}
                        <div className="min-w-0">
                          <h3 className="text-lg font-semibold text-gray-900 truncate">
                            {project.name || project.title}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {project.description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-3 mt-3">
                        <Badge variant="outline" className={getStatusBadgeColor(project.status)}>
                          {project.status || 'Draft'}
                        </Badge>
                        
                        {project.category && (
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Tag className="w-4 h-4" />
                            {project.category}
                          </div>
                        )}
                        
                        {project.createdDate && (
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            {new Date(project.createdDate).toLocaleDateString()}
                          </div>
                        )}
                        
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <User className="w-4 h-4" />
                          {currentUser?.name}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toast({ title: '🚧 View Project', description: 'Project details view coming soon!' })}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toast({ title: '🚧 Edit Project', description: 'Project editing coming soon!' })}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteProject(project.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
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