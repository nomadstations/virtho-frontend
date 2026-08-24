import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Button } from '@/ui/primitives/button';
import { getRealmsLabel } from '@/utils/realmLabels';

function ProjectCard({ project }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: '2-digit' 
    });
  };

  const placeholderImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjYzRiNWZkIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzc4MzViOSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlByb2plY3QgSW1hZ2U8L3RleHQ+Cjwvc3ZnPgo=";
  const realms = Array.isArray(project?.realms) ? project.realms : [];

  return (
    <motion.div
      whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer h-full flex flex-col group"
    >
      <Link to={`/project/${project.id}`} className="relative overflow-hidden aspect-[4/3] block">
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
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-gray-800 text-xs font-bold shadow-md">
            {project.category}
          </span>
        </div>
      </Link>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>{formatDate(project.publishedDate)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <User className="w-4 h-4 text-gray-400" />
            <span className="truncate">{project.author}</span>
          </div>
        </div>

        <Link to={`/project/${project.id}`}>
          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-700 transition-colors">
            {project.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 mb-4 line-clamp-3 flex-grow leading-relaxed text-sm">
          {project.description}
        </p>

        {realms.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {realms.map((realm, idx) => (
              <span key={idx} className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide bg-zone-${realm.toLowerCase()}-soft text-zone-${realm.toLowerCase()}-ink`}>
                {getRealmsLabel(realm)}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
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
              className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 font-semibold gap-2"
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

export default ProjectCard;