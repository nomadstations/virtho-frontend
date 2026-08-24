import React from 'react';
import { Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function GoalCard({ goals }) {
  return (
    <div className="health-project-card p-6 flex flex-col group h-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-purple-50 p-2 rounded-lg text-purple-600">
          <Heart className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-700 transition-colors">Wellness Goals</h3>
      </div>
      <div className="flex-grow space-y-5 pt-2">
        {goals.map((goal, idx) => (
          <div key={idx}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">{goal.name}</span>
              <span className="text-sm font-semibold text-purple-600">{goal.progress}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div 
                className="bg-purple-600 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${goal.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-between items-center border-t border-gray-100 pt-4">
        <span className="text-xs font-medium text-purple-600">On Track</span>
        <Button variant="ghost" className="text-purple-700 hover:text-purple-800 hover:bg-purple-50 rounded-full font-semibold gap-2 -mr-4">
          Manage Goals <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
}