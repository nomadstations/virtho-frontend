import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import BlogCard from './BlogCard';
import SectionHeader from './sections/SectionHeader';
import { getBlogs } from '@/data/mockBlogs';
import { ROUTES } from '@/constants';

function RelatedBlogs({ currentBlogId, category, tags }) {
  const relatedBlogs = useMemo(() => {
    const allBlogs = getBlogs() || [];
    if (!allBlogs.length) return [];
    
    return allBlogs
      .filter(b => b && b.id !== currentBlogId)
      .filter(b => b.category === category || (b.tags && b.tags.some(t => tags?.includes(t))))
      .slice(0, 3);
  }, [currentBlogId, category, tags]);

  if (!relatedBlogs || relatedBlogs.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-gray-200">
      <SectionHeader 
        title="Related Articles" 
        icon={FileText} 
        viewAllLink={ROUTES.BLOGS} 
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {relatedBlogs.map((blog, index) => (
          <motion.div
            key={blog.id || `related-${index}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="h-full"
          >
            <BlogCard blog={blog} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default RelatedBlogs;