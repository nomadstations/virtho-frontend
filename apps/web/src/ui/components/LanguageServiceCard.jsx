import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, Globe, ArrowRight, Languages } from 'lucide-react';
import { Button } from '@/ui/primitives/button';
import { Badge } from '@/ui/primitives/badge';
import { getLanguagePairLabel, getServiceTypeLabel, formatPrice } from '@/constants/languageServiceConfig';

function LanguageServiceCard({ service }) {
  return (
    <motion.div
      whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer h-full flex flex-col group"
    >
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-3 mb-4">
          <img 
            src={service.providerAvatar} 
            alt={service.providerName} 
            className="w-10 h-10 rounded-full border border-gray-200"
          />
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-gray-700 truncate">{service.providerName}</h4>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-gray-700">{service.rating}</span>
              <span>({service.reviewCount})</span>
            </div>
          </div>
        </div>

        <Link to={`/language-services/${service.id}`}>
          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-700 transition-colors leading-tight">
            {service.name}
          </h3>
        </Link>

        <div className="mb-3">
          <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
            {getServiceTypeLabel(service.serviceType)}
          </Badge>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {service.languagePairs.slice(0, 2).map((pair, index) => (
            <div key={index} className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium">
              <Languages className="w-3 h-3" />
              <span>{getLanguagePairLabel(pair)}</span>
            </div>
          ))}
          {service.languagePairs.length > 2 && (
            <span className="px-2 py-1 bg-gray-50 text-gray-500 rounded-md text-xs font-medium">
              +{service.languagePairs.length - 2} more
            </span>
          )}
        </div>

        <p className="text-gray-600 mb-5 line-clamp-2 flex-grow text-sm leading-relaxed">
          {service.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <div className="font-extrabold text-xl text-gray-900">
            {formatPrice(service.price, service.currency, service.pricingModel)}
          </div>
          <Link to={`/language-services/${service.id}`} className="group/btn">
            <Button 
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold gap-1.5 rounded-lg"
            >
              View Details
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default LanguageServiceCard;