import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { useLanguageServices } from '@/hooks/useLanguageServices';
import { 
  LANGUAGE_PAIRS, 
  SERVICE_TYPES, 
  SPECIALIZATIONS, 
  PRICING_MODELS, 
  TURNAROUND_TIMES 
} from '@/constants/languageServiceConfig';

export function EditLanguageServiceModal({ isOpen, onClose, service }) {
  const { toast } = useToast();
  const { updateService } = useLanguageServices();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    languagePairs: [],
    serviceType: '',
    pricingModel: '',
    price: '',
    currency: 'USD',
    turnaroundTime: '',
    turnaroundHours: '',
    specializations: [],
  });

  const [errors, setErrors] = useState({});

  // Pre-populate form when service changes or modal opens
  useEffect(() => {
    if (service && isOpen) {
      const turnaroundConfig = TURNAROUND_TIMES.find(t => t.value === service.turnaroundTime);
      
      setFormData({
        name: service.name || '',
        description: service.description || '',
        languagePairs: service.languagePairs || [],
        serviceType: service.serviceType || '',
        pricingModel: service.pricingModel || '',
        price: service.price?.toString() || '',
        currency: service.currency || 'USD',
        turnaroundTime: service.turnaroundTime || '',
        turnaroundHours: turnaroundConfig?.hours?.toString() || '',
        specializations: service.specializations || [],
      });
      setErrors({});
    }
  }, [service, isOpen]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleLanguagePairToggle = (pairValue) => {
    setFormData(prev => ({
      ...prev,
      languagePairs: prev.languagePairs.includes(pairValue)
        ? prev.languagePairs.filter(p => p !== pairValue)
        : [...prev.languagePairs, pairValue]
    }));
    if (errors.languagePairs) {
      setErrors(prev => ({ ...prev, languagePairs: '' }));
    }
  };

  const handleSpecializationToggle = (specValue) => {
    setFormData(prev => ({
      ...prev,
      specializations: prev.specializations.includes(specValue)
        ? prev.specializations.filter(s => s !== specValue)
        : [...prev.specializations, specValue]
    }));
    if (errors.specializations) {
      setErrors(prev => ({ ...prev, specializations: '' }));
    }
  };

  const handleTurnaroundTimeChange = (value) => {
    const selected = TURNAROUND_TIMES.find(t => t.value === value);
    setFormData(prev => ({
      ...prev,
      turnaroundTime: value,
      turnaroundHours: selected?.hours?.toString() || ''
    }));
    if (errors.turnaroundTime) {
      setErrors(prev => ({ ...prev, turnaroundTime: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Service name is required';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Service name must be at least 3 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    if (formData.languagePairs.length === 0) {
      newErrors.languagePairs = 'At least one language pair is required';
    }

    if (!formData.serviceType) {
      newErrors.serviceType = 'Service type is required';
    }

    if (!formData.pricingModel) {
      newErrors.pricingModel = 'Pricing model is required';
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }

    if (!formData.turnaroundTime) {
      newErrors.turnaroundTime = 'Turnaround time is required';
    }

    if (formData.specializations.length === 0) {
      newErrors.specializations = 'At least one specialization is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields correctly.',
        variant: 'destructive',
      });
      return;
    }

    try {
      updateService(service.id, {
        ...formData,
        price: parseFloat(formData.price),
      });

      toast({
        title: 'Success!',
        description: 'Service updated successfully',
      });

      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update service. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleCancel = () => {
    setErrors({});
    onClose();
  };

  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-gray-900">Edit Language Service</h2>
          <Button variant="ghost" size="icon" onClick={handleCancel}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Service Name */}
          <div>
            <Label htmlFor="edit-name">Service Name *</Label>
            <Input
              id="edit-name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="e.g., Professional English-Spanish Translation"
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="edit-description">Description *</Label>
            <Textarea
              id="edit-description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe your language service..."
              rows={4}
              className={errors.description ? 'border-red-500' : ''}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          {/* Language Pairs */}
          <div>
            <Label>Language Pairs *</Label>
            <div className="mt-2 grid grid-cols-2 gap-3 max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-3">
              {LANGUAGE_PAIRS.map(pair => (
                <div key={pair.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`edit-lang-${pair.value}`}
                    checked={formData.languagePairs.includes(pair.value)}
                    onCheckedChange={() => handleLanguagePairToggle(pair.value)}
                  />
                  <label htmlFor={`edit-lang-${pair.value}`} className="text-sm cursor-pointer">
                    {pair.label}
                  </label>
                </div>
              ))}
            </div>
            {errors.languagePairs && <p className="text-red-500 text-sm mt-1">{errors.languagePairs}</p>}
          </div>

          {/* Service Type */}
          <div>
            <Label htmlFor="edit-serviceType">Service Type *</Label>
            <Select value={formData.serviceType} onValueChange={(value) => handleInputChange('serviceType', value)}>
              <SelectTrigger className={errors.serviceType ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select service type" />
              </SelectTrigger>
              <SelectContent>
                {SERVICE_TYPES.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.serviceType && <p className="text-red-500 text-sm mt-1">{errors.serviceType}</p>}
          </div>

          {/* Pricing Model and Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-pricingModel">Pricing Model *</Label>
              <Select value={formData.pricingModel} onValueChange={(value) => handleInputChange('pricingModel', value)}>
                <SelectTrigger className={errors.pricingModel ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select pricing model" />
                </SelectTrigger>
                <SelectContent>
                  {PRICING_MODELS.map(model => (
                    <SelectItem key={model.value} value={model.value}>
                      {model.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.pricingModel && <p className="text-red-500 text-sm mt-1">{errors.pricingModel}</p>}
            </div>

            <div>
              <Label htmlFor="edit-price">Base Price (USD) *</Label>
              <Input
                id="edit-price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                placeholder="0.00"
                className={errors.price ? 'border-red-500' : ''}
              />
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
            </div>
          </div>

          {/* Turnaround Time */}
          <div>
            <Label htmlFor="edit-turnaroundTime">Turnaround Time *</Label>
            <Select value={formData.turnaroundTime} onValueChange={handleTurnaroundTimeChange}>
              <SelectTrigger className={errors.turnaroundTime ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select turnaround time" />
              </SelectTrigger>
              <SelectContent>
                {TURNAROUND_TIMES.map(time => (
                  <SelectItem key={time.value} value={time.value}>
                    {time.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.turnaroundTime && <p className="text-red-500 text-sm mt-1">{errors.turnaroundTime}</p>}
          </div>

          {/* Specializations */}
          <div>
            <Label>Specializations *</Label>
            <div className="mt-2 grid grid-cols-2 gap-3 border border-gray-200 rounded-lg p-3">
              {SPECIALIZATIONS.map(spec => (
                <div key={spec.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`edit-spec-${spec.value}`}
                    checked={formData.specializations.includes(spec.value)}
                    onCheckedChange={() => handleSpecializationToggle(spec.value)}
                  />
                  <label htmlFor={`edit-spec-${spec.value}`} className="text-sm cursor-pointer">
                    {spec.label}
                  </label>
                </div>
              ))}
            </div>
            {errors.specializations && <p className="text-red-500 text-sm mt-1">{errors.specializations}</p>}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default EditLanguageServiceModal;