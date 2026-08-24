import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function DocumentCard({ title, type, dateModified, status, content, icon }) {
  return (
    <div className="health-project-card p-6 flex flex-col group h-full">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-purple-50 p-2 rounded-lg text-purple-600">
            {icon}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 group-hover:text-purple-700 transition-colors">{title}</h3>
            <p className="text-sm text-gray-500">{type}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
          {status}
        </span>
      </div>
      <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-grow leading-relaxed">
        {content}
      </p>
      <div className="flex items-center justify-between mt-auto border-t border-gray-100 pt-4">
        <span className="text-xs text-gray-500">Updated: {dateModified}</span>
        <Button variant="ghost" className="text-purple-700 hover:text-purple-800 hover:bg-purple-50 rounded-full font-semibold gap-2 -mr-4">
          View Document <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
}