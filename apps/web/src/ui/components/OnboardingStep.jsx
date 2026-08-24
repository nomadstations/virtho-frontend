import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const OnboardingStep = ({ 
  step, 
  index, 
  isCompleted, 
  isAdmin, 
  onToggle 
}) => {
  return (
    <div className={`p-4 rounded-xl border transition-colors ${
      isCompleted 
        ? 'bg-primary-lighter/20 border-primary/30' 
        : 'bg-white border-gray-200 hover:border-primary/50'
    }`}>
      <div className="flex items-start gap-4">
        <button 
          onClick={onToggle}
          disabled={!isAdmin}
          className={`mt-0.5 shrink-0 flex items-center justify-center transition-colors ${
            !isAdmin ? 'cursor-default' : 'cursor-pointer hover:scale-110'
          }`}
        >
          {isCompleted ? (
            <CheckCircle2 className="w-6 h-6 text-primary" />
          ) : (
            <Circle className="w-6 h-6 text-gray-300" />
          )}
        </button>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-sm font-semibold text-gray-900">
              {index + 1}. {step.title}
            </h4>
            {step.required && (
              <Badge variant="outline" className="text-[10px] uppercase py-0 px-1.5 bg-gray-50 text-gray-500 border-gray-200">
                Required
              </Badge>
            )}
          </div>
          <p className="text-sm text-gray-500">{step.description}</p>
        </div>
        
        {isAdmin && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onToggle}
            className={`shrink-0 ${isCompleted ? 'text-gray-500 hover:text-gray-700' : 'text-primary hover:text-primary-dark'}`}
          >
            {isCompleted ? 'Mark Undone' : 'Simulate'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default OnboardingStep;