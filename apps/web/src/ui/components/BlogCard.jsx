import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, AlertCircle, Eye, Heart } from 'lucide-react';
import { Button } from '@/ui/primitives/button';
import { getRealmsLabel } from '@/utils/realmLabels';

function BlogCard({ blog }) {
  if (!blog) {
    return (
      <div className="bg-gray-50 border border-gray-200 border-dashed rounded-xl p-6 h-full flex flex-col items-center justify-center text-center">
        <AlertCircle className="w-8 h-8 text-gray-400 mb-2" />
        <p className="text-gray-500 font-medium">Blog data unavailable</p>
      </div>
    );
  }

  const entityColors = {
    Human: 'bg-blue-50 text-blue-700 border-blue-100',
    Group: 'bg-purple-50 text-purple-700 border-purple-100',
    Organization: 'bg-emerald-50 text-emerald-700 border-emerald-100'
  };

  const slug = blog?.slug ?? blog?.id ?? "unknown";
  const title = blog?.title ?? "Untitled Blog Post";
  const excerpt = blog?.excerpt ?? "No description available";
  const category = blog?.category ?? "Uncategorized";
  const readTime = blog?.readTime ? `${blog.readTime} min read` : "Unknown read time";
  const authorName = blog?.author?.name ?? "Anonymous";
  const authorType = blog?.author?.type ?? "Unknown";
  
  let dateString = "Date not available";
  if (blog?.publishedDate) {
    try {
      const dateObj = new Date(blog.publishedDate);
      dateString = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch (e) {
      console.warn("Invalid date format", blog.publishedDate);
    }
  }

  const imageUrl = blog?.featuredImage ?? blog?.image ?? 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=400&fit=crop';
  const avatarUrl = blog?.author?.avatar ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(authorName)}&background=random&color=fff`;

  const viewsCount = blog?.views ?? blog?.popularity?.views ?? 0;
  const likesCount = blog?.likes ?? blog?.popularity?.likes ?? 0;
  const realms = Array.isArray(blog?.realms) ? blog.realms : [];

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.01, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md transition-all h-full flex flex-col group relative z-10"
    >
      <Link to={`/blog/${slug}`} className="relative overflow-hidden aspect-[16/9] block w-full">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover block"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=400&fit=crop';
          }}
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="px-3 py-1 bg-white/95 backdrop-blur-sm rounded-md text-gray-800 border border-gray-200 text-xs font-bold shadow-sm tracking-wide">
            {category}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm border backdrop-blur-sm bg-white/95 ${entityColors[authorType] || 'bg-gray-50 text-gray-700'}`}>
            {authorType}
          </span>
        </div>
      </Link>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200 bg-gray-100 shrink-0">
              <img src={avatarUrl} alt={authorName} className="w-full h-full object-cover" />
            </div>
            <div className="text-sm">
              <p className="font-semibold text-gray-900 leading-none mb-1 line-clamp-1">{authorName}</p>
              <div className="flex items-center text-xs text-gray-500 gap-2">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {dateString}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {readTime}</span>
              </div>
            </div>
          </div>
        </div>

        <Link to={`/blog/${slug}`}>
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors line-clamp-2" title={title}>
            {title}
          </h3>
        </Link>
        
        <p className="text-gray-600 mb-4 line-clamp-3 flex-grow leading-relaxed text-sm" title={excerpt}>
          {excerpt}
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

        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3 text-gray-500 text-xs font-medium">
            <span className="flex items-center gap-1.5" title={`${viewsCount} views`}>
              <Eye className="w-4 h-4" />
              {viewsCount >= 1000 ? `${(viewsCount / 1000).toFixed(1)}k` : viewsCount}
            </span>
            <span className="flex items-center gap-1.5" title={`${likesCount} likes`}>
              <Heart className="w-4 h-4" />
              {likesCount >= 1000 ? `${(likesCount / 1000).toFixed(1)}k` : likesCount}
            </span>
          </div>

          <Link to={`/blog/${slug}`}>
            <Button 
              variant="ghost" 
              className="text-purple-700 hover:text-purple-800 hover:bg-purple-50 p-2 h-auto rounded-full group/btn"
              aria-label="Read more"
            >
              <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default BlogCard;