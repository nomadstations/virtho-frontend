import React from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const LoadingSpinner = ({ message = 'Loading...', className = '' }) => (
  <div className={`flex flex-col justify-center items-center h-64 space-y-4 ${className}`}>
    <Loader2 className="h-10 w-10 text-purple-600 animate-spin" />
    <p className="text-gray-600 font-medium">{message}</p>
  </div>
);

export const EmptyState = ({ icon: Icon, title, description, actionText, onAction, className = '' }) => (
  <div className={`text-center py-16 px-4 bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center ${className}`}>
    {Icon && (
      <div className="bg-gray-50 p-5 rounded-full mb-5">
        <Icon className="h-12 w-12 text-gray-400" />
      </div>
    )}
    <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-500 mb-6 max-w-md mx-auto">{description}</p>
    {actionText && onAction && (
      <Button onClick={onAction} variant="outline" className="text-purple-600 border-purple-200 hover:bg-purple-50">
        {actionText}
      </Button>
    )}
  </div>
);

export const Badge = ({ children, variant = 'default', className = '' }) => {
  const baseStyles = 'px-2.5 py-0.5 rounded-full text-xs font-semibold inline-flex items-center gap-1.5';
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    primary: 'bg-purple-100 text-purple-800',
  };
  return (
    <span className={`${baseStyles} ${variants[variant] || variants.default} ${className}`}>
      {children}
    </span>
  );
};

export const Card = ({ children, className = '', hover = false }) => (
  <div className={`bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden ${hover ? 'hover:shadow-md transition-shadow' : ''} ${className}`}>
    {children}
  </div>
);