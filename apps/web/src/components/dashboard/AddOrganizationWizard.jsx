import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SimpleModal } from './SimpleModal.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { MultiStepProgressBar } from '@/components/MultiStepProgressBar.jsx';

function AddOrganizationWizard({ isOpen, onClose, initialData = null, onSave = null }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    structure: 'Hierarchical',
    type: 'Commercial',
    contactPerson: '',
    contactEmail: '',
    address: '',
    website: '',
    description: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      if (initialData) {
        setFormData({
          name: initialData.name || '',
          structure: initialData.structure || 'Hierarchical',
          type: initialData.type || 'Commercial',
          contactPerson: initialData.contactPerson || '',
          contactEmail: initialData.contactEmail || '',
          address: initialData.address || '',
          website: initialData.website || '',
          description: initialData.description || ''
        });
      } else {
        setFormData({
          name: '',
          structure: 'Hierarchical',
          type: 'Commercial',
          contactPerson: '',
          contactEmail: '',
          address: '',
          website: '',
          description: ''
        });
      }
      setErrors({});
    }
  }, [isOpen, initialData]);

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = 'Organization name must be at least 2 characters.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.contactEmail || !/^\S+@\S+\.\S+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'A valid contact email is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = async () => {
    if (!validateStep2()) return;
    setIsSubmitting(true);
    const orgData = {
      id: initialData?.id || Date.now().toString(),
      ...formData,
      category: formData.type,
      createdAt: initialData?.createdAt || new Date().toISOString()
    };
    setTimeout(() => {
      setIsSubmitting(false);
      if (onSave) {
        onSave(orgData);
      } else {
        toast({
          title: "Success",
          description: `Organization ${initialData ? 'updated' : 'created'} successfully!`,
        });
      }
      onClose();
    }, 500);
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <SimpleModal isOpen={isOpen} onClose={handleClose} title={initialData ? "Edit Organization" : "Create New Organization"}>
      <div className="mb-8 px-4">
        <MultiStepProgressBar currentStep={step} totalSteps={2} stepLabels={['Basic Info', 'Details']} />
      </div>

      <div className="overflow-hidden min-h-[350px]">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="orgName" className="text-gray-900">
                  Organization Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="orgName"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  placeholder="e.g., Global Innovations Inc."
                  className={errors.name ? 'border-red-500 text-gray-900' : 'text-gray-900'}
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label className="text-gray-900">Organizational Structure</Label>
                <Select value={formData.structure} onValueChange={(val) => updateFormData('structure', val)}>
                  <SelectTrigger className="text-gray-900">
                    <SelectValue placeholder="Select Structure" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Hierarchical">Hierarchical</SelectItem>
                    <SelectItem value="Horizontal - Network">Horizontal - Network</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-900">Organization Type</Label>
                <Select value={formData.type} onValueChange={(val) => updateFormData('type', val)}>
                  <SelectTrigger className="text-gray-900">
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Commercial">Commercial</SelectItem>
                    <SelectItem value="Non-profit">Non-profit</SelectItem>
                    <SelectItem value="Public">Public</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end gap-3 pt-6">
                <Button type="button" variant="outline" onClick={handleClose} className="bg-gray-100 hover:bg-gray-200 text-gray-700 border-none">
                  Cancel
                </Button>
                <Button type="button" onClick={handleNext} className="bg-blue-600 hover:bg-blue-700 text-white">
                  Next Step
                </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactPerson" className="text-gray-900">Primary Contact Person</Label>
                  <Input id="contactPerson" value={formData.contactPerson} onChange={(e) => updateFormData('contactPerson', e.target.value)} placeholder="e.g., Jane Doe" className="text-gray-900"/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail" className="text-gray-900">Contact Email <span className="text-red-500">*</span></Label>
                  <Input id="contactEmail" type="email" value={formData.contactEmail} onChange={(e) => updateFormData('contactEmail', e.target.value)} placeholder="jane@example.com" className={errors.contactEmail ? 'border-red-500 text-gray-900' : 'text-gray-900'}/>
                  {errors.contactEmail && <p className="text-sm text-red-500">{errors.contactEmail}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-gray-900">Main Address</Label>
                  <Input id="address" value={formData.address} onChange={(e) => updateFormData('address', e.target.value)} placeholder="123 Business Rd." className="text-gray-900"/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website" className="text-gray-900">Website URL</Label>
                  <Input id="website" value={formData.website} onChange={(e) => updateFormData('website', e.target.value)} placeholder="https://example.com" className="text-gray-900"/>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="orgDesc" className="text-gray-900">Organization Description</Label>
                <Textarea id="orgDesc" value={formData.description} onChange={(e) => updateFormData('description', e.target.value)} placeholder="Tell us about this organization..." className="text-gray-900 min-h-[100px]"/>
              </div>

              <div className="flex justify-between pt-6">
                <Button type="button" variant="outline" onClick={handleBack} className="bg-gray-100 hover:bg-gray-200 text-gray-700 border-none">
                  Back
                </Button>
                <Button type="button" onClick={handleSubmit} disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 text-white">
                  {isSubmitting ? 'Creating...' : 'Finish and Create'}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SimpleModal>
  );
}

export default AddOrganizationWizard;