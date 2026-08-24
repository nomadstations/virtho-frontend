import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const PermissionOverrideItem = ({ permission, isGranted, onToggle }) => {
  return (
    <div 
      className="flex items-start space-x-3 p-3 rounded-md transition-colors bg-secondary/5 hover:bg-secondary/10 border border-secondary/20"
      title="This is a permission override for this group"
    >
      <div className="flex items-center h-5 mt-0.5">
        <Checkbox
          id={`override-${permission.key}`}
          checked={isGranted}
          onCheckedChange={(checked) => onToggle(permission.key, checked)}
          className="data-[state=checked]:bg-secondary-darkest data-[state=checked]:border-secondary-darkest border-secondary-dark"
        />
      </div>
      <div className="grid gap-1.5 leading-none">
        <Label 
          htmlFor={`override-${permission.key}`}
          className="text-sm font-medium text-secondary-darkest cursor-pointer"
        >
          {permission.label}
        </Label>
        <p className="text-xs text-secondary-dark">
          {permission.description}
        </p>
      </div>
    </div>
  );
};

export default PermissionOverrideItem;