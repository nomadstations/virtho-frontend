import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Globe, Plus, TrendingUp, Star, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardBreadcrumb from '@/components/DashboardBreadcrumb';
import DashboardPageHeader from '@/components/dashboard/DashboardPageHeader';
import LanguageServiceTable from '@/components/LanguageServiceTable';
import EditLanguageServiceModal from '@/components/modals/EditLanguageServiceModal';
import ConfirmDeleteModal from '@/components/modals/ConfirmDeleteModal';
import { useLanguageServices } from '@/hooks/useLanguageServices';
import { useToast } from '@/hooks/use-toast';

function LanguageServicesManagementPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getUserServices, getStatistics, deleteService } = useLanguageServices();
  const userServices = getUserServices();
  const stats = getStatistics();

  const [editingService, setEditingService] = useState(null);
  const [deletingService, setDeletingService] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = (service) => {
    navigate(`/dashboard/language-services/${service.id}`);
  };

  const handleDeleteClick = (serviceId) => {
    const service = userServices.find(s => s.id === serviceId);
    setDeletingService(service);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingService) return;

    setIsDeleting(true);
    try {
      await deleteService(deletingService.id);
      
      toast({
        title: 'Service deleted successfully',
        description: `${deletingService.name} has been removed.`,
      });
      
      setDeletingService(null);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete service. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const statisticsCards = [
    {
      title: 'Total Services',
      value: stats.totalServices,
      icon: Globe,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Active Services',
      value: stats.activeServices,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: ShoppingBag,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Average Rating',
      value: stats.averageRating,
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Language Services Management | Dashboard | Virtho Foundation</title>
        <meta name="description" content="Manage your language services and view performance metrics" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <DashboardBreadcrumb />

          <DashboardPageHeader
            title="Language Services"
            description="Manage your language services and view performance"
            buttonLabel="Create Service"
            buttonAction={() => navigate('/dashboard/language-services/create')}
            icon={Globe}
            buttonClassName="bg-blue-600 hover:bg-blue-700 text-white"
          />

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 mt-8">
            {statisticsCards.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </CardTitle>
                    <div className={`w-10 h-10 rounded-full ${stat.bgColor} flex items-center justify-center`}>
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-extrabold text-gray-900">
                      {stat.value}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Services Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-md border border-gray-100 p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">Your Language Services</h2>
            
            {userServices.length === 0 ? (
              <div className="text-center py-16">
                <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  No language services yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Create your first service to get started
                </p>
                <Button
                  onClick={() => navigate('/dashboard/language-services/create')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Service
                </Button>
              </div>
            ) : (
              <LanguageServiceTable
                services={userServices}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
              />
            )}
          </motion.div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={!!deletingService}
        onClose={() => !isDeleting && setDeletingService(null)}
        onConfirm={handleDeleteConfirm}
        serviceName={deletingService?.name || ''}
        hasAssociatedOrders={deletingService?.totalOrders > 0}
        isLoading={isDeleting}
      />
    </>
  );
}

export default LanguageServicesManagementPage;