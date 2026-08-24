import { Globe, FileText, MessageSquare, Video, Headphones, FileCheck, Languages, Users } from 'lucide-react';

/**
 * Language Service Configuration
 * 
 * Defines language pairs, service types, specializations, pricing models,
 * and status options for the Language Services Management system.
 */

// Common language pairs for translation services
export const LANGUAGE_PAIRS = [
  { value: 'en-es', label: 'English → Spanish', source: 'en', target: 'es' },
  { value: 'en-fr', label: 'English → French', source: 'en', target: 'fr' },
  { value: 'en-de', label: 'English → German', source: 'en', target: 'de' },
  { value: 'en-zh', label: 'English → Chinese', source: 'en', target: 'zh' },
  { value: 'en-ja', label: 'English → Japanese', source: 'en', target: 'ja' },
  { value: 'en-ko', label: 'English → Korean', source: 'en', target: 'ko' },
  { value: 'en-pt', label: 'English → Portuguese', source: 'en', target: 'pt' },
  { value: 'en-ru', label: 'English → Russian', source: 'en', target: 'ru' },
  { value: 'en-ar', label: 'English → Arabic', source: 'en', target: 'ar' },
  { value: 'en-it', label: 'English → Italian', source: 'en', target: 'it' },
  { value: 'es-en', label: 'Spanish → English', source: 'es', target: 'en' },
  { value: 'fr-en', label: 'French → English', source: 'fr', target: 'en' },
  { value: 'de-en', label: 'German → English', source: 'de', target: 'en' },
  { value: 'zh-en', label: 'Chinese → English', source: 'zh', target: 'en' },
  { value: 'ja-en', label: 'Japanese → English', source: 'ja', target: 'en' },
];

// Service types available
export const SERVICE_TYPES = [
  { 
    value: 'translation', 
    label: 'Translation', 
    icon: Globe,
    description: 'Written document translation services'
  },
  { 
    value: 'interpretation', 
    label: 'Interpretation', 
    icon: MessageSquare,
    description: 'Live spoken language interpretation'
  },
  { 
    value: 'localization', 
    label: 'Localization', 
    icon: FileText,
    description: 'Cultural adaptation and localization'
  },
  { 
    value: 'transcription', 
    label: 'Transcription', 
    icon: Headphones,
    description: 'Audio/video to text conversion'
  },
  { 
    value: 'subtitling', 
    label: 'Subtitling', 
    icon: Video,
    description: 'Video subtitle creation and translation'
  },
  { 
    value: 'proofreading', 
    label: 'Proofreading', 
    icon: FileCheck,
    description: 'Translation quality review and editing'
  },
];

// Specialization areas
export const SPECIALIZATIONS = [
  { value: 'legal', label: 'Legal', color: 'blue' },
  { value: 'medical', label: 'Medical', color: 'red' },
  { value: 'technical', label: 'Technical', color: 'purple' },
  { value: 'business', label: 'Business', color: 'green' },
  { value: 'marketing', label: 'Marketing', color: 'orange' },
  { value: 'literary', label: 'Literary', color: 'indigo' },
  { value: 'academic', label: 'Academic', color: 'teal' },
  { value: 'website', label: 'Website', color: 'pink' },
  { value: 'software', label: 'Software', color: 'cyan' },
  { value: 'general', label: 'General', color: 'gray' },
];

// Pricing models
export const PRICING_MODELS = [
  { value: 'per_word', label: 'Per Word', unit: 'word' },
  { value: 'per_hour', label: 'Per Hour', unit: 'hour' },
  { value: 'per_page', label: 'Per Page', unit: 'page' },
  { value: 'per_minute', label: 'Per Minute', unit: 'minute' },
  { value: 'fixed_price', label: 'Fixed Price', unit: 'project' },
];

