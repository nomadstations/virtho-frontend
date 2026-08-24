import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, DollarSign, Clock, ArrowRight, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

function JobListView({ job }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.ceil(Math.abs(now - date) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 30) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }}
      transition={{ duration: 0.2 }}
      className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:border-purple-200 transition-all flex flex-col md:flex-row group"
    >
      <div className="p-6 flex flex-col md:flex-row flex-grow items-start md:items-center gap-6">
        
        <div className="w-16 h-16 rounded-xl overflow-hidden border border-gray-100 shadow-sm shrink-0 hidden md:block">
          <img src={job.logo} alt={job.company} className="w-full h-full object-cover" />
        </div>

        <div className="flex-grow min-w-0 w-full">
          <div className="flex justify-between items-start md:items-center mb-1 gap-4">
            <Link to={`/jobs/${job.id}`} className="min-w-0">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors truncate">
                {job.title}
              </h3>
            </Link>
            <span className="hidden md:inline-block px-2.5 py-1 bg-purple-50 text-purple-700 text-xs font-semibold rounded-full border border-purple-100 shrink-0">
              {job.type}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <Building2 className="w-4 h-4" />
            <span className="font-medium text-gray-800">{job.company}</span>
            <span className="md:hidden px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
              {job.type}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-gray-400" />
              <span>{job.salary}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-gray-400" />
              <span>{formatDate(job.postedDate)}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {job.skills?.slice(0, 5).map((skill, index) => (
              <span key={index} className="px-2.5 py-1 bg-gray-50 border border-gray-100 text-gray-600 rounded-md text-xs font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="w-full md:w-auto shrink-0 md:pl-6 md:border-l md:border-gray-100 flex md:flex-col justify-end items-center gap-3">
           <Link to={`/jobs/${job.id}`} className="w-full md:w-auto">
            <Button className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 text-white group/btn shadow-sm">
              Apply
              <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

      </div>
    </motion.div>
  );
}

export default JobListView;