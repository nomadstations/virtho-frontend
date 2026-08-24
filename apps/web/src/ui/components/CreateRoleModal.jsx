import React, { useState } from 'react';
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

const CreateRoleModal = ({ isOpen, onClose, onAddRole, existingRoles }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    
    if (!trimmedName) {
      setError('Role name is required.');
      return;
    }
    
    if (existingRoles.some(r => r.name.toLowerCase() === trimmedName.toLowerCase())) {
      setError('A role with this name already exists.');
      return;
    }
    
    setError('');
    onAddRole({
      name: trimmedName,
      description: description.trim(),
      permissions: {}
    });
    
    setName('');
    setDescription('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Role</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label htmlFor="roleName" className={error ? "text-destructive" : ""}>Role Name *</Label>
            <Input
              id="roleName"
              placeholder="e.g. Content Editor"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError('');
              }}
              className={error ? "border-destructive focus-visible:ring-destructive" : ""}
            />
            {error && <p className="text-sm text-destructive mt-1">{error}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="roleDescription">Description (Optional)</Label>
            <Textarea
              id="roleDescription"
              placeholder="Describe what users with this role can do..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="resize-none"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary-dark">
              Create Role
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRoleModal;