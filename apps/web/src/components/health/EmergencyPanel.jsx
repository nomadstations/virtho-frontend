import React from 'react';

export function EmergencyPanel({ title, children }) {
  return (
    <div className="health-project-card p-6 h-full flex flex-col group">
      <h2 className="text-lg font-bold text-gray-900 mb-4 group-hover:text-purple-700 transition-colors">{title}</h2>
      <div className="space-y-4 flex-grow">
        {children}
      </div>
    </div>
  );
}

export function EmergencyItem({ label, value, icon }) {
  return (
    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
      <div className="bg-white p-1.5 rounded-md shadow-sm text-purple-600 shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-base font-bold text-gray-900 mt-0.5">{value}</p>
      </div>
    </div>
  );
}