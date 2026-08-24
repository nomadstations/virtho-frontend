import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Plus, Search, Edit2, Trash2, Menu, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import DashboardBreadcrumb from '@/components/DashboardBreadcrumb';
import ModalWrapper from '@/components/common/ModalWrapper';
import AddCommunityModal from '@/components/AddCommunityModal';
import { useCommunityCreationModal } from '@/hooks/useCommunityCreationModal';
import { LoadingSpinner, EmptyState } from '@/components/SharedUI';
import DashboardSidebar from '@/components/DashboardSidebar';

function CommunityPage() {
  const [communities, setCommunities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, communityId: null, communityName: '' });
  const { toast } = useToast();

  const {
    isOpen,
    openModal,
    closeModal,
    formData,
    errors,
    isSubmitting,
    handleInputChange,
    handleImageUpload,
    handleSubmit,
    constants,
  } = useCommunityCreationModal();

  // Sample communities data
  const sampleCommunities = [
    {
      id: 'community-001',
      name: 'Tech Innovators Network',
      category: 'Technology',
      type: 'Network',
      description: 'A global network of technology innovators and entrepreneurs driving digital transformation',
      location: 'Global',
      memberCount: 1250,
      createdDate: '2026-01-15',
    },
    {
      id: 'community-002',
      name: 'Green Business Alliance',
      category: 'Business',
      type: 'Association',
      description: 'Business leaders committed to sustainable practices and environmental responsibility',
      location: 'North America',
      memberCount: 450,
      createdDate: '2026-02-20',
    },
    {
      id: 'community-003',
      name: 'Digital Education Hub',
      category: 'Education',
      type: 'Organization',
      description: 'Transforming education through innovative digital learning solutions and methodologies',
      location: 'Europe',
      memberCount: 780,
      createdDate: '2026-03-10',
    },
    {
      id: 'community-004',
      name: 'Healthcare Innovation Forum',
      category: 'Health',
      type: 'Group',
      description: 'Medical professionals and technologists collaborating on healthcare innovations',
      location: 'Asia',
      memberCount: 620,
      createdDate: '2026-01-28',
    },
    {
      id: 'community-005',
      name: 'Climate Action Collective',
      category: 'Environment',
      type: 'Network',
      description: 'Environmental activists and scientists working together on climate solutions',
      location: 'Global',
      memberCount: 2100,
      createdDate: '2026-04-05',
    },
    {
      id: 'community-006',
      name: 'Creative Arts Alliance',
      category: 'Arts & Culture',
      type: 'Association',
      description: 'Artists, musicians, and cultural creators promoting artistic expression and collaboration',
      location: 'South America',
      memberCount: 340,
      createdDate: '2026-02-12',
    },
    {
      id: 'community-007',
      name: 'Science Research Consortium',
      category: 'Science',
      type: 'Organization',
      description: 'Research scientists and institutions advancing scientific discovery and knowledge',
      location: 'Global',
      memberCount: 890,
      createdDate: '2026-03-22',
    },
    {
      id: 'community-008',
      name: 'Community Service Network',
      category: 'Community Service',
      type: 'Group',
      description: 'Volunteers and organizations dedicated to local community service and social impact',
      location: 'Australia and Oceania',
      memberCount: 560,
      createdDate: '2026-01-18',
    },
  ];

  // Load communities
  const loadCommunities = () => {
    try {
      setIsLoading(true);
      setError(null);
      const storedCommunities = localStorage.getItem('virtho_communities_table');
      
      if (storedCommunities) {
        setCommunities(JSON.parse(storedCommunities));
      } else {
        setCommunities(sampleCommunities);
        localStorage.setItem('virtho_communities_table', JSON.stringify(sampleCommunities));
      }
    } catch (err) {
      console.error('Error loading communities:', err);
      setError('Failed to load communities. Please try again.');
    } finally {
      setTimeout(() => setIsLoading(false), 600);
    }
  };

  // Initial load
  useEffect(() => {
    loadCommunities();
  }, []);

  // Listen for community creation events
  useEffect(() => {
    const handleCommunityCreated = () => {
      loadCommunities();
    };

    window.addEventListener('communityCreated', handleCommunityCreated);
    return () => window.removeEventListener('communityCreated', handleCommunityCreated);
  }, []);

  // Handle delete confirmation
  const handleDeleteClick = (community) => {
    setDeleteConfirm({
      isOpen: true,
      communityId: community.id,
      communityName: community.name,
    });
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm({ isOpen: false, communityId: null, communityName: '' });
  };

  const handleDeleteConfirm = () => {
    try {
      const updatedCommunities = communities.filter(c => c.id !== deleteConfirm.communityId);
      setCommunities(updatedCommunities);
      localStorage.setItem('virtho_communities_table', JSON.stringify(updatedCommunities));
      
      toast({
        title: 'Community Deleted',
        description: `"${deleteConfirm.communityName}" has been successfully deleted.`,
      });

      setDeleteConfirm({ isOpen: false, communityId: null, communityName: '' });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to delete community. Please try again.',
        variant: 'destructive',
      });
    }
  };

  // Handle edit
  const handleEdit = (community) => {
    toast({
      title: '🚧 Coming Soon',
      description: 'Community editing functionality will be available in the next update!',
    });
  };

  // Filter communities
  const filteredCommunities = communities.filter(community => {
    if (!searchTerm) return true;
    const lowerSearch = searchTerm.toLowerCase();
    return (
      community.name.toLowerCase().includes(lowerSearch) ||
      community.category.toLowerCase().includes(lowerSearch) ||
      community.description.toLowerCase().includes(lowerSearch)
    );
  });

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Get category badge color
  const getCategoryColor = (category) => {
    const colors = {
      Technology: 'category-badge-engineering',
      Business: 'category-badge-marketing',
      Education: 'category-badge-design',
      Health: 'category-badge-finance',
      Environment: 'category-badge-design',
      'Arts & Culture': 'category-badge-product',
      'Sports & Recreation': 'category-badge-personal',
      'Social Impact': 'category-badge-product',
      Science: 'category-badge-data-science',
      'Community Service': 'category-badge-personal',
    };
    return colors[category] || 'category-badge-default';
  };

  return (
    <>
      <Helmet>
        <title>Community - Virtho Dashboard</title>
        <meta name="description" content="Manage your communities and member groups" />
      </Helmet>

      <div className="flex w-full bg-gray-50 min-h-[calc(100vh-5rem)]">
        <DashboardSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        <main className="flex-1 w-full overflow-x-hidden overflow-y-auto">
          {/* Header Section */}
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
                  <DashboardBreadcrumb />
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-start gap-4">
                  <div className="bg-teal-100 p-3 rounded-xl">
                    <Users className="h-7 w-7 text-teal-600" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">Community</h1>
                    <p className="text-gray-600">Manage your communities and member groups.</p>
                  </div>
                </div>
                <Button 
                  onClick={openModal} 
                  className="bg-teal-600 hover:bg-teal-700 text-white shadow-sm w-full md:w-auto"
                >
                  <Plus className="w-5 h-5 mr-2" /> Add Community
                </Button>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-4 md:p-8 max-w-7xl mx-auto">
            {/* Search Bar */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
              <div className="relative max-w-md w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search communities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 text-gray-900 border-gray-300 bg-gray-50 focus:bg-white"
                />
              </div>
            </div>

            {/* Main Content */}
            {isLoading ? (
              <div className="py-12">
                <LoadingSpinner message="Loading communities..." />
              </div>
            ) : error ? (
              <div className="bg-white rounded-xl border border-red-200 shadow-sm p-8 text-center">
                <div className="bg-red-50 p-5 rounded-full mb-5 inline-flex">
                  <AlertCircle className="h-12 w-12 text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Error Loading Communities</h3>
                <p className="text-gray-600 mb-6">{error}</p>
                <Button onClick={loadCommunities} className="bg-teal-600 hover:bg-teal-700 text-white">
                  Try Again
                </Button>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                {filteredCommunities.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <EmptyState
                      icon={Users}
                      title={searchTerm ? 'No communities found' : 'No communities yet'}
                      description={
                        searchTerm
                          ? 'Try adjusting your search terms.'
                          : 'Create your first community to get started.'
                      }
                      actionText={searchTerm ? 'Clear Search' : 'Add Community'}
                      onAction={searchTerm ? () => setSearchTerm('') : openModal}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="table"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Desktop Table */}
                    <div className="hidden lg:block bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-200 bg-gray-50">
                              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Name</th>
                              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Category</th>
                              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Description</th>
                              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Created Date</th>
                              <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredCommunities.map((community, index) => (
                              <motion.tr
                                key={community.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.03 }}
                                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                              >
                                <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                                  {community.name}
                                </td>
                                <td className="px-6 py-4">
                                  <span className={`${getCategoryColor(community.category)} px-3 py-1 rounded-full text-xs font-semibold`}>
                                    {community.category}
                                  </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600 max-w-md">
                                  <span className="line-clamp-2">{community.description}</span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                  {formatDate(community.createdDate)}
                                </td>
                                <td className="px-6 py-4 text-right">
                                  <div className="flex items-center justify-end gap-2">
                                    <button
                                      onClick={() => handleEdit(community)}
                                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                      aria-label={`Edit ${community.name}`}
                                    >
                                      <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteClick(community)}
                                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                      aria-label={`Delete ${community.name}`}
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </td>
                              </motion.tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Tablet/Mobile Cards */}
                    <div className="lg:hidden space-y-4">
                      {filteredCommunities.map((community, index) => (
                        <motion.div
                          key={community.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.03 }}
                          className="bg-white rounded-xl border border-gray-200 shadow-sm p-5"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-gray-900 mb-2">{community.name}</h3>
                              <span className={`${getCategoryColor(community.category)} px-3 py-1 rounded-full text-xs font-semibold inline-block`}>
                                {community.category}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                              <button
                                onClick={() => handleEdit(community)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                aria-label={`Edit ${community.name}`}
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteClick(community)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                aria-label={`Delete ${community.name}`}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{community.description}</p>
                          <div className="text-xs text-gray-500">
                            Created: {formatDate(community.createdDate)}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        </main>
      </div>

      {/* Delete Confirmation Dialog */}
      {deleteConfirm.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-red-100 p-3 rounded-full">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1">Delete Community</h3>
                <p className="text-gray-600">
                  Are you sure you want to delete <span className="font-semibold">"{deleteConfirm.communityName}"</span>? This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3">
              <Button
                variant="outline"
                onClick={handleDeleteCancel}
                className="text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteConfirm}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Delete
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Community Creation Modal with ModalWrapper */}
      <ModalWrapper isOpen={isOpen} onClose={closeModal}>
        <AddCommunityModal
          isOpen={isOpen}
          onClose={closeModal}
          formData={formData}
          errors={errors}
          isSubmitting={isSubmitting}
          onInputChange={handleInputChange}
          onImageUpload={handleImageUpload}
          onSubmit={handleSubmit}
          constants={constants}
        />
      </ModalWrapper>
    </>
  );
}

export default CommunityPage;