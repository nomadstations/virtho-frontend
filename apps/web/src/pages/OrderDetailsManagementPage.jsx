import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Mail, Phone, CheckCircle, XCircle, FileText, Calendar, DollarSign, MessageSquare, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import DashboardBreadcrumb from '@/components/DashboardBreadcrumb';
import DashboardPageHeader from '@/components/dashboard/DashboardPageHeader';
import OrderStatusUpdateModal from '@/components/modals/OrderStatusUpdateModal';
import { useLanguageServiceOrders } from '@/hooks/useLanguageServiceOrders';
import { useToast } from '@/hooks/use-toast';
import { ORDER_STATUS } from '@/constants/languageServiceConfig';
import { formatCurrency } from '@/api/EcommerceApi';

function OrderDetailsManagementPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getOrderById, updateOrderStatus } = useLanguageServiceOrders();
  
  const order = getOrderById(orderId);
  const [newNote, setNewNote] = useState('');
  const [showStatusModal, setShowStatusModal] = useState(false);

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h2>
          <p className="text-gray-600 mb-6">The order you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/dashboard/language-services/orders')}>
            Back to Orders
          </Button>
        </div>
      </div>
    );
  }

  const statusConfig = ORDER_STATUS.find(s => s.value === order.status);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (amount, currency = 'USD') => {
    return formatCurrency(amount * 100, { code: currency, symbol: '$', template: '$1' });
  };

  const handleMarkAsCompleted = () => {
    updateOrderStatus(orderId, 'completed', 'Order marked as completed by provider');
    toast({
      title: 'Order status updated',
      description: 'Order has been marked as completed.',
    });
  };

  const handleCancelOrder = () => {
    if (confirm('Are you sure you want to cancel this order?')) {
      updateOrderStatus(orderId, 'cancelled', 'Order cancelled by provider');
      toast({
        title: 'Order cancelled',
        description: 'The order has been cancelled.',
      });
    }
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      // In a real app, you would add the note to the order
      toast({
        title: 'Note added',
        description: 'Your note has been added to the order.',
      });
      setNewNote('');
    }
  };

  return (
    <>
      <Helmet>
        <title>Order {order.id} | Dashboard | Virtho Foundation</title>
        <meta name="description" content="View and manage order details" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <DashboardBreadcrumb customCrumbs={[
            { label: 'Dashboard', path: '/dashboard' },
            { label: 'Language Service Orders', path: '/dashboard/language-services/orders' },
            { label: order.id, path: `/dashboard/language-services/orders/${orderId}` }
          ]} />

          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard/language-services/orders')}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Orders
          </Button>

          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Order Details</h1>
              <div className="flex items-center gap-4">
                <p className="text-gray-600 font-mono text-sm">Order ID: {order.id}</p>
                {statusConfig && (
                  <Badge className={`${statusConfig.bgColor} ${statusConfig.textColor}`}>
                    {statusConfig.label}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-md border border-gray-100 p-6"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">Order Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Order Date</p>
                    <p className="font-semibold text-gray-900">{formatDate(order.orderDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Delivery Date</p>
                    <p className="font-semibold text-gray-900">{formatDate(order.deliveryDate)}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-600 mb-1">Service</p>
                    <p className="font-semibold text-gray-900">{order.serviceName}</p>
                  </div>
                </div>
              </motion.div>

              {/* Buyer Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl shadow-md border border-gray-100 p-6"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">Buyer Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Name</p>
                      <p className="font-semibold text-gray-900">{order.customerName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-semibold text-gray-900">{order.customerEmail}</p>
                    </div>
                  </div>
                  {order.customerPhone && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="font-semibold text-gray-900">{order.customerPhone}</p>
                      </div>
                    </div>
                  )}
                  <div className="pt-3 border-t border-gray-200">
                    <Button variant="outline" className="w-full">
                      View Buyer Profile
                    </Button>
                  </div>
                </div>
              </motion.div>

              {/* Order Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-md border border-gray-100 p-6"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">Order Content</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Source Language</p>
                    <p className="font-semibold text-gray-900 uppercase">{order.sourceLanguage}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Target Language</p>
                    <p className="font-semibold text-gray-900 uppercase">{order.targetLanguage}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Content Type</p>
                    <p className="font-semibold text-gray-900 capitalize">{order.contentType || 'Text'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Word Count</p>
                    <p className="font-semibold text-gray-900">{order.wordCount || 'N/A'}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Content Preview</p>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-gray-700 text-sm leading-relaxed max-h-40 overflow-y-auto">
                    {order.content ? (order.content.length > 300 ? order.content.substring(0, 300) + '...' : order.content) : 'No content preview available'}
                  </div>
                </div>
                {order.specialRequirements && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">Special Requirements</p>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-900 text-sm leading-relaxed">
                      {order.specialRequirements}
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Order Timeline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl shadow-md border border-gray-100 p-6"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">Order Timeline</h3>
                <div className="space-y-4">
                  {(order.timeline || []).map((event, index) => {
                    const eventStatusConfig = ORDER_STATUS.find(s => s.value === event.status);
                    return (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-3 h-3 rounded-full ${eventStatusConfig?.bgColor || 'bg-gray-300'}`}></div>
                          {index < (order.timeline || []).length - 1 && (
                            <div className="w-0.5 h-full bg-gray-200 mt-1"></div>
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex items-center gap-2 mb-1">
                            {eventStatusConfig && (
                              <Badge className={`${eventStatusConfig.bgColor} ${eventStatusConfig.textColor} text-xs`}>
                                {eventStatusConfig.label}
                              </Badge>
                            )}
                            <span className="text-xs text-gray-500">{formatDate(event.date)}</span>
                          </div>
                          {event.note && (
                            <p className="text-sm text-gray-600 mt-1">{event.note}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Notes & Communication */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-xl shadow-md border border-gray-100 p-6"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">Notes & Communication</h3>
                <div className="space-y-4">
                  <div>
                    <Textarea
                      placeholder="Add a note to this order..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      rows={3}
                      className="resize-none"
                    />
                    <Button 
                      onClick={handleAddNote}
                      className="mt-2"
                      disabled={!newNote.trim()}
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Add Note
                    </Button>
                  </div>
                  {order.notes && order.notes.length > 0 && (
                    <div className="space-y-3 pt-4 border-t border-gray-200">
                      {order.notes.map((note, index) => (
                        <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-gray-900">{note.author || 'System'}</span>
                            <span className="text-xs text-gray-500">{formatDate(note.timestamp)}</span>
                          </div>
                          <p className="text-sm text-gray-700">{note.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Order Actions */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-xl shadow-md border border-gray-100 p-6"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Order Actions</h3>
                  <div className="space-y-3">
                    <Button 
                      onClick={() => setShowStatusModal(true)}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Update Status
                    </Button>
                    {order.status !== 'completed' && order.status !== 'delivered' && (
                      <Button 
                        onClick={handleMarkAsCompleted}
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Mark as Completed
                      </Button>
                    )}
                    {order.status !== 'cancelled' && order.status !== 'completed' && order.status !== 'delivered' && (
                      <Button 
                        onClick={handleCancelOrder}
                        variant="destructive"
                        className="w-full"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Cancel Order
                      </Button>
                    )}
                  </div>
                </motion.div>

                {/* Payment Information */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-xl shadow-md border border-gray-100 p-6"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Payment Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Base Price</span>
                      <span className="font-semibold text-gray-900">{formatPrice(order.pricePerUnit, order.currency)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Quantity</span>
                      <span className="font-semibold text-gray-900">{order.wordCount} words</span>
                    </div>
                    <div className="pt-3 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-900">Total</span>
                        <span className="text-2xl font-extrabold text-green-600">{formatPrice(order.totalPrice, order.currency)}</span>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Payment Status</span>
                        <Badge className={
                          order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                          order.paymentStatus === 'refunded' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }>
                          {order.paymentStatus ? order.paymentStatus.toUpperCase() : 'PENDING'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Update Modal */}
      <OrderStatusUpdateModal
        isOpen={showStatusModal}
        onClose={() => setShowStatusModal(false)}
        order={order}
      />
    </>
  );
}

export default OrderDetailsManagementPage;