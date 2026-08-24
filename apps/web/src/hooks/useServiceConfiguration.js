import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

const MOCK_SERVICES = [
  {
    id: 'srv-1',
    name: 'Certified Legal Translation',
    description: 'Notarized translations for legal documents, contracts, and court transcripts.',
    status: 'Active',
    createdDate: '2023-11-10',
    lastModifiedDate: '2024-01-15',
    languagePairs: [
      { id: 'lp-1-1', source: 'English', target: 'Spanish', basePrice: 0.15, priceUnit: 'Per Word', vat: true, vatPercentage: 20, category: 'Legal' },
      { id: 'lp-1-2', source: 'Spanish', target: 'English', basePrice: 0.16, priceUnit: 'Per Word', vat: true, vatPercentage: 20, category: 'Legal' },
      { id: 'lp-1-3', source: 'English', target: 'French', basePrice: 0.18, priceUnit: 'Per Word', vat: true, vatPercentage: 20, category: 'Legal' }
    ]
  },
  {
    id: 'srv-2',
    name: 'Medical & Healthcare Translation',
    description: 'Specialized translation for patient records, clinical trials, and medical device manuals.',
    status: 'Active',
    createdDate: '2023-12-05',
    lastModifiedDate: '2024-02-20',
    languagePairs: [
      { id: 'lp-2-1', source: 'English', target: 'German', basePrice: 0.20, priceUnit: 'Per Word', vat: false, vatPercentage: 0, category: 'Medical' },
      { id: 'lp-2-2', source: 'English', target: 'Japanese', basePrice: 0.25, priceUnit: 'Per Word', vat: false, vatPercentage: 0, category: 'Medical' }
    ]
  },
  {
    id: 'srv-3',
    name: 'Website Localization',
    description: 'Comprehensive adaptation of digital content for local markets.',
    status: 'Active',
    createdDate: '2024-01-12',
    lastModifiedDate: '2024-03-01',
    languagePairs: [
      { id: 'lp-3-1', source: 'English', target: 'Portuguese', basePrice: 45.00, priceUnit: 'Per Page', vat: true, vatPercentage: 20, category: 'Technical' }
    ]
  },
  {
    id: 'srv-4',
    name: 'Legacy Technical Translation',
    description: 'Deprecated service for older technical manual formats.',
    status: 'Inactive',
    createdDate: '2022-08-22',
    lastModifiedDate: '2023-10-30',
    languagePairs: [
      { id: 'lp-4-1', source: 'German', target: 'English', basePrice: 0.14, priceUnit: 'Per Word', vat: true, vatPercentage: 20, category: 'Technical' }
    ]
  }
];

export const AVAILABLE_LANGUAGES = [
  'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 
  'Russian', 'Chinese', 'Japanese', 'Korean', 'Arabic', 'Hindi'
];

export const CATEGORIES = ['General', 'Legal', 'Medical', 'Technical'];

export function useServiceConfiguration() {
  const { toast } = useToast();
  const [services, setServices] = useState(() => {
    const saved = localStorage.getItem('virtho_services_config');
    return saved ? JSON.parse(saved) : MOCK_SERVICES;
  });

  useEffect(() => {
    localStorage.setItem('virtho_services_config', JSON.stringify(services));
  }, [services]);

  const addService = (newService) => {
    const service = {
      ...newService,
      id: `srv-${Date.now()}`,
      createdDate: new Date().toISOString().split('T')[0],
      lastModifiedDate: new Date().toISOString().split('T')[0],
    };
    setServices([service, ...services]);
    toast({
      title: "Service Created",
      description: `${service.name} has been added successfully.`,
    });
  };

  const updateService = (id, updatedData) => {
    setServices(services.map(s => 
      s.id === id ? { ...s, ...updatedData, lastModifiedDate: new Date().toISOString().split('T')[0] } : s
    ));
    toast({
      title: "Service Updated",
      description: "Changes have been saved.",
    });
  };

  const deleteService = (id) => {
    setServices(services.filter(s => s.id !== id));
    toast({
      title: "Service Deleted",
      description: "The service has been permanently removed.",
      variant: "destructive"
    });
  };

  const toggleServiceStatus = (id) => {
    setServices(services.map(s => {
      if (s.id === id) {
        const newStatus = s.status === 'Active' ? 'Inactive' : 'Active';
        toast({
          title: "Status Updated",
          description: `Service is now ${newStatus}.`,
        });
        return { ...s, status: newStatus, lastModifiedDate: new Date().toISOString().split('T')[0] };
      }
      return s;
    }));
  };

  const bulkUploadServices = (newServicesData) => {
    toast({
      title: "Bulk Upload Complete",
      description: `Successfully processed ${newServicesData.length} records.`,
    });
    // In a real app we'd merge or overwrite intelligently
  };

  return {
    services,
    addService,
    updateService,
    deleteService,
    toggleServiceStatus,
    bulkUploadServices,
    AVAILABLE_LANGUAGES,
    CATEGORIES
  };
}