import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants';

function BlogListView({ blog }) {
  if (!blog) {
    console.warn("BlogListView: Missing or undefined blog data provided.");
    return (
      <div className="bg-gray-50 border border-gray-200 border-dashed rounded-xl p-8 flex items-center justify-center text-center">
        <AlertCircle className="w-6 h-6 text-gray-400 mr-3" />
        <p className="text-gray-500 font-medium">Blog item data unavailable</p>
      </div>
    );
  }

  const entityColors = {
    Human: 'bg-blue-50 text-blue-700 border-blue-100',
    Group: 'bg-purple-50 text-purple-700 border-purple-100',
    Organization: 'bg-emerald-50 text-emerald-700 border-emerald-100'
  };

  const id = blog?.id ?? "unknown";
  const title = blog?.title ?? "Untitled Blog Post";
  const excerpt = blog?.excerpt ?? "No description available";
  const category = blog?.category ?? "Uncategorized";
  const readTime = blog?.readTime ?? "Unknown read time";
  const tags = blog?.tags ?? [];
  const authorName = blog?.author?.name ?? "Anonymous";
  const authorType = blog?.author?.type ?? "Unknown";

  const dateString = blog?.date ? new Date(blog.date).toLocaleDateString() : "Date not available";

  const imageUrl = blog?.image ?? 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=400&fit=crop';
  const avatarUrl = blog?.author?.avatar ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(authorName)}&background=random&color=fff`;

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.15)' }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all flex flex-col md:flex-row group"
    >
      <Link to={`${ROUTES.BLOGS}/${id}`} className="relative md:w-1/3 aspect-[16/9] md:aspect-auto flex-shrink-0 block overflow-hidden bg-gray-100">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=400&fit=crop';
          }}
        />
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 bg-white/95 backdrop-blur-sm rounded-full text-gray-800 text-xs font-bold shadow-md uppercase tracking-wider">
            {category}
          </span>
        </div>
      </Link>
      
      <div className="p-6 flex flex-col flex-grow justify-center">
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-3 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Link to={`${ROUTES.BLOGS}/${id}`}>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors line-clamp-2">
                  {title}
                </h3>
              </Link>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span className={`px-2.5 py-0.5 rounded-full font-medium border ${entityColors[authorType] || 'bg-gray-50 text-gray-700'}`}>
                {authorType}
              </span>
              <div className="flex items-center gap-1.5 font-medium text-gray-700">
                <div className="w-5 h-5 rounded-full overflow-hidden border border-gray-200 shrink-0 bg-gray-100">
                  <img src={avatarUrl} alt={authorName} className="w-full h-full object-cover" />
                </div>
                <span>{authorName}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{dateString}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{readTime}</span>
              </div>
            </div>
          </div>
          
          <Link to={`${ROUTES.BLOGS}/${id}`} className="hidden md:block shrink-0">
            <Button variant="outline" className="text-gray-700 hover:text-purple-700 hover:bg-purple-50 group/btn gap-2">
              Read <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
          {excerpt}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex gap-2 flex-wrap">
            {tags.map((tag, i) => (
              <span key={`list-tag-${i}`} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                {tag}
              </span>
            ))}
          </div>
          <Link to={`${ROUTES.BLOGS}/${id}`} className="md:hidden">
            <Button variant="ghost" className="text-purple-700 hover:text-purple-800 p-0 hover:bg-transparent flex items-center gap-1">
              Read More <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default BlogListView;