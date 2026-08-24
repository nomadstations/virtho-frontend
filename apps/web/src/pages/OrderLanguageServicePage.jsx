import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Upload, Calendar, DollarSign, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PublicBreadcrumb from '@/components/PublicBreadcrumb';
import { useLanguageServices } from '@/hooks/useLanguageServices';
import { useLanguageServiceOrders } from '@/hooks/useLanguageServiceOrders';
import { useToast } from '@/hooks/use-toast';
import { getLanguagePairLabel, formatPrice } from '@/constants/languageServiceConfig';

function OrderLanguageServicePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getServiceById } = useLanguageServices();
  const { createOrder } = useLanguageServiceOrders();
  
  const service = getServiceById(id);

  const [formData, setFormData] = useState({
    sourceLanguage: '',
    targetLanguage: '',
    contentType: 'text',
    content: '',
    wordCount: 0,
    specialRequirements: '',
    deliveryDate: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (formData.content && formData.contentType === 'text') {
      const words = formData.content.trim().split(/\s+/).filter(w => w.length > 0).length;
      setFormData(prev => ({ ...prev, wordCount: words }));
    }
  }, [formData.content, formData.contentType]);

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Service Not Found</h2>
          <p className="text-gray-600 mb-6">The service you're trying to order doesn't exist.</p>
          <Button onClick={() => navigate('/language-services')}>
            Browse Services
          </Button>
        </div>
      </div>
    );
  }

  const getSourceLanguages = () => {
    return [...new Set(service.languagePairs.map(pair => pair.split('-')[0]))];
  };

  const getTargetLanguages = () => {
    if (!formData.sourceLanguage) return [];
    return service.languagePairs
      .filter(pair => pair.startsWith(formData.sourceLanguage + '-'))
      .map(pair => pair.split('-')[1]);
  };

  const calculateTotalPrice = () => {
    if (formData.wordCount === 0) return 0;
    return service.price * formData.wordCount;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.sourceLanguage) {
      newErrors.sourceLanguage = 'Source language is required';
    }
    if (!formData.targetLanguage) {
      newErrors.targetLanguage = 'Target language is required';
    }
    if (!formData.content || formData.content.trim() === '') {
      newErrors.content = 'Content is required';
    }
    if (formData.wordCount === 0) {
      newErrors.content = 'Content must contain at least one word';
    }
    if (!formData.deliveryDate) {
      newErrors.deliveryDate = 'Delivery date is required';
    } else {
      const selectedDate = new Date(formData.deliveryDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.deliveryDate = 'Delivery date cannot be in the past';
      }
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
      const orderData = {
        serviceId: service.id,
        serviceName: service.name,
        providerId: service.providerId,
        providerName: service.providerName,
        serviceType: service.serviceType,
        sourceLanguage: formData.sourceLanguage,
        targetLanguage: formData.targetLanguage,
        contentType: formData.contentType,
        content: formData.content,
        wordCount: formData.wordCount,
        specialRequirements: formData.specialRequirements,
        deliveryDate: formData.deliveryDate,
        pricePerUnit: service.price,
        totalPrice: calculateTotalPrice(),
        currency: service.currency || 'USD',
      };

      const newOrder = createOrder(orderData);

      toast({
        title: 'Order Placed Successfully!',
        description: `Order ID: ${newOrder.id}`,
      });

      // Navigate to language services page instead of order details
      setTimeout(() => {
        navigate('/language-services');
      }, 2000);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to place order. Please try again.',
        variant: 'destructive',
      });
      setIsSubmitting(false);
    }
  };

  const totalPrice = calculateTotalPrice();

  return (
    <>
      <Helmet>
        <title>Order {service.name} | Virtho Foundation</title>
        <meta name="description" content={`Place your order for ${service.name}`} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <PublicBreadcrumb customCrumbs={[
            { label: 'Home', path: '/' },
            { label: 'Language Services', path: '/language-services' },
            { label: service.name, path: `/language-services/${id}` },
            { label: 'Order', path: `/order-language-service/${id}` }
          ]} />

          <Button
            variant="ghost"
            onClick={() => navigate(`/language-services/${id}`)}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Service Details
          </Button>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-md border border-gray-100 p-8"
              >
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Place Your Order</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Language Selection */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="sourceLanguage">Source Language *</Label>
                      <Select
                        value={formData.sourceLanguage}
                        onValueChange={(value) => {
                          setFormData(prev => ({ 
                            ...prev, 
                            sourceLanguage: value, 
                            targetLanguage: '' 
                          }));
                          setErrors(prev => ({ ...prev, sourceLanguage: '' }));
                        }}
                      >
                        <SelectTrigger className={errors.sourceLanguage ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Select source language" />
                        </SelectTrigger>
                        <SelectContent>
                          {getSourceLanguages().map(lang => (
                            <SelectItem key={lang} value={lang}>
                              {lang.toUpperCase()}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.sourceLanguage && (
                        <p className="text-sm text-red-600 mt-1">{errors.sourceLanguage}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="targetLanguage">Target Language *</Label>
                      <Select
                        value={formData.targetLanguage}
                        onValueChange={(value) => {
                          setFormData(prev => ({ ...prev, targetLanguage: value }));
                          setErrors(prev => ({ ...prev, targetLanguage: '' }));
                        }}
                        disabled={!formData.sourceLanguage}
                      >
                        <SelectTrigger className={errors.targetLanguage ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Select target language" />
                        </SelectTrigger>
                        <SelectContent>
                          {getTargetLanguages().map(lang => (
                            <SelectItem key={lang} value={lang}>
                              {lang.toUpperCase()}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.targetLanguage && (
                        <p className="text-sm text-red-600 mt-1">{errors.targetLanguage}</p>
                      )}
                    </div>
                  </div>

                  {/* Content Type */}
                  <div>
                    <Label htmlFor="contentType">Content Type</Label>
                    <Select
                      value={formData.contentType}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, contentType: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">Text</SelectItem>
                        <SelectItem value="document">Document</SelectItem>
                        <SelectItem value="audio">Audio</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Content Input */}
                  <div>
                    <Label htmlFor="content">
                      Content * 
                      {formData.contentType === 'text' && formData.wordCount > 0 && (
                        <span className="text-sm font-normal text-gray-500 ml-2">
                          ({formData.wordCount} words)
                        </span>
                      )}
                    </Label>
                    {formData.contentType === 'text' ? (
                      <Textarea
                        id="content"
                        value={formData.content}
                        onChange={(e) => {
                          setFormData(prev => ({ ...prev, content: e.target.value }));
                          setErrors(prev => ({ ...prev, content: '' }));
                        }}
                        placeholder="Enter the text you want to be translated..."
                        rows={10}
                        className={`resize-none ${errors.content ? 'border-red-500' : ''}`}
                      />
                    ) : (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600 mb-2">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-sm text-gray-500">
                          Supported formats: PDF, DOC, DOCX, MP3, MP4
                        </p>
                      </div>
                    )}
                    {errors.content && (
                      <p className="text-sm text-red-600 mt-1">{errors.content}</p>
                    )}
                  </div>

                  {/* Special Requirements */}
                  <div>
                    <Label htmlFor="specialRequirements">Special Requirements (Optional)</Label>
                    <Textarea
                      id="specialRequirements"
                      value={formData.specialRequirements}
                      onChange={(e) => setFormData(prev => ({ ...prev, specialRequirements: e.target.value }))}
                      placeholder="Any special instructions or requirements..."
                      rows={4}
                      className="resize-none"
                    />
                  </div>

                  {/* Delivery Date */}
                  <div>
                    <Label htmlFor="deliveryDate">Delivery Date *</Label>
                    <Input
                      type="date"
                      id="deliveryDate"
                      value={formData.deliveryDate}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, deliveryDate: e.target.value }));
                        setErrors(prev => ({ ...prev, deliveryDate: '' }));
                      }}
                      min={new Date().toISOString().split('T')[0]}
                      className={errors.deliveryDate ? 'border-red-500' : ''}
                    />
                    {errors.deliveryDate && (
                      <p className="text-sm text-red-600 mt-1">{errors.deliveryDate}</p>
                    )}
                    <p className="text-sm text-gray-500 mt-1">
                      Expected turnaround time: {service.turnaroundTime}
                    </p>
                  </div>

                  {/* Form Actions */}
                  <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                      size="lg"
                    >
                      {isSubmitting ? (
                        <>Processing...</>
                      ) : (
                        <>
                          <Check className="w-5 h-5 mr-2" />
                          Place Order
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate(`/language-services/${id}`)}
                      disabled={isSubmitting}
                      size="lg"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </motion.div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-xl shadow-md border border-gray-100 p-6"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Service</p>
                      <p className="font-semibold text-gray-900">{service.name}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 mb-1">Provider</p>
                      <p className="font-semibold text-gray-900">{service.providerName}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 mb-1">Base Price</p>
                      <p className="font-semibold text-gray-900">
                        {formatPrice(service.price, service.currency, service.pricingModel)}
                      </p>
                    </div>

                    {formData.sourceLanguage && formData.targetLanguage && (
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Translation</p>
                        <p className="font-semibold text-gray-900">
                          {formData.sourceLanguage.toUpperCase()} → {formData.targetLanguage.toUpperCase()}
                        </p>
                      </div>
                    )}

                    {formData.wordCount > 0 && (
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Word Count</p>
                        <p className="font-semibold text-gray-900">{formData.wordCount} words</p>
                      </div>
                    )}

                    {formData.deliveryDate && (
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Delivery Date</p>
                        <p className="font-semibold text-gray-900 flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          {new Date(formData.deliveryDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    )}

                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-600">Calculation</span>
                        <span className="text-sm text-gray-500">
                          {formData.wordCount} × ${service.price}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-gray-900 flex items-center gap-2">
                          <DollarSign className="w-5 h-5 text-green-600" />
                          Total Price
                        </span>
                        <span className="text-2xl font-extrabold text-green-600">
                          ${totalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderLanguageServicePage;