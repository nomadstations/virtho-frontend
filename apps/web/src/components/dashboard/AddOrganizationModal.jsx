import React, { useState, useEffect } from 'react';
import { SimpleModal } from './SimpleModal.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

export function AddOrganizationModal({ isOpen, onClose, initialData = null, onSave = null }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setName(initialData.name || '');
        setDescription(initialData.description || '');
        setCategory(initialData.category || '');
      } else {
        setName('');
        setDescription('');
        setCategory('');
      }
      setErrors({});
    }
  }, [isOpen, initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!name || name.trim().length < 2) {
      newErrors.name = 'Organization name must be at least 2 characters.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    
    const orgData = {
      id: initialData?.id || Date.now().toString(),
      name,
      description,
      category,
      createdAt: initialData?.createdAt || new Date().toISOString()
    };

    setTimeout(() => {
      setIsSubmitting(false);
      
      if (onSave) {
        onSave(orgData);
      } else {
        toast({
          title: "Success",
          description: `Organization ${initialData ? 'updated' : 'added'} successfully!`,
        });
      }
      
      onClose();
    }, 500);
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  return (
    <SimpleModal isOpen={isOpen} onClose={handleClose} title={initialData ? "Edit Organization" : "Add New Organization"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="orgName" className="text-gray-900">
            Organization Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="orgName"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors({ ...errors, name: null });
            }}
            placeholder="e.g. Acme Corp"
            className={errors.name ? 'border-red-500 text-gray-900' : 'text-gray-900'}
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="orgCategory" className="text-gray-900">
            Category
          </Label>
          <Input
            id="orgCategory"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g. Technology, Healthcare"
            className="text-gray-900"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="orgDesc" className="text-gray-900">
            Description
          </Label>
          <Textarea
            id="orgDesc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell us about this organization..."
            className="text-gray-900"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : (initialData ? 'Update Organization' : 'Save Organization')}
          </Button>
        </div>
      </form>
    </SimpleModal>
  );
}