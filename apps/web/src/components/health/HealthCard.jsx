import React from 'react';

export function HealthCard({ title, icon, children }) {
  return (
    <div className="health-project-card p-6 h-full flex flex-col group">
      <div className="flex items-center gap-3 mb-4">
        {icon && (
          <div className="bg-purple-50 p-2 rounded-lg text-purple-600">
            {icon}
          </div>
        )}
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-700 transition-colors">{title}</h3>
      </div>
      <div className="flex-grow">
        {children}
      </div>
    </div>
  );
}