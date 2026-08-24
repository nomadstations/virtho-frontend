import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useCoursesData } from '@/hooks/useCoursesData';

const INITIAL_FORM_DATA = {
  title: '',
  category: '',
  level: '',
  duration: '',
  price: '',
  image: '',
  description: '',
  instructor: '',
  overview: '',
};

export const COURSE_CONSTANTS = {
  categories: [
    'Web Development',
    'Data Science',
    'Design',
    'Cloud Computing',
    'Mobile Development',
    'Cybersecurity',
    'Programming',
    'Finance',
    'Personal Development',
    'Business',
  ],
  levels: ['Beginner', 'Intermediate', 'Advanced'],
  priceTypes: ['Free', 'Paid'],
};

export function useCourseCreationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { addCourse } = useCoursesData();

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
      newErrors.title = 'Course title is required';
    }
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    if (!formData.level) {
      newErrors.level = 'Difficulty level is required';
    }
    if (!formData.duration.trim()) {
      newErrors.duration = 'Duration is required';
    }
    if (!formData.price) {
      newErrors.price = 'Price type is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.instructor.trim()) {
      newErrors.instructor = 'Instructor name is required';
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
      const courseData = {
        title: formData.title.trim(),
        category: formData.category,
        level: formData.level,
        difficulty: formData.level,
        duration: formData.duration.trim(),
        price: formData.price,
        priceType: formData.price,
        priceValue: formData.price === 'Free' ? 0 : 0,
        image: formData.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop',
        description: formData.description.trim(),
        instructor: formData.instructor.trim(),
        overview: formData.overview.trim() || formData.description.trim(),
        skills: [],
        objectives: [],
        curriculum: [],
        prerequisites: [],
        certificate: false,
        studentCount: 0,
        rating: 0,
        reviewCount: 0,
        status: 'active',
        createdDate: new Date().toISOString().split('T')[0],
      };

      addCourse(courseData);

      toast({
        title: 'Course Created',
        description: `"${courseData.title}" has been successfully created.`,
      });

      // Dispatch event for other components to refresh
      window.dispatchEvent(new Event('courseCreated'));

      closeModal();
    } catch (error) {
      console.error('Error creating course:', error);
      toast({
        title: 'Error',
        description: 'Failed to create course. Please try again.',
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
    constants: COURSE_CONSTANTS,
  };
}