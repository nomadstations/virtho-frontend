import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Save, Clock, Package, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useLanguageServiceOrders } from '@/hooks/useLanguageServiceOrders';
import { ORDER_STATUS } from '@/constants/languageServiceConfig';

function OrderStatusUpdateModal({ isOpen, onClose, order }) {
  const { toast } = useToast();
  const { updateOrderStatus } = useLanguageServiceOrders();

  const [selectedStatus, setSelectedStatus] = useState(order?.status || '');
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  React.useEffect(() => {
    if (order && isOpen) {
      setSelectedStatus(order.status);
      setNote('');
      setError('');
    }
  }, [order, isOpen]);

  if (!isOpen || !order) return null;

  // Get available status transitions
  const getAvailableStatuses = () => {
    const currentStatus = order.status;
    
    // Define allowed transitions
    const transitions = {
      'pending': ['in_progress', 'cancelled'],
      'in_progress': ['under_review', 'cancelled'],
      'under_review': ['completed', 'in_progress'],
      'completed': ['delivered'],
      'delivered': [], // Final state
      'cancelled': [], // Final state
    };

    const available = transitions[currentStatus] || [];
    
    return ORDER_STATUS.filter(status => 
      available.includes(status.value) || status.value === currentStatus
    );
  };

  const availableStatuses = getAvailableStatuses();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!selectedStatus) {
      setError('Please select a status');
      return;
    }

    if (selectedStatus === order.status && !note.trim()) {
      setError('Please add a note or select a different status');
      return;
    }

    setIsSubmitting(true);

    try {
      const statusNote = note.trim() || `Status updated to ${selectedStatus}`;
      
      updateOrderStatus(order.id, selectedStatus, statusNote);

      toast({
        title: 'Order status updated',
        description: `Order ${order.id} status changed to ${selectedStatus}`,
      });

      setNote('');
      onClose();
    } catch (err) {
      setError('Failed to update order status. Please try again.');
      toast({
        title: 'Error',
        description: 'Failed to update order status',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (!isSubmitting) {
      setNote('');
      setError('');
      setSelectedStatus(order.status);
      onClose();
    }
  };

  const getStatusIcon = (statusValue) => {
    switch (statusValue) {
      case 'pending':
        return Clock;
      case 'in_progress':
        return Package;
      case 'under_review':
        return Package;
      case 'completed':
        return CheckCircle;
      case 'delivered':
        return CheckCircle;
      case 'cancelled':
        return XCircle;
      default:
        return Clock;
    }
  };

  const currentStatusConfig = ORDER_STATUS.find(s => s.value === order.status);
  const selectedStatusConfig = ORDER_STATUS.find(s => s.value === selectedStatus);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Update Order Status</h2>
            <p className="text-sm text-gray-600 mt-1">Order ID: {order.id}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Current Status Display */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <Label className="text-sm text-gray-600 mb-2 block">Current Status</Label>
            {currentStatusConfig && (
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${currentStatusConfig.bgColor} flex items-center justify-center`}>
                  {React.createElement(getStatusIcon(currentStatusConfig.value), {
                    className: `w-5 h-5 ${currentStatusConfig.textColor}`
                  })}
                </div>
                <div>
                  <p className={`font-semibold ${currentStatusConfig.textColor}`}>
                    {currentStatusConfig.label}
                  </p>
                  <p className="text-sm text-gray-600">
                    {currentStatusConfig.description}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* New Status Selection */}
          <div>
            <Label htmlFor="status">New Status *</Label>
            <Select
              value={selectedStatus}
              onValueChange={(value) => {
                setSelectedStatus(value);
                setError('');
              }}
              disabled={isSubmitting || availableStatuses.length === 1}
            >
              <SelectTrigger className={error && !selectedStatus ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select new status" />
              </SelectTrigger>
              <SelectContent>
                {availableStatuses.map(status => (
                  <SelectItem key={status.value} value={status.value}>
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full ${status.bgColor} flex items-center justify-center`}>
                        {React.createElement(getStatusIcon(status.value), {
                          className: `w-3 h-3 ${status.textColor}`
                        })}
                      </div>
                      <span>{status.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {availableStatuses.length === 1 && (
              <p className="text-sm text-gray-500 mt-1">
                This order has reached a final status and cannot be changed.
              </p>
            )}
          </div>

          {/* Status Preview */}
          {selectedStatus && selectedStatus !== order.status && selectedStatusConfig && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <Label className="text-sm text-blue-900 mb-2 block">New Status Preview</Label>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${selectedStatusConfig.bgColor} flex items-center justify-center`}>
                  {React.createElement(getStatusIcon(selectedStatusConfig.value), {
                    className: `w-5 h-5 ${selectedStatusConfig.textColor}`
                  })}
                </div>
                <div>
                  <p className={`font-semibold ${selectedStatusConfig.textColor}`}>
                    {selectedStatusConfig.label}
                  </p>
                  <p className="text-sm text-blue-700">
                    {selectedStatusConfig.description}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Note */}
          <div>
            <Label htmlFor="note">Status Update Note {selectedStatus !== order.status && '*'}</Label>
            <Textarea
              id="note"
              value={note}
              onChange={(e) => {
                setNote(e.target.value);
                setError('');
              }}
              placeholder="Add a note about this status update (e.g., 'Translation completed and quality checked')"
              rows={4}
              disabled={isSubmitting}
              className="resize-none"
            />
            <p className="text-sm text-gray-500 mt-1">
              This note will be added to the order timeline and visible to the customer.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || availableStatuses.length === 1}
              className="bg-blue-600 hover:bg-blue-700 text-white min-w-32"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  />
                  Updating...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Update Status
                </span>
              )}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default OrderStatusUpdateModal;