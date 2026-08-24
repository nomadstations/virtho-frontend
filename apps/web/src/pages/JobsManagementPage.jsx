import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { Briefcase, Plus, Search, Edit2, Trash2, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import DashboardSidebar from '@/components/DashboardSidebar.jsx';
import DashboardBreadcrumb from '@/components/dashboard/DashboardBreadcrumb.jsx';
import DashboardPageHeader from '@/components/dashboard/DashboardPageHeader.jsx';
import { EmptyState, LoadingSpinner } from '@/components/SharedUI.jsx';
import { motion, AnimatePresence } from 'framer-motion';

function JobsManagementPage() {
  const { currentUser } = useAuth();
  const { toast } = useToast();

  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const loadData = () => {
      try {
        const storedJobs = localStorage.getItem('virtho_dashboard_jobs');
        if (storedJobs) {
          const allJobs = JSON.parse(storedJobs);
          // Filter jobs by current user
          const userJobs = allJobs.filter(job => job.ownerId === currentUser?.id);
          setJobs(userJobs);
        } else {
          // Create sample jobs for the current user
          const sampleData = [
            { 
              id: '1', 
              title: 'Senior React Developer', 
              description: 'Looking for an experienced React developer.', 
              category: 'Engineering',
              type: 'Full-time',
              location: 'Remote',
              ownerId: currentUser?.id,
              createdAt: new Date().toISOString() 
            },
            { 
              id: '2', 
              title: 'UX Designer', 
              description: 'Create intuitive user experiences.', 
              category: 'Design',
              type: 'Contract',
              location: 'New York, NY',
              ownerId: currentUser?.id,
              createdAt: new Date(Date.now() - 86400000).toISOString() 
            },
          ];
          setJobs(sampleData);
          localStorage.setItem('virtho_dashboard_jobs', JSON.stringify(sampleData));
        }
      } catch (error) {
        console.error('Error loading jobs:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    const timer = setTimeout(loadData, 500);
    return () => clearTimeout(timer);
  }, [currentUser]);

  const saveJobs = (newJobs) => {
    setJobs(newJobs);
    // Save all jobs (including other users' jobs) to localStorage
    const storedJobs = localStorage.getItem('virtho_dashboard_jobs');
    const allJobs = storedJobs ? JSON.parse(storedJobs) : [];
    const otherUsersJobs = allJobs.filter(job => job.ownerId !== currentUser?.id);
    const updatedAllJobs = [...otherUsersJobs, ...newJobs];
    localStorage.setItem('virtho_dashboard_jobs', JSON.stringify(updatedAllJobs));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      const updatedJobs = jobs.filter(job => job.id !== id);
      saveJobs(updatedJobs);
      toast({ title: 'Success', description: 'Job deleted successfully.', variant: 'destructive' });
    }
  };

  const handleEdit = (job) => {
    toast({ 
      title: '🚧 Edit Job', 
      description: 'Job editing functionality coming soon!' 
    });
  };

  const handleAddJob = () => {
    toast({ 
      title: '🚧 Post Job', 
      description: 'Job creation functionality coming soon! Use the Quick Actions menu to post jobs.' 
    });
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      if (!searchTerm) return true;
      const lowerSearch = searchTerm.toLowerCase();
      return (
        (job.title && job.title.toLowerCase().includes(lowerSearch)) || 
        (job.description && job.description.toLowerCase().includes(lowerSearch)) ||
        (job.category && job.category.toLowerCase().includes(lowerSearch))
      );
    });
  }, [jobs, searchTerm]);

  return (
    <>
      <Helmet>
        <title>Jobs Management - Dashboard</title>
        <meta name="description" content="Manage your job postings and track applications." />
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
                  <DashboardBreadcrumb pageName="Jobs" />
                </div>
              </div>
              
              <DashboardPageHeader
                title="Jobs"
                description="Manage your job postings effectively."
                buttonLabel="Post Job"
                buttonAction={handleAddJob}
                icon={Briefcase}
                buttonClassName="bg-indigo-600 hover:bg-indigo-700 text-white"
              />
            </div>
          </div>

          <div className="p-4 md:p-8 max-w-7xl mx-auto">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8">
              <div className="relative max-w-md w-full mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input 
                  placeholder="Search jobs..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 text-gray-900 border-gray-300 bg-gray-50 focus:bg-white"
                />
              </div>

              {isLoading ? (
                <div className="py-12 flex justify-center">
                  <LoadingSpinner message="Loading jobs..." />
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  {filteredJobs.length === 0 ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <EmptyState 
                        icon={Briefcase}
                        title="No jobs found"
                        description={searchTerm ? "Try adjusting your search terms." : "You haven't posted any jobs yet."}
                        actionText={searchTerm ? "Clear Search" : "Post Job"}
                        onAction={searchTerm ? () => setSearchTerm('') : handleAddJob}
                      />
                    </motion.div>
                  ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="overflow-x-auto rounded-lg border border-gray-100">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-gray-200 bg-gray-50/50">
                            <th className="py-4 px-4 font-semibold text-gray-700">Title</th>
                            <th className="py-4 px-4 font-semibold text-gray-700">Category</th>
                            <th className="py-4 px-4 font-semibold text-gray-700">Type</th>
                            <th className="py-4 px-4 font-semibold text-gray-700">Location</th>
                            <th className="py-4 px-4 font-semibold text-gray-700">Created Date</th>
                            <th className="py-4 px-4 font-semibold text-gray-700 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredJobs.map((job) => (
                            <tr key={job.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                              <td className="py-4 px-4 font-bold text-gray-900">{job.title}</td>
                              <td className="py-4 px-4 font-medium text-indigo-700">
                                {job.category ? (
                                  <span className="bg-indigo-50 px-2.5 py-1 rounded-md text-xs">{job.category}</span>
                                ) : '-'}
                              </td>
                              <td className="py-4 px-4 text-gray-600">{job.type || '-'}</td>
                              <td className="py-4 px-4 text-gray-600">{job.location || '-'}</td>
                              <td className="py-4 px-4 text-gray-500 text-sm">
                                {new Date(job.createdAt).toLocaleDateString()}
                              </td>
                              <td className="py-4 px-4 text-right">
                                <div className="flex justify-end gap-2">
                                  <Button variant="ghost" size="sm" onClick={() => handleEdit(job)} className="text-blue-600 hover:text-blue-700 hover:bg-blue-50" aria-label={`Edit ${job.title}`}>
                                    <Edit2 className="w-4 h-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm" onClick={() => handleDelete(job.id)} className="text-red-600 hover:text-red-700 hover:bg-red-50" aria-label={`Delete ${job.title}`}>
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
    </>
  );
}

export default JobsManagementPage;