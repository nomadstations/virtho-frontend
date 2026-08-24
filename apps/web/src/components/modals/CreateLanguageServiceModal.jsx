import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { 
  LANGUAGE_PAIRS, 
  SERVICE_TYPES, 
  SPECIALIZATIONS, 
  PRICING_MODELS, 
  TURNAROUND_TIMES 
} from '@/constants/languageServiceConfig';
import { useLanguageServices } from '@/hooks/useLanguageServices';
import '@/styles/QuickActionsModals.css';

function CreateLanguageServiceModal({ isOpen, onClose }) {
  const { toast } = useToast();
  const { createService } = useLanguageServices();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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
  };

  const handleSpecializationToggle = (specValue) => {
    setFormData(prev => ({
      ...prev,
      specializations: prev.specializations.includes(specValue)
        ? prev.specializations.filter(s => s !== specValue)
        : [...prev.specializations, specValue]
    }));
  };

  const handleTurnaroundTimeChange = (value) => {
    const selected = TURNAROUND_TIMES.find(t => t.value === value);
    setFormData(prev => ({
      ...prev,
      turnaroundTime: value,
      turnaroundHours: selected?.hours || ''
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Service name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.languagePairs.length === 0) newErrors.languagePairs = 'At least one language pair is required';
    if (!formData.serviceType) newErrors.serviceType = 'Service type is required';
    if (!formData.pricingModel) newErrors.pricingModel = 'Pricing model is required';
    if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = 'Valid price is required';
    if (!formData.turnaroundTime) newErrors.turnaroundTime = 'Turnaround time is required';
    if (formData.specializations.length === 0) newErrors.specializations = 'At least one specialization is required';
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
      createService({
        ...formData,
        price: parseFloat(formData.price),
      });
      toast({ title: 'Success!', description: 'Language service created successfully.' });
      setFormData({
        name: '', description: '', languagePairs: [], serviceType: '', pricingModel: '',
        price: '', currency: 'USD', turnaroundTime: '', turnaroundHours: '', specializations: [],
      });
      setErrors({});
      onClose();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to create service. Please try again.', variant: 'destructive' });
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="qa-modal-overlay" onClick={onClose} />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, x: "-50%", y: "-40%" }}
            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
            exit={{ opacity: 0, scale: 0.95, x: "-50%", y: "-40%" }}
            transition={{ duration: 0.2 }}
            className="qa-modal-container qa-modal-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="qa-modal-header">
              <h2 className="text-2xl font-bold text-gray-900">Create Language Service</h2>
              <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close modal">
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="qa-modal-content">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Service Name *</Label>
                  <Input id="name" value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} placeholder="e.g., Professional English-Spanish Translation" className={errors.name ? 'border-red-500 text-gray-900' : 'text-gray-900'} />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea id="description" value={formData.description} onChange={(e) => handleInputChange('description', e.target.value)} placeholder="Describe your language service..." rows={4} className={errors.description ? 'border-red-500 text-gray-900' : 'text-gray-900'} />
                  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>

                <div>
                  <Label>Language Pairs *</Label>
                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-3">
                    {LANGUAGE_PAIRS.map(pair => (
                      <div key={pair.value} className="flex items-center space-x-2">
                        <Checkbox id={`lang-${pair.value}`} checked={formData.languagePairs.includes(pair.value)} onCheckedChange={() => handleLanguagePairToggle(pair.value)} />
                        <label htmlFor={`lang-${pair.value}`} className="text-sm cursor-pointer text-gray-900">{pair.label}</label>
                      </div>
                    ))}
                  </div>
                  {errors.languagePairs && <p className="text-red-500 text-sm mt-1">{errors.languagePairs}</p>}
                </div>

                <div>
                  <Label htmlFor="serviceType">Service Type *</Label>
                  <Select value={formData.serviceType} onValueChange={(value) => handleInputChange('serviceType', value)}>
                    <SelectTrigger className={errors.serviceType ? 'border-red-500 text-gray-900' : 'text-gray-900'}><SelectValue placeholder="Select service type" /></SelectTrigger>
                    <SelectContent>
                      {SERVICE_TYPES.map(type => (
                        <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.serviceType && <p className="text-red-500 text-sm mt-1">{errors.serviceType}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="pricingModel">Pricing Model *</Label>
                    <Select value={formData.pricingModel} onValueChange={(value) => handleInputChange('pricingModel', value)}>
                      <SelectTrigger className={errors.pricingModel ? 'border-red-500 text-gray-900' : 'text-gray-900'}><SelectValue placeholder="Select pricing model" /></SelectTrigger>
                      <SelectContent>
                        {PRICING_MODELS.map(model => (
                          <SelectItem key={model.value} value={model.value}>{model.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.pricingModel && <p className="text-red-500 text-sm mt-1">{errors.pricingModel}</p>}
                  </div>
                  <div>
                    <Label htmlFor="price">Base Price (USD) *</Label>
                    <Input id="price" type="number" step="0.01" min="0" value={formData.price} onChange={(e) => handleInputChange('price', e.target.value)} placeholder="0.00" className={errors.price ? 'border-red-500 text-gray-900' : 'text-gray-900'} />
                    {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="turnaroundTime">Turnaround Time *</Label>
                  <Select value={formData.turnaroundTime} onValueChange={handleTurnaroundTimeChange}>
                    <SelectTrigger className={errors.turnaroundTime ? 'border-red-500 text-gray-900' : 'text-gray-900'}><SelectValue placeholder="Select turnaround time" /></SelectTrigger>
                    <SelectContent>
                      {TURNAROUND_TIMES.map(time => (
                        <SelectItem key={time.value} value={time.value}>{time.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.turnaroundTime && <p className="text-red-500 text-sm mt-1">{errors.turnaroundTime}</p>}
                </div>

                <div>
                  <Label>Specializations *</Label>
                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 border border-gray-200 rounded-lg p-3">
                    {SPECIALIZATIONS.map(spec => (
                      <div key={spec.value} className="flex items-center space-x-2">
                        <Checkbox id={`spec-${spec.value}`} checked={formData.specializations.includes(spec.value)} onCheckedChange={() => handleSpecializationToggle(spec.value)} />
                        <label htmlFor={`spec-${spec.value}`} className="text-sm cursor-pointer text-gray-900">{spec.label}</label>
                      </div>
                    ))}
                  </div>
                  {errors.specializations && <p className="text-red-500 text-sm mt-1">{errors.specializations}</p>}
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <Button type="button" variant="outline" onClick={onClose} className="text-gray-700">Cancel</Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white"><Plus className="w-4 h-4 mr-2" />Create Service</Button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default CreateLanguageServiceModal;