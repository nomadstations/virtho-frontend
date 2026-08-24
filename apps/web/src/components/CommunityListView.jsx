import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, Activity, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

function CommunityListView({ member }) {
  const placeholderAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random&color=fff&size=256`;
  const detailUrl = `/community/${member.type.toLowerCase()}/${member.id}`;

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.15)' }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all flex flex-col md:flex-row group"
    >
      <Link to={detailUrl} className="p-6 md:pr-0 flex items-center justify-center md:items-start flex-shrink-0 bg-gray-50/50 md:bg-transparent block">
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-md overflow-hidden bg-white">
          <img 
            src={member.avatar || placeholderAvatar} 
            alt={member.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => { e.target.src = placeholderAvatar; }}
          />
        </div>
      </Link>
      
      <div className="p-6 flex flex-col flex-grow justify-center">
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-2 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link to={detailUrl}>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
                  {member.name}
                </h3>
              </Link>
              {member.verified && (
                <span className="text-blue-600" title="Verified Member">
                  <ShieldCheck className="w-5 h-5" />
                </span>
              )}
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span className="px-2.5 py-0.5 bg-purple-50 text-purple-700 rounded-full font-medium border border-purple-100">
                {member.type}
              </span>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{member.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Activity className="w-4 h-4" />
                <span>{member.activityLevel}</span>
              </div>
              {member.type === 'Organization' && member.memberCount && (
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{member.memberCount} members</span>
                </div>
              )}
            </div>
          </div>
          
          <Link to={detailUrl} className="hidden md:block shrink-0">
            <Button className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-purple-700 transition-colors gap-2">
              View Profile <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
          {member.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex gap-2 flex-wrap">
            {member.tags?.map((tag, i) => (
              <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                {tag}
              </span>
            ))}
          </div>
          <Link to={detailUrl} className="md:hidden">
            <Button variant="ghost" className="text-purple-700 hover:text-purple-800 p-0 hover:bg-transparent flex items-center gap-1">
              Profile <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default CommunityListView;