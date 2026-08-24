import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ClipboardList, ShoppingCart, Clock, CheckCircle, XCircle, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardBreadcrumb from '@/components/DashboardBreadcrumb';
import DashboardPageHeader from '@/components/dashboard/DashboardPageHeader';
import LanguageServiceOrderTable from '@/components/LanguageServiceOrderTable';
import OrderDetailsModal from '@/components/modals/OrderDetailsModal';
import { useLanguageServiceOrders } from '@/hooks/useLanguageServiceOrders';

function LanguageServiceOrdersManagementPage() {
  const { getUserOrders, getStatistics } = useLanguageServiceOrders();
  const orders = getUserOrders();
  const stats = getStatistics();

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowDetailsModal(true);
  };

  const handleUpdateStatus = (order) => {
    // This would open a status update modal - for now just log
    console.log('Update status for order:', order.id);
  };

  const statisticsCards = [
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Pending',
      value: stats.pendingOrders,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      title: 'In Progress',
      value: stats.inProgressOrders,
      icon: Package,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Completed',
      value: stats.completedOrders,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Cancelled',
      value: stats.cancelledOrders,
      icon: XCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Language Service Orders | Dashboard | Virtho Foundation</title>
        <meta name="description" content="Manage orders for your language services" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <DashboardBreadcrumb />

          <DashboardPageHeader
            title="Language Service Orders"
            description="Manage orders for your language services"
            icon={ClipboardList}
          />

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8 mt-8">
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

          {/* Orders Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl shadow-md border border-gray-100 p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">Your Orders</h2>
            
            {orders.length === 0 ? (
              <div className="text-center py-16">
                <ClipboardList className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  No orders yet
                </h3>
                <p className="text-gray-600">
                  When customers order your services, they will appear here.
                </p>
              </div>
            ) : (
              <LanguageServiceOrderTable
                orders={orders}
                onViewDetails={handleViewDetails}
                onUpdateStatus={handleUpdateStatus}
              />
            )}
          </motion.div>
        </div>
      </div>

      {/* Order Details Modal */}
      <OrderDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        order={selectedOrder}
      />
    </>
  );
}

export default LanguageServiceOrdersManagementPage;