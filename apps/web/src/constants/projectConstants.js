import { Code, Smartphone, Palette, Database, Brain, Package } from 'lucide-react';

export const CATEGORY_OPTIONS = [
  {
    value: 'web-development',
    label: 'Web Development',
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    icon: Code,
  },
  {
    value: 'mobile-app',
    label: 'Mobile App',
    color: 'bg-green-100 text-green-800 border-green-200',
    icon: Smartphone,
  },
  {
    value: 'design',
    label: 'Design',
    color: 'bg-purple-100 text-purple-800 border-purple-200',
    icon: Palette,
  },
  {
    value: 'data-science',
    label: 'Data Science',
    color: 'bg-orange-100 text-orange-800 border-orange-200',
    icon: Database,
  },
  {
    value: 'ai-ml',
    label: 'AI/ML',
    color: 'bg-pink-100 text-pink-800 border-pink-200',
    icon: Brain,
  },
  {
    value: 'other',
    label: 'Other',
    color: 'bg-gray-100 text-gray-800 border-gray-200',
    icon: Package,
  },
];

export const STATUS_OPTIONS = [
  {
    value: 'active',
    label: 'Active',
    color: 'bg-green-100 text-green-800 border-green-200',
    icon: '🚀',
  },
  {
    value: 'inactive',
    label: 'Inactive',
    color: 'bg-gray-100 text-gray-800 border-gray-200',
    icon: '⏸️',
  },
  {
    value: 'draft',
    label: 'Draft',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    icon: '✏️',
  },
  {
    value: 'archived',
    label: 'Archived',
    color: 'bg-red-100 text-red-800 border-red-200',
    icon: '📦',
  },
];

export const IMAGE_UPLOAD_CONFIG = {
  maxFileSizeMB: 5,
  maxFileSizeBytes: 5 * 1024 * 1024,
  supportedFormats: ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'],
  supportedExtensions: ['.jpg', '.jpeg', '.png', '.webp'],
  recommendedDimensions: {
    width: 1200,
    height: 800,
  },
  acceptAttribute: 'image/jpeg,image/png,image/webp,image/jpg',
};

export const VALIDATION_RULES = {
  title: {
    minLength: 3,
    maxLength: 100,
  },
  description: {
    minLength: 10,
    maxLength: 500,
  },
};

export const FORM_FIELDS = {
  TITLE: 'title',
  DESCRIPTION: 'description',
  IMAGE: 'image',
  CATEGORY: 'category',
  STATUS: 'status',
  TEAM: 'team',
};