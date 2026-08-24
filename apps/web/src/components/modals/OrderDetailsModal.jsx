import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ORDER_STATUS } from '@/constants/languageServiceConfig';
import { formatCurrency } from '@/api/EcommerceApi';

function OrderDetailsModal({ isOpen, onClose, order }) {
  if (!isOpen || !order) return null;

  const statusConfig = ORDER_STATUS.find(s => s.value === order.status);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
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

  const contentPreview = order.content 
    ? (order.content.length > 200 ? order.content.substring(0, 200) + '...' : order.content)
    : 'No content preview available';

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full my-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 space-y-8">
          {/* Order Header */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Order ID</div>
                <div className="text-2xl font-bold text-gray-900 font-mono">{order.id}</div>
              </div>
              <div className="flex items-center gap-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Order Date</div>
                  <div className="font-semibold text-gray-900">{formatDate(order.orderDate)}</div>
                </div>
                {statusConfig && (
                  <div className={`px-4 py-2 rounded-full text-sm font-semibold ${statusConfig.bgColor} ${statusConfig.textColor}`}>
                    {statusConfig.label}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Service Info */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Service Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Service Name</div>
                <div className="font-semibold text-gray-900">{order.serviceName}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Provider</div>
                <div className="font-semibold text-gray-900">{order.providerName}</div>
              </div>
            </div>
          </div>

          {/* Buyer Info */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Buyer Information</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Name</div>
                <div className="font-semibold text-gray-900">{order.customerName}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Email</div>
                <div className="font-semibold text-gray-900">{order.customerEmail}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Phone</div>
                <div className="font-semibold text-gray-900">{order.customerPhone || 'Not provided'}</div>
              </div>
            </div>
          </div>

          {/* Content Info */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Content Information</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Source Language</div>
                <div className="font-semibold text-gray-900">{order.sourceLanguage}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Target Language</div>
                <div className="font-semibold text-gray-900">{order.targetLanguage}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Content Type</div>
                <div className="font-semibold text-gray-900 capitalize">{order.contentType || 'Text'}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Word Count</div>
                <div className="font-semibold text-gray-900">{order.wordCount || 'N/A'}</div>
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-2">Content Preview</div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-gray-700 text-sm leading-relaxed">
                {contentPreview}
              </div>
            </div>
          </div>

          {/* Dates */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Important Dates</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Order Placed</div>
                <div className="font-semibold text-gray-900">{formatDate(order.orderDate)}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Expected Delivery</div>
                <div className="font-semibold text-gray-900">{formatDate(order.deliveryDate)}</div>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Pricing</h3>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Base Price</span>
                <span className="font-semibold text-gray-900">{formatPrice(order.pricePerUnit, order.currency)}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                <span className="text-lg font-bold text-gray-900">Total Price</span>
                <span className="text-2xl font-bold text-gray-900">{formatPrice(order.totalPrice, order.currency)}</span>
              </div>
              <div className="mt-3">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                  order.paymentStatus === 'refunded' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.paymentStatus ? order.paymentStatus.toUpperCase() : 'PENDING'}
                </span>
              </div>
            </div>
          </div>

          {/* Special Requirements */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Special Requirements</h3>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-gray-700 text-sm leading-relaxed">
              {order.specialRequirements || 'None'}
            </div>
          </div>

          {/* Timeline */}
          <div>
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
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${eventStatusConfig.bgColor} ${eventStatusConfig.textColor}`}>
                            {eventStatusConfig.label}
                          </span>
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
          </div>

          {/* Notes Section */}
          {order.notes && order.notes.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Notes & Communication</h3>
              <div className="space-y-3">
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
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end">
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsModal;