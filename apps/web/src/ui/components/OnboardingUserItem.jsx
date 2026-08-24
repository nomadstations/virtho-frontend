import React from 'react';
import { Badge } from '@/components/ui/badge';

const OnboardingUserItem = ({ user, progress, workflow, onClick }) => {
  const completedCount = progress.completedSteps.length;
  const totalCount = workflow.length;
  const percentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div 
      onClick={onClick}
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer border border-transparent hover:border-gray-200"
    >
      <div className="w-10 h-10 rounded-full bg-primary-lighter/40 text-primary-dark font-semibold flex items-center justify-center shrink-0 border border-primary-light/30">
        {user.avatarInitials}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1">
          <p className="text-sm font-medium text-gray-900 truncate">
            {user.firstName} {user.lastName}
          </p>
          <Badge variant="outline" className="text-[10px] px-1.5 py-0 font-normal">
            {user.role}
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all" 
              style={{ width: `${percentage}%` }}
            />
          </div>
          <span className="text-xs text-gray-500 whitespace-nowrap">
            {completedCount}/{totalCount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OnboardingUserItem;