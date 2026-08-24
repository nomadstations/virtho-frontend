import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, Activity, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/ui/primitives/button';
import { Link } from 'react-router-dom';

function CommunityCard({ member }) {
  const placeholderAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random&color=fff&size=256`;
  const detailUrl = `/community/${member.type.toLowerCase()}/${member.id}`;

  return (
    <motion.div
      whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all h-full flex flex-col group"
    >
      <Link to={detailUrl} className="relative h-24 bg-gradient-to-r from-purple-100 to-indigo-50 flex-shrink-0 block">
        <div className="absolute -bottom-10 left-6">
          <div className="w-20 h-20 rounded-full border-4 border-white overflow-hidden bg-white shadow-md">
            <img 
              src={member.avatar || placeholderAvatar} 
              alt={member.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => { e.target.src = placeholderAvatar; }}
            />
          </div>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-purple-700 text-xs font-semibold shadow-sm border border-purple-100">
            {member.type}
          </span>
          {member.verified && (
            <span className="p-1 bg-white/90 backdrop-blur-sm rounded-full text-blue-600 shadow-sm border border-blue-100" title="Verified Member">
              <ShieldCheck className="w-4 h-4" />
            </span>
          )}
        </div>
      </Link>
      
      <div className="p-6 pt-12 flex flex-col flex-grow">
        <Link to={detailUrl}>
          <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-purple-700 transition-colors">
            {member.name}
          </h3>
        </Link>
        
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>{member.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Activity className="w-3.5 h-3.5" />
            <span>{member.activityLevel} Activity</span>
          </div>
          {member.type === 'Organization' && member.memberCount && (
            <div className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              <span>{member.memberCount} members</span>
            </div>
          )}
        </div>
        
        <p className="text-gray-600 mb-6 line-clamp-3 flex-grow leading-relaxed text-sm">
          {member.description}
        </p>

        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="flex gap-2">
            {member.tags?.slice(0, 2).map((tag, i) => (
              <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                {tag}
              </span>
            ))}
            {member.tags?.length > 2 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                +{member.tags.length - 2}
              </span>
            )}
          </div>
          <Link to={detailUrl}>
            <Button 
              variant="ghost" 
              className="text-purple-700 hover:text-purple-800 hover:bg-purple-50 p-2 h-auto rounded-full group/btn"
            >
              <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default CommunityCard;