// Service status options
export const SERVICE_STATUS = [
  { value: 'active', label: 'Active', color: 'green', bgColor: 'bg-green-100', textColor: 'text-green-800' },
  { value: 'inactive', label: 'Inactive', color: 'gray', bgColor: 'bg-gray-100', textColor: 'text-gray-800' },
  { value: 'pending', label: 'Pending Review', color: 'yellow', bgColor: 'bg-yellow-100', textColor: 'text-yellow-800' },
];

// Order status options
export const ORDER_STATUS = [
  { 
    value: 'pending', 
    label: 'Pending', 
    color: 'yellow', 
    bgColor: 'bg-yellow-100', 
    textColor: 'text-yellow-800',
    description: 'Order received, awaiting review'
  },
  { 
    value: 'in_progress', 
    label: 'In Progress', 
    color: 'blue', 
    bgColor: 'bg-blue-100', 
    textColor: 'text-blue-800',
    description: 'Work is currently in progress'
  },
  { 
    value: 'under_review', 
    label: 'Under Review', 
    color: 'purple', 
    bgColor: 'bg-purple-100', 
    textColor: 'text-purple-800',
    description: 'Quality review in progress'
  },
  { 
    value: 'completed', 
    label: 'Completed', 
    color: 'green', 
    bgColor: 'bg-green-100', 
    textColor: 'text-green-800',
    description: 'Order successfully completed'
  },
  { 
    value: 'delivered', 
    label: 'Delivered', 
    color: 'teal', 
    bgColor: 'bg-teal-100', 
    textColor: 'text-teal-800',
    description: 'Work delivered to customer'
  },
  { 
    value: 'cancelled', 
    label: 'Cancelled', 
    color: 'red', 
    bgColor: 'bg-red-100', 
    textColor: 'text-red-800',
    description: 'Order cancelled'
  },
];

// Turnaround time options
export const TURNAROUND_TIMES = [
  { value: '24_hours', label: '24 Hours', hours: 24 },
  { value: '2_days', label: '2 Days', hours: 48 },
  { value: '3_days', label: '3 Days', hours: 72 },
  { value: '1_week', label: '1 Week', hours: 168 },
  { value: '2_weeks', label: '2 Weeks', hours: 336 },
  { value: 'custom', label: 'Custom', hours: null },
];

// Helper functions
export function getLanguagePairLabel(value) {
  const pair = LANGUAGE_PAIRS.find(p => p.value === value);
  return pair ? pair.label : value;
}

export function getServiceTypeLabel(value) {
  const type = SERVICE_TYPES.find(t => t.value === value);
  return type ? type.label : value;
}

export function getServiceTypeIcon(value) {
  const type = SERVICE_TYPES.find(t => t.value === value);
  return type ? type.icon : Languages;
}

export function getSpecializationLabel(value) {
  const spec = SPECIALIZATIONS.find(s => s.value === value);
  return spec ? spec.label : value;
}

export function getSpecializationColor(value) {
  const spec = SPECIALIZATIONS.find(s => s.value === value);
  return spec ? spec.color : 'gray';
}

export function getOrderStatusConfig(value) {
  return ORDER_STATUS.find(s => s.value === value) || ORDER_STATUS[0];
}

export function getServiceStatusConfig(value) {
  return SERVICE_STATUS.find(s => s.value === value) || SERVICE_STATUS[0];
}

export function formatPrice(amount, currency = 'USD', model = 'per_word') {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  
  const pricingModel = PRICING_MODELS.find(pm => pm.value === model);
  const unit = pricingModel ? pricingModel.unit : 'unit';
  
  return `${formatter.format(amount)} / ${unit}`;
}

export function calculateEstimatedPrice(wordCount, pricePerWord) {
  return wordCount * pricePerWord;
}

export function calculateDeliveryDate(turnaroundHours) {
  const now = new Date();
  const deliveryDate = new Date(now.getTime() + (turnaroundHours * 60 * 60 * 1000));
  return deliveryDate.toISOString();
}