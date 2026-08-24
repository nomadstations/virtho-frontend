import React from 'react';
import { Activity, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function LabResultCard({ results }) {
  return (
    <div className="health-project-card p-6 flex flex-col group h-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-purple-50 p-2 rounded-lg text-purple-600">
          <Activity className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-700 transition-colors">Recent Lab Results</h3>
      </div>
      <div className="flex-grow space-y-4 pt-2">
        {results.map((result, idx) => (
          <div key={idx} className="flex justify-between items-center">
            <span className="text-gray-600">{result.name}</span>
            <span className="flex items-center gap-1.5 font-semibold text-gray-900">
              {result.status === 'Normal' && <CheckCircle2 className="w-4 h-4 text-green-500" />}
              {result.status}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-between items-center border-t border-gray-100 pt-4">
        <span className="text-xs font-medium text-gray-500">Updated recently</span>
        <Button variant="ghost" className="text-purple-700 hover:text-purple-800 hover:bg-purple-50 rounded-full font-semibold gap-2 -mr-4">
          Full Report <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
}