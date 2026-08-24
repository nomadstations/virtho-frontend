import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const CreateEditGroupModal = ({ isOpen, onClose, onSave, mode, initialData, existingGroups }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && initialData) {
        setName(initialData.name);
        setDescription(initialData.description || '');
      } else {
        setName('');
        setDescription('');
      }
      setError('');
    }
  }, [isOpen, mode, initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    
    if (!trimmedName) {
      setError('Group name is required.');
      return;
    }
    
    const isDuplicate = existingGroups.some(g => 
      g.name.toLowerCase() === trimmedName.toLowerCase() && 
      (mode === 'create' || g.id !== initialData.id)
    );

    if (isDuplicate) {
      setError('A group with this name already exists.');
      return;
    }
    
    setError('');
    onSave({
      name: trimmedName,
      description: description.trim()
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{mode === 'edit' ? 'Edit Group' : 'Create New Group'}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label htmlFor="groupName" className={error ? "text-destructive" : ""}>Group Name *</Label>
            <Input
              id="groupName"
              placeholder="e.g. Content Moderators"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError('');
              }}
              className={error ? "border-destructive focus-visible:ring-destructive" : "bg-white"}
            />
            {error && <p className="text-sm text-destructive mt-1">{error}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="groupDescription">Description (Optional)</Label>
            <Textarea
              id="groupDescription"
              placeholder="Describe what this group is for..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="resize-none bg-white"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary-dark">
              {mode === 'edit' ? 'Save Changes' : 'Create Group'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEditGroupModal;