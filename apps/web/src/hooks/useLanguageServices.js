import { useState, useEffect } from 'react';
import { initializeSampleData } from '@/utils/languageServiceSampleData';
import { useAuth } from '@/contexts/AuthContext';

const STORAGE_KEY = 'language_services';

/**
 * Custom hook for managing language services
 * 
 * Provides CRUD operations for language services with localStorage persistence
 * and automatic sample data initialization.
 */
export function useLanguageServices() {
  const { currentUser } = useAuth();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load services from localStorage on mount
  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = () => {
    try {
      setLoading(true);
      setError(null);
      
      // Initialize sample data if needed
      initializeSampleData();
      
      const storedServices = localStorage.getItem(STORAGE_KEY);
      if (storedServices) {
        const parsedServices = JSON.parse(storedServices);
        setServices(parsedServices);
      } else {
        setServices([]);
      }
    } catch (err) {
      console.error('[useLanguageServices] Error loading services:', err);
      setError('Failed to load services');
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  const saveToStorage = (updatedServices) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedServices));
      setServices(updatedServices);
      setError(null);
    } catch (err) {
      console.error('[useLanguageServices] Error saving to storage:', err);
      setError('Failed to save services');
    }
  };

  // Create new service
  const createService = (serviceData) => {
    try {
      const newService = {
        id: `ls-${Date.now()}`,
        ...serviceData,
        providerId: currentUser?.id || 'user-1',
        providerName: currentUser?.name || 'Unknown Provider',
        providerAvatar: currentUser?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser?.name || 'Unknown')}`,
        rating: 0,
        reviewCount: 0,
        totalOrders: 0,
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const updatedServices = [newService, ...services];
      saveToStorage(updatedServices);
      return newService;
    } catch (err) {
      console.error('[useLanguageServices] Error creating service:', err);
      setError('Failed to create service');
      throw err;
    }
  };

  // Update existing service
  const updateService = (serviceId, updates) => {
    try {
      const updatedServices = services.map(service =>
        service.id === serviceId
          ? { ...service, ...updates, updatedAt: new Date().toISOString() }
          : service
      );
      saveToStorage(updatedServices);
      return updatedServices.find(s => s.id === serviceId);
    } catch (err) {
      console.error('[useLanguageServices] Error updating service:', err);
      setError('Failed to update service');
      throw err;
    }
  };

  // Delete service
  const deleteService = (serviceId) => {
    try {
      const updatedServices = services.filter(service => service.id !== serviceId);
      saveToStorage(updatedServices);
      return true;
    } catch (err) {
      console.error('[useLanguageServices] Error deleting service:', err);
      setError('Failed to delete service');
      throw err;
    }
  };

  // Get single service by ID
  const getServiceById = (serviceId) => {
    return services.find(service => service.id === serviceId);
  };

  // Get services by provider
  const getServicesByProvider = (providerId) => {
    return services.filter(service => service.providerId === providerId);
  };

  // Get user's own services
  const getUserServices = () => {
    if (!currentUser) return [];
    return services.filter(service => service.providerId === currentUser.id);
  };

  // Search services
  const searchServices = (query) => {
    if (!query || query.trim() === '') return services;
    
    const lowerQuery = query.toLowerCase();
    return services.filter(service =>
      service.name.toLowerCase().includes(lowerQuery) ||
      service.description.toLowerCase().includes(lowerQuery) ||
      service.providerName.toLowerCase().includes(lowerQuery) ||
      service.specializations.some(spec => spec.toLowerCase().includes(lowerQuery))
    );
  };

  // Filter services
  const filterServices = (filters) => {
    let filtered = [...services];

    // Filter by service type
    if (filters.serviceType && filters.serviceType.length > 0) {
      filtered = filtered.filter(service =>
        filters.serviceType.includes(service.serviceType)
      );
    }

    // Filter by language pair
    if (filters.languagePair && filters.languagePair.length > 0) {
      filtered = filtered.filter(service =>
        service.languagePairs.some(pair => filters.languagePair.includes(pair))
      );
    }

    // Filter by specialization
    if (filters.specialization && filters.specialization.length > 0) {
      filtered = filtered.filter(service =>
        service.specializations.some(spec => filters.specialization.includes(spec))
      );
    }

    // Filter by price range
    if (filters.minPrice !== undefined && filters.minPrice !== null) {
      filtered = filtered.filter(service => service.price >= filters.minPrice);
    }
    if (filters.maxPrice !== undefined && filters.maxPrice !== null) {
      filtered = filtered.filter(service => service.price <= filters.maxPrice);
    }

    // Filter by rating
    if (filters.minRating !== undefined && filters.minRating !== null) {
      filtered = filtered.filter(service => service.rating >= filters.minRating);
    }

    // Filter by status
    if (filters.status && filters.status.length > 0) {
      filtered = filtered.filter(service => filters.status.includes(service.status));
    }

    return filtered;
  };

  // Sort services
  const sortServices = (servicesList, sortBy = 'createdAt', order = 'desc') => {
    const sorted = [...servicesList];
    
    sorted.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'rating':
          comparison = a.rating - b.rating;
          break;
        case 'totalOrders':
          comparison = a.totalOrders - b.totalOrders;
          break;
        case 'createdAt':
          comparison = new Date(a.createdAt) - new Date(b.createdAt);
          break;
        case 'updatedAt':
          comparison = new Date(a.updatedAt) - new Date(b.updatedAt);
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
    const userServices = getUserServices();
    
    return {
      totalServices: userServices.length,
      activeServices: userServices.filter(s => s.status === 'active').length,
      totalOrders: userServices.reduce((sum, s) => sum + s.totalOrders, 0),
      averageRating: userServices.length > 0
        ? (userServices.reduce((sum, s) => sum + s.rating, 0) / userServices.length).toFixed(1)
        : 0,
    };
  };

  return {
    services,
    loading,
    error,
    createService,
    updateService,
    deleteService,
    getServiceById,
    getServicesByProvider,
    getUserServices,
    searchServices,
    filterServices,
    sortServices,
    getStatistics,
    refreshServices: loadServices,
  };
}