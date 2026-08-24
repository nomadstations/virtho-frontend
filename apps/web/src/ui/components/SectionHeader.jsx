import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const SectionHeader = ({ title, icon: Icon, viewAllLink, description }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
      <div>
        <div className="flex items-center gap-3 mb-2">
          {Icon && (
            <div className="p-2.5 bg-purple-100 rounded-lg text-purple-700">
              <Icon className="w-6 h-6" />
            </div>
          )}
          <h2 className="text-3xl font-extrabold text-gray-900">{title}</h2>
        </div>
        {description && <p className="text-gray-600">{description}</p>}
      </div>
      {viewAllLink && (
        <Link 
          to={viewAllLink}
          className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-800 transition-colors group whitespace-nowrap"
        >
          View All 
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;