import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import DashboardBreadcrumb from '@/components/DashboardBreadcrumb';
import DashboardPageHeader from '@/components/dashboard/DashboardPageHeader';
import ConfirmDeleteModal from '@/components/modals/ConfirmDeleteModal';
import { useLanguageServices } from '@/hooks/useLanguageServices';
import { useToast } from '@/hooks/use-toast';
import { LANGUAGE_PAIRS, SERVICE_TYPES, PRICING_MODELS, SPECIALIZATIONS } from '@/constants/languageServiceConfig';

function LanguageServiceDetailsManagementPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getServiceById, updateService, deleteService } = useLanguageServices();
  
  const service = getServiceById(id);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    languagePairs: [],
    serviceType: '',
    pricingModel: '',
    price: '',
    turnaroundTime: '',
    specializations: [],
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (service) {
      setFormData({
        name: service.name || '',
        description: service.description || '',
        languagePairs: service.languagePairs || [],
        serviceType: service.serviceType || '',
        pricingModel: service.pricingModel || '',
        price: service.price?.toString() || '',
        turnaroundTime: service.turnaroundTime || '',
        specializations: service.specializations || [],
      });
    }
  }, [service]);

  useEffect(() => {
    if (service) {
      const changed = 
        formData.name !== service.name ||
        formData.description !== service.description ||
        JSON.stringify(formData.languagePairs) !== JSON.stringify(service.languagePairs) ||
        formData.serviceType !== service.serviceType ||
        formData.pricingModel !== service.pricingModel ||
        parseFloat(formData.price) !== service.price ||
        formData.turnaroundTime !== service.turnaroundTime ||
        JSON.stringify(formData.specializations) !== JSON.stringify(service.specializations);
      
      setHasChanges(changed);
    }
  }, [formData, service]);

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Service Not Found</h2>
          <p className="text-gray-600 mb-6">The service you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/dashboard/language-services')}>
            Back to Language Services
          </Button>
        </div>
      </div>
    );
  }

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name || formData.name.trim().length < 3) {
      newErrors.name = 'Service name must be at least 3 characters';
    }
    if (formData.name.length > 100) {
      newErrors.name = 'Service name must not exceed 100 characters';
    }

    if (!formData.description || formData.description.trim().length < 50) {
      newErrors.description = 'Description must be at least 50 characters';
    }
    if (formData.description.length > 1000) {
      newErrors.description = 'Description must not exceed 1000 characters';
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

    if (!formData.turnaroundTime || formData.turnaroundTime.trim() === '') {
      newErrors.turnaroundTime = 'Turnaround time is required';
    }

    if (formData.specializations.length === 0) {
      newErrors.specializations = 'At least one specialization is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields correctly.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const updates = {
        ...formData,
        price: parseFloat(formData.price),
      };

      updateService(id, updates);

      toast({
        title: 'Service updated successfully!',
        description: 'Your changes have been saved.',
      });

      setTimeout(() => {
        navigate('/dashboard/language-services');
      }, 2000);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update service. Please try again.',
        variant: 'destructive',
      });
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteService(id);
      
      toast({
        title: 'Service deleted successfully',
        description: `${service.name} has been removed.`,
      });
      
      setShowDeleteModal(false);
      navigate('/dashboard/language-services');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete service. Please try again.',
        variant: 'destructive',
      });
      setIsDeleting(false);
    }
  };

  const handleLanguagePairToggle = (pairValue) => {
    setFormData(prev => ({
      ...prev,
      languagePairs: prev.languagePairs.includes(pairValue)
        ? prev.languagePairs.filter(p => p !== pairValue)
        : [...prev.languagePairs, pairValue]
    }));
    setErrors(prev => ({ ...prev, languagePairs: '' }));
  };

  const handleSpecializationToggle = (specValue) => {
    setFormData(prev => ({
      ...prev,
      specializations: prev.specializations.includes(specValue)
        ? prev.specializations.filter(s => s !== specValue)
        : [...prev.specializations, specValue]
    }));
    setErrors(prev => ({ ...prev, specializations: '' }));
  };

  return (
    <>
      <Helmet>
        <title>Edit {service.name} | Dashboard | Virtho Foundation</title>
        <meta name="description" content="Update your language service details" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <DashboardBreadcrumb customCrumbs={[
            { label: 'Dashboard', path: '/dashboard' },
            { label: 'Language Services', path: '/dashboard/language-services' },
            { label: service.name, path: `/dashboard/language-services/${id}` }
          ]} />

          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard/language-services')}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Language Services
          </Button>

          <DashboardPageHeader
            title="Edit Language Service"
            description="Update your service details"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-md border border-gray-100 p-8 mt-8"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Service Information Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-900 pb-3 border-b border-gray-200">
                  Service Information
                </h3>

                <div>
                  <Label htmlFor="name">Service Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, name: e.target.value }));
                      setErrors(prev => ({ ...prev, name: '' }));
                    }}
                    placeholder="e.g., Professional English to Spanish Translation"
                    className={errors.name ? 'border-red-500' : ''}
                  />
                  {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
                  <p className="text-sm text-gray-500 mt-1">
                    {formData.name.length}/100 characters
                  </p>
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, description: e.target.value }));
                      setErrors(prev => ({ ...prev, description: '' }));
                    }}
                    placeholder="Describe your language service in detail..."
                    rows={6}
                    className={`resize-none ${errors.description ? 'border-red-500' : ''}`}
                  />
                  {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description}</p>}
                  <p className="text-sm text-gray-500 mt-1">
                    {formData.description.length}/1000 characters (minimum 50)
                  </p>
                </div>
              </div>

              {/* Language & Type Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-900 pb-3 border-b border-gray-200">
                  Language & Type
                </h3>

                <div>
                  <Label>Language Pairs * (Select at least one)</Label>
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-4">
                    {LANGUAGE_PAIRS.slice(0, 20).map(pair => (
                      <div key={pair.value} className="flex items-center gap-2">
                        <Checkbox
                          id={`pair-${pair.value}`}
                          checked={formData.languagePairs.includes(pair.value)}
                          onCheckedChange={() => handleLanguagePairToggle(pair.value)}
                        />
                        <Label htmlFor={`pair-${pair.value}`} className="cursor-pointer text-sm">
                          {pair.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {errors.languagePairs && <p className="text-sm text-red-600 mt-1">{errors.languagePairs}</p>}
                  <p className="text-sm text-gray-500 mt-1">
                    {formData.languagePairs.length} selected
                  </p>
                </div>

                <div>
                  <Label htmlFor="serviceType">Service Type *</Label>
                  <Select
                    value={formData.serviceType}
                    onValueChange={(value) => {
                      setFormData(prev => ({ ...prev, serviceType: value }));
                      setErrors(prev => ({ ...prev, serviceType: '' }));
                    }}
                  >
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
                  {errors.serviceType && <p className="text-sm text-red-600 mt-1">{errors.serviceType}</p>}
                </div>
              </div>

              {/* Pricing Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-900 pb-3 border-b border-gray-200">
                  Pricing
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="pricingModel">Pricing Model *</Label>
                    <Select
                      value={formData.pricingModel}
                      onValueChange={(value) => {
                        setFormData(prev => ({ ...prev, pricingModel: value }));
                        setErrors(prev => ({ ...prev, pricingModel: '' }));
                      }}
                    >
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
                    {errors.pricingModel && <p className="text-sm text-red-600 mt-1">{errors.pricingModel}</p>}
                  </div>

                  <div>
                    <Label htmlFor="price">Base Price (USD) *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.price}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, price: e.target.value }));
                        setErrors(prev => ({ ...prev, price: '' }));
                      }}
                      placeholder="0.00"
                      className={errors.price ? 'border-red-500' : ''}
                    />
                    {errors.price && <p className="text-sm text-red-600 mt-1">{errors.price}</p>}
                  </div>
                </div>
              </div>

              {/* Details Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-900 pb-3 border-b border-gray-200">
                  Details
                </h3>

                <div>
                  <Label htmlFor="turnaroundTime">Turnaround Time *</Label>
                  <Input
                    id="turnaroundTime"
                    value={formData.turnaroundTime}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, turnaroundTime: e.target.value }));
                      setErrors(prev => ({ ...prev, turnaroundTime: '' }));
                    }}
                    placeholder="e.g., 2-3 days, 1 week, 24 hours"
                    className={errors.turnaroundTime ? 'border-red-500' : ''}
                  />
                  {errors.turnaroundTime && <p className="text-sm text-red-600 mt-1">{errors.turnaroundTime}</p>}
                </div>

                <div>
                  <Label>Specializations * (Select at least one)</Label>
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-4">
                    {SPECIALIZATIONS.map(spec => (
                      <div key={spec.value} className="flex items-center gap-2">
                        <Checkbox
                          id={`spec-${spec.value}`}
                          checked={formData.specializations.includes(spec.value)}
                          onCheckedChange={() => handleSpecializationToggle(spec.value)}
                        />
                        <Label htmlFor={`spec-${spec.value}`} className="cursor-pointer text-sm">
                          {spec.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {errors.specializations && <p className="text-sm text-red-600 mt-1">{errors.specializations}</p>}
                  <p className="text-sm text-gray-500 mt-1">
                    {formData.specializations.length} selected
                  </p>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col md:flex-row items-center gap-4 pt-6 border-t border-gray-200">
                <Button
                  type="submit"
                  disabled={isSubmitting || !hasChanges}
                  className="w-full md:w-auto bg-blue-600 hover:bg-blue-700"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>Saving...</>
                  ) : (
                    <>
                      <Save className="w-5 h-5 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/dashboard/language-services')}
                  disabled={isSubmitting}
                  size="lg"
                  className="w-full md:w-auto"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => setShowDeleteModal(true)}
                  disabled={isSubmitting}
                  size="lg"
                  className="w-full md:w-auto md:ml-auto bg-red-600 hover:bg-red-700"
                >
                  <Trash2 className="w-5 h-5 mr-2" />
                  Delete Service
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        onClose={() => !isDeleting && setShowDeleteModal(false)}
        onConfirm={handleDelete}
        serviceName={service.name}
        hasAssociatedOrders={service.totalOrders > 0}
        isLoading={isDeleting}
      />
    </>
  );
}

export default LanguageServiceDetailsManagementPage;