import { useState, useEffect } from 'react';
import { initializeSampleData } from '@/utils/languageServiceSampleData';
import { useAuth } from '@/contexts/AuthContext';

const STORAGE_KEY = 'language_service_orders';

/**
 * Custom hook for managing language service orders
 * 
 * Provides CRUD operations for orders with localStorage persistence
 * and automatic sample data initialization.
 */
export function useLanguageServiceOrders() {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load orders from localStorage on mount
  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    try {
      setLoading(true);
      setError(null);
      
      // Initialize sample data if needed
      initializeSampleData();
      
      const storedOrders = localStorage.getItem(STORAGE_KEY);
      if (storedOrders) {
        const parsedOrders = JSON.parse(storedOrders);
        setOrders(parsedOrders);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error('[useLanguageServiceOrders] Error loading orders:', err);
      setError('Failed to load orders');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const saveToStorage = (updatedOrders) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedOrders));
      setOrders(updatedOrders);
      setError(null);
    } catch (err) {
      console.error('[useLanguageServiceOrders] Error saving to storage:', err);
      setError('Failed to save orders');
    }
  };

  // Create new order
  const createOrder = (orderData) => {
    try {
      const newOrder = {
        id: `order-${Date.now()}`,
        ...orderData,
        customerId: currentUser?.id || 'customer-unknown',
        customerName: currentUser?.name || 'Unknown Customer',
        customerEmail: currentUser?.email || '',
        status: 'pending',
        paymentStatus: 'pending',
        orderDate: new Date().toISOString(),
        completedDate: null,
        timeline: [
          {
            status: 'pending',
            date: new Date().toISOString(),
            note: 'Order placed successfully',
          },
        ],
        notes: [],
      };

      const updatedOrders = [newOrder, ...orders];
      saveToStorage(updatedOrders);
      return newOrder;
    } catch (err) {
      console.error('[useLanguageServiceOrders] Error creating order:', err);
      setError('Failed to create order');
      throw err;
    }
  };

  // Update order
  const updateOrder = (orderId, updates) => {
    try {
      const updatedOrders = orders.map(order =>
        order.id === orderId
          ? { ...order, ...updates }
          : order
      );
      saveToStorage(updatedOrders);
      return updatedOrders.find(o => o.id === orderId);
    } catch (err) {
      console.error('[useLanguageServiceOrders] Error updating order:', err);
      setError('Failed to update order');
      throw err;
    }
  };

  // Update order status
  const updateOrderStatus = (orderId, newStatus, note = '') => {
    try {
      const updatedOrders = orders.map(order => {
        if (order.id === orderId) {
          const updatedTimeline = [
            ...(order.timeline || []),
            {
              status: newStatus,
              date: new Date().toISOString(),
              note: note || `Status changed to ${newStatus}`,
            },
          ];

          const updates = {
            status: newStatus,
            timeline: updatedTimeline,
          };

          // Set completed date if status is completed or delivered
          if (newStatus === 'completed' || newStatus === 'delivered') {
            updates.completedDate = new Date().toISOString();
          }

          return { ...order, ...updates };
        }
        return order;
      });

      saveToStorage(updatedOrders);
      return updatedOrders.find(o => o.id === orderId);
    } catch (err) {
      console.error('[useLanguageServiceOrders] Error updating order status:', err);
      setError('Failed to update order status');
      throw err;
    }
  };

  // Delete order
  const deleteOrder = (orderId) => {
    try {
      const updatedOrders = orders.filter(order => order.id !== orderId);
      saveToStorage(updatedOrders);
      return true;
    } catch (err) {
      console.error('[useLanguageServiceOrders] Error deleting order:', err);
      setError('Failed to delete order');
      throw err;
    }
  };

  // Get single order by ID
  const getOrderById = (orderId) => {
    return orders.find(order => order.id === orderId);
  };

  // Get orders by provider
  const getOrdersByProvider = (providerId) => {
    return orders.filter(order => order.providerId === providerId);
  };

  // Get user's orders (as provider)
  const getUserOrders = () => {
    if (!currentUser) return [];
    return orders.filter(order => order.providerId === currentUser.id);
  };

  // Get orders by customer
  const getOrdersByCustomer = (customerId) => {
    return orders.filter(order => order.customerId === customerId);
  };

  // Search orders
  const searchOrders = (query) => {
    if (!query || query.trim() === '') return orders;
    
    const lowerQuery = query.toLowerCase();
    return orders.filter(order =>
      order.id.toLowerCase().includes(lowerQuery) ||
      order.serviceName.toLowerCase().includes(lowerQuery) ||
      order.customerName.toLowerCase().includes(lowerQuery) ||
      order.customerEmail.toLowerCase().includes(lowerQuery) ||
      order.providerName.toLowerCase().includes(lowerQuery)
    );
  };

  // Filter orders by status
  const filterByStatus = (status) => {
    if (!status || status.length === 0) return orders;
    return orders.filter(order => status.includes(order.status));
  };

  // Filter orders
  const filterOrders = (filters) => {
    let filtered = [...orders];

    // Filter by status
    if (filters.status && filters.status.length > 0) {
      filtered = filtered.filter(order => filters.status.includes(order.status));
    }

    // Filter by date range
    if (filters.startDate) {
      filtered = filtered.filter(order =>
        new Date(order.orderDate) >= new Date(filters.startDate)
      );
    }
    if (filters.endDate) {
      filtered = filtered.filter(order =>
        new Date(order.orderDate) <= new Date(filters.endDate)
      );
    }

    // Filter by service
    if (filters.serviceId) {
      filtered = filtered.filter(order => order.serviceId === filters.serviceId);
    }

    // Filter by customer
    if (filters.customerId) {
      filtered = filtered.filter(order => order.customerId === filters.customerId);
    }

    return filtered;
  };

  // Sort orders
  const sortOrders = (ordersList, sortBy = 'orderDate', order = 'desc') => {
    const sorted = [...ordersList];
    
    sorted.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'orderDate':
          comparison = new Date(a.orderDate) - new Date(b.orderDate);
          break;
        case 'deliveryDate':
          comparison = new Date(a.deliveryDate) - new Date(b.deliveryDate);
          break;
        case 'totalPrice':
          comparison = a.totalPrice - b.totalPrice;
          break;
        case 'customerName':
          comparison = a.customerName.localeCompare(b.customerName);
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
        default:
          comparison = 0;
      }
      
      return order === 'asc' ? comparison : -comparison;
    });
    
    return sorted;
  };

  // Get statistics
  const getStatistics = () => {
    const userOrders = getUserOrders();
    
    return {
      totalOrders: userOrders.length,
      pendingOrders: userOrders.filter(o => o.status === 'pending').length,
      inProgressOrders: userOrders.filter(o => o.status === 'in_progress').length,
      completedOrders: userOrders.filter(o => o.status === 'completed' || o.status === 'delivered').length,
      cancelledOrders: userOrders.filter(o => o.status === 'cancelled').length,
      totalRevenue: userOrders
        .filter(o => o.status === 'completed' || o.status === 'delivered')
        .reduce((sum, o) => sum + o.totalPrice, 0),
    };
  };

  return {
    orders,
    loading,
    error,
    createOrder,
    updateOrder,
    updateOrderStatus,
    deleteOrder,
    getOrderById,
    getOrdersByProvider,
    getUserOrders,
    getOrdersByCustomer,
    searchOrders,
    filterByStatus,
    filterOrders,
    sortOrders,
    getStatistics,
    refreshOrders: loadOrders,
  };
}