import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

function ContentSection({ title, items, renderItem, viewAllLink, icon: Icon, className = "" }) {
  if (!items || items.length === 0) return null;

  return (
    <section className={`py-16 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-3">
            {Icon && (
              <div className="p-2.5 bg-purple-100 rounded-lg text-purple-700">
                <Icon className="w-6 h-6" />
              </div>
            )}
            <h2 className="text-3xl font-extrabold text-gray-900">{title}</h2>
          </div>
          {viewAllLink && (
            <Link 
              to={viewAllLink}
              className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-800 transition-colors group"
            >
              View All 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <motion.div
              key={item.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              {renderItem(item)}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ContentSection;