import React from 'react';
import { FileText } from 'lucide-react';
import BlogCard from './BlogCard';
import SectionHeader from './sections/SectionHeader';
import ItemGrid from './sections/ItemGrid';
import { MOCK_BLOG_POSTS } from '@/constants/mockDataConfig';
import { ROUTES } from '@/constants';

function BlogSection() {
  return (
    <section className="py-16 bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title="Latest from the Blogs" 
          icon={FileText} 
          viewAllLink={ROUTES.BLOGS} 
        />
        <ItemGrid 
          items={MOCK_BLOG_POSTS} 
          renderItem={(post) => <BlogCard post={post} />} 
        />
      </div>
    </section>
  );
}

export default BlogSection;