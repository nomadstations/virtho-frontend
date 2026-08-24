import { IMAGE_UPLOAD_CONFIG } from '@/constants/projectConstants';

export const validateImageFile = (file) => {
  if (!file) {
    return { isValid: false, error: 'No file selected' };
  }

  // Validate file type
  if (!IMAGE_UPLOAD_CONFIG.supportedFormats.includes(file.type)) {
    return {
      isValid: false,
      error: `Invalid file type. Please upload ${IMAGE_UPLOAD_CONFIG.supportedExtensions.join(', ')} files only.`,
    };
  }

  // Validate file size
  if (file.size > IMAGE_UPLOAD_CONFIG.maxFileSizeBytes) {
    return {
      isValid: false,
      error: `File size exceeds ${IMAGE_UPLOAD_CONFIG.maxFileSizeMB}MB. Please choose a smaller file.`,
    };
  }

  return { isValid: true, error: null };
};

export const generateImagePreview = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file provided'));
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      resolve(reader.result);
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsDataURL(file);
  });
};

export const handleDragOver = (e, setIsDragging) => {
  e.preventDefault();
  e.stopPropagation();
  setIsDragging(true);
};

export const handleDragLeave = (e, setIsDragging) => {
  e.preventDefault();
  e.stopPropagation();
  setIsDragging(false);
};

export const handleDrop = async (e, setIsDragging, onFileSelect, onError) => {
  e.preventDefault();
  e.stopPropagation();
  setIsDragging(false);

  const files = e.dataTransfer.files;
  if (files && files.length > 0) {
    const file = files[0];
    const validation = validateImageFile(file);

    if (!validation.isValid) {
      if (onError) {
        onError(validation.error);
      }
      return;
    }

    if (onFileSelect) {
      onFileSelect(file);
    }
  }
};

export const processImageUpload = async (file) => {
  const validation = validateImageFile(file);

  if (!validation.isValid) {
    throw new Error(validation.error);
  }

  const preview = await generateImagePreview(file);

  return {
    file,
    preview,
    name: file.name,
    size: file.size,
    type: file.type,
  };
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const getImageDimensions = (file) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({
        width: img.width,
        height: img.height,
      });
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };

    img.src = url;
  });
};