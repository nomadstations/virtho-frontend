import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

function ConfirmDeleteModal({ isOpen, onClose, onConfirm, serviceName, hasAssociatedOrders = false, isLoading = false }) {
  const [confirmChecked, setConfirmChecked] = useState(false);
  const [error, setError] = useState('');

  const handleConfirm = async () => {
    if (!confirmChecked) {
      setError('Please confirm by checking the box below');
      return;
    }

    try {
      setError('');
      await onConfirm();
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to delete service. Please try again.');
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setConfirmChecked(false);
      setError('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-xl shadow-2xl max-w-md w-full"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Delete Service</h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              disabled={isLoading}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <p className="text-gray-700 font-medium">
                Are you sure you want to delete this service?
              </p>
              <p className="text-sm text-gray-500">
                This action cannot be undone.
              </p>
            </div>

            {/* Service Name Display */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Service Name:</p>
              <p className="text-lg font-bold text-gray-900">{serviceName}</p>
            </div>

            {/* Associated Orders Warning */}
            {hasAssociatedOrders && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-yellow-900">
                    Warning: This service has associated orders
                  </p>
                  <p className="text-sm text-yellow-700">
                    Deleting this service will not affect existing orders, but customers will no longer be able to place new orders for this service.
                  </p>
                </div>
              </div>
            )}

            {/* Confirmation Checkbox */}
            <div className="flex items-start gap-3 bg-gray-50 border border-gray-200 rounded-lg p-4">
              <Checkbox
                id="confirm-delete"
                checked={confirmChecked}
                onCheckedChange={setConfirmChecked}
                disabled={isLoading}
                className="mt-0.5"
              />
              <Label
                htmlFor="confirm-delete"
                className="text-sm text-gray-700 cursor-pointer select-none leading-relaxed"
              >
                I understand this action cannot be undone and I want to delete this service permanently
              </Label>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
              className="min-w-24"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={!confirmChecked || isLoading}
              className="min-w-24 bg-red-600 hover:bg-red-700 text-white"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  />
                  Deleting...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Trash2 className="w-4 h-4" />
                  Delete Service
                </span>
              )}
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default ConfirmDeleteModal;