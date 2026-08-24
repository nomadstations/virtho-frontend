import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { SimpleModal } from './SimpleModal.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { MultiStepProgressBar } from '@/components/MultiStepProgressBar.jsx';

const MOCK_MEMBERS = [
  { id: 'm1', name: 'Alice Green' },
  { id: 'm2', name: 'Bob White' },
  { id: 'm3', name: 'Carol Blue' },
  { id: 'm4', name: 'David Red' }
];

export default function AddGroupWizard({ isOpen, onClose, initialData = null, onSave = null }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    structure: 'Horizontal - Network',
    visibility: 'Closed Group',
    purpose: '',
    selectedMembers: []
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
          structure: initialData.structure || 'Horizontal - Network',
          visibility: initialData.visibility || 'Closed Group',
          purpose: initialData.purpose || '',
          selectedMembers: initialData.selectedMembers || []
        });
      } else {
        setFormData({
          name: '',
          structure: 'Horizontal - Network',
          visibility: 'Closed Group',
          purpose: '',
          selectedMembers: []
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

  const toggleMember = (memberId) => {
    setFormData(prev => {
      const isSelected = prev.selectedMembers.includes(memberId);
      return {
        ...prev,
        selectedMembers: isSelected
          ? prev.selectedMembers.filter(id => id !== memberId)
          : [...prev.selectedMembers, memberId]
      };
    });
    if (errors.selectedMembers) {
      setErrors(prev => ({ ...prev, selectedMembers: null }));
    }
  };

  const removeMember = (memberId) => {
    setFormData(prev => ({
      ...prev,
      selectedMembers: prev.selectedMembers.filter(id => id !== memberId)
    }));
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = 'Group name must be at least 2 characters.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (formData.selectedMembers.length === 0) {
      newErrors.selectedMembers = 'At least one member is required.';
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
    const groupData = {
      id: initialData?.id || Date.now().toString(),
      ...formData,
      category: formData.structure,
      description: formData.purpose,
      createdAt: initialData?.createdAt || new Date().toISOString()
    };
    setTimeout(() => {
      setIsSubmitting(false);
      if (onSave) {
        onSave(groupData);
      } else {
        toast({
          title: "Success",
          description: `Group ${initialData ? 'updated' : 'created'} successfully!`,
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

  const selectedMemberObjects = MOCK_MEMBERS.filter(m => formData.selectedMembers.includes(m.id));

  return (
    <SimpleModal isOpen={isOpen} onClose={handleClose} title={initialData ? "Edit Group" : "Create New Group"}>
      <div className="mb-8 px-4">
        <MultiStepProgressBar currentStep={step} totalSteps={2} stepLabels={['Basic Info', 'Members']} />
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
                <Label htmlFor="groupName" className="text-gray-900">
                  Group Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="groupName"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  placeholder="e.g., Marketing Team Alpha"
                  className={errors.name ? 'border-red-500 text-gray-900' : 'text-gray-900'}
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label className="text-gray-900">Group Structure</Label>
                <Select value={formData.structure} onValueChange={(val) => updateFormData('structure', val)}>
                  <SelectTrigger className="text-gray-900">
                    <SelectValue placeholder="Select Structure" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Horizontal - Network">Horizontal - Network</SelectItem>
                    <SelectItem value="Hierarchical">Hierarchical</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-900">Group Visibility</Label>
                <Select value={formData.visibility} onValueChange={(val) => updateFormData('visibility', val)}>
                  <SelectTrigger className="text-gray-900">
                    <SelectValue placeholder="Select Visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Closed Group">Closed Group</SelectItem>
                    <SelectItem value="Open Group">Open Group</SelectItem>
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
              <div className="space-y-2">
                <Label htmlFor="purpose" className="text-gray-900">Group Purpose / Goal</Label>
                <Input id="purpose" value={formData.purpose} onChange={(e) => updateFormData('purpose', e.target.value)} placeholder="What is this group for?" className="text-gray-900"/>
              </div>
              <div className="space-y-2">
                <Label className="text-gray-900">
                  Select Members <span className="text-red-500">*</span>
                </Label>
                <div className="border border-gray-200 rounded-md p-3 space-y-2 bg-gray-50">
                  {MOCK_MEMBERS.map((member) => (
                    <div key={member.id} className="flex items-center gap-2">
                      <Checkbox id={member.id} checked={formData.selectedMembers.includes(member.id)} onCheckedChange={() => toggleMember(member.id)}/>
                      <Label htmlFor={member.id} className="text-gray-900 cursor-pointer">
                        {member.name}
                      </Label>
                    </div>
                  ))}
                </div>
                {errors.selectedMembers && <p className="text-sm text-red-500">{errors.selectedMembers}</p>}
              </div>

              {selectedMemberObjects.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-gray-900">Selected Members</Label>
                  <div className="flex flex-wrap gap-2">
                    {selectedMemberObjects.map((member) => (
                      <div key={member.id} className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        <span>{member.name}</span>
                        <button type="button" onClick={() => removeMember(member.id)} className="hover:bg-blue-200 rounded-full p-0.5 transition-colors" aria-label={`Remove ${member.name}`}>
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-6">
                <Button type="button" variant="outline" onClick={handleBack} className="bg-gray-100 hover:bg-gray-200 text-gray-700 border-none">
                  Back
                </Button>
                <Button type="button" onClick={handleSubmit} disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 text-white">
                  {isSubmitting ? 'Creating...' : 'Create Group'}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SimpleModal>
  );
}