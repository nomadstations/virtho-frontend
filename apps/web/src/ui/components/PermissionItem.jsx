import React from 'react';
import { Lock } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const PermissionItem = ({ permission, role, isGranted, onToggle }) => {
  const isLocked = role.name === 'Admin' && permission.domain === 'Platform';

  return (
    <div className={cn(
      "flex items-start space-x-3 p-3 rounded-md transition-colors",
      isLocked ? "permission-locked bg-gray-50 opacity-80" : "hover:bg-gray-50/50"
    )}>
      <div className="flex items-center h-5 mt-0.5 relative">
        <Checkbox
          id={`perm-${permission.key}`}
          checked={isGranted}
          disabled={isLocked}
          onCheckedChange={(checked) => onToggle(permission.key, checked)}
          className={cn(
            isLocked ? "data-[state=checked]:bg-gray-400 data-[state=checked]:border-gray-400 cursor-not-allowed" : "data-[state=checked]:bg-primary data-[state=checked]:border-primary"
          )}
        />
        {isLocked && (
          <div 
            className="absolute -right-5 top-1/2 -translate-y-1/2 text-gray-400"
            title="This permission cannot be removed from Admin role"
          >
            <Lock className="w-3.5 h-3.5" />
          </div>
        )}
      </div>
      <div className={cn("grid gap-1.5 leading-none", isLocked ? "pl-5" : "")}>
        <Label 
          htmlFor={`perm-${permission.key}`}
          className={cn(
            "text-sm font-medium",
            isLocked ? "text-gray-700 cursor-not-allowed" : "text-gray-900 cursor-pointer"
          )}
          title={isLocked ? "This permission cannot be removed from Admin role" : ""}
        >
          {permission.label}
        </Label>
        <p className="text-xs text-gray-500">
          {permission.description}
        </p>
      </div>
    </div>
  );
};

export default PermissionItem;