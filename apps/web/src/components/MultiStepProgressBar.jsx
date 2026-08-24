import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export function MultiStepProgressBar({ currentStep, totalSteps, stepLabels }) {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between relative">
        {/* Background Line */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 rounded-full z-0"></div>
        
        {/* Active/Completed Line */}
        <motion.div 
          className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-green-500 rounded-full z-0"
          initial={{ width: '0%' }}
          animate={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />

        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;

          return (
            <div key={index} className="relative z-10 flex flex-col items-center">
              <motion.div 
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 text-sm font-semibold transition-colors duration-300 ${
                  isCompleted 
                    ? 'bg-green-500 border-green-500 text-white' 
                    : isActive 
                      ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-200' 
                      : 'bg-white border-gray-300 text-gray-400'
                }`}
                initial={false}
                animate={{ scale: isActive ? 1.1 : 1 }}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : stepNumber}
              </motion.div>
              {stepLabels && stepLabels[index] && (
                <span className={`absolute top-10 text-xs font-medium whitespace-nowrap ${
                  isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-400'
                }`}>
                  {stepLabels[index]}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}