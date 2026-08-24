import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Briefcase, DollarSign, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/ui/primitives/button';

function JobCard({ job }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 30) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.15)' }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all h-full flex flex-col group"
    >
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-100 shadow-sm shrink-0">
              <img src={job.logo} alt={job.company} className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-600">{job.company}</h4>
              <span className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                <Clock className="w-3 h-3" /> {formatDate(job.postedDate)}
              </span>
            </div>
          </div>
          <span className="px-2.5 py-1 bg-purple-50 text-purple-700 text-xs font-semibold rounded-full border border-purple-100">
            {job.type}
          </span>
        </div>

        <Link to={`/jobs/${job.id}`}>
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors line-clamp-2">
            {job.title}
          </h3>
        </Link>
        
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <DollarSign className="w-4 h-4 text-gray-400" />
            <span>{job.salary}</span>
          </div>
        </div>

        <p className="text-gray-600 mb-5 line-clamp-2 flex-grow text-sm leading-relaxed">
          {job.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {job.skills?.slice(0, 3).map((skill, index) => (
            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">
              {skill}
            </span>
          ))}
          {job.skills?.length > 3 && (
            <span className="px-2 py-1 bg-gray-50 text-gray-500 rounded-md text-xs font-medium">
              +{job.skills.length - 3}
            </span>
          )}
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100">
          <Link to={`/jobs/${job.id}`} className="block w-full">
            <Button variant="outline" className="w-full text-purple-700 border-purple-200 hover:bg-purple-50 hover:text-purple-800 transition-colors group/btn">
              View Details
              <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default JobCard;