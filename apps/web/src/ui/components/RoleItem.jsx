import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const RoleItem = ({ role, isSelected, memberCount, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "role-item flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors border",
        isSelected 
          ? "role-item-active bg-primary-lighter/30 border-primary-light text-primary-darkest" 
          : "bg-white border-transparent hover:bg-gray-50 hover:border-gray-200 text-gray-700"
      )}
    >
      <div className="flex flex-col min-w-0">
        <span className={cn("font-medium truncate", isSelected ? "text-primary-darkest" : "text-gray-900")}>
          {role.name}
        </span>
        <span className="text-xs text-gray-500 truncate mt-0.5">
          {role.description || 'No description'}
        </span>
      </div>
      <Badge 
        variant="secondary" 
        className={cn(
          "ml-3 shrink-0 rounded-full",
          isSelected ? "bg-primary text-primary-foreground" : "bg-gray-100 text-gray-600"
        )}
      >
        {memberCount}
      </Badge>
    </div>
  );
};

export default RoleItem;