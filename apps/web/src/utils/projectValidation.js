import { VALIDATION_RULES, IMAGE_UPLOAD_CONFIG } from '@/constants/projectConstants';

export const validateProjectTitle = (title) => {
  if (!title || typeof title !== 'string') {
    return { isValid: false, error: 'Project title is required' };
  }

  const trimmedTitle = title.trim();

  if (trimmedTitle.length < VALIDATION_RULES.title.minLength) {
    return {
      isValid: false,
      error: `Title must be at least ${VALIDATION_RULES.title.minLength} characters long`,
    };
  }

  if (trimmedTitle.length > VALIDATION_RULES.title.maxLength) {
    return {
      isValid: false,
      error: `Title must not exceed ${VALIDATION_RULES.title.maxLength} characters`,
    };
  }

  return { isValid: true, error: null };
};

export const validateProjectDescription = (description) => {
  if (!description || typeof description !== 'string') {
    return { isValid: false, error: 'Project description is required' };
  }

  const trimmedDescription = description.trim();

  if (trimmedDescription.length < VALIDATION_RULES.description.minLength) {
    return {
      isValid: false,
      error: `Description must be at least ${VALIDATION_RULES.description.minLength} characters long`,
    };
  }

  if (trimmedDescription.length > VALIDATION_RULES.description.maxLength) {
    return {
      isValid: false,
      error: `Description must not exceed ${VALIDATION_RULES.description.maxLength} characters`,
    };
  }

  return { isValid: true, error: null };
};

export const validateImageFile = (file) => {
  if (!file) {
    return { isValid: true, error: null }; // Image is optional
  }

  // Check if file is actually a File object
  if (!(file instanceof File)) {
    return { isValid: false, error: 'Invalid file object' };
  }

  // Validate file type
  if (!IMAGE_UPLOAD_CONFIG.supportedFormats.includes(file.type)) {
    return {
      isValid: false,
      error: `Invalid file type. Supported formats: ${IMAGE_UPLOAD_CONFIG.supportedExtensions.join(', ')}`,
    };
  }

  // Validate file size
  if (file.size > IMAGE_UPLOAD_CONFIG.maxFileSizeBytes) {
    return {
      isValid: false,
      error: `File size exceeds ${IMAGE_UPLOAD_CONFIG.maxFileSizeMB}MB limit`,
    };
  }

  return { isValid: true, error: null };
};

export const validateCategory = (category) => {
  if (!category || typeof category !== 'string') {
    return { isValid: false, error: 'Project category is required' };
  }

  const validCategories = ['web-development', 'mobile-app', 'design', 'data-science', 'ai-ml', 'other'];

  if (!validCategories.includes(category)) {
    return { isValid: false, error: 'Invalid category selected' };
  }

  return { isValid: true, error: null };
};

export const validateStatus = (status) => {
  if (!status || typeof status !== 'string') {
    return { isValid: false, error: 'Project status is required' };
  }

  const validStatuses = ['active', 'inactive', 'draft', 'archived'];

  if (!validStatuses.includes(status)) {
    return { isValid: false, error: 'Invalid status selected' };
  }

  return { isValid: true, error: null };
};

export const validateTeam = (team) => {
  // Team is optional, so return valid if not provided
  if (!team) {
    return { isValid: true, error: null };
  }

  if (typeof team !== 'string') {
    return { isValid: false, error: 'Invalid team selection' };
  }

  return { isValid: true, error: null };
};

export const validateProjectForm = (formData) => {
  const errors = {};

  const titleValidation = validateProjectTitle(formData.title);
  if (!titleValidation.isValid) {
    errors.title = titleValidation.error;
  }

  const descriptionValidation = validateProjectDescription(formData.description);
  if (!descriptionValidation.isValid) {
    errors.description = descriptionValidation.error;
  }

  const categoryValidation = validateCategory(formData.category);
  if (!categoryValidation.isValid) {
    errors.category = categoryValidation.error;
  }

  const statusValidation = validateStatus(formData.status);
  if (!statusValidation.isValid) {
    errors.status = statusValidation.error;
  }

  const teamValidation = validateTeam(formData.team);
  if (!teamValidation.isValid) {
    errors.team = teamValidation.error;
  }

  if (formData.imageFile) {
    const imageValidation = validateImageFile(formData.imageFile);
    if (!imageValidation.isValid) {
      errors.image = imageValidation.error;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};