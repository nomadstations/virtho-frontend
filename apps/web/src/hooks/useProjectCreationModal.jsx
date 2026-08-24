import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const AVAILABLE_CATEGORIES = [
  { value: 'web-development', label: 'Web Development', color: 'bg-blue-100 text-blue-800' },
  { value: 'mobile-app', label: 'Mobile App', color: 'bg-green-100 text-green-800' },
  { value: 'design', label: 'Design', color: 'bg-purple-100 text-purple-800' },
  { value: 'ai-ml', label: 'AI/ML', color: 'bg-pink-100 text-pink-800' },
  { value: 'blockchain', label: 'Blockchain', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'iot', label: 'IoT', color: 'bg-indigo-100 text-indigo-800' },
  { value: 'data-science', label: 'Data Science', color: 'bg-red-100 text-red-800' },
  { value: 'cybersecurity', label: 'Cybersecurity', color: 'bg-orange-100 text-orange-800' },
];

const AVAILABLE_STATUSES = [
  { value: 'active', label: 'Active', color: 'bg-green-100 text-green-800' },
  { value: 'draft', label: 'Draft', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'archived', label: 'Archived', color: 'bg-gray-100 text-gray-800' },
];

const AVAILABLE_TEAMS = [
  { value: 'team-alpha', label: 'Team Alpha' },
  { value: 'team-beta', label: 'Team Beta' },
  { value: 'team-gamma', label: 'Team Gamma' },
  { value: 'team-delta', label: 'Team Delta' },
  { value: 'no-team', label: 'No Team Assigned' },
];

const MAX_TITLE_LENGTH = 100;
const MAX_DESCRIPTION_LENGTH = 500;

/**
 * ✅ UPDATED: Now uses AuthContext to create projects with ownerId
 * 
 * CRITICAL CHANGES:
 * - Uses addProject() from AuthContext instead of localStorage directly
 * - Projects are automatically assigned current user as owner
 * - Consistent with default project creation logic
 */
export function useProjectCreationModal() {
  const { toast } = useToast();
  const { currentUser, addProject } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
    imagePreview: null,
    category: '',
    status: 'draft',
    team: 'no-team',
    createdDate: new Date().toISOString().split('T')[0],
  });

  const [errors, setErrors] = useState({
    title: '',
    description: '',
    category: '',
    image: '',
  });

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => {
      resetForm();
    }, 300);
  }, []);

  const resetForm = useCallback(() => {
    setFormData({
      title: '',
      description: '',
      image: null,
      imagePreview: null,
      category: '',
      status: 'draft',
      team: 'no-team',
      createdDate: new Date().toISOString().split('T')[0],
    });
    setErrors({
      title: '',
      description: '',
      category: '',
      image: '',
    });
    setIsSubmitting(false);
  }, []);

  const validateForm = useCallback(() => {
    const newErrors = {
      title: '',
      description: '',
      category: '',
      image: '',
    };

    let isValid = true;

    if (!formData.title.trim()) {
      newErrors.title = 'Project title is required';
      isValid = false;
    } else if (formData.title.length > MAX_TITLE_LENGTH) {
      newErrors.title = `Title must be ${MAX_TITLE_LENGTH} characters or less`;
      isValid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Project description is required';
      isValid = false;
    } else if (formData.description.length > MAX_DESCRIPTION_LENGTH) {
      newErrors.description = `Description must be ${MAX_DESCRIPTION_LENGTH} characters or less`;
      isValid = false;
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }, [formData]);

  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  }, [errors]);

  const handleImageUpload = useCallback((file) => {
    if (!file) {
      setFormData(prev => ({
        ...prev,
        image: null,
        imagePreview: null,
      }));
      setErrors(prev => ({ ...prev, image: '' }));
      return;
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setErrors(prev => ({
        ...prev,
        image: 'Please upload a JPG, PNG, or WebP image',
      }));
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setErrors(prev => ({
        ...prev,
        image: 'Image must be smaller than 5MB',
      }));
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({
        ...prev,
        image: file,
        imagePreview: reader.result,
      }));
      setErrors(prev => ({ ...prev, image: '' }));
    };
    reader.readAsDataURL(file);
  }, []);

  /**
   * ✅ UPDATED: Uses addProject() from AuthContext
   * Project is automatically assigned current user as owner
   */
  const handleSubmit = useCallback(async () => {
    if (!validateForm()) {
      toast({
        title: 'Validation Error',
        description: 'Please fix the errors in the form before submitting.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      // ✅ Use AuthContext to create project (automatically adds ownerId)
      const newProject = {
        name: formData.title,
        title: formData.title,
        description: formData.description,
        image: formData.imagePreview || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
        category: formData.category,
        status: formData.status,
        team: AVAILABLE_TEAMS.find(t => t.value === formData.team)?.label || 'No Team',
        createdDate: formData.createdDate,
        author: currentUser?.name || 'Current User',
      };

      addProject(newProject); // ✅ Automatically assigns ownerId = currentUser.id

      window.dispatchEvent(new CustomEvent('projectCreated', { detail: newProject }));

      toast({
        title: 'Success! 🎉',
        description: `Project "${formData.title}" has been created successfully.`,
      });

      closeModal();
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create project. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm, closeModal, toast, currentUser, addProject]);

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
    resetForm,
    constants: {
      AVAILABLE_CATEGORIES,
      AVAILABLE_STATUSES,
      AVAILABLE_TEAMS,
      MAX_TITLE_LENGTH,
      MAX_DESCRIPTION_LENGTH,
    },
  };
}