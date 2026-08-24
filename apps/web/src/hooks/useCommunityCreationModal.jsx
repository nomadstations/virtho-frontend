import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const INITIAL_FORM_DATA = {
  name: '',
  category: '',
  type: '',
  description: '',
  location: '',
  contactEmail: '',
  website: '',
  memberCount: '',
};

export const COMMUNITY_CONSTANTS = {
  categories: [
    'Technology',
    'Business',
    'Education',
    'Health',
    'Environment',
    'Arts & Culture',
    'Sports & Recreation',
    'Social Impact',
    'Science',
    'Community Service',
  ],
  types: ['Organization', 'Group', 'Network', 'Association'],
  locations: [
    'Global',
    'North America',
    'South America',
    'Europe',
    'Asia',
    'Africa',
    'Australia and Oceania',
    'Remote',
  ],
};

export function useCommunityCreationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const openModal = () => {
    setIsOpen(true);
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
  };

  const closeModal = () => {
    if (isSubmitting) return;
    setIsOpen(false);
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleImageUpload = (file) => {
    if (!file) return;
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, logo: reader.result }));
      if (errors.logo) {
        setErrors(prev => ({ ...prev, logo: '' }));
      }
    };
    reader.readAsDataURL(file);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Community name is required';
    }
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    if (!formData.type) {
      newErrors.type = 'Community type is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.location) {
      newErrors.location = 'Location is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const communityData = {
        id: `community-${Date.now()}`,
        name: formData.name.trim(),
        category: formData.category,
        type: formData.type,
        description: formData.description.trim(),
        location: formData.location,
        contactEmail: formData.contactEmail.trim(),
        website: formData.website.trim(),
        memberCount: formData.memberCount ? parseInt(formData.memberCount) : 0,
        logo: formData.logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=random&color=fff`,
        createdDate: new Date().toISOString().split('T')[0],
        status: 'active',
      };

      // Get existing communities
      const existingCommunities = JSON.parse(localStorage.getItem('virtho_communities_table') || '[]');
      existingCommunities.unshift(communityData);
      localStorage.setItem('virtho_communities_table', JSON.stringify(existingCommunities));

      toast({
        title: 'Community Created',
        description: `"${communityData.name}" has been successfully created.`,
      });

      // Dispatch event for other components to refresh
      window.dispatchEvent(new Event('communityCreated'));

      closeModal();
    } catch (error) {
      console.error('Error creating community:', error);
      toast({
        title: 'Error',
        description: 'Failed to create community. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isOpen,
    openModal,
    closeModal,
    formData,
    errors,
    isSubmitting,
    handleInputChange,
    handleImageUpload,
    handleSubmit,
    constants: COMMUNITY_CONSTANTS,
  };
}