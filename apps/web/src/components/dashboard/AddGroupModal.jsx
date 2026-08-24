import React, { useState, useEffect } from 'react';
import { SimpleModal } from './SimpleModal.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

export function AddGroupModal({ isOpen, onClose, initialData = null, onSave = null }) {
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
      newErrors.name = 'Group name must be at least 2 characters.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    
    const groupData = {
      id: initialData?.id || Date.now().toString(),
      name,
      description,
      category,
      createdAt: initialData?.createdAt || new Date().toISOString()
    };

    setTimeout(() => {
      setIsSubmitting(false);
      
      if (onSave) {
        onSave(groupData);
      } else {
        toast({
          title: "Success",
          description: `Group ${initialData ? 'updated' : 'added'} successfully!`,
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
    <SimpleModal isOpen={isOpen} onClose={handleClose} title={initialData ? "Edit Group" : "Add New Group"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="groupName" className="text-gray-900">
            Group Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="groupName"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors({ ...errors, name: null });
            }}
            placeholder="e.g. Design Team"
            className={errors.name ? 'border-red-500 text-gray-900' : 'text-gray-900'}
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="groupCategory" className="text-gray-900">
            Category
          </Label>
          <Input
            id="groupCategory"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g. Engineering, Marketing"
            className="text-gray-900"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="groupDesc" className="text-gray-900">
            Description
          </Label>
          <Textarea
            id="groupDesc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What is this group for?..."
            className="text-gray-900"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : (initialData ? 'Update Group' : 'Save Group')}
          </Button>
        </div>
      </form>
    </SimpleModal>
  );
}