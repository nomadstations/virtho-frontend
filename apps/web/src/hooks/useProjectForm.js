import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { validateProjectForm } from '@/utils/projectValidation';
import { processImageUpload } from '@/utils/imageUploadHandler';

export const useProjectForm = (initialData = {}) => {
  const navigate = useNavigate();
  const { currentUser, addProject } = useAuth();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    category: initialData.category || '',
    status: initialData.status || 'draft',
    team: initialData.team || '',
    image: initialData.image || null,
    imageFile: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [teams, setTeams] = useState([]);
  const [isLoadingTeams, setIsLoadingTeams] = useState(false);

  // Fetch teams on mount
  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    setIsLoadingTeams(true);
    try {
      // Simulate API call - in production, this would fetch from backend
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockTeams = [
        { id: 'team-1', name: 'Development Team', members: 5 },
        { id: 'team-2', name: 'Design Team', members: 3 },
        { id: 'team-3', name: 'Marketing Team', members: 4 },
        { id: 'team-4', name: 'Research Team', members: 6 },
      ];
      
      setTeams(mockTeams);
    } catch (error) {
      toast({
        title: 'Error loading teams',
        description: 'Could not load teams. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoadingTeams(false);
    }
  };

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleImageChange = (file, preview) => {
    setFormData(prev => ({
      ...prev,
      imageFile: file,
      image: preview,
    }));

    // Clear image error
    if (errors.image) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.image;
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const validation = validateProjectForm(formData);
    setErrors(validation.errors);
    return validation.isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      // Process image upload if present
      let imageUrl = formData.image;
      if (formData.imageFile) {
        // In production, this would upload to cloud storage
        // For now, we'll use the base64 preview
        imageUrl = formData.image;
      }

      // Create project data
      const projectData = {
        name: formData.title.trim(),
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category,
        status: formData.status,
        team: formData.team,
        image: imageUrl,
        createdBy: currentUser?.id,
        createdAt: new Date().toISOString(),
      };

      // Add project using AuthContext
      addProject(projectData);

      toast({
        title: 'Project Created',
        description: `"${projectData.title}" has been created successfully.`,
      });

      // Navigate to dashboard or projects list
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create project. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  return {
    formData,
    errors,
    isSubmitting,
    teams,
    isLoadingTeams,
    handleFieldChange,
    handleImageChange,
    handleSubmit,
    handleCancel,
  };
};