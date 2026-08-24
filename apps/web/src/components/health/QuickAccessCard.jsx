import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function QuickAccessCard({ title, description, icon, path }) {
  return (
    <div className="health-project-card p-6 h-full flex flex-col group">
      <div className="flex items-start justify-between mb-4">
        <div className="bg-purple-50 p-3 rounded-xl text-purple-600">
          {icon}
        </div>
      </div>
      <Link to={path}>
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors">
          {title}
        </h3>
      </Link>
      <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
        {description}
      </p>
      <div className="mt-auto flex justify-end">
        <Link to={path}>
          <Button variant="ghost" className="text-purple-700 hover:text-purple-800 hover:bg-purple-50 rounded-full font-semibold gap-2 -mr-4">
            Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </div>
  );
}