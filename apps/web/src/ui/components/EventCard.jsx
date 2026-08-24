import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/ui/primitives/button';
import { getRealmsLabel } from '@/utils/realmLabels';

function EventCard({ event }) {
  if (!event) return null;

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch (e) {
      return dateString || 'TBA';
    }
  };

  const placeholderImage = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80";
  const realms = Array.isArray(event.realms) ? event.realms : [];

  return (
    <motion.div
      whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer h-full flex flex-col group"
    >
      <Link to={`/event/${event.id}`} className="relative overflow-hidden aspect-[16/9] block">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
          src={event.image || placeholderImage}
          alt={event.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = placeholderImage;
          }}
        />
      </Link>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="font-medium text-gray-700">{formatDate(event.date)}</span>
          </div>
        </div>

        <Link to={`/event/${event.id}`}>
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-700 transition-colors">
            {event.title}
          </h3>
        </Link>

        <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-3">
          <MapPin className="w-4 h-4" />
          <span>{event.location}</span>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2 flex-grow leading-relaxed text-sm">
          {event.description}
        </p>

        {realms.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6 mt-auto">
            {realms.map((realm, idx) => (
              <span 
                key={idx} 
                className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide bg-zone-${realm.toLowerCase()}-soft text-zone-${realm.toLowerCase()}-ink`}
              >
                {getRealmsLabel(realm)}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <Link to={`/event/${event.id}`} className="w-full">
            <Button 
              variant="outline" 
              className="w-full text-gray-700 hover:text-gray-900 border-gray-200 group-hover:border-gray-300 transition-colors gap-2"
            >
              View Details
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default EventCard;