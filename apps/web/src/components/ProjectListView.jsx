import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

function ProjectListView({ project }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: '2-digit' 
    });
  };

  const placeholderImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjYzRiNWZkIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzc4MzViOSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlByb2plY3QgSW1hZ2U8L3RleHQ+Cjwvc3ZnPgo=";

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.15)' }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col md:flex-row group"
    >
      <Link to={`/project/${project.id}`} className="relative overflow-hidden md:w-1/3 aspect-[4/3] md:aspect-auto md:min-h-[200px] flex-shrink-0 block">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
          src={project.image || placeholderImage}
          alt={project.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = placeholderImage;
          }}
        />
        <div className="absolute top-4 left-4 md:hidden">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-purple-700 text-xs font-semibold shadow-md">
            {project.category}
          </span>
        </div>
      </Link>
      
      <div className="p-6 flex flex-col flex-grow justify-center">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-purple-600" />
              <span>{formatDate(project.publishedDate)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-purple-600" />
              <span className="truncate">{project.author}</span>
            </div>
          </div>
          <span className="hidden md:inline-block px-3 py-1 bg-purple-50 rounded-full text-purple-700 text-xs font-semibold border border-purple-100">
            {project.category}
          </span>
        </div>

        <Link to={`/project/${project.id}`}>
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors">
            {project.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 mb-6 line-clamp-2 leading-relaxed">
          {project.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
            project.status === 'active' 
              ? 'bg-green-100 text-green-700' 
              : 'bg-yellow-100 text-yellow-700'
          }`}>
            {project.status}
          </span>
          
          <Link to={`/project/${project.id}`} className="group/btn">
            <Button 
              variant="ghost" 
              className="text-purple-700 hover:text-purple-800 hover:bg-purple-50 font-semibold gap-2"
            >
              Learn More
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default ProjectListView;