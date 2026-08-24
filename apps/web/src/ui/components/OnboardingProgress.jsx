import React from 'react';
import { Progress } from '@/components/ui/progress';

const OnboardingProgress = ({ current, total, isCompleted }) => {
  const percentage = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center text-sm">
        <span className="font-medium text-gray-700">
          {current} of {total} steps completed
        </span>
        <span className={`font-semibold ${isCompleted ? 'text-primary-dark' : 'text-gray-500'}`}>
          {isCompleted ? 'Completed' : 'In Progress'}
        </span>
      </div>
      <Progress value={percentage} className="h-2 w-full" />
    </div>
  );
};

export default OnboardingProgress;