import React from 'react';
import { Button } from '@/components/ui/button';

/**
 * Dashboard Page Header Component
 * 
 * Displays consistent page header across all dashboard pages:
 * - Icon + Title + Description on the left
 * - Action button on the right
 * - Responsive: button moves below title on mobile
 * 
 * @param {string} title - Main page title
 * @param {string} description - Page description text
 * @param {string} buttonLabel - Text for the action button
 * @param {function} buttonAction - Click handler for the action button
 * @param {React.Component} icon - Optional icon component (e.g., Building2)
 * @param {string} buttonClassName - Optional custom button styling
 */
function DashboardPageHeader({ 
  title, 
  description, 
  buttonLabel, 
  buttonAction, 
  icon: Icon,
  buttonClassName = "bg-purple-600 hover:bg-purple-700 text-white"
}) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <div className="flex items-center gap-3 mb-2">
          {Icon && <Icon className="h-8 w-8 text-purple-600" />}
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            {title}
          </h1>
        </div>
        <p className="text-gray-600">{description}</p>
      </div>
      {buttonLabel && buttonAction && (
        <Button 
          onClick={buttonAction} 
          className={`${buttonClassName} shadow-sm w-full md:w-auto`}
        >
          {buttonLabel}
        </Button>
      )}
    </div>
  );
}

export default DashboardPageHeader;