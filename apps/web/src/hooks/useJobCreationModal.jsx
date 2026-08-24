import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const INITIAL_FORM_DATA = {
  title: '',
  category: '',
  type: '',
  experienceLevel: '',
  location: '',
  salary: '',
  description: '',
  company: '',
  skills: '',
};

export const JOB_CONSTANTS = {
  categories: [
    'Engineering',
    'Design',
    'Sales',
    'Marketing',
    'Product',
    'Operations',
    'Customer Success',
    'Finance',
    'Human Resources',
    'Data Science',
  ],
  types: ['Full-time', 'Part-time', 'Contract', 'Internship'],
  experienceLevels: ['Entry', 'Mid', 'Senior', 'Lead'],
  locations: ['Remote', 'Hybrid', 'On-site'],
};

export function useJobCreationModal() {
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
      setFormData(prev => ({ ...prev, image: reader.result }));
      if (errors.image) {
        setErrors(prev => ({ ...prev, image: '' }));
      }
    };
    reader.readAsDataURL(file);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Job title is required';
    }
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    if (!formData.type) {
      newErrors.type = 'Job type is required';
    }
    if (!formData.experienceLevel) {
      newErrors.experienceLevel = 'Experience level is required';
    }
    if (!formData.location) {
      newErrors.location = 'Location is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
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
      const jobData = {
        id: `job-${Date.now()}`,
        title: formData.title.trim(),
        category: formData.category,
        type: formData.type,
        experienceLevel: formData.experienceLevel,
        location: formData.location,
        salary: formData.salary.trim() || 'Competitive',
        description: formData.description.trim(),
        company: formData.company.trim(),
        skills: formData.skills ? formData.skills.split(',').map(s => s.trim()).filter(Boolean) : [],
        logo: formData.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.company)}&background=random&color=fff`,
        postedDate: new Date().toISOString().split('T')[0],
        status: 'active',
      };

      // Get existing jobs
      const existingJobs = JSON.parse(localStorage.getItem('virtho_jobs_table') || '[]');
      existingJobs.unshift(jobData);
      localStorage.setItem('virtho_jobs_table', JSON.stringify(existingJobs));

      toast({
        title: 'Job Created',
        description: `"${jobData.title}" has been successfully created.`,
      });

      // Dispatch event for other components to refresh
      window.dispatchEvent(new Event('jobCreated'));

      closeModal();
    } catch (error) {
      console.error('Error creating job:', error);
      toast({
        title: 'Error',
        description: 'Failed to create job. Please try again.',
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
    constants: JOB_CONSTANTS,
  };
